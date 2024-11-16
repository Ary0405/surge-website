import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "~/env";
import { DocumentType } from "@prisma/client";
import { MatchData, SinglePlayerEvent, MultiPlayerEvent } from "~/types/types";

const r2Client = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const regRouter = createTRPCRouter({
  getAvailableSports: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany();
  }),

  getEventDetails: publicProcedure
    .input(
      z.object({
        sportSlug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { sportSlug } = input;

      const event = await ctx.db.event.findUnique({
        where: {
          slug: sportSlug,
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      return event;
    }),

  checkout: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId } = input;
      const userId = ctx.session.user.id;

      // const existingTeam = await ctx.db.team.findFirst({
      //   where: {
      //     registeredById: userId,
      //     eventId: eventId,
      //   },
      // });

      // if (existingTeam) {
      //   throw new Error("User is already registered for the event");
      // }

      return await ctx.db.team.create({
        data: {
          registeredById: userId,
          eventId: eventId,
        },
      });
    }),

  uploadPaymentProof: protectedProcedure
    .input(
      z.object({
        paymentProofUrl: z.string(),
        amount: z.number(),
        teamIds: z.array(z.string()), // Accept multiple team IDs
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { paymentProofUrl, amount, teamIds } = input;

      // Create the payment details record
      const paymentDetails = await ctx.db.paymentDetails.create({
        data: {
          paymentProofUrl,
          amount,
        },
      });

      // Update all related teams to reference the created payment details
      // const updatedTeams = 
      await ctx.db.team.updateMany({
        where: {
          id: {
            in: teamIds,
          },
        },
        data: {
          paymentDetailsId: paymentDetails.id,
        },
      });

      // After linking the payment to the teams, delete them from the cart
      await ctx.db.team.deleteMany({
        where: {
          id: {
            in: teamIds,
          },
        },
      });

      return paymentDetails;
    }),

  createTeamWithMembers: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        players: z.array(
          z.object({
            name: z.string(),
            email: z.string(),
            rollNumber: z.string(),
            phone: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, players } = input;
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new Error("User is not authenticated.");
      }

      // const existingTeam = await ctx.db.team.findFirst({
      //   where: {
      //     registeredById: userId,
      //     eventId: eventId,
      //   },
      // });

      // if (existingTeam) {
      //   throw new Error("User is already registered for the event");
      // }

      const team = await ctx.db.team.create({
        data: {
          registeredById: userId,
          eventId: eventId,
        },
      });

      await ctx.db.teamMember.createMany({
        data: players.map((player) => ({
          name: player.name,
          email: player.email,
          rollNumber: player.rollNumber,
          phone: player.phone,
          eventId: eventId,
          teamId: team.id,
        })),
      });

      return team;
    }),

  getCart: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const teams = await ctx.db.team.findMany({
      where: {
        registeredById: userId,
        paymentDetailsId: null, // Only fetch teams with no associated payment details
      },
      include: {
        Event: true,
        TeamMembers: true,
      },
    });

    return teams;
  }),

  removeFromCart: protectedProcedure.input(z.object({ teamId: z.string() })).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const { teamId } = input;

    // delete from team 
    await ctx.db.team.delete({
      where: {
        id: teamId,
        registeredById: userId,
        paymentDetailsId: null,
      },
    });

    return { success: true };

  }),


  calculateTotalAmount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const teams = await ctx.db.team.findMany({
      where: {
        registeredById: userId,
        paymentDetailsId: null, // Only calculate for unpaid teams
      },
      include: {
        Event: true, // Include event details
        TeamMembers: true, // Include team members
      },
    });

    const totalAmount = teams.reduce((total, team) => {
      return total + team.Event.pricePerPlayer * team.TeamMembers.length;
    }, 0);

    return totalAmount;
  }),

  finalizePayment: protectedProcedure
    .input(
      z.object({
        transactionId: z.string(),
        teamIds: z.array(z.string()), // List of team IDs to be paid for
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { transactionId, teamIds } = input;
      const userId = ctx.session.user.id;

      // Fetch teams along with their event and team members details
      const teams = await ctx.db.team.findMany({
        where: {
          id: { in: teamIds },
          registeredById: userId,
          paymentDetailsId: null, // Ensure no payment has been made yet
        },
        include: {
          Event: true, // Include event details
          TeamMembers: true, // Include team members
        },
      });

      // Calculate the total amount
      const totalAmount = teams.reduce((total, team) => {
        return total + team.Event.pricePerPlayer * team.TeamMembers.length;
      }, 0);

      // Create a pending payment record
      const payment = await ctx.db.paymentDetails.create({
        data: {
          paymentProofUrl: transactionId,
          amount: totalAmount,
          paymentStatus: "PENDING",
        },
      });

      // Update the teams to link to the payment record
      await ctx.db.team.updateMany({
        where: {
          id: { in: teamIds },
        },
        data: {
          paymentDetailsId: payment.id,
        },
      });

      return payment;
    }),

  deleteTeamFromCart: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { teamId } = input;
      const userId = ctx.session.user.id;

      const team = await ctx.db.team.findFirst({
        where: {
          id: teamId,
          registeredById: userId,
          paymentDetailsId: null, // Only delete if not yet paid
        },
      });

      if (!team) {
        throw new Error("Team not found or already paid for.");
      }

      // Delete associated team members
      await ctx.db.teamMember.deleteMany({
        where: { teamId: team.id },
      });

      // Delete the team
      await ctx.db.team.delete({
        where: { id: teamId },
      });

      return { success: true };
    }),

  getMyEvents: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const myEvents = await ctx.db.team.findMany({
      where: {
        registeredById: userId,
        paymentDetailsId: {
          not: null, // Ensure we only fetch teams that have been paid for
        },
      },
      include: {
        Event: true,
        PaymentDetails: true,
        TeamMembers: true, // Include team members in the response
        AccommodationPayment: {
          select: {
            paymentStatus: true,
          }
        },
        AccommodationDetails: {
          select: {
            isAlloted: true,
          }
        }
      },
    });

    return myEvents;
  }),

  getTeamByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const { token } = input;

      const team = await ctx.db.team.findFirst({
        where: { verificationToken: token },
        include: {
          Event: {
            include: {
              requiredDocuments: true,
            },
          },
          TeamMembers: {
            include: {
              Documents: {
                select: {
                  fileUrl: true,
                  originalFileName: true,
                  uploadStatus: true,
                  documentType: true,
                },
              },
            },
          },
          registeredBy: true,
        },
      });

      if (!team) {
        throw new Error("Invalid verification token or team not found.");
      }

      return {
        eventName: team.Event.name,
        collegeName: team.registeredBy.collegeName,
        members: team.TeamMembers.map((member) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          rollNumber: member.rollNumber,
          playerType: member.playerType as string,
          uploadStatus: member.Documents.some(
            (doc) => doc.uploadStatus === "UPLOADED"
          )
            ? "UPLOADED"
            : "NOT_UPLOADED",
          documents: team.Event.requiredDocuments.map((requiredDoc) => {
            const uploadedDoc = member.Documents.find(
              (doc) => doc.documentType === requiredDoc.documentType
            );
            return {
              documentType: requiredDoc.documentType,
              description: requiredDoc.description,
              fileUrl: uploadedDoc?.fileUrl ?? null,
              originalFileName: uploadedDoc?.originalFileName ?? null,
              uploadStatus: uploadedDoc?.uploadStatus ?? "NOT_UPLOADED",
            };
          }),
        })),
      };
    }),

  uploadDocument: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        fileName: z.string(),
        fileType: z.string(),
        documentType: z.nativeEnum(DocumentType), // Include documentType here
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { memberId, fileName, fileType, documentType } = input;

      const truncatedFileName =
        fileName.length > 20 ? `${fileName.slice(0, 17)}...` : fileName;
      const key = `documents/${uuidv4()}-${fileName}`;

      // Prepare the S3 upload command
      const command = new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
      });

      // Generate a signed URL for upload
      const signedUrl = await getSignedUrl(r2Client, command, {
        expiresIn: 3600, // 1 hour
      });

      // Store document metadata in the database
      const document = await ctx.db.document.create({
        data: {
          fileUrl: `${env.R2_PUBLIC_BUCKET}/${key}`,
          uploadStatus: "PENDING",
          teamMemberId: memberId,
          originalFileName: truncatedFileName,
          documentType: documentType, // Store the document type
        },
      });

      return {
        signedUrl,
        document,
      };
    }),

  updateDocumentStatus: publicProcedure
    .input(
      z.object({
        documentId: z.string(),
        status: z.enum(["UPLOADED", "REJECTED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentId, status } = input;

      const document = await ctx.db.document.update({
        where: { id: documentId },
        data: {
          uploadStatus: status,
          uploadedAt: status === "UPLOADED" ? new Date() : undefined,
        },
      });

      return document;
    }),

  getTeamMemberById: publicProcedure
    .input(z.object({ teamMemberId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { teamMemberId } = input;

      const teamMember = await ctx.db.teamMember.findUnique({
        where: { id: teamMemberId },
        include: {
          Documents: true,
          Team: {
            include: {
              Event: {
                include: {
                  requiredDocuments: true,
                },
              },
            },
          },
        },
      });

      if (!teamMember) {
        throw new Error("Team member not found.");
      }

      return {
        name: teamMember.name,
        documents: teamMember.Team.Event.requiredDocuments.map(
          (requiredDoc) => {
            const uploadedDoc = teamMember.Documents.find(
              (doc) => doc.documentType === requiredDoc.documentType
            );
            return {
              documentType: requiredDoc.documentType,
              description: requiredDoc.description,
              fileUrl: uploadedDoc?.fileUrl ?? null,
              originalFileName: uploadedDoc?.originalFileName ?? null,
              uploadStatus: uploadedDoc?.uploadStatus ?? "NOT_UPLOADED",
            };
          }
        ),
      };
    }),

  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        name: true,
        email: true,
        collegeName: true,
        rollNumber: true,
        phone: true,
        accomActive: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),

  getAccomodationTeams: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const teams = await ctx.db.team.findMany({
      where: {
        registeredById: userId,
        PaymentDetails: {
          paymentStatus: "PAID"
        },
        accommodationPaymentId: null,
      },
      include: {
        Event: {
          select: {
            category: true,
            name: true,
          },
        },
        AccommodationDetails: true,
        _count: {
          select: {
            TeamMembers: true,
          }
        },
      },
    });

    return teams;

  }),

  saveAccommodationDetails: protectedProcedure.input(
    z.object({
      teamId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      maleCount: z.number(),
      femaleCount: z.number(),
      isUpdate: z.boolean().optional(),
      accomId: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {

      const { teamId, startDate, endDate, maleCount, femaleCount, isUpdate } = input;

      if (isUpdate) {
        return await ctx.db.accommodationDetails.update({
          where: {
            id: input.accomId,
          },
          data: {
            startDate,
            endDate,
            maleCount,
            femaleCount,
          },
        });
      }

      const accom = await ctx.db.accommodationDetails.create({
        data: {
          teamId,
          startDate,
          endDate,
          maleCount,
          femaleCount,
        },
      });

      return await ctx.db.team.update({
        where: {
          id: teamId,
        },
        data: {
          AccommodationDetails: {
            connect: {
              id: accom.id,
            },
          },
        },
      });
    }),

  accommodationCheckout: protectedProcedure.input(
    z.object({
      teamIds: z.array(z.string()),
      accomDetailsIds: z.array(z.string()),
      amount: z.number(),
      transactionId: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const { teamIds, accomDetailsIds, amount, transactionId } = input;
    const accomPayment = await ctx.db.accommodationPayment.create({
      data: {
        amount,
        paymentProofUrl: transactionId,
      },
    });

    await ctx.db.team.updateMany({
      where: {
        id: {
          in: teamIds,
        },
      },
      data: {
        accommodationPaymentId: accomPayment.id,
      },
    });

    await ctx.db.accommodationDetails.updateMany({
      where: {
        id: {
          in: accomDetailsIds,
        },
      },
      data: {
        accommodationPaymentId: accomPayment.id,
      },
    });

    return accomPayment;
  }),

  getSportFixtures: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.$transaction([
      ctx.db.multiPlayerEventData.findMany(),
      ctx.db.singlePlayerEventData.findMany()
    ]);

    const [multiPlayerEvents, singlePlayerEvents] = events;

    const matchData: MatchData = {};

    multiPlayerEvents.forEach(event => {
      const eventName = event.eventName;
      if (eventName.toLowerCase().includes("final")) {
        if (!matchData[eventName]) {
          matchData[eventName] = [];
        }
        (matchData[eventName] as MultiPlayerEvent[]).push({
          team1: event.team1,
          team2: event.team2,
          score1: event.score1,
          score2: event.score2,
          win: event.win,
          location: event.location,
          time: event.time
        });
      }
    });

    singlePlayerEvents.forEach(event => {
      const eventName = event.eventName;
      if (!matchData[eventName]) {
        matchData[eventName] = [];
      }
      (matchData[eventName] as SinglePlayerEvent[]).push({
        time: event.time,
        gold: event.gold,
        silver: event.silver,
        bronze: event.bronze,
        name: event.name
      });
    });

    return matchData;
  }),

});
