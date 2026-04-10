"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MemberEntry {
  name: string;
  uid: number;
  role: string;
  access: string;
  shell: string;
}

const MEMBERS: MemberEntry[] = [
  { name: "Atharv B", uid: 0, role: "LEAD", access: "GRANTED", shell: "/bin/bash" },
  { name: "Uthkarsh M", uid: 1, role: "CORE", access: "GRANTED", shell: "/bin/bash" },
  { name: "Varshini Marni", uid: 2, role: "CORE", access: "GRANTED", shell: "/bin/zsh" },
  { name: "Amogh", uid: 3, role: "MEMBER", access: "ACTIVE", shell: "/bin/bash" },
  { name: "Archana", uid: 4, role: "MEMBER", access: "ACTIVE", shell: "/bin/bash" },
  { name: "Arpitha", uid: 5, role: "MEMBER", access: "ACTIVE", shell: "/bin/zsh" },
  { name: "Likith P", uid: 6, role: "MEMBER", access: "ACTIVE", shell: "/bin/bash" },
  { name: "Vaishnavi YashoKirthi S", uid: 7, role: "MEMBER", access: "ACTIVE", shell: "/bin/bash" },
  { name: "Unais", uid: 8, role: "MEMBER", access: "ACTIVE", shell: "/bin/sh" },
];

function MemberRow({ member, index }: { member: MemberEntry; index: number }) {
  const [hovered, setHovered] = useState(false);

  const username = member.name.split(" ")[0].toLowerCase();
  const uidStr = String(member.uid).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group transition-all duration-300 cursor-default flex flex-col justify-between p-3 rounded-md border font-mono ${
        hovered
          ? "bg-black/60 border-synth-magenta shadow-[0_0_12px_rgba(255,0,255,0.25)] scale-[1.01] z-10 relative"
          : "bg-black/40 border-synth-cyan/20"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Left & Center */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
          {/* Left: ID (Dimmed) */}
          <div className="opacity-70 text-xs shrink-0 flex items-center gap-1 mt-1 md:mt-0">
            <span className="text-terminal-dim">club:x:</span>
            <span className="text-synth-cyan">{uidStr}</span>
          </div>

          {/* Center: Name & Path */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
            <span
              className={`text-base font-bold transition-colors ${
                hovered ? "text-synth-cyan text-glow-cyan" : "text-synth-cyan"
              }`}
            >
              {member.name}
            </span>
            <span className="text-terminal-dim text-[10px] md:text-xs tracking-wider">
              /home/{username}:{member.shell}
            </span>
          </div>
        </div>

        {/* Right: Role */}
        <div className="shrink-0 ml-2">
          <span
            className={`text-xs font-bold transition-all ${
              hovered
                ? "text-synth-magenta text-glow-magenta"
                : "text-synth-magenta/80"
            }`}
          >
            [ {member.role} ]
          </span>
        </div>
      </div>

      {/* Hover Reveal (Access Info) */}
      <motion.div
        initial={false}
        animate={{
          height: hovered ? "auto" : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden w-full"
      >
        <div className="pt-3 mt-3 border-t border-synth-magenta/20 flex flex-wrap items-center gap-3 md:gap-4 text-xs font-mono">
          <span className="text-terminal-dim">
            UID: {uidStr} | GID: {uidStr}
          </span>
          <span className="text-terminal-dim hidden sm:inline">|</span>
          <span
            className={
              member.access === "GRANTED"
                ? "text-synth-cyan"
                : "text-terminal-amber"
            }
          >
            ACCESS: {member.access}
          </span>
          <span className="text-terminal-dim hidden sm:inline">|</span>
          <span className="text-terminal-dim">
            LAST_LOGIN: {new Date().toISOString().split("T")[0]}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MembersPage() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-12 max-w-4xl mx-auto crt-text-glow font-mono">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-synth-cyan text-glow-cyan text-xl md:text-2xl font-bold mb-2">
          <span className="text-synth-magenta text-glow-magenta">root@c-club:~$</span>{" "}
          cat /etc/passwd | grep club
        </h1>
        <p className="text-terminal-dim text-sm">
          // Hover to reveal access credentials
        </p>
      </motion.div>

      {/* List - De-congested with flex-col and gap */}
      <div className="flex flex-col gap-4">
        {MEMBERS.map((member, index) => (
          <MemberRow key={member.name} member={member} index={index} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-8 text-terminal-dim text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-synth-cyan">&gt;</span> {MEMBERS.length} entries
        matched in /etc/passwd — END OF OUTPUT
        <span className="animate-blink ml-1 text-synth-cyan">█</span>
      </motion.div>
    </section>
  );
}
