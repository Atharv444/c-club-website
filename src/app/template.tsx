"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * VHS-style glitch transition between route changes.
 * 
 * Flow:
 *  1. Route changes → brief static overlay + screen tear
 *  2. Content fades in underneath after the glitch clears
 */

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isGlitching, setIsGlitching] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [transitionKey, setTransitionKey] = useState(pathname);

  useEffect(() => {
    // On route change: fire the glitch overlay
    setIsGlitching(true);
    setShowContent(false);

    // Phase 1: Glitch overlay visible (200ms)
    const glitchTimer = setTimeout(() => {
      setIsGlitching(false);
      setTransitionKey(pathname);
    }, 200);

    // Phase 2: Reveal content with a slight delay after glitch
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 120);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(contentTimer);
    };
  }, [pathname]);

  return (
    <>
      {/* VHS Static / Glitch Overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            key="glitch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.06 }}
            className="vhs-glitch-overlay"
            aria-hidden="true"
          >
            {/* Horizontal tear lines */}
            <div className="vhs-tear vhs-tear-1" />
            <div className="vhs-tear vhs-tear-2" />
            <div className="vhs-tear vhs-tear-3" />

            {/* RGB shift bars */}
            <div className="vhs-rgb-bar vhs-rgb-bar-1" />
            <div className="vhs-rgb-bar vhs-rgb-bar-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0, x: -3, filter: "brightness(1.8) saturate(2)" }}
        animate={{
          opacity: showContent ? 1 : 0,
          x: 0,
          filter: "brightness(1) saturate(1)",
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </>
  );
}
