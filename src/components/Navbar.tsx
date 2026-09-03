"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const FOUNDING_DATE = new Date("2024-09-01T00:00:00Z");

const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "MEMBERS", href: "/members" },
  { label: "REGISTER", href: "/register" },
];

function getUptimeParts(founding: Date) {
  const diffMs = Math.max(0, Date.now() - founding.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return `SYS//LIVE UPTIME: [${days}]d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}  |  KERNEL: 6.8.0-cc  |  MEM: 4.2GB / 32GB`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setStatusText(getUptimeParts(FOUNDING_DATE));

    const interval = setInterval(() => {
      setStatusText(getUptimeParts(FOUNDING_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-14 bg-[#12100a]/95 backdrop-blur-md border-b border-[#e8dcc8]/20 font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
        <div className="flex items-center justify-between h-14">
          {/* Logo with live prompt blinking cursor (ONLY here) */}
          <Link
            href="/"
            className="flex items-center group cursor-pointer text-base md:text-lg font-bold tracking-wider shrink-0"
            aria-label="C//CLUB Home"
          >
            <span className="text-[#ff9f1c] text-glow-amber">C//CLUB</span>
            <span className="text-[#e8dcc8] ml-1">&gt;</span>
            <span className="cursor-blink ml-1 text-[#ff9f1c]">█</span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs md:text-sm tracking-wider transition-all duration-150 rounded ${
                    active
                      ? "bg-[#ff9f1c] text-[#12100a] font-bold px-3 py-1 shadow-[0_0_12px_rgba(255,159,28,0.4)]"
                      : "text-[#e8dcc8] hover:text-[#ff9f1c] px-2.5 py-1 font-medium"
                  }`}
                >
                  [{item.label}]
                </Link>
              );
            })}
          </div>

          {/* Right Status Strip + Avatar */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && (
              <div className="text-[11px] xl:text-xs text-[#8a7a5c] tracking-wider font-mono tabular-nums">
                {statusText}
              </div>
            )}

            {/* Circular Avatar Icon */}
            <div
              className="w-8 h-8 rounded-full border border-[#e8dcc8]/40 flex items-center justify-center bg-[#12100a] text-[#e8dcc8] hover:border-[#ff9f1c] hover:text-[#ff9f1c] transition-colors cursor-pointer shrink-0"
              title="SYS_OPERATOR // root"
              aria-label="User profile"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#e8dcc8] text-xs px-2.5 py-1 border border-[#e8dcc8]/30 rounded hover:border-[#ff9f1c] transition-colors cursor-pointer"
            aria-label="Toggle navigation"
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
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[#12100a]/98 border-b border-[#e8dcc8]/20"
          >
            <div className="px-4 py-4 space-y-2.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block text-sm py-1.5 px-3 rounded transition-colors ${
                      active
                        ? "bg-[#ff9f1c] text-[#12100a] font-bold shadow-[0_0_10px_rgba(255,159,28,0.3)]"
                        : "text-[#e8dcc8] hover:text-[#ff9f1c]"
                    }`}
                  >
                    [{item.label}]
                  </Link>
                );
              })}
              {mounted && (
                <div className="pt-3 text-[11px] text-[#8a7a5c] border-t border-[#e8dcc8]/15 font-mono">
                  {statusText}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
