// components/sections/Home.tsx
'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export function Home() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Dot Pattern */}
       <DotPattern
        className={cn(
          "absolute inset-0 -z-10",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Heading */}
      <TextGenerateEffect words="Bill Mate" />

      {/* Subtitle */}
      <div className="mt-4 max-w-3xl">
        <TextGenerateEffect words="Your billing buddy — Generate professional invoices instantly and send them via WhatsApp. Simple, fast, and stress-free." />
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Link href="/sign-up">
          <Button className="text-lg flex items-center gap-2" variant="outline">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
