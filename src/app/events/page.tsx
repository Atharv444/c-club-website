"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EventData {
  id: string;
  address: string;
  title: string;
  date: string;
  type: string;
  description: string;
  details: string;
  status: string;
}

const EVENTS: EventData[] = [
  {
    id: "evt-001",
    address: "0x0001",
    title: "Pointer Warfare",
    date: "2026-04-15",
    type: "WORKSHOP",
    description: "Master pointers, references, and memory management in C/C++.",
    details:
      "Deep dive into pointer arithmetic, dangling pointers, smart pointers, and RAII patterns. Hands-on exercises with valgrind for memory leak detection. Suitable for intermediate programmers looking to level up.",
    status: "SCHEDULED",
  },
  {
    id: "evt-002",
    address: "0x0002",
    title: "Binary CTF Challenge",
    date: "2026-04-22",
    type: "COMPETITION",
    description: "Reverse engineering and binary exploitation capture-the-flag.",
    details:
      "A 4-hour CTF competition featuring challenges in reverse engineering, buffer overflows, format string vulnerabilities, and binary patching. Teams of 2-3 members. Prizes for top 3 teams.",
    status: "OPEN",
  },
  {
    id: "evt-003",
    address: "0x0003",
    title: "OS from Scratch",
    date: "2026-05-01",
    type: "SERIES",
    description: "Build a minimal operating system kernel in C from the ground up.",
    details:
      "A 6-week workshop series covering bootloaders, protected mode, interrupt handling, memory management, and basic file systems. You'll write every line of code yourself. Bring your laptop with QEMU installed.",
    status: "UPCOMING",
  },
  {
    id: "evt-004",
    address: "0x0004",
    title: "Algorithm Arena",
    date: "2026-05-10",
    type: "CONTEST",
    description: "Competitive programming showdown — solve or be segfaulted.",
    details:
      "Individual contest with 6 problems of increasing difficulty. Categories include graph theory, dynamic programming, number theory, and string algorithms. All solutions must be in C or C++. Live leaderboard.",
    status: "SCHEDULED",
  },
  {
    id: "evt-005",
    address: "0x0005",
    title: "Embedded Systems Lab",
    date: "2026-05-20",
    type: "HANDS-ON",
    description: "Program microcontrollers with bare-metal C — no libraries allowed.",
    details:
      "Get hands-on with ARM Cortex-M4 boards. Write register-level code for GPIO, UART, timers, and interrupts. Understand linker scripts and startup code. Hardware provided.",
    status: "UPCOMING",
  },
  {
    id: "evt-006",
    address: "0x0006",
    title: "Tech Talk: Rust vs C++",
    date: "2026-06-05",
    type: "TALK",
    description: "A heated debate on memory safety, performance, and the future.",
    details:
      "Guest speakers from industry discuss the trade-offs between Rust and modern C++. Topics include ownership models, zero-cost abstractions, community ecosystem, and real-world performance benchmarks. Q&A session included.",
    status: "PLANNING",
  },
];

function ScrambledText({ text, isScrambling }: { text: string; isScrambling: boolean }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isScrambling) {
      setDisplayText(text);
      return;
    }

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>/?`~0123456789█▓";
    const duration = 1500;
    const flickerRate = 60;
    const maxIterations = duration / flickerRate;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((c, index) => {
            if (c === " ") return " ";
            const threshold = (iteration / maxIterations) * text.length;
            if (index < threshold) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, flickerRate);

    return () => clearInterval(interval);
  }, [text, isScrambling]);

  return <>{displayText}</>;
}

function StatusIndicator({ status }: { status: string }) {
  const color =
    status === "OPEN"
      ? "text-terminal-green"
      : status === "SCHEDULED"
      ? "text-terminal-cyan"
      : status === "PLANNING"
      ? "text-terminal-amber"
      : "text-terminal-dim";

  const dot =
    status === "OPEN"
      ? "bg-terminal-green animate-pulse"
      : status === "SCHEDULED"
      ? "bg-terminal-cyan"
      : status === "PLANNING"
      ? "bg-terminal-amber"
      : "bg-terminal-dim";

  return (
    <span className={`flex items-center gap-1.5 ${color} text-xs`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function EventCard({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: EventData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayAddress, setDisplayAddress] = useState(event.address);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycling = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayAddress((prev) => {
        const hexChars = "0123456789ABCDEF";
        const randomChar = hexChars[Math.floor(Math.random() * 16)];
        const targetIndex = iteration % 4;
        const currentHex = prev.slice(2);
        const newHex =
          currentHex.substring(0, targetIndex) +
          randomChar +
          currentHex.substring(targetIndex + 1);
        iteration++;
        return "0x" + newHex;
      });
    }, 50);
  };

  const stopCycling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayAddress(event.address);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = () => {
    onToggle();
    if (!isExpanded) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="mb-4"
    >
      <div
        onClick={handleClick}
        onMouseEnter={startCycling}
        onMouseLeave={stopCycling}
        className={`group relative overflow-hidden rounded-md border cursor-pointer transition-all duration-300 ${
          isExpanded
            ? "bg-synth-cyan/5 border-synth-magenta shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            : "bg-black/60 border-synth-cyan/30 hover:border-synth-magenta hover:shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:bg-synth-magenta/[0.02]"
        }`}
      >
        {/* Subtle scanline on the card */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,243,255,0.05) 2px, rgba(0,243,255,0.05) 4px)",
          }}
        />

        <div className="relative z-10 px-5 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-terminal-green text-glow text-xs font-bold font-mono px-2 py-0.5 bg-terminal-green/10 border border-terminal-green/20 rounded">
                MEM[{displayAddress}]
              </span>
              <StatusIndicator status={event.status} />
            </div>
            
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-terminal-dim">{event.date}</span>
              <span className="text-terminal-border hidden sm:inline">│</span>
              <span className="text-terminal-amber">{event.type}</span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 mt-3">
            <div className="flex-1">
              <h3 className={`text-lg font-bold font-mono transition-colors mb-1 ${
                isExpanded ? "text-terminal-green text-glow" : "text-white group-hover:text-terminal-green"
              }`}>
                {event.title}
              </h3>
              <p className="text-terminal-dim text-sm font-mono leading-relaxed">
                <ScrambledText text={event.description} isScrambling={isGlitching} />
              </p>
            </div>
            <div className="text-terminal-dim mt-1 shrink-0 font-mono text-sm">
              {isExpanded ? "[-]" : "[+]"}
            </div>
          </div>
        </div>

        {/* Expanded Detail */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 relative z-10">
                <div className="h-px w-full bg-gradient-to-r from-terminal-green/50 to-transparent mb-4" />
                
                <div className="flex items-center gap-2 mb-3 text-xs text-terminal-green/70 font-mono">
                  <span>&gt;</span>
                  <span className="animate-pulse">LOADING DETAILS...</span>
                  <span className="animate-blink">█</span>
                </div>

                <p className="text-gray-300 text-sm font-mono leading-relaxed pl-3 border-l border-terminal-green/30">
                  <ScrambledText text={event.details} isScrambling={isGlitching} />
                </p>

                <div className="mt-4 pt-4 flex justify-between items-center text-xs text-terminal-dim font-mono border-t border-terminal-border/20">
                  <span>&gt; EOF</span>
                  <span className="text-terminal-amber">SYS_OK</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleEvent = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative z-10 px-4 md:px-8 py-12 max-w-4xl mx-auto crt-text-glow font-mono">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-synth-magenta text-glow-magenta text-xl md:text-2xl font-bold mb-2">
          $ ls -la /var/log/events/*
        </h1>
        <p className="text-terminal-dim text-sm">
          // {EVENTS.length} memory blocks loaded — click to expand data
        </p>
      </motion.div>

      {/* Event Cards (Stacked) */}
      <div className="flex flex-col">
        {EVENTS.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            index={index}
            isExpanded={expandedId === event.id}
            onToggle={() => toggleEvent(event.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-6 text-terminal-dim text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-terminal-green">&gt;</span> {EVENTS.length} entries found
        in /var/log/events/ — END OF LISTING
        <span className="animate-blink ml-1 text-terminal-green">█</span>
      </motion.div>
    </section>
  );
}
