"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import SystemOverview from "@/components/SystemOverview";
import EventGrid from "@/components/EventGrid";
import RegistrationForm from "@/components/RegistrationForm";
import Members from "@/components/Members";
import Contact from "@/components/Contact";

// Dynamically import BinaryRain to avoid SSR issues with canvas
const BinaryRain = dynamic(() => import("@/components/BinaryRain"), {
  ssr: false,
});

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      {/* Boot Sequence Gate */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* Binary Rain Background */}
      <BinaryRain />

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        <main className="pt-14">
          {/* Hero */}
          <section className="relative z-10 px-4 md:px-8 py-14 md:py-20 max-w-6xl mx-auto text-center">
            <h1 className="text-terminal-green text-glow text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              C://CLUB
            </h1>
            <p className="text-terminal-dim text-base md:text-lg max-w-xl mx-auto mb-8">
              Compile. Link. Execute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#register"
                className="glitch-hover bg-terminal-green/10 border border-terminal-green/40 text-terminal-green px-6 py-3 text-sm font-semibold rounded hover:bg-terminal-green/20 hover:border-terminal-green transition-all"
              >
                $ ./JOIN_CLUB
              </a>
              <a
                href="#overview"
                className="glitch-hover border border-terminal-border text-terminal-dim px-6 py-3 text-sm rounded hover:border-terminal-dim hover:text-white transition-all"
              >
                &gt; READ_MORE
              </a>
            </div>
          </section>

          {/* Sections */}
          <SystemOverview />
          <EventGrid />
          <RegistrationForm />
          <Members />
        </main>

        <Contact />
      </div>
    </>
  );
}
