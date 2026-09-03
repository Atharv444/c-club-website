"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-16 py-6 select-none font-mono">
      {/* 1. Terminal Command Block */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="px-5 py-2.5 rounded-md border border-[#e8dcc8]/20 bg-[#12100a]/90 text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="text-xs md:text-sm font-bold text-[#e8dcc8] tracking-wide">
            $ gcc -O3 -Wall club_main.c -o c-club &amp;&amp; ./c-club
          </div>
          <div className="text-[11px] md:text-xs text-[#8a7a5c] mt-0.5">
            // Initializing low-level blueprint execution environment
          </div>
        </div>
      </motion.div>

      {/* 2. Hero Section: Logo, Tagline, Description, Buttons */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        {/* Glowing C//CLUB Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#ff9f1c] text-glow-amber flex items-center justify-center">
            <span>C//CLUB</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] text-[#e8dcc8] text-glow-cream">
            COMPILE. LINK. EXECUTE.
          </h2>
          <div className="text-xs md:text-sm text-[#8a7a5c] max-w-xl mx-auto leading-relaxed">
            <p>// The premier systems engineering &amp; C/C++ architecture community.</p>
            <p>Direct hardware access, zero overhead, bare-metal performance.</p>
          </div>
        </motion.div>

        {/* Two Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/register"
            className="px-6 py-2.5 rounded bg-[#ff9f1c] text-[#12100a] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#ffb347] shadow-[0_0_18px_rgba(255,159,28,0.4)] transition-all cursor-pointer"
          >
            $ ./JOIN_CLUB
          </Link>
          <a
            href="#manifest"
            className="px-6 py-2.5 rounded border border-[#e8dcc8]/40 text-[#e8dcc8] font-semibold text-xs sm:text-sm tracking-wider hover:border-[#ff9f1c] hover:text-[#ff9f1c] transition-all cursor-pointer"
          >
            &gt; READ_MORE
          </a>
        </motion.div>

        {/* 3. Four-Column Stat Strip (Populated with Real Club & Systems Data) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto"
        >
          <div className="p-3 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 text-center">
            <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">// ARCH</div>
            <div className="text-xs sm:text-sm font-bold text-[#e8dcc8]">x86_64 / RISC-V</div>
          </div>
          <div className="p-3 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 text-center">
            <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">// MEM_LEAKS</div>
            <div className="text-xs sm:text-sm font-bold text-[#e8dcc8]">0 bytes (Valgrind OK)</div>
          </div>
          <div className="p-3 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 text-center">
            <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">// TOOLCHAINS</div>
            <div className="text-xs sm:text-sm font-bold text-[#e8dcc8]">GCC 14 • CLANG 18</div>
          </div>
          <div className="p-3 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 text-center">
            <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">// ACTIVE_THREADS</div>
            <div className="text-xs sm:text-sm font-bold text-[#e8dcc8]">9 [SCHED_FIFO]</div>
          </div>
        </motion.div>
      </section>

      {/* 4. Terminal Panel: term0 :: sys_manifest.c [READ-ONLY] */}
      <section id="manifest" className="max-w-4xl mx-auto px-4">
        <div className="rounded-lg border border-[#e8dcc8]/25 bg-[#12100a]/90 shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e8dcc8]/20 bg-[#12100a]/95 text-xs text-[#8a7a5c]">
            <span className="font-mono text-[#e8dcc8] font-semibold tracking-wide">
              term0 :: sys_manifest.c [READ-ONLY]
            </span>
            <div className="hidden sm:block text-[10px] tracking-wider text-[#8a7a5c]">
              ENC: UTF-8 LF 0x004951F0
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm font-mono leading-relaxed">
            <div className="text-[#e8dcc8]">
              <span className="text-[#ff9f1c] font-bold">root@c-club:~$</span> cat SYSTEM_OVERVIEW
            </div>
            <div className="text-[#8a7a5c] text-xs">
              // Reading core system manifests and operational directives
            </div>

            <div className="mt-4 p-4 rounded border border-[#e8dcc8]/15 bg-[#12100a]/60 space-y-3 text-[#e8dcc8]">
              <div className="text-[#e8dcc8] font-bold text-glow-cream">
                &gt; Welcome to C//CLUB - low-level systems blueprint &amp; architecture.
              </div>
              <p className="text-[#8a7a5c] text-xs sm:text-sm leading-relaxed">
                We are a collective of systems engineers, kernel programmers, and high-performance computing hackers. We study the computing substrate from silicon gates, register microarchitecture, and memory busses up to operating systems, custom linkers, and mission-critical runtimes.
              </p>
              <p className="text-[#8a7a5c] text-xs sm:text-sm leading-relaxed">
                Our mission: dismantle black-box abstractions, master mechanical sympathy, and engineer bare-metal software with zero bloat and uncompromising determinism.
              </p>
            </div>

            {/* Three Module Cards Inside Manifest Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Module 1 */}
              <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8a7a5c] mb-1">
                    <span>[MODULE_01]</span>
                    <span className="text-[#e8dcc8]">🛡️</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#ff9f1c] mb-1.5">
                    Kernel &amp; OS Dev
                  </h3>
                  <p className="text-[11px] text-[#8a7a5c] leading-relaxed mb-3">
                    Bare-metal bootloaders, page table configuration, interrupt vector tables, and POSIX-compliant microkernels.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#8a7a5c] pt-2 border-t border-[#e8dcc8]/15">
                  <span>STATUS: STABLE</span>
                  <span className="text-[#e8dcc8]">RING 0</span>
                </div>
              </div>

              {/* Module 2 */}
              <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8a7a5c] mb-1">
                    <span>[MODULE_02]</span>
                    <span className="text-[#ff9f1c]">⚡</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#ff9f1c] mb-1.5">
                    Compilers &amp; IR
                  </h3>
                  <p className="text-[11px] text-[#8a7a5c] leading-relaxed mb-3">
                    Lexing, parsing ASTs, SSA intermediate representation, register allocation, and LLVM/custom code-gen backends.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#8a7a5c] pt-2 border-t border-[#e8dcc8]/15">
                  <span>PIPELINE: ACTIVE</span>
                  <span className="text-[#e8dcc8]">O3_PASS</span>
                </div>
              </div>

              {/* Module 3 */}
              <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8a7a5c] mb-1">
                    <span>[MODULE_03]</span>
                    <span className="text-[#e8dcc8]">⚡</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#e8dcc8] mb-1.5">
                    High-Perf Simd
                  </h3>
                  <p className="text-[11px] text-[#8a7a5c] leading-relaxed mb-3">
                    AVX-512 vectorization, cache-oblivious data layouts, lock-free concurrency, and sub-microsecond latency pipelines.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#8a7a5c] pt-2 border-t border-[#e8dcc8]/15">
                  <span>CACHE: HOT</span>
                  <span className="text-[#e8dcc8]">L1D 32KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Physical Hardware Sympathy Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Descriptive text + Stats table */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#ff9f1c]">
              <span>// TELEMETRY &amp; ENVIRONMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f1c]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#e8dcc8] tracking-tight">
              Physical Hardware Sympathy
            </h2>
            <p className="text-xs sm:text-sm text-[#8a7a5c] leading-relaxed">
              Modern software layers introduce invisible overhead. At C//CLUB, members profile cache-miss penalties, analyze instruction-level parallelism, and measure instruction retirement directly on testbed silicon.
            </p>

            {/* Stats Table (Standard Architectural Reference Data) */}
            <div className="pt-2">
              <table className="w-full text-xs font-mono">
                <tbody>
                  <tr className="border-b border-[#e8dcc8]/15">
                    <td className="py-2 text-[#8a7a5c]">L1 Hit Latency:</td>
                    <td className="py-2 text-right text-[#e8dcc8] font-semibold">
                      ~4 cycles (1.0 ns)
                    </td>
                  </tr>
                  <tr className="border-b border-[#e8dcc8]/15">
                    <td className="py-2 text-[#8a7a5c]">Main Memory Access:</td>
                    <td className="py-2 text-right text-[#ff9f1c] font-semibold">
                      ~240 cycles (60.0 ns)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#8a7a5c]">Branch Mispredict:</td>
                    <td className="py-2 text-right text-[#e8dcc8] font-semibold">
                      ~16-20 cycles flush
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Memory Hierarchy Real-Time Bench Panel */}
          <div className="rounded-lg border border-[#e8dcc8]/20 bg-[#12100a]/85 p-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="text-[#e8dcc8] font-bold flex items-center gap-1.5">
                <span>🖥️</span>
                <span>MEMORY HIERARCHY REAL-TIME BENCH</span>
              </span>
              <span className="text-[#ff9f1c] text-[10px] tracking-wider">
                [CYCLES / ACCESS]
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* L1 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#e8dcc8]">L1 Cache (Register / Hot Core)</span>
                  <span className="text-[#e8dcc8] font-semibold">0.9 ns • 99.4% HIT</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#17140e] overflow-hidden">
                  <div className="h-full bg-[#e8dcc8] rounded-full" style={{ width: "95%" }} />
                </div>
              </div>

              {/* L2 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#e8dcc8]">L2 Cache (Unified Core SRAM)</span>
                  <span className="text-[#e8dcc8] font-semibold">3.2 ns • 88.1% HIT</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#17140e] overflow-hidden">
                  <div className="h-full bg-[#e8dcc8] rounded-full" style={{ width: "80%" }} />
                </div>
              </div>

              {/* L3 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#e8dcc8]">L3 Shared Cache</span>
                  <span className="text-[#ff9f1c] font-semibold">11.4 ns • 71.0% HIT</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#17140e] overflow-hidden">
                  <div className="h-full bg-[#ff9f1c] rounded-full" style={{ width: "55%" }} />
                </div>
              </div>

              {/* DDR5 DRAM */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#e8dcc8]">DDR5 DRAM Boundary Access</span>
                  <span className="text-[#ff9f1c] font-semibold">64.8 ns • BOUNDARY FAULT</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#17140e] overflow-hidden">
                  <div className="h-full bg-[#ff9f1c] rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="mt-5 pt-3 border-t border-[#e8dcc8]/15 flex items-center justify-between text-[10px] text-[#8a7a5c]">
              <span>SYS_STAT: NON-BLOCKING LOCKLESS PIPELINE</span>
              <span className="text-[#e8dcc8]">100.0% DETERMINISTIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Band */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-lg border border-[#e8dcc8]/20 bg-[#12100a]/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-[10px] font-mono text-[#ff9f1c] tracking-wider">
              [PROPOSAL // ADMISSIONS]
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#e8dcc8]">
              Ready to delve into lower rings?
            </h2>
            <p className="text-xs sm:text-sm text-[#8a7a5c] max-w-lg">
              Join 9+ hackers, contributors, and systems specialists. Access exclusive hardware lab sessions, code teardowns, and live debug drills.
            </p>
          </div>

          <Link
            href="/register"
            className="shrink-0 px-6 py-3 rounded bg-[#ff9f1c] text-[#12100a] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#ffb347] shadow-[0_0_15px_rgba(255,159,28,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            <span>$ ./JOIN_CLUB →</span>
          </Link>
        </div>
      </section>

      {/* 7. Site Technical Footer */}
      <footer className="max-w-4xl mx-auto px-4 pt-6 pb-2 border-t border-[#e8dcc8]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8a7a5c] font-mono">
        <div>C//CLUB • BARE-METAL ALLIANCE • ALL REGISTERS PRESERVED</div>
        <div className="flex items-center gap-4">
          <span>SIGNAL: ONLINE</span>
          <span>SYS_CALL: sys_exit(0)</span>
        </div>
      </footer>
    </div>
  );
}
