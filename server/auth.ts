import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "@/server";
import { ZodError } from "zod";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { user } from "./schema";
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: false,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: false,
    }),
    Credentials({
      authorize: async (credentials) => {
      
          const validatedData = loginSchema.safeParse(credentials);

          if (validatedData.success) {
            const { email, password } = validatedData.data;

            const User = await db.query.user.findFirst({
              where: eq(user.email, email),
            });

            if (!User || !password) return null;

            const isMatch = await bcrypt.compare(password, User.password)

            if (isMatch) return User;

          
        }
        return null
      }
    })
  ],
});
