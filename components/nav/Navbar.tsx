"use client";

import { BellRing, Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Session } from "next-auth";
import SignInButton from "../SignInButton";
import SignOutButton from "../SignOutButton";

interface NavbarProps {
  session?: Session;
}

const Navbar: FC<NavbarProps> = ({ session }) => {
  console.log(session);
  return (
    <div className="w-full fixed top-0 z-10 shadow-sm border-b-[1px] px-4 md:px-2 lg:px-0 bg-[hsl(var(--card))] h-16 flex items-center">
      <div className="container py-4 flex items-center justify-between max-w-6xl mx-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center space-x-2 border rounded-lg px-2 py-1">
              <Image
                src={session?.user?.image ?? "/logo.png"}
                width={32}
                height={32}
                className="h-8 w-8 cursor-pointer rounded-md"
                alt="logo"
              />
              <span className="text-lg font-semibold">
                {session?.user?.name ?? "Guest"}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>
              {session?.user ? (
                <SignOutButton>sign out</SignOutButton>
              ) : (
                <SignInButton>sign in</SignInButton>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Image
          src="/logo.png"
          width={150}
          height={150}
          className="h-9 w-auto cursor-pointer hidden md:inline"
          alt="logo"
          style={{
            filter: "invert(1)",
            // zoom in
            transform: "scale(3)",
          }}
        /> */}
        {/* <div className="items-center space-x-2 flex">
          <label htmlFor="search" className="flex-1 hidden md:inline">
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className=""
              autoComplete="off"
            />
          </label>
          <Link href="/write">
            <Plus className="h-10 w-10 transition p-2 rounded-lg" />
          </Link>
          <BellRing className="h-10 w-10 transition p-2 rounded-lg" />

        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
