"use client";
import { signInAction } from "@/app/actions/sign-in";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const serachParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const code = serachParams.get("code");
    if (code) {
      router.push(`/auth/callback?${encodeURIComponent(code)}`);
    }
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold text-left">Sign In</h1>

      <p className="text-lg text-muted-foreground font-medium">
        Don't have an account?{" "}
        <Link className="text-foreground font-semibold underline" href="/sign-up">
          Sign Up
        </Link>
      </p>
      <form className="flex-1 flex flex-col text-base">
        <div className="flex flex-col gap-2 [&>input]:mb-3 ">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-sm text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign In
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
