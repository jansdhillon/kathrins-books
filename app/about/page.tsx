"use client";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6 container mx-auto">
      <h1 className="text-2xl font-bold text-left">About Kathrin's Books</h1>
      <Separator />

      <p className="font-medium md:max-w-[50%]">
        Kathrin is a passionate book lover and curator who believes in the
        transformative power of literature. With over a decade of experience as
        a book collector, she has a keen eye for hidden gems and timeless
        classics.
      </p>
      <p className="font-medium md:max-w-[50%]">
        Her mission is to connect readers with books that inspire, educate, and
        entertain. Every book in Kathrin's collection is handpicked, ensuring
        quality and diversity across genres.
      </p>
    </div>
  );
}
