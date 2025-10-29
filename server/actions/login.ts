"use server";

import { actionClient } from "@/server/actions/safe-action";
import { loginSchema } from "@/types/login-schema";

export const login = actionClient
    .inputSchema(loginSchema)
    .action(async ({ parsedInput: { email, password}}) => {
        return {
            success: { email, password }
        }
    });