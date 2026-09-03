"use client";

import Navbar from "@/components/Navbar";
import MemoryLayoutSidebar from "@/components/MemoryLayoutSidebar";
import type { ReactNode } from "react";

export function TerminalShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen font-mono text-[#e8dcc8] bg-[#12100a]">
      <Navbar />
      <MemoryLayoutSidebar />
      <main className="pt-16 pb-12 px-4 sm:px-6 xl:pl-28 w-full max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
