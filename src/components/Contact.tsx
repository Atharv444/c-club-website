"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const [lat, setLat] = useState(12.9716);
  const [lon, setLon] = useState(77.5946);

  useEffect(() => {
    const interval = setInterval(() => {
      setLat(12.9716 + (Math.random() * 0.0002 - 0.0001));
      setLon(77.5946 + (Math.random() * 0.0002 - 0.0001));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="relative z-10 mt-4 border-t border-terminal-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Transmission Header */}
          <div className="terminal-border rounded-lg p-6 md:p-8 bg-terminal-bg/80 backdrop-blur-sm relative overflow-hidden">
            {/* Scanline effect on this section */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,243,255,0.03) 2px, rgba(0,243,255,0.03) 4px)",
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse-glow" />
                <span className="text-terminal-green text-glow text-sm font-bold tracking-wider">
                  [ INCOMING TRANSMISSION ]
                </span>
              </div>

              <motion.h2 
                className="text-white text-xl md:text-2xl font-bold mb-6 inline-block p-3 rounded terminal-border bg-terminal-green/5"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(0, 243, 255, 0.1)",
                    "0 0 25px rgba(0, 243, 255, 0.4)",
                    "0 0 5px rgba(0, 243, 255, 0.1)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                SIGNAL: <span className="text-terminal-green">ACTIVE</span>
                <span className="animate-blink ml-2">█</span>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Email */}
                <div>
                  <span className="text-terminal-dim text-xs block mb-2">
                    &gt; EMAIL_CHANNEL
                  </span>
                  <a
                    href="mailto:contact@cclub.dev"
                    className="text-terminal-green hover:text-white transition-colors text-sm glitch-hover"
                  >
                    contact@cclub.dev
                  </a>
                </div>

                {/* Social */}
                <div>
                  <span className="text-terminal-dim text-xs block mb-2">
                    &gt; NETWORK_LINKS
                  </span>
                  <div className="space-y-1">
                    {[
                      { label: "GitHub", url: "#" },
                      { label: "Discord", url: "#" },
                      { label: "LinkedIn", url: "#" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        className="block text-terminal-dim hover:text-terminal-green transition-colors text-sm glitch-hover"
                      >
                        [{link.label}]
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col h-full">
                  <span className="text-terminal-dim text-xs block mb-2">
                    &gt; COORDINATES
                  </span>
                  <div className="text-synth-cyan/70 font-mono text-sm leading-relaxed flex flex-col flex-1">
                    <span>DSATM CS Department</span>
                    <div className="w-full text-left text-terminal-dim mt-auto pt-2 block backdrop-blur-sm relative">
                      LAT: {lat.toFixed(4)} | LON: {lon.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-terminal-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-terminal-dim text-xs">
                  &gt; C://CLUB © {new Date().getFullYear()} — All rights
                  reserved
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-terminal-dim">
                    BUILD: v2.0.427
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
                    <span className="text-terminal-green">ONLINE</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
