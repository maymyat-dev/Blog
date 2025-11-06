"use server";

import crypto from "crypto";

import { eq } from "drizzle-orm";
import { db } from "..";

import { emailVerificationToken, user } from "../schema";

const checkEmailVerificationToken = async (email: string | null, token?: string) => {
  try {
    let verificationToken : {
      email: string;
      token: string;
      expires: Date;
  } | undefined;
    if (email) {
      verificationToken = await db.query.emailVerificationToken.findFirst({
      where: eq(emailVerificationToken.email, email!),
      });
      
    }

    if (token) {
      verificationToken = await db.query.emailVerificationToken.findFirst({
        where: eq(emailVerificationToken.token, token),
      });
    }
    return verificationToken;
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

export const confirmEmailWithToken = async (token: string) => {
  const existingToken = await checkEmailVerificationToken(null, token);

  if(!existingToken) return {
    error: "Invalid Token"
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, existingToken.email)
  })

  if (!existingUser) return {
    error: "User not Found with this email"
  }

  await db.update(user).set({
  emailVerified: new Date(),
})
  .where(eq(user.id, existingUser.id));
  
  await db.delete(emailVerificationToken).where(eq(emailVerificationToken.email, existingToken.email));
  


  return { success: "Email Verified"}
}