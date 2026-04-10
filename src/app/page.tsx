"use client";

import Link from "next/link";
import SystemOverview from "@/components/SystemOverview";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative z-10 px-4 md:px-8 py-14 md:py-20 max-w-6xl mx-auto text-center">
        <h1 className="text-synth-magenta text-glow-magenta text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          C://CLUB
        </h1>
        <p className="text-terminal-dim text-base md:text-lg max-w-xl mx-auto mb-8">
          Compile. Link. Execute.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="glitch-hover bg-synth-magenta/10 border border-synth-magenta/40 text-synth-magenta px-6 py-3 text-sm font-semibold rounded hover:bg-synth-magenta/20 hover:border-synth-magenta transition-all"
          >
            $ ./JOIN_CLUB
          </Link>
          <a
            href="#overview"
            className="glitch-hover border border-terminal-border text-terminal-dim px-6 py-3 text-sm rounded hover:border-terminal-dim hover:text-white transition-all"
          >
            &gt; READ_MORE
          </a>
        </div>
      </section>

      {/* System Overview */}
      <SystemOverview />

      {/* Contact Footer */}
      <Contact />
    </>
  );
}
