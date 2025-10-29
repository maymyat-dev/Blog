"use server";

import { actionClient } from "@/server/actions/safe-action";
import { registerSchema } from "@/types/register-schema";


export const register = actionClient
    .inputSchema(registerSchema)
    .action(async ({ parsedInput: { username, email, password } }) => {
        return {
            success: { username, email, password }
            
        }
    })