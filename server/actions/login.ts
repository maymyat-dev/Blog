"use server";

import { actionClient } from "@/server/actions/safe-action";
import { loginSchema } from "@/types/login-schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { user } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const login = actionClient
    .inputSchema(loginSchema)
    .action(async ({ parsedInput: { email, password}}) => {
        try {
            const existingUser = await db.query.user.findFirst({
                where: eq(user.email, email)
               
            });

            if (existingUser?.email !== email) {
                return { error: "Please provide valid credentials"}
            }

            if (!existingUser.emailVerified) {
                const verificationToken = await generateEmailVerificationToken(existingUser.email);
                await sendEmail(
                    verificationToken[0].email,
                    verificationToken[0].token,
                    existingUser.name!.slice(0, 5)
                )
                return { success: "Email verification resent."}

            }

            await signIn("credentials", { email, password, redirectTo: "/" })
            
            return { success: "Login successful"}
       }
        catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Please provide valid credentials" }
                    case "OAuthSignInError":
                        return { error: error.message}
                }
            }
            throw error
       }
    });