"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import TerminalPrompt from "@/components/TerminalPrompt";

export default function NotFound() {
  const pathname = usePathname();
  const [attemptedUrl, setAttemptedUrl] = useState(pathname || "/unknown");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAttemptedUrl(window.location.pathname || pathname || "/unknown");
    }
  }, [pathname]);

  return (
    <section className="relative z-10 px-4 md:px-8 py-12 max-w-4xl mx-auto font-mono">
      {/* Main terminal prompt line without cursor */}
      <div className="mb-6">
        <TerminalPrompt
          command="$ ./c-club-router --dispatch"
          comment="// Page fault encountered: target address not mapped in virtual memory"
          showCursor={false}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded border border-[#e8dcc8]/25 bg-[#12100a]/85 backdrop-blur-md p-6 md:p-10 shadow-[0_0_25px_rgba(0,0,0,0.5)]"
      >
        {/* Crash Title */}
        <div className="mb-6 pb-4 border-b border-[#e8dcc8]/20 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[#e5484d] text-base md:text-lg font-bold">
              Segmentation fault (core dumped)
            </span>
          </div>
          <span className="text-xs text-[#8a7a5c] font-medium">SIGSEGV // ERR_PAGE_FAULT</span>
        </div>

        {/* Diagnostic Crash Dump / Stack Trace */}
        <div className="mb-8 p-4 md:p-5 rounded bg-[#12100a]/90 border border-[#e8dcc8]/15 font-mono text-xs md:text-sm text-[#e8dcc8] overflow-x-auto leading-relaxed">
          <p className="text-[#e5484d] mb-3 font-semibold">
            [1]    40412 segmentation fault (core dumped)  ./c-club-router --dispatch
          </p>
          <p className="text-[#8a7a5c] mb-3">
            Program received signal SIGSEGV, Segmentation fault (invalid memory dereference).
          </p>
          <div className="text-[#e8dcc8] space-y-1">
            <p className="text-[#8a7a5c]">// Stack backtrace:</p>
            <p className="text-[#e8dcc8]">
              #0 &nbsp;0x00007fff in <span className="text-[#ff9f1c]">render_page</span> (url=&quot;<span className="text-[#e8dcc8] font-semibold">{attemptedUrl}</span>&quot;) at router.c:404
            </p>
            <p className="text-[#e8dcc8]">
              #1 &nbsp;0x00007ffe in <span className="text-[#ff9f1c]">handle_request</span> () at server.c:12
            </p>
            <p className="text-[#e8dcc8]">
              #2 &nbsp;0x00007ffd in <span className="text-[#ff9f1c]">main</span> () at app.c:1
            </p>
          </div>
          <p className="text-[#8a7a5c] mt-3">
            // Core dump stored in /var/crash/core.404.zst (size: 0x4000 bytes)
          </p>
        </div>

        {/* Single Amber Recovery Button: $ cd / */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-[#8a7a5c]">
            // Return execution control to root inode
          </p>

          <Link
            href="/"
            className="px-6 py-3 text-sm font-bold tracking-wider rounded border border-[#ff9f1c] bg-[#ff9f1c]/10 text-[#ff9f1c] hover:bg-[#ff9f1c]/25 shadow-[0_0_15px_rgba(255,159,28,0.3)] transition-all cursor-pointer flex items-center justify-center"
          >
            <span>$ cd /</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
