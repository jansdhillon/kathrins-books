"use client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { useRef } from "react";
import { contactFormAction } from "../actions/contact-form-action";
import { Mail } from "lucide-react";

export default function ContactPage({
  searchParams,
}: {
  searchParams: Message;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formRef?.current?.reset();
    await contactFormAction(formData);
  };
  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-lg text-muted-foreground font-medium">
        {" "}
        Get in touch with Kathrin for any inquiries, requests, and feedback.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            required
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            className="w-fit"
            pendingText="Sending..."
          >
            Send Message
          </SubmitButton>
        </div>
      </form>
      <h1 className="text-xl font-bold text-left">Support Email</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4  font-medium text-muted-foreground" />
            <p className="text-muted-foreground font-medium">Email: </p>
            <p>kathrinsbookshelp@gmail.com</p>
          </div>
        </div>{" "}
        <Separator />
      </div>
    </div>
  );
}
