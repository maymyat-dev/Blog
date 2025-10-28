import React from "react";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";
import { auth } from "@/server/auth";

export default async function AppNav() {
  const session = await auth();

  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <NavLogo />
      <UserButton user={session?.user} />
    </header>
  );
}
