"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} className="h-full">
        <SidebarBody className="flex flex-col justify-between gap-10 h-full">
          <div className="flex flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img src="" className="h-7 w-7 shrink-0 rounded-full" width={50} height={50} alt="Avatar" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Dashboard Content */}
      <div className="flex flex-1 p-6 md:p-10">
        <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="grid grid-cols-2 gap-4">
            {[...new Array(4)].map((_, idx) => (
              <div key={idx} className="h-32 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 flex-1">
            {[...new Array(2)].map((_, idx) => (
              <div key={idx} className="h-64 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
    <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
      Bill Mate
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a href="#" className="flex items-center py-1">
    <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);
