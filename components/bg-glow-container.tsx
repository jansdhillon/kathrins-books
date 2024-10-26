import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const BgGlowContainer = ({
  children,
  className
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <div className="relative m-0">
      <div
        className={cn(className, `z-0 absolute h-full w-full bg-secondary dark:bg-accent/40 `)}
      ></div>
      <div className="relative z-10 py-16 ">{children}</div>
    </div>
  );
};

export default BgGlowContainer;
