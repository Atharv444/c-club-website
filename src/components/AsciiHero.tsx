"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Big block-letter ASCII art for "C://CLUB"
const ASCII_LINES = [
  "  ██████╗ ██╗ ██╗ ██████╗██╗     ██╗   ██╗██████╗ ",
  " ██╔════╝██╔╝██╔╝██╔════╝██║     ██║   ██║██╔══██╗",
  " ██║    ██╔╝██╔╝ ██║     ██║     ██║   ██║██████╔╝",
  " ██║    ██╔╝██╔╝  ██║     ██║     ██║   ██║██╔══██╗",
  " ╚██████╗██║ ██║  ╚██████╗███████╗╚██████╔╝██████╔╝",
  "  ╚═════╝╚═╝ ╚═╝   ╚═════╝╚══════╝ ╚═════╝╚═════╝ ",
];

const TYPING_SPEED = 8;   // ms per character
const LINE_PAUSE = 80;    // ms pause between lines

export default function AsciiHero() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  const totalChars = ASCII_LINES.reduce((sum, line) => sum + line.length, 0);

  useEffect(() => {
    if (visibleChars >= totalChars) {
      setTypingDone(true);
      return;
    }

    // Calculate which line & position we're on to add inter-line pauses
    let remaining = visibleChars;
    let currentLine = 0;
    for (let i = 0; i < ASCII_LINES.length; i++) {
      if (remaining <= ASCII_LINES[i].length) {
        currentLine = i;
        break;
      }
      remaining -= ASCII_LINES[i].length;
    }

    // If we just started a new line (remaining === 0 and not first line), add a pause
    const isLineStart = remaining === 0 && currentLine > 0;
    const delay = isLineStart ? LINE_PAUSE : TYPING_SPEED;

    const timeout = setTimeout(() => {
      setVisibleChars((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [visibleChars, totalChars]);

  // Build the rendered text from visibleChars count
  const getRenderedLines = useCallback(() => {
    let charsLeft = visibleChars;
    const lines: string[] = [];

    for (let i = 0; i < ASCII_LINES.length; i++) {
      if (charsLeft <= 0) {
        break;
      }
      const lineLen = ASCII_LINES[i].length;
      if (charsLeft >= lineLen) {
        lines.push(ASCII_LINES[i]);
        charsLeft -= lineLen;
      } else {
        lines.push(ASCII_LINES[i].substring(0, charsLeft));
        charsLeft = 0;
      }
    }

    return lines;
  }, [visibleChars]);

  const renderedLines = getRenderedLines();

  return (
    <section className="relative z-10 px-4 md:px-8 py-14 md:py-20 max-w-6xl mx-auto text-center">
      {/* ASCII Art Block */}
      <div className="relative inline-block text-left mb-6">
        <pre
          className="text-synth-magenta text-glow-magenta font-mono leading-tight select-none overflow-x-auto"
          style={{
            fontSize: "clamp(0.35rem, 1.8vw, 0.85rem)",
            letterSpacing: "0.02em",
          }}
          aria-label="C://CLUB ASCII Art"
        >
          {renderedLines.map((line, i) => (
            <span key={i} className="block">
              {line}
              {/* Show cursor at the end of the last visible line while typing */}
              {!typingDone && i === renderedLines.length - 1 && (
                <span className="animate-blink text-synth-cyan">█</span>
              )}
            </span>
          ))}
        </pre>

        {/* Glow underline that appears after typing finishes */}
        <AnimatePresence>
          {typingDone && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-px mt-2 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ff00ff, #00f3ff, transparent)",
                boxShadow:
                  "0 0 8px rgba(255, 0, 255, 0.6), 0 0 16px rgba(0, 243, 255, 0.3)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Tagline & CTA — fade in after typing completes */}
      <AnimatePresence>
        {typingDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
