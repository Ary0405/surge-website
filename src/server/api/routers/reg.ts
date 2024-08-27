import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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

      const existingTeam = await ctx.db.team.findFirst({
        where: {
          registeredById: userId,
          eventId: eventId,
        },
      });

      if (existingTeam) {
        throw new Error("User is already registered for the event");
      }

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
      const updatedTeams = await ctx.db.team.updateMany({
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

      const existingTeam = await ctx.db.team.findFirst({
        where: {
          registeredById: userId,
          eventId: eventId,
        },
      });

      if (existingTeam) {
        throw new Error("User is already registered for the event");
      }

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
      },
    });

    return myEvents;
  }),
});
