// components/sections/Navbar.tsx
'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";


export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full pl-50 pr-50 flex justify-between mt-5  items-center  z-50">
      <div className="font-bold text-lg">Bill Mate</div>
      <div className="flex gap-4 ">
          <div className="flex items-center justify-center">
            <AnimatedThemeToggler />
          </div>
          <Button>
            <Link href="sign-in">
              Sign In
            </Link>
          </Button>
          <Button>
            <Link href="sign-up">
              Sign Up
            </Link>
          </Button>
      </div>
    </nav>
  );
}
