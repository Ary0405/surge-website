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
        userId: z.string(),
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, eventId } = input;

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
        teamId: z.string(),
        paymentProofUrl: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { teamId, paymentProofUrl, amount } = input;

      return await ctx.db.paymentDetails.create({
        data: {
          teamId,
          paymentProofUrl,
          amount,
        },
      });
    }),
});
