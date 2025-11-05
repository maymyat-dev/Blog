"use server";

import { actionClient } from "@/server/actions/safe-action";
import { registerSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "..";
import { user } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./email";

export const register = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput: { username, email, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const newToken = await generateEmailVerificationToken(email);

        await sendEmail(
          newToken[0].email,
          newToken[0].token,
          username.slice(0, 5)
        );

        return {
          success:
            "Email verification link has been resent. Please check your inbox.",
        };
      }

      return { error: "User with this email already exists" };
    }

    await db.insert(user).values({
      name: username,
      email,
      password: hashedPassword,
    });

    const newToken = await generateEmailVerificationToken(email);
    await sendEmail(newToken[0].email, newToken[0].token, username.slice(0, 5));

    return {
      success: "Email verification sent. Please check your inbox.",
    };
  });
