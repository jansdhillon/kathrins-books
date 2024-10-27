"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/utils/hooks/use-toast";
import { ReactNode, useEffect } from "react";

const Feedback = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const successDescription = searchParams.get("message");
  const status = searchParams.get("status");
  const statusDescription = searchParams.get("status_description");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    let shouldCleanUrl = false;

    if (status) {
      toast({
        variant: "default",
        title: status,
        description: statusDescription || "",
      });
      shouldCleanUrl = true;
    }

    if (error) {
      toast({
        variant: "destructive",
        title: error,
        description: errorDescription || "",
      });
      shouldCleanUrl = true;
    }

    if (success) {
      toast({
        variant: "success",
        title: success,
        description: successDescription || "",
      });
      shouldCleanUrl = true;
    }

    if (shouldCleanUrl) {
      const params = new URLSearchParams(window.location.search);
      params.delete("status");
      params.delete("status_description");
      params.delete("error");
      params.delete("error_description");
      params.delete("success");
      params.delete("message");

      const newQueryString = params.toString();
      router.replace(
        `${window.location.pathname}${newQueryString ? `?${newQueryString}` : ""}`
      );
    }
  }, [status, statusDescription, error, errorDescription, toast, router]);

  return <>{children}</>;
};

export default Feedback;
