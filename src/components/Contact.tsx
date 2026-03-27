"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative z-10 mt-4 border-t border-terminal-border"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
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
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)",
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

              <h2 className="text-white text-xl md:text-2xl font-bold mb-6">
                SIGNAL: <span className="text-terminal-green">ACTIVE</span>
                <span className="animate-blink ml-2">█</span>
              </h2>

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
                <div>
                  <span className="text-terminal-dim text-xs block mb-2">
                    &gt; COORDINATES
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Room 404, CS Building
                    <br />
                    University Campus
                    <br />
                    <span className="text-terminal-dim">
                      LAT: 12.9716 | LON: 77.5946
                    </span>
                  </p>
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
