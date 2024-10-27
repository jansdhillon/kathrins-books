"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  })
  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold">An error occurred</h1>
      <p>There was an error processing your order. Please try again later.</p>
      <p>You will be redirected in 3 seconds...</p>
    </div>
  );
}
