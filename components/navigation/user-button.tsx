"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

interface UserButtonProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  expires?: string;
}

export default function UserButton({ user }: UserButtonProps) {
  return (
      <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700 transition">
            {user?.email}
          </span>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 ">
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User Avatar"}
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-semibold text-gray-600">
              Account
            </DropdownMenuLabel>
            <p className="px-2 text-sm text-gray-500 truncate">{user.email}</p>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">Team</DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="destructive"
                className="w-full text-center cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          asChild
          className="px-4 py-2 cursor-pointer"
        >
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      )}
    </div>
  );
}
