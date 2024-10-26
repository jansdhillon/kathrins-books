"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({ href, children, onClick = () => {} }: any) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`text-sm font-semibold hover:text-primary/90 hover:underline hover:underline-offset-4  transition-colors ${
          isActive ? "text-primary underline underline-offset-4" : "text-muted-foreground"
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  };
