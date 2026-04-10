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
    <section id="overview" className="relative z-10 px-4 md:px-8 py-12 max-w-6xl mx-auto crt-text-glow">
      <motion.div
        className="relative overflow-hidden rounded border border-synth-cyan/30 bg-[#000000]"
        style={{
          boxShadow:
            "0 0 15px rgba(0, 243, 255, 0.07), 0 0 30px rgba(0, 243, 255, 0.04), inset 0 0 60px rgba(0, 0, 0, 0.8)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* CRT Scanline Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,243,255,0.03) 1px, rgba(0,243,255,0.03) 2px)",
          }}
        />

        {/* Flicker layer */}
        <div className="pointer-events-none absolute inset-0 z-20 animate-flicker" />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Command Prompt */}
          <motion.h2
            className="text-sm md:text-base font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-synth-magenta text-glow-magenta">root@c-club:~$</span>{" "}
            <span className="text-synth-cyan text-glow-cyan">
              cat SYSTEM_OVERVIEW
            </span>
            <span className="animate-blink ml-1 text-synth-cyan">█</span>
          </motion.h2>

          {/* Output Lines */}
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

          {/* Glowing separator */}
          <hr className="my-6 border-0 border-t border-synth-magenta opacity-50 shadow-[0_0_10px_rgba(255,0,255,0.8)]" />

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            {[
              { label: "MEMBERS", value: "50+", color: "text-synth-cyan" },
              { label: "PROJECTS", value: "25+", color: "text-terminal-dim" },
              { label: "EVENTS/YR", value: "12", color: "text-terminal-amber" },
              { label: "UPTIME", value: "99.9%", color: "text-synth-cyan" },
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
        </div>
      </motion.div>
    </section>
  );
}
