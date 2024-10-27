"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/app/actions/sign-out";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { User } from "@supabase/supabase-js";

export const NavAvatar = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4">
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"sm"}>
                <Avatar className="hover:cursor-pointer h-5 w-5">
                  <CircleUserRound className="h-5 w-5 stroke-muted-foreground" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {user ? "Your Account" : "Sign In / Sign Up"}
          </TooltipContent>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <div className="line-clamp-1 relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none font-medium">
                Hello,{" "}
                <span className="ml-1 font-semibold">
                  {user?.user_metadata?.full_name?.split(" ")[0] ||
                    user?.user_metadata?.display_name?.split(" ")[0] ||
                    user?.user_metadata?.fullName?.split(" ")[0]
                  }
                </span>
                !
              </div>
              <DropdownMenuSeparator />

              {user?.user_metadata?.is_admin === true && (
                <Link href="/admin" className="font-medium">
                  <DropdownMenuItem className="cursor-pointer">
                    Admin
                  </DropdownMenuItem>
                </Link>
              )}

              <Link href="/orders" className="cursor-pointer font-medium">
                <DropdownMenuItem className="cursor-pointer">
                  Your Orders
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="block w-full cursor-pointer font-medium"
                >
                  <DropdownMenuItem className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
      <Link href="/cart">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <ShoppingCart className="h-4 text-muted-foreground fill-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Your Cart</TooltipContent>
        </Tooltip>
      </Link>
    </div>
  );
};
