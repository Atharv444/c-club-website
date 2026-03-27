"use client";

import { motion } from "framer-motion";

const MISSION_LINES = [
  "> Welcome to C://CLUB — your gateway to low-level mastery.",
  "",
  "We are a community of programmers passionate about C and C++,",
  "dedicated to understanding systems from the ground up.",
  "",
  "Our mission: push the boundaries of performance, explore",
  "memory management, data structures, algorithms, and build",
  "software that runs at the speed of thought.",
  "",
  "From pointers to polymorphism, from embedded systems to",
  "competitive programming — we compile, link, and execute.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function SystemOverview() {
  return (
    <section id="overview" className="relative z-10 px-4 md:px-8 py-14 max-w-5xl mx-auto">
      <motion.div
        className="terminal-border rounded-lg p-6 md:p-8 bg-terminal-bg/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-terminal-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-red" />
            <div className="w-3 h-3 rounded-full bg-terminal-amber" />
            <div className="w-3 h-3 rounded-full bg-terminal-green" />
          </div>
          <span className="text-terminal-dim text-xs">
            system_overview.sh — bash
          </span>
        </div>

        {/* Section title */}
        <div className="mb-6">
          <motion.h2
            className="text-terminal-green text-glow text-xl md:text-2xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            $ cat SYSTEM_OVERVIEW
            <span className="animate-blink ml-1">█</span>
          </motion.h2>
        </div>

        {/* Content */}
        <motion.div
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {MISSION_LINES.map((line, index) => (
            <motion.p
              key={index}
              variants={lineVariants}
              className={`text-sm md:text-base leading-relaxed ${
                line.startsWith(">")
                  ? "text-terminal-green font-semibold"
                  : line === ""
                  ? "h-3"
                  : "text-gray-400"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Stats bar */}
        <div className="mt-8 pt-4 border-t border-terminal-border flex flex-wrap gap-6">
          {[
            { label: "MEMBERS", value: "50+", color: "text-terminal-green" },
            { label: "PROJECTS", value: "25+", color: "text-terminal-cyan" },
            { label: "EVENTS/YR", value: "12", color: "text-terminal-amber" },
            { label: "UPTIME", value: "99.9%", color: "text-terminal-green" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className={`text-lg md:text-xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-terminal-dim text-xs">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
