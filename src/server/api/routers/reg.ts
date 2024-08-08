import { PaymentStatus } from "@prisma/client";
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
