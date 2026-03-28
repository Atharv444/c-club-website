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
  const [wipeState, setWipeState] = useState<'idle' | 'wiping' | 'flashing'>('idle');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (wipeState !== 'idle') return;
    
    setIsOpen(false);
    setWipeState('wiping');
    
    setTimeout(() => {
      const el = document.getElementById(href.substring(1));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    }, 400);

    setTimeout(() => {
      setWipeState('flashing');
    }, 800);

    setTimeout(() => {
      setWipeState('idle');
    }, 1500);
  };

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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-green/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            className="text-terminal-green text-glow font-bold text-lg glitch-hover"
          >
            C://CLUB &gt; _
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-terminal-dim hover:text-terminal-green text-sm glitch-hover transition-colors"
                >
                  &gt; {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Wipe & Flash Overlays */}
      <AnimatePresence>
        {wipeState === "wiping" && (
          <motion.div
            className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute w-full h-[120vh] bg-black border-b-[6px] border-terminal-green shadow-[0_10px_40px_rgba(0,255,65,0.8)]"
              initial={{ top: "-120vh" }}
              animate={{ top: "100vh" }}
              transition={{ duration: 0.8, ease: "linear" }}
            />
          </motion.div>
        )}
        {wipeState === "flashing" && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] text-terminal-green font-bold text-lg md:text-xl crt-text-glow bg-terminal-bg/80 px-6 py-3 border border-terminal-green rounded shadow-[0_0_15px_rgba(0,255,65,0.5)] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          >
            [ EXEC: ./load_module --force ]<span className="animate-blink ml-2">█</span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
