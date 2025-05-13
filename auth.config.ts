import type { NextAuthConfig } from "next-auth";
import { compareSync } from "bcrypt-ts";
import { LoginSchema } from "@/lib/zod";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const pwMatch = compareSync(password, user.password);
        if (!pwMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
