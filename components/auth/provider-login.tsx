"use client";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function ProviderLogin() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        variant="outline"
        className="flex items-center justify-center gap-2 hover:bg-gray-100 transition"
      >
        <FcGoogle className="text-lg" /> Continue with Google
      </Button>
      <Button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        variant="outline"
        className="flex items-center justify-center gap-2 hover:bg-gray-100 transition"
      >
        <FaGithub className="text-lg" /> Continue with GitHub
      </Button>
    </div>
  );
}

export default ProviderLogin;
