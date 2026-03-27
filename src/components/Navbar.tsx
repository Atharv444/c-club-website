"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "OVERVIEW", href: "#overview" },
  { label: "EVENTS", href: "#events" },
  { label: "REGISTER", href: "#register" },
  { label: "MEMBERS", href: "#members" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-terminal-green text-glow font-bold text-base glitch-hover"
          >
            C://CLUB &gt; _
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-terminal-dim hover:text-terminal-green text-sm transition-colors glitch-hover relative group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-terminal-green">
                  [
                </span>
                {item.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-terminal-green">
                  ]
                </span>
              </a>
            ))}
            {mounted && (
              <span className="text-terminal-dim text-sm font-light">
                {time}
              </span>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-terminal-green text-xs glitch-hover cursor-pointer"
          >
            {isOpen ? "[CLOSE]" : "[MENU]"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-terminal-bg border-b border-terminal-border"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-terminal-dim hover:text-terminal-green text-sm glitch-hover transition-colors"
                >
                  &gt; {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
