"use client";

import { useState } from "react";
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
  const colors: Record<string, string> = {
    OPEN: "bg-terminal-green/20 text-terminal-green border-terminal-green/40",
    SCHEDULED: "bg-terminal-amber/20 text-terminal-amber border-terminal-amber/40",
    UPCOMING: "bg-terminal-cyan/20 text-terminal-cyan border-terminal-cyan/40",
    PLANNING: "bg-terminal-dim/20 text-terminal-dim border-terminal-dim/40",
  };

  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded border ${
        colors[status] || colors.PLANNING
      }`}
    >
      {status}
    </span>
  );
}

export default function EventGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  return (
    <section id="events" className="relative z-10 px-4 md:px-8 py-14 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-terminal-green text-glow text-xl md:text-2xl font-bold mb-2">
          $ ls /events/*
        </h2>
        <p className="text-terminal-dim text-sm">
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
          <motion.div
            key={event.id}
            variants={cardVariants}
            layoutId={event.id}
            onClick={() => setSelectedEvent(event)}
            className="terminal-border rounded-lg p-5 bg-terminal-bg/80 backdrop-blur-sm cursor-pointer hover:border-terminal-green/50 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Address header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-terminal-cyan text-xs font-bold">
                MEM[{event.address}]
              </span>
              <StatusBadge status={event.status} />
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-base mb-1 group-hover:text-terminal-green transition-colors">
              {event.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-terminal-dim text-xs">{event.date}</span>
              <span className="text-terminal-amber text-xs">{event.type}</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {event.description}
            </p>

            {/* Expand hint */}
            <div className="mt-4 text-terminal-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              [CLICK TO READ_DATA &gt;&gt;]
            </div>
          </motion.div>
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
                className="terminal-border rounded-lg p-6 md:p-8 bg-terminal-bg max-w-lg w-full max-h-[80vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-terminal-cyan text-sm font-bold">
                    MEM[{selectedEvent.address}] — DATA DUMP
                  </span>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-terminal-dim hover:text-terminal-red text-xs glitch-hover cursor-pointer"
                  >
                    [CLOSE]
                  </button>
                </div>

                <div className="border-b border-terminal-border mb-4" />

                <h3 className="text-terminal-green text-glow text-xl font-bold mb-2">
                  {selectedEvent.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-terminal-dim text-sm">
                    {selectedEvent.date}
                  </span>
                  <span className="text-terminal-amber text-sm">
                    {selectedEvent.type}
                  </span>
                  <StatusBadge status={selectedEvent.status} />
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {selectedEvent.details}
                </p>

                <div className="border-t border-terminal-border pt-4 mt-4 text-terminal-dim text-xs">
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
