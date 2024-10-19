import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { env } from "~/env";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    collegeName?: string | null;
    rollNumber?: string | null;
    phone?: string | null;
    emailVerified?: Date | null;
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    collegeName?: string | null;
    rollNumber?: string | null;
    phone?: string | null;
    emailVerified?: Date | null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            emailVerified: true,
            collegeName: true,
            rollNumber: true,
            phone: true,
          },
        });

        if (!user?.password) {
          throw new Error("No user found with the given email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Allow signing in even if the email is not verified
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          collegeName: user.collegeName,
          rollNumber: user.rollNumber,
          phone: user.phone,
          emailVerified: user.emailVerified,
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
        token.name = user.name;
        token.email = user.email;
        token.collegeName = user.collegeName;
        token.rollNumber = user.rollNumber;
        token.phone = user.phone;
        token.emailVerified = user.emailVerified;
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
        emailVerified: token.emailVerified as Date | null,
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
