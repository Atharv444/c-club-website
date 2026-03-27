"use client";

import { motion } from "framer-motion";

interface Member {
  name: string;
  role: string;
  accessLevel: string;
  specialization: string;
}

const MEMBERS: Member[] = [
  {
    name: "Arjun Sharma",
    role: "Club President",
    accessLevel: "ADMIN [LVL-5]",
    specialization: "Systems Programming",
  },
  {
    name: "Priya Patel",
    role: "Lead Developer",
    accessLevel: "ROOT [LVL-5]",
    specialization: "Compiler Design",
  },
  {
    name: "Vikram Singh",
    role: "Pointer Specialist",
    accessLevel: "SUDO [LVL-4]",
    specialization: "Memory Management",
  },
  {
    name: "Ananya Rao",
    role: "Algorithm Lead",
    accessLevel: "EXEC [LVL-4]",
    specialization: "Competitive Programming",
  },
  {
    name: "Rohit Kumar",
    role: "Embedded Engineer",
    accessLevel: "EXEC [LVL-4]",
    specialization: "Bare-Metal C",
  },
  {
    name: "Sneha Gupta",
    role: "CTF Captain",
    accessLevel: "SUDO [LVL-4]",
    specialization: "Binary Exploitation",
  },
  {
    name: "Karthik Menon",
    role: "Workshop Lead",
    accessLevel: "MOD [LVL-3]",
    specialization: "Data Structures",
  },
  {
    name: "Divya Nair",
    role: "Community Manager",
    accessLevel: "MOD [LVL-3]",
    specialization: "Open Source",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const memberVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function Members() {
  return (
    <section id="members" className="relative z-10 px-4 md:px-8 py-14 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-terminal-green text-glow text-xl md:text-2xl font-bold mb-2">
          $ cat /etc/passwd | grep club
        </h2>
        <p className="text-terminal-dim text-sm">
          // Hover to reveal access credentials
        </p>
      </motion.div>

      {/* Members Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {MEMBERS.map((member, index) => (
          <motion.div
            key={member.name}
            variants={memberVariants}
            className="terminal-border rounded-lg p-4 bg-terminal-bg/80 backdrop-blur-sm group relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            {/* Default view */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-terminal-dim text-xs w-6">
                  {String(index).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-white text-sm font-medium group-hover:text-terminal-green transition-colors">
                    {member.name}
                  </span>
                  <span className="text-terminal-dim text-xs ml-3">
                    {member.role}
                  </span>
                </div>
              </div>
              <span className="text-terminal-dim text-xs group-hover:hidden">
                [HOVER]
              </span>
            </div>

            {/* Hover reveal */}
            <div className="absolute inset-0 bg-terminal-bg/95 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div>
                <div className="text-terminal-green text-sm font-bold mb-0.5">
                  {member.name}
                </div>
                <div className="text-terminal-dim text-xs">
                  {member.specialization}
                </div>
              </div>
              <div className="text-right">
                <div className="text-terminal-amber text-xs font-bold">
                  ACCESS: {member.accessLevel}
                </div>
                <div className="text-terminal-dim text-[10px] mt-0.5">
                  PID: {1024 + index * 337}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
