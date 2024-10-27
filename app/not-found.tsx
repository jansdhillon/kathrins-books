"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  })
  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Page not found.</h1>
      <p>You will be redirected in 3 seconds...</p>
    </div>
  );
}
