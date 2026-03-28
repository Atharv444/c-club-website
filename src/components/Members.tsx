"use client";

import { motion } from "framer-motion";

const MEMBERS = [
  "Atharv B",
  "Uthkarsh M",
  "Varshini Marni",
  "Amogh",
  "Archana",
  "Arpitha",
  "Likith P",
  "Vaishnavi Yashokrithi",
  "Unais",
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
    <section id="members" className="relative z-10 px-4 md:px-8 py-12 max-w-6xl mx-auto crt-text-glow">
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
        {MEMBERS.map((name, index) => {
          const isLast = index === MEMBERS.length - 1 && MEMBERS.length % 2 !== 0;

          return (
            <motion.div
              key={name}
              variants={memberVariants}
              className={`terminal-border rounded-lg p-4 bg-terminal-bg/80 backdrop-blur-sm group relative overflow-hidden ${
                isLast ? "md:col-span-2 md:max-w-[calc(50%-6px)] md:mx-auto" : ""
              }`}
              whileHover={{ scale: 1.01 }}
            >
              {/* Default view */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-terminal-dim text-xs w-6 font-mono">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span className="text-white text-sm font-medium font-mono group-hover:text-terminal-green transition-colors">
                    {name}
                  </span>
                </div>
                <span className="text-terminal-dim text-xs group-hover:hidden">
                  [HOVER]
                </span>
              </div>

              {/* Hover reveal */}
              <div className="absolute inset-0 bg-terminal-bg/95 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-terminal-dim text-xs w-6 font-mono">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span className="text-terminal-green text-sm font-bold font-mono">
                    {name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-terminal-amber text-xs font-bold font-mono">
                    [ ROLE: UNASSIGNED ]
                  </div>
                  <div className="text-terminal-dim text-[10px] mt-0.5 font-mono">
                    ACCESS: PENDING
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
