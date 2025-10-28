import AuthForm from "@/components/auth/auth-form";
import React from "react";

function LoginPage() {
  return (
    <div className="md:w-1/3 mx-auto">
      <AuthForm
        formTitle="Login to your account"
        showProvider={true}
        footerHref="/auth/register"
        footerLabel="Don't have an account? Sign up"
      >
        <h2>Login Form</h2>
      </AuthForm>
    </div>
  );
}

export default LoginPage;
