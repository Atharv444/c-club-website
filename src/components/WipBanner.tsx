"use client";

import React from "react";

interface WipBannerProps {
  message?: string;
  flag?: string;
  className?: string;
}

/**
 * Reusable Compiler-Warning Banner Component
 * Styled like a GCC / Clang compiler diagnostic warning:
 * warning: this page may exhibit undefined behavior [-Wwip]
 * 
 * Preserved Usage Example:
 * ```tsx
 * import WipBanner from "@/components/WipBanner";
 * 
 * export default function ExampleSection() {
 *   return (
 *     <div className="mb-6 max-w-xl mx-auto text-left">
 *       <WipBanner message="this module is currently being compiled" flag="-Wwip" />
 *     </div>
 *   );
 * }
 * ```
 */
export default function WipBanner({
  message = "this page may exhibit undefined behavior",
  flag = "-Wwip",
  className = "",
}: WipBannerProps) {
  return (
    <div
      role="alert"
      className={`font-mono text-xs md:text-sm p-4 rounded-r border border-l-4 border-[#e8dcc8]/25 border-l-[#e5484d] bg-[#12100a]/95 shadow-[0_0_15px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="flex items-start gap-2">
        <span className="text-[#e5484d] font-bold select-none">warning:</span>
        <span className="text-[#e8dcc8] wavy-underline font-medium">
          {message}
        </span>
        <span className="text-[#8a7a5c] font-normal select-none">
          [{flag}]
        </span>
      </div>
      <div className="text-[#e5484d]/70 text-[11px] mt-1 select-none font-bold tracking-tighter">
        {"         ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"}
      </div>
    </div>
  );
}
