import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { env } from "~/env";
import { db } from "~/server/db";

const prisma = new PrismaClient();

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      collegeName?: string | null;
      rollNumber?: string | null;
      phone?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    collegeName?: string | null;
    rollNumber?: string | null;
    phone?: string | null;
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    collegeName?: string | null;
    rollNumber?: string | null;
    phone?: string | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        // Find user by email and include the additional fields
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            collegeName: true,
            rollNumber: true,
            phone: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("No user found with the given email");
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return the user object, omitting the password field
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          collegeName: user.collegeName,
          rollNumber: user.rollNumber,
          phone: user.phone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name as string | null;
        token.email = user.email as string | null;
        token.collegeName = user.collegeName as string | null;
        token.rollNumber = user.rollNumber as string | null;
        token.phone = user.phone as string | null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string | null,
        email: token.email as string | null,
        collegeName: token.collegeName as string | null,
        rollNumber: token.rollNumber as string | null,
        phone: token.phone as string | null,
      };
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
