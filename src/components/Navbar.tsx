"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "MEMBERS", href: "/members" },
  { label: "REGISTER", href: "/register" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-green/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="text-terminal-green text-glow font-bold text-lg glitch-hover"
          >
            C://CLUB &gt; _
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors glitch-hover relative group ${
                  isActive(item.href)
                    ? "text-synth-magenta text-glow-magenta"
                    : "text-terminal-dim hover:text-terminal-green"
                }`}
              >
                <span
                  className={`transition-opacity ${
                    isActive(item.href) ? "opacity-100 text-synth-magenta" : "opacity-0 group-hover:opacity-100 text-terminal-green"
                  }`}
                >
                  [
                </span>
                {item.label}
                <span
                  className={`transition-opacity ${
                    isActive(item.href) ? "opacity-100 text-synth-magenta" : "opacity-0 group-hover:opacity-100 text-terminal-green"
                  }`}
                >
                  ]
                </span>
              </Link>
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
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block text-sm glitch-hover transition-colors ${
                      isActive(item.href)
                        ? "text-synth-magenta text-glow-magenta"
                        : "text-terminal-dim hover:text-terminal-green"
                    }`}
                  >
                    &gt; {item.label}
                    {isActive(item.href) && (
                      <span className="text-terminal-amber ml-2 text-xs">[ ACTIVE ]</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
