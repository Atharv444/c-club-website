"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Kernel Exception caught by boundary:", error);
  }, [error]);

  return (
    <section className="relative z-10 px-4 md:px-8 py-16 max-w-4xl mx-auto font-mono">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded border border-[#e8dcc8]/25 bg-[#12100a]/85 backdrop-blur-md p-6 md:p-10 shadow-[0_0_25px_rgba(0,0,0,0.5)]"
      >
        {/* Kernel Panic Title */}
        <div className="mb-6 pb-4 border-b border-[#e8dcc8]/20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[#e5484d] text-base md:text-lg font-bold">
              Kernel panic - not syncing: Fatal exception in runtime
            </span>
          </div>
          <span className="text-xs text-[#8a7a5c]">ERR_CRITICAL_PANIC</span>
        </div>

        {/* Diagnostic Stack */}
        <div className="mb-8 p-4 md:p-5 rounded bg-[#12100a]/90 border border-[#e8dcc8]/15 font-mono text-xs md:text-sm text-[#e8dcc8] overflow-x-auto leading-relaxed">
          <p className="text-[#e5484d] mb-2 font-semibold">
            CPU 0: Machine Check Exception (MCE)
          </p>
          <p className="text-[#e8dcc8]">
            {error.message || "An unexpected segmentation fault occurred during pipeline execution."}
          </p>
          {error.digest && (
            <p className="text-[#8a7a5c] mt-2">
              DIGEST_HASH: {error.digest}
            </p>
          )}
        </div>

        {/* Amber Actions */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-bold tracking-wider rounded border border-[#ff9f1c] bg-[#ff9f1c]/10 text-[#ff9f1c] hover:bg-[#ff9f1c]/25 shadow-[0_0_15px_rgba(255,159,28,0.3)] transition-all cursor-pointer flex items-center justify-center"
          >
            <span>$ ./reboot</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 text-sm font-medium tracking-wider rounded border border-[#e8dcc8]/30 text-[#e8dcc8] hover:border-[#e8dcc8] hover:bg-[#e8dcc8]/10 transition-all cursor-pointer"
          >
            &gt; RETURN_TO_ROOT
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
