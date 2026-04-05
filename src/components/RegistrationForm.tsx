"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

const FIELDS: FormField[] = [
  { name: "name", label: "Enter your name", type: "text", placeholder: "John Doe" },
  { name: "email", label: "Enter your email", type: "email", placeholder: "user@cclub.dev" },
  { name: "year", label: "Year of study", type: "text", placeholder: "2nd Year" },
  { name: "language", label: "Preferred language (C/C++)", type: "text", placeholder: "C++" },
  { name: "experience", label: "Experience level", type: "text", placeholder: "intermediate" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [segfaultError, setSegfaultError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "square";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore if audio context fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSegfaultError(null);

    const email = formData["email"] || "";
    if (!email.includes("@") || !email.includes(".")) {
      setSegfaultError("ERROR: Segmentation fault in field [email]. Please re-allocate.");
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      setSegfaultError("ERROR: Submission endpoint is not configured.");
      return;
    }

    if (!formRef.current) {
      setSegfaultError("ERROR: Form is unavailable. Please reload and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData(formRef.current);
      const formDataObj = Object.fromEntries(data.entries()) as Record<string, string>;

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      setSubmitted(true);
    } catch (error) {
      setSegfaultError("ERROR: Failed to submit registration. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="register" className="relative z-10 px-4 md:px-8 py-12 max-w-4xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded border border-green-500/30 bg-[#000000]"
        style={{
          boxShadow:
            "0 0 15px rgba(0, 255, 65, 0.07), 0 0 30px rgba(0, 255, 65, 0.04), inset 0 0 60px rgba(0, 0, 0, 0.8)",
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
              "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,255,65,0.03) 1px, rgba(0,255,65,0.03) 2px)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 animate-flicker" />

        <div className="relative z-10 p-6 md:p-8">
          <motion.h2
            className="text-terminal-green text-sm md:text-base font-bold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-terminal-dim">root@c-club:~$</span>{" "}
            <span className="text-terminal-green text-glow">./register --interactive</span>
            <span className="animate-blink ml-1 text-terminal-green">█</span>
          </motion.h2>
          <p className="text-terminal-dim text-sm mb-6">
            // Fill in the required fields to register
          </p>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit}>
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {FIELDS.map((field) => (
                <motion.div key={field.name} variants={fieldVariants}>
                  <label className="block text-terminal-green text-sm mb-2">
                    &gt; {field.label}:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-dim text-sm">$</span>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      onKeyDown={playClickSound}
                      placeholder={field.placeholder}
                      required={field.name !== "email" || !segfaultError}
                      className={`w-full bg-transparent border-b text-white text-sm py-2 px-1 transition-colors focus:outline-none ${
                        field.name === "email" && segfaultError
                          ? "border-red-500 text-red-500 animate-[flicker_0.1s_infinite] shadow-[0_0_10px_rgba(255,0,0,0.5)] placeholder-red-500/50"
                          : "border-terminal-border placeholder-gray-700 focus:border-terminal-green"
                      }`}
                    />
                  </div>
                  {field.name === "email" && segfaultError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-xs mt-2 font-bold animate-[flicker_0.15s_infinite] text-shadow-[0_0_5px_rgba(255,0,0,0.8)] crt-text-glow"
                      style={{ textShadow: "0 0 5px rgba(255,0,0,0.8)" }}
                    >
                      {segfaultError}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.div variants={fieldVariants} className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative cursor-pointer glitch-hover bg-terminal-green/10 border border-terminal-green/40 text-terminal-green px-6 py-3 text-sm font-semibold rounded hover:bg-terminal-green/20 hover:border-terminal-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 border border-terminal-green border-t-transparent rounded-full animate-spin" />
                      PROCESSING...
                    </span>
                  ) : (
                    "$ SUBMIT_REGISTRATION"
                  )}
                </button>
              </motion.div>
            </motion.div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10"
          >
            <div className="text-terminal-green text-glow text-4xl mb-4">✓</div>
            <h3 className="text-terminal-green text-glow text-lg font-bold mb-2">
              [REGISTRATION COMPLETE]
            </h3>
            <p className="text-terminal-dim text-sm mb-4">
              Your access request has been logged and is pending approval.
            </p>
            <div className="inline-block terminal-border rounded px-4 py-2 text-xs text-terminal-dim">
              REF: USR-X7K4M2
              &nbsp;| STATUS: PENDING_REVIEW
            </div>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({});
                }}
                className="text-terminal-dim hover:text-terminal-green text-xs cursor-pointer glitch-hover transition-colors"
              >
                [SUBMIT ANOTHER &gt;&gt;]
              </button>
            </div>
          </motion.div>
        )}
        </div>
      </motion.div>
    </section>
  );
}
