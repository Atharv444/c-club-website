"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlitchOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    // Reveal the main content after 1 second of static/glitching
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            key="glitch-screen"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-95"
            initial={{ opacity: 1 }}
            animate={{
              opacity: [1, 0.8, 1, 0.6, 1, 0.9, 1],
            }}
            exit={{ opacity: 0, scale: 1.05, filter: "brightness(2)" }}
            transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          >
            {/* TV Static Noise Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
              }}
            />
            {/* Scanlines Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)",
              }}
            />

            {/* Flickering Text */}
            <motion.h2
              className="relative z-10 text-[#00ff41] font-mono text-xl md:text-3xl font-bold tracking-widest text-center text-glow"
              animate={{
                x: [-2, 2, -1, 1, 0],
                textShadow: [
                  "2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,0,255,0.5)",
                  "-2px 0 0 rgba(255,0,0,0.5), 2px 0 0 rgba(0,0,255,0.5)",
                  "0px 0 0 transparent, 0px 0 0 transparent",
                ],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              [ ESTABLISHING SATELLITE LINK... ]
            </motion.h2>
            <div className="mt-4 w-64 h-1 bg-[#00ff41]/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#00ff41]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      <motion.div
        className="relative w-full h-full flex flex-col flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isGlitching ? 0 : 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
