"use client";

import { confirmEmailWithToken } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthForm from "./auth-form";
import { cn } from "@/lib/utils";

function ConfirmEmail() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const handleConfirmEmail = useCallback(() => {
    if (!token) {
      setError("Invalid token");
      setLoading(false);
      return;
    }
    setLoading(true);
    confirmEmailWithToken(token).then((res) => {
      if (res.success) {
        setSuccess(res.success);
        setTimeout(() => {
    router.push("/auth/login"); 
  }, 2000);
      }
      if (res.error) {
        setError(res.error);
      }
    })
    .finally(() => { 
        setLoading(false);
      });
  }, [token, router]);

  useEffect(() => {
    handleConfirmEmail();
  }, []);
  return (
    <AuthForm
      formTitle="Confirm Title"
      footerLabel="Login to your account"
      footerHref="/auth/login"
      showProvider={false}
    >
      <p
        className={cn(
          "text-center font-bold text-xl text-primary",
          error && "text-red-600"
        )}
      >
        {!success && !error ? "Confirming Email" : success ? success : error}
      </p>
    </AuthForm>
  );
}

export default ConfirmEmail;
