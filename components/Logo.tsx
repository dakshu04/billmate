"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src="https://www.svgrepo.com/show/488064/bill.svg" alt="" width="25" height="25"/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Bill Mate
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src="https://www.svgrepo.com/show/488064/bill.svg" alt="" className="w-6 h-6"/>
    </Link>
  );
};