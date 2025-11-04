import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  userFirstName: string;
  confirmLink: string;
}

export const EmailTemplate = ({ userFirstName, confirmLink }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email to join the Blog App community ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: "center" }}>
          <img
                  src="https://www.shutterstock.com/image-vector/vector-hand-painted-watercolor-blog-600nw-339532466.jpg"
                  alt="Logo"
                  className="w-full object-cover rounded-md mb-4"
                />
          <Text style={heading}>Welcome to Blog App!</Text>
        </Section>

        <Text style={paragraph}>
          Hi <strong>{userFirstName}</strong>,
        </Text>

        <Text style={paragraph}>
          Thank you for signing up. Please confirm your email address to activate your account
          and start exploring insightful articles and stories from our community.
        </Text>

        <Section style={btnContainer}>
          <Button href={confirmLink} style={button} className="bg-primary">
            Confirm Your Email
          </Button>
        </Section>

        <Text style={paragraph}>
          If you didn’t create an account, you can safely ignore this email.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          © {new Date().getFullYear()} Blog App. All rights reserved.<br />
          Made with ❤️ by Blog App Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;


const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  color: "#111827",
  margin: 0,
  padding: "32px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  margin: "0 auto",
  maxWidth: "480px",
  padding: "32px",
};

const logo = {
  margin: "0 auto 16px",
};

const heading = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#1f2937",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "24px",
  margin: "16px 0",
  color: "#374151",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#5ea500",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  padding: "14px 28px",
  textDecoration: "none",
  display: "inline-block",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#9ca3af",
  textAlign: "center" as const,
};
