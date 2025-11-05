"use client";
import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/types/register-schema";
import Link from "next/link";

import { useAction } from "next-safe-action/hooks";
import { register } from "@/server/actions/register";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function RegisterPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { execute, status, result } = useAction(register, {
    onSuccess({data}) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error)
      }
      if (data?.success) {
        toast.success(data.success, {
        action: {
          label: "Open Mail",
          onClick: () => window.open("https://mail.google.com", "_blank"),
        }
      });
      }
    },
  });
  function onSubmit(values: z.infer<typeof registerSchema>) {
    const { username, email, password } = values;
    execute({ username, email, password });
    
  }

  return (
   
      <AuthForm
        formTitle="Create a new account"
        showProvider={true}
        footerLabel="Already have an account? Login"
        footerHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your username" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"link"} className="ml-auto p-0">
              <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
            </Button>

          <Button className={cn("w-full", status === "executing" && "animate-pulse")} type="submit">Register</Button>
          </form>
        </Form>
      </AuthForm>
  );
}

export default RegisterPage;
