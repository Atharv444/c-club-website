"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBootContext } from "@/context/BootContext";

const BOOT_LINES = [
  { text: "BIOS v3.14 — C://CLUB SYSTEMS", delay: 0 },
  { text: "Checking memory... 256 MB OK", delay: 200 },
  { text: "Detecting peripherals... keyboard [OK] display [OK]", delay: 400 },
  { text: "───────────────────────────────────────────", delay: 500 },
  { text: "$ gcc --version", delay: 700 },
  { text: "gcc (C-Club) 13.2.0", delay: 850 },
  { text: "$ make club_intro", delay: 1100 },
  { text: "Compiling club_intro.cpp... [OK]", delay: 1400 },
  { text: "Compiling events_module.o... [OK]", delay: 1700 },
  { text: "Compiling members_db.o... [OK]", delay: 2000 },
  { text: "Linking libraries... -lnetwork -lcrypto -lclub", delay: 2300 },
  { text: "Loading data nodes...", delay: 2600 },
  { text: "Initializing terminal interface...", delay: 2900 },
  { text: "", delay: 3100 },
  { text: "╔══════════════════════════════════════════╗", delay: 3200 },
  { text: "║     STATUS: ACTIVE  —  ALL SYSTEMS GO    ║", delay: 3300 },
  { text: "╚══════════════════════════════════════════╝", delay: 3400 },
];

export default function BootSequence() {
  const { booted, completeBoot } = useBootContext();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (booted) return;

    const timeouts: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timeouts.push(timeout);
    });

    // After all lines shown, wait a moment then exit
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        completeBoot();
      }, 800);
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 1000);
    timeouts.push(exitTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [booted, completeBoot]);

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      completeBoot();
    }, 300);
  }, [completeBoot]);

  if (booted) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex flex-col justify-center bg-terminal-bg p-6 md:p-16"
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 text-terminal-dim hover:text-terminal-green text-xs glitch-hover transition-colors cursor-pointer"
          >
            [SKIP BOOT &gt;&gt;]
          </button>

          {/* Boot Output */}
          <div className="max-w-3xl w-full mx-auto">
            <div className="mb-6">
              <span className="text-terminal-green text-glow text-lg font-bold">
                C://CLUB TERMINAL v2.0
              </span>
            </div>

            <div className="space-y-1">
              {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`text-sm md:text-base ${
                    line.text.includes("STATUS: ACTIVE")
                      ? "text-terminal-green text-glow font-bold"
                      : line.text.includes("[OK]")
                      ? "text-terminal-green"
                      : line.text.includes("$")
                      ? "text-synth-magenta"
                      : line.text.startsWith("╔") ||
                        line.text.startsWith("║") ||
                        line.text.startsWith("╚")
                      ? "text-terminal-green text-glow"
                      : "text-terminal-dim"
                  }`}
                >
                  <span className="whitespace-pre">{line.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Blinking cursor */}
            {visibleLines < BOOT_LINES.length && (
              <div className="mt-2">
                <span className="text-terminal-green animate-blink">█</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between text-xs text-terminal-dim mb-1">
                <span>BOOT PROGRESS</span>
                <span>
                  {Math.min(
                    100,
                    Math.round((visibleLines / BOOT_LINES.length) * 100)
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-1 bg-terminal-dark rounded overflow-hidden">
                <motion.div
                  className="h-full bg-terminal-green"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(visibleLines / BOOT_LINES.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: "0 0 10px rgba(0, 243, 255, 0.5)",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
