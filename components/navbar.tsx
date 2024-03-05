"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="w-full h-[50px] flex items-center justify-between border-b shadow-md px-8 p-4">
      <div className="flex-1">
        <Link href="/">
          <h1 className="text-xl font-bold">RemindMe</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
