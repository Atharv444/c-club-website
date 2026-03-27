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
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="register" className="relative z-10 px-4 md:px-8 py-14 max-w-3xl mx-auto">
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
            register.sh — bash
          </span>
        </div>

        <motion.h2
          className="text-terminal-green text-glow text-xl md:text-2xl font-bold mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          $ ./register --interactive
        </motion.h2>
        <p className="text-terminal-dim text-sm mb-8">
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
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-transparent border-b border-terminal-border text-white text-sm py-2 px-1 placeholder-gray-700 focus:border-terminal-green transition-colors"
                    />
                  </div>
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
              REF: USR-{Math.random().toString(36).substring(2, 8).toUpperCase()}
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
      </motion.div>
    </section>
  );
}
