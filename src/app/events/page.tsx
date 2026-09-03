"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EventItem {
  id: string;
  memId: string;
  statusTag: string;
  statusSymbol: string;
  segAddr: string;
  date: string;
  typeTag: string;
  category: "WORKSHOPS" | "CTF_HACKS" | "HARDWARE";
  title: string;
  description: string;
  details: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-1",
    memId: "MEM[0x0001]",
    statusSymbol: "[o]",
    statusTag: "SCHEDULED",
    segAddr: "SEG: 0x60001000",
    date: "2026-04-15",
    typeTag: "[WORKSHOP]",
    category: "WORKSHOPS",
    title: "Pointer Warfare",
    description:
      "Master pointers, references, and memory management in C/C++. Deep dive into pointer arithmetic, double pointers, and cache-friendly layout.",
    details:
      "Deep dive into pointer arithmetic, dangling pointers, smart pointers, and RAII patterns. Hands-on exercises with valgrind for memory leak detection. Allocating heap buffers directly on testbed machines.",
  },
  {
    id: "evt-2",
    memId: "MEM[0x0002]",
    statusSymbol: "[*]",
    statusTag: "OPEN_REGISTRATION",
    segAddr: "SEG: 0x60002000",
    date: "2026-04-22",
    typeTag: "[COMPETITION]",
    category: "CTF_HACKS",
    title: "Binary CTF Challenge",
    description:
      "Reverse engineering and binary exploitation capture-the-flag. Buffer overflows, ROP chains, and ASLR bypasses.",
    details:
      "A 4-hour CTF competition featuring challenges in reverse engineering, buffer overflows, format string vulnerabilities, and binary patching. Teams of 2-3 members. Live score server.",
  },
  {
    id: "evt-3",
    memId: "MEM[0x3A0A]",
    statusSymbol: "[^]",
    statusTag: "UPCOMING",
    segAddr: "SEG: 0x60003A0A",
    date: "2026-05-01",
    typeTag: "[SERIES]",
    category: "WORKSHOPS",
    title: "OS from Scratch",
    description:
      "Build a minimal operating system kernel in C from the ground up. Bootloader, GDT, paging, and interrupt handling.",
    details:
      "A 6-week workshop series covering bootloaders, protected mode, interrupt handling, memory management, and basic file systems. You'll write every line of code yourself. Bring your laptop with QEMU installed.",
  },
  {
    id: "evt-4",
    memId: "MEM[0x0004]",
    statusSymbol: "[o]",
    statusTag: "SCHEDULED",
    segAddr: "SEG: 0x60004000",
    date: "2026-05-10",
    typeTag: "[CONTEST]",
    category: "CTF_HACKS",
    title: "Algorithm Arena",
    description:
      "Competitive programming showdown — solve or segfault. Ultra-low latency data structures with zero allocations.",
    details:
      "Individual contest with 6 problems of increasing difficulty. Categories include graph theory, dynamic programming, number theory, and string algorithms. All solutions must be in C or C++.",
  },
  {
    id: "evt-5",
    memId: "MEM[0x0005]",
    statusSymbol: "[^]",
    statusTag: "UPCOMING",
    segAddr: "SEG: 0x60005000",
    date: "2026-05-20",
    typeTag: "[HANDS-ON]",
    category: "HARDWARE",
    title: "Embedded Systems Lab",
    description:
      "Program microcontrollers with bare-metal C — no libraries allowed. Direct register manipulation and UART debugging.",
    details:
      "Get hands-on with ARM Cortex-M4 boards. Write register-level code for GPIO, UART, timers, and interrupts. Understand linker scripts and startup code. Hardware provided.",
  },
  {
    id: "evt-6",
    memId: "MEM[0x0006]",
    statusSymbol: "[-]",
    statusTag: "PLANNING",
    segAddr: "SEG: 0x60006000",
    date: "2026-06-05",
    typeTag: "[TALK]",
    category: "WORKSHOPS",
    title: "Tech Talk: Rust vs C++ Zero-Cost Abstractions",
    description:
      "A flame-graph comparison of memory models, borrow checking, and RAII under extreme compiler optimization.",
    details:
      "Industry speakers discuss trade-offs between Rust and modern C++. Topics include ownership models, zero-cost abstractions, ecosystem libraries, and real-world execution benchmarks. Q&A session included.",
  },
];

type FilterType = "ALL_EVENTS" | "WORKSHOPS" | "CTF_HACKS" | "HARDWARE";

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>("ALL_EVENTS");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (filter === "ALL_EVENTS") return true;
    return e.category === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 py-6 font-mono select-none max-w-4xl mx-auto">
      {/* 1. Header Command Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8dcc8]/15 pb-4">
        <div>
          <div className="text-sm md:text-base font-bold text-[#e8dcc8] flex items-center">
            <span>$ ls -la /var/log/events/*</span>
          </div>
          <div className="text-xs text-[#8a7a5c] mt-0.5">
            // {EVENTS_DATA.length} heap-allocated memory blocks loaded — click block to dereference data
          </div>
        </div>
        <div className="text-[11px] text-[#8a7a5c] self-start sm:self-auto">
          CHUNK_SIZE: 0x0400 | DUMP: OK
        </div>
      </div>

      {/* 2. Filter Chip Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {(["ALL_EVENTS", "WORKSHOPS", "CTF_HACKS", "HARDWARE"] as FilterType[]).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1 rounded transition-all cursor-pointer font-bold tracking-wider ${
                  active
                    ? "bg-[#ff9f1c] text-[#12100a] shadow-[0_0_12px_rgba(255,159,28,0.4)]"
                    : "text-[#e8dcc8] hover:text-[#ff9f1c] bg-[#12100a]/80 border border-[#e8dcc8]/20"
                }`}
              >
                [ {f} ]
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#8a7a5c]">
          <span className="w-2 h-2 rounded-full bg-[#e8dcc8]" />
          <span>ALLOC: HEAP_ACTIVE | PTR_DEPTH: 64-BIT</span>
        </div>
      </div>

      {/* 3. Event Cards Stack */}
      <div className="space-y-3 pt-2">
        {filteredEvents.map((evt, idx) => {
          const isExpanded = expandedId === evt.id;

          // Status coloring
          const isRegistered = evt.statusTag === "OPEN_REGISTRATION";
          const statusColor = isRegistered
            ? "text-[#e8dcc8] font-bold"
            : evt.statusTag === "UPCOMING"
            ? "text-[#ff9f1c]"
            : "text-[#8a7a5c]";

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className={`rounded border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "border-[#e8dcc8]/60 bg-[#12100a] shadow-[0_0_18px_rgba(232,220,200,0.15)]"
                  : "border-[#e8dcc8]/20 bg-[#12100a]/85 hover:border-[#e8dcc8]/40"
              }`}
            >
              <div
                onClick={() => toggleExpand(evt.id)}
                className="p-4 sm:p-5 cursor-pointer"
              >
                {/* Meta Top Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#e8dcc8] font-bold text-[11px] px-1.5 py-0.5 rounded bg-[#e8dcc8]/10 border border-[#e8dcc8]/30">
                      {evt.memId}
                    </span>
                    <span className={`text-[11px] ${statusColor}`}>
                      {evt.statusSymbol} {evt.statusTag}
                    </span>
                    <span className="text-[#8a7a5c] text-[11px] hidden sm:inline">
                      :: {evt.segAddr}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#8a7a5c] text-[11px]">
                    <span>{evt.date}</span>
                    <span>|</span>
                    <span className="text-[#e8dcc8] font-semibold">{evt.typeTag}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#e8dcc8] mb-1.5 group-hover:text-white transition-colors">
                  {evt.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#8a7a5c] leading-relaxed">
                  {evt.description}
                </p>

                {/* Bottom Right Link */}
                <div className="flex justify-end pt-2">
                  <span className="text-xs font-bold text-[#ff9f1c] hover:underline">
                    {isExpanded ? "[-] COLLAPSE" : "[+] DEREFERENCE"}
                  </span>
                </div>
              </div>

              {/* Expandable Dereference Heap Buffer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-[#e8dcc8]/20 bg-[#12100a]/95 px-5 py-4 text-xs space-y-2 text-[#e8dcc8]"
                  >
                    <div className="text-[11px] text-[#8a7a5c]">
                      &gt; DEREFERENCING {evt.segAddr} ... [HEAP_BLOCK_COMMITTED]
                    </div>
                    <div className="pl-3 border-l-2 border-[#ff9f1c] text-[#8a7a5c] leading-relaxed">
                      {evt.details}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#8a7a5c] pt-2">
                      <span>ALLOCATOR: jemalloc::malloc({evt.memId})</span>
                      <span className="text-[#e8dcc8]">STATUS: SUCCESS [0 LEAKS]</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Footer Status Bar */}
      <div className="mt-8 pt-4 border-t border-[#e8dcc8]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#8a7a5c]">
        <div className="flex flex-wrap items-center gap-2">
          <span>STATUS: MEM_DUMP_VALID</span>
          <span>|</span>
          <span>ALLOCATOR: jemalloc</span>
          <span>|</span>
          <span>FRAG_RATIO: 0.002%</span>
          <span>|</span>
          <span>PAGES_MAPPED: 6</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff9f1c]" />
          <span>DAEMON: /usr/sbin/sched_d [PID: 4092]</span>
        </div>
      </div>
    </div>
  );
}
