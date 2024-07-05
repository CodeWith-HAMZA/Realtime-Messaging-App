"use client";
import { loginUser } from "@/app/actions/user.action";
import { useUser } from "@/app/context/UserProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeCookie, setCookie, setLocalStorageItem } from "@/lib/utils";
import UserService from "@/services/userServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const Login = () => {
  const user = useUser();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData);
    // Perform login logic with email and password

    const userServices = new UserService(cookies["Authorization"]);
    let email, name;
    setLoading(true);
    try {
      const data = await userServices.login(
        formData.get("email")?.toString(),
        formData.get("password")?.toString()
      );
      console.log(data.token);

      user.login(data.user.name, data.user.email, data?.token as string);
      setLoading(false);
      setLocalStorageItem("user", data);
    } catch (error) {
    } finally {
      setLoading(false  );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid place-items-center py-12 lg:py-24">
        <div className="flex flex-col gap-4 w-full max-w-[400px] px-4">
          <div className="flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <div className="text-center">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email below to login to your account
              </p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" required type="password" />
            </div>
            <Button disabled={Loading} className="w-full">
              Login
            </Button>
            <Button className="w-full" variant="outline">
              Login with Google
            </Button>
          </form>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="underline" href="/auth/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
