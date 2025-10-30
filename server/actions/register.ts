"use server";

import { actionClient } from "@/server/actions/safe-action";
import { registerSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";


export const register = actionClient
    .inputSchema(registerSchema)
    .action(async ({ parsedInput: { username, email, password } }) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        if (existingUser) {
            if (!existingUser.emailVerified) {
                // Optionally, you could resend verification email here

                return { success: "Please verify your email to complete registration." }
            }
            return { error: "User with this email already exists" }
        }


        return {
            success: "Email verification sent. Please check your inbox."
            
        }
    })