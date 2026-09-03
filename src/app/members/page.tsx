"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MemberProcess {
  name: string;
  memId: string;
  pid: number;
  role: "LEAD" | "CORE" | "MEMBER";
  stat: "[R+]" | "[S]";
  command: string;
}

const MEMBERS_DATA: MemberProcess[] = [
  {
    name: "Atharv B",
    memId: "MEM[0x0001]",
    pid: 1001,
    role: "MEMBER",
    stat: "[R+]",
    command: "/usr/bin/club-daemon --role=lead --priority=high",
  },
  {
    name: "Uthkarsh M",
    memId: "MEM[0x0002]",
    pid: 1002,
    role: "MEMBER",
    stat: "[R+]",
    command: "/usr/bin/club-daemon --role=core --arch=x86_64",
  },
  {
    name: "Likith P",
    memId: "MEM[0x0003]",
    pid: 1003,
    role: "MEMBER",
    stat: "[R+]",
    command: "/usr/bin/club-daemon --role=core --opt-level=03",
  },
  {
    name: "Amogh",
    memId: "MEM[0x0004]",
    pid: 1004,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=01",
  },
  {
    name: "Varshini Marni",
    memId: "MEM[0x0005]",
    pid: 1005,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=02",
  },
  {
    name: "Vaishnavi YashoKirthi S",
    memId: "MEM[0x0006]",
    pid: 1006,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=03",
  },
  {
    name: "Archana",
    memId: "MEM[0x0007]",
    pid: 1007,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=04",
  },
  {
    name: "Arpitha",
    memId: "MEM[0x0008]",
    pid: 1008,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=05",
  },
  {
    name: "Unais",
    memId: "MEM[0x0009]",
    pid: 1009,
    role: "MEMBER",
    stat: "[S]",
    command: "/usr/bin/club-daemon --worker --thread=06",
  },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");

  const filteredMembers = MEMBERS_DATA.filter((m) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.command.toLowerCase().includes(q) ||
      m.memId.toLowerCase().includes(q)
    );
  });

  // Dynamic counts calculated from actual member list
  const totalCount = MEMBERS_DATA.length;
  const activeCount = MEMBERS_DATA.filter((m) => m.stat === "[R+]").length;
  const sleepingCount = MEMBERS_DATA.filter((m) => m.stat === "[S]").length;

  const leadCount = MEMBERS_DATA.filter((m) => m.role === "LEAD").length;
  const coreCount = MEMBERS_DATA.filter((m) => m.role === "CORE").length;
  const memberCount = MEMBERS_DATA.filter((m) => m.role === "MEMBER").length;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-6 py-6 font-mono select-none max-w-4xl mx-auto">
      {/* 1. Header Command + Live Filter Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#e8dcc8]/15 pb-4">
        <div>
          <div className="text-sm md:text-base font-bold text-[#e8dcc8]">
            $ ps aux | grep club
          </div>
          <div className="text-xs text-[#8a7a5c] mt-0.5">
            // {totalCount} initialized processes in .data segment — active member threads
          </div>
        </div>

        {/* Live grep --filter= search box */}
        <div className="flex items-center gap-2 bg-[#12100a] border border-[#e8dcc8]/25 rounded px-3 py-1.5 focus-within:border-[#e8dcc8]">
          <span className="text-xs text-[#8a7a5c] shrink-0">$ grep --filter=</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="&quot;name or role&quot;"
            className="bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/60 w-32 sm:w-40 font-mono"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[10px] text-[#ff9f1c] hover:underline cursor-pointer"
            >
              [CLEAR]
            </button>
          )}
        </div>
      </div>

      {/* 2. Four Stat Cards Row (Populated dynamically) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85">
          <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">TOTAL PROCESSES</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-[#ff9f1c]">{pad(totalCount)}</span>
            <span className="text-[10px] text-[#8a7a5c]">TASKS</span>
          </div>
        </div>

        <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85">
          <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">ACTIVE THREADS</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-[#e8dcc8]">{pad(activeCount)}</span>
            <span className="text-[10px] text-[#8a7a5c]">[R+] STATE</span>
          </div>
        </div>

        <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85">
          <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">SLEEPING DAEMONS</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-[#8a7a5c]">{pad(sleepingCount)}</span>
            <span className="text-[10px] text-[#8a7a5c]">[S] ASYNC</span>
          </div>
        </div>

        <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85">
          <div className="text-[10px] text-[#8a7a5c] tracking-wider mb-1">SEGMENT HEALTH</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-[#ff9f1c]">0x4040</span>
            <span className="text-[10px] text-[#8a7a5c]">OK (NO LEAKS)</span>
          </div>
        </div>
      </div>

      {/* 3. Member Process Rows (Single-line guaranteed, no wrap) */}
      <div className="space-y-2 pt-1">
        {filteredMembers.map((member, idx) => {
          const isLead = member.role === "LEAD";
          const isCore = member.role === "CORE";

          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className="px-4 py-3 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 hover:border-[#e8dcc8]/40 hover:bg-[#12100a] transition-all flex items-center justify-between gap-3 flex-nowrap w-full overflow-hidden"
            >
              {/* Left group: MEM tag + Name + PID + Command */}
              <div className="flex items-center gap-3 sm:gap-4 flex-nowrap min-w-0 flex-1">
                <span className="text-[#e8dcc8] text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#e8dcc8]/10 border border-[#e8dcc8]/30 shrink-0">
                  {member.memId}
                </span>

                <div className="flex items-baseline gap-2 min-w-0 shrink-0 w-44 sm:w-56 md:w-64">
                  <span
                    className="text-xs sm:text-sm font-bold text-[#e8dcc8] truncate"
                    title={member.name}
                  >
                    {member.name}
                  </span>
                  <span className="text-[11px] text-[#8a7a5c] shrink-0">
                    PID:{member.pid}
                  </span>
                </div>

                {/* Command string truncated gracefully */}
                <span className="text-[11px] text-[#8a7a5c] hidden lg:inline truncate flex-1 opacity-80">
                  {member.command}
                </span>
              </div>

              {/* Right group: State + Role badge */}
              <div className="flex items-center gap-2.5 shrink-0 ml-auto">
                <span className="text-[11px] text-[#8a7a5c] font-semibold">
                  {member.stat}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${isLead
                      ? "bg-[#ff9f1c] text-[#12100a] shadow-[0_0_8px_rgba(255,159,28,0.4)]"
                      : isCore
                        ? "bg-[#e8dcc8] text-[#12100a]"
                        : "border border-[#8a7a5c]/40 text-[#8a7a5c] bg-[#12100a]"
                    }`}
                >
                  [{member.role}]
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Footer Output Line + Role Count Legend */}
      <div className="pt-4 border-t border-[#e8dcc8]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a7a5c]">
        <div>
          &gt; {filteredMembers.length} processes allocated in .data segment — END OF OUTPUT
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ff9f1c]" />
            <span>LEAD ({leadCount})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#e8dcc8]" />
            <span>CORE ({coreCount})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8a7a5c]" />
            <span>MEMBER ({memberCount})</span>
          </span>
        </div>
      </div>

      {/* 5. Kernel Diagnostics Box */}
      <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/95 text-[11px] text-[#8a7a5c] space-y-1">
        <div className="text-[#e8dcc8] font-bold">[KERNEL_DIAGNOSTICS]</div>
        <div className="leading-relaxed">
          THREAD_POOLS: ALLOCATED (0x40400000 - 0x4040FFFF) | PAGE_SIZE: 4096 BYTES | ARCH: x86_64-elf-posix
        </div>
        <div className="leading-relaxed text-[#8a7a5c]">
          ALL SYMBOLS LOADED FROM /etc/cclub/registry.db — ZERO SEGFAULTS REGISTERED THIS SESSION.
        </div>
      </div>
    </div>
  );
}
