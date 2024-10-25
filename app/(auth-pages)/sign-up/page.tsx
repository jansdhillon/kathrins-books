import { signUpAction } from "@/app/actions/sign-up";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <h1 className="text-2xl font-bold text-left">Sign Up</h1>
      <Separator />
      <p className="text-lg text-muted-foreground">
        Already have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>

      <form className="flex-1 flex flex-col text-base text-primary">
        <div className="flex flex-col gap-2 [&>input]:mb-3 ">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="firstname">First Name</Label>
          <Input name="firstname" placeholder="Your first name" required />
          <Label htmlFor="lastname">Last Name</Label>
          <Input name="lastname" placeholder="Your last name" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />

          <SubmitButton formAction={signUpAction} pendingText="Signing Up...">
            Sign Up
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
