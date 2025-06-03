"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { RegisterAccount } from "@/server/actions/register";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/types/register-schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminRegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<z.infer<typeof RegisterSchema>>({
    email: "",
    password: "",
    firstName: "",
    location: "",
    lastName: "",
    role: "admin",
    skillLevel: "Buyer",
    confirmPassword: "",
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: formData,
  });

  const { execute, status } = useAction(RegisterAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        toast.error(data.data.error);
      } else if (data.data?.success) {
        toast.success(data.data?.success);
        router.push("/admin/login");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute({ ...values, role: "admin" });
  };

  return (
    <div className="w-full p-8 flex min-h-screen flex-col ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Admin Registration</h1>
      </div>

      <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
        <div>
          <h3 className="text-3xl font-bold">Register as Admin</h3>
          <p className="text-sm mt-3">
            👋 Create your admin account
          </p>
          <div className="mt-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Buyer">Buyer</SelectItem>
                          <SelectItem value="Seller">Seller</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                          <SelectItem value="Master">Master</SelectItem>
                        </SelectContent>
                      </Select>
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Confirm password" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={status === "executing"}>
                  {status === "executing" ? "Registering..." : "Register as Admin"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-6">
        Already have an admin account?{" "}
        <Link href="/admin/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
      <p className="text-center text-sm mt-6">
        Want to register as a regular user?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register Here
        </Link>
      </p>
    </div>
  );
} 