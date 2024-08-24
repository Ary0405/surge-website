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
      },
      include: {
        Event: true, // Include event details
        PaymentDetails: true, // Include payment details
        TeamMembers: true, // Include team members
      },
    });

    return teams;
  }),
});
