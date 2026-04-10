"use client";

import dynamic from "next/dynamic";
import { BootProvider, useBootContext } from "@/context/BootContext";
import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

function ShellContent({ children }: { children: ReactNode }) {
  const { booted } = useBootContext();

  return (
    <>
      {/* Boot Sequence Gate */}
      <BootSequence />

      {/* 3D Particle Sphere Background */}
      <ParticleBackground />

      {/* Main Content — fades in after boot */}
      <div
        className={`transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />

        <main className="pt-14 min-h-[calc(100vh-200px)]">
          {children}
        </main>
      </div>
    </>
  );
}

export function TerminalShell({ children }: { children: ReactNode }) {
  return (
    <BootProvider>
      <ShellContent>{children}</ShellContent>
    </BootProvider>
  );
}
