"use server";

import crypto from "crypto";

import { eq } from "drizzle-orm";
import { db } from "..";

import { emailVerificationToken } from "../schema";

const checkEmailVerificationToken = async (email: string) => {
  try {
    const token = await db.query.emailVerificationToken.findFirst({
      where: eq(emailVerificationToken.email, email),
    });
    return token;
  } catch (error) {
    console.error("Error checking email verification token:", error);
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 15);
    new Date(expires).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });

  const existingToken = await checkEmailVerificationToken(email);

  if (existingToken) {
    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.email, email));
  }

    const newToken = await db.insert(emailVerificationToken).values({
        email,
        token,
        expires,
    }).returning();
    
    return newToken;
};
