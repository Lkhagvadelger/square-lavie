import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { prisma } from "@api/prisma";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(4).max(12),
});
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials, req) => {
        const creds = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: { email: creds.username },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(
          user.passwordDigest!,
          creds.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user = token;
      }

      //customize return object
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 3 * 30 * 60, // 3 hours
  },
  pages: {
    signIn: "/auth/login",
  },
};
