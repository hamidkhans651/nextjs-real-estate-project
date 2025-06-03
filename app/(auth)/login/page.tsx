"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { LoginAccount } from "@/server/actions/login";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/types/login-schema";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: formData,
  });

  const { execute } = useAction(LoginAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        toast.error(data.data.error);
      } else if (data.data?.success) {
        toast.success(data.data?.success);
        router.push("/dashboard");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values);
  };

  return (
    <div className="w-full p-8 flex min-h-screen flex-col ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
      </div>

      <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
        <div>
          <h3 className="text-3xl font-bold">Welcome Back</h3>
          <p className="text-sm mt-3">
            👋 Login to your account
          </p>
          <div className="mt-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter email" type="email" />
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
                        <Input {...field} placeholder="Enter password" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 mt-6">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register Here
          </Link>
        </p>
        <p className="text-sm">
          Are you an admin?{" "}
          <Link href="/admin/login" className="text-blue-600 hover:underline">
            Login to Admin Panel
          </Link>
        </p>
        <p className="text-sm">
          Want to register as an admin?{" "}
          <Link href="/admin/register" className="text-blue-600 hover:underline">
            Register as Admin
          </Link>
        </p>
      </div>
    </div>
  );
}
