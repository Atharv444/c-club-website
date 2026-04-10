"use client";

import AsciiHero from "@/components/AsciiHero";
import SystemOverview from "@/components/SystemOverview";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Animated ASCII Art Hero */}
      <AsciiHero />

      {/* System Overview */}
      <SystemOverview />

      {/* Contact Footer */}
      <Contact />
    </>
  );
}
