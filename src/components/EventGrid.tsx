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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded border bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/50 drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] tracking-tighter"
    >
      {status}
    </span>
  );
}

function ScrambledText({ text, isScrambling }: { text: string; isScrambling: boolean }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isScrambling) {
      setDisplayText(text);
      return;
    }

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>/?`~0123456789█▓";
    const duration = 2000;
    const flickerRate = 70;
    const maxIterations = duration / flickerRate;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((c, index) => {
          if (c === ' ') return ' ';
          
          // Gradually reveal from left to right
          // threshold goes from 0 linearly over maxIterations
          const threshold = (iteration / maxIterations) * text.length;
          
          if (index < threshold) {
            return c;
          }
          
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
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

function EventCard({ event, onClick }: { event: EventData; onClick: () => void }) {
  const [displayAddress, setDisplayAddress] = useState(event.address);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycling = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayAddress((prev) => {
        const hexChars = "0123456789ABCDEF";
        const randomChar = hexChars[Math.floor(Math.random() * 16)];
        const targetIndex = iteration % 4; // 0, 1, 2, 3
        const currentHex = prev.slice(2);
        const newHex = currentHex.substring(0, targetIndex) + randomChar + currentHex.substring(targetIndex + 1);
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

  return (
    <motion.div
      variants={cardVariants}
      layoutId={event.id}
      onClick={onClick}
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      className="rounded-lg p-5 bg-black/80 border border-zinc-800 backdrop-blur-sm cursor-pointer hover:border-zinc-500 transition-all group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Address header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-xs font-bold font-mono tracking-tighter inline-block z-20 relative">
          MEM[{displayAddress}]
        </span>
        <StatusBadge status={event.status} />
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#00ff41] transition-colors relative z-20">
        {event.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-xs">{event.date}</span>
        <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-xs">{event.type}</span>
      </div>

      {/* Description */}
      <p className="text-[#a1a1aa] text-sm leading-relaxed">
        {event.description}
      </p>

      {/* Expand hint */}
      <div className="mt-4 text-[#a1a1aa] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        [CLICK TO READ_DATA &gt;&gt;]
      </div>
    </motion.div>
  );
}

export default function EventGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 2000);
  };

  return (
    <section id="events" className="relative z-10 px-4 md:px-8 py-12 max-w-6xl mx-auto crt-text-glow font-mono tracking-tighter">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-xl md:text-2xl font-bold mb-2">
          $ ls /events/*
        </h2>
        <p className="text-[#a1a1aa] text-sm">
          // Memory blocks loaded — click to expand data
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
        ))}
      </motion.div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
              <motion.div
                layoutId={selectedEvent.id}
                className="rounded-lg border border-zinc-800 p-6 md:p-8 bg-black/90 backdrop-blur-sm max-w-lg w-full max-h-[80vh] overflow-y-auto font-mono tracking-tighter"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-sm font-bold">
                    MEM[{selectedEvent.address}] — DATA DUMP
                  </span>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-[#a1a1aa] hover:text-white text-xs glitch-hover cursor-pointer"
                  >
                    [CLOSE]
                  </button>
                </div>

                <div className="border-b border-zinc-800 mb-4" />

                <h3 className="text-white text-xl font-bold mb-2">
                  <ScrambledText text={selectedEvent.title} isScrambling={isGlitching} />
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-sm">
                    {selectedEvent.date}
                  </span>
                  <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] text-sm">
                    {selectedEvent.type}
                  </span>
                  <StatusBadge status={selectedEvent.status} />
                </div>

                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-4">
                  <ScrambledText text={selectedEvent.details} isScrambling={isGlitching} />
                </p>

                <div className="border-t border-zinc-800 pt-4 mt-4 text-[#a1a1aa] text-xs">
                  &gt; END OF DATA BLOCK — RETURN TO INDEX
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
