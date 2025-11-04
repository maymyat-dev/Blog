"use server";
import { Resend } from "resend";
import { getBaseUrl } from "@/lib/get-baseUrl";
import EmailTemplate from "@/components/email-template";


const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
export const sendEmail = async (
  email: string,
  token: string,
  userFirstName: string
) => {
  const confirmLink = `${getBaseUrl()}/confirm-email?token=${token}&email=${email}`;

  const { data, error } = await resend.emails.send({
    from: "My Blog <onboarding@resend.dev>",
    to: ["" + email],
    subject: "Account Email Confirmation - Blog App",
    react: EmailTemplate({ userFirstName, confirmLink }),
  });

  if (error) {
    console.error("Error sending email:", error);
  }
};
