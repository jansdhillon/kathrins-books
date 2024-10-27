import Link from "next/link";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs py-4 gap-2 md:gap-4 text-primary font-semibold">
      <p>2024 Kathrin's Books</p>
      <Separator orientation="vertical" className=" h-4" />
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Separator orientation="vertical" className="h-4" />
      <Link href="/terms-of-service">Terms of Service</Link>
    </footer>
  );
};
