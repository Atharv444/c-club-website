"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface MemorySegment {
  id: string;
  name: string;
  addr: string;
  href: string;
  description: string;
}

const SEGMENTS: MemorySegment[] = [
  { id: "stack", name: ".stack", addr: "0x7FFF", href: "/register", description: "call stack & local vars (Register)" },
  { id: "heap", name: ".heap", addr: "0x6000", href: "/events", description: "dynamic memory pool (Events)" },
  { id: "bss", name: ".bss", addr: "0x4080", href: "#", description: "uninitialized globals" },
  { id: "data", name: ".data", addr: "0x4040", href: "/members", description: "initialized data & tables (Members)" },
  { id: "text", name: ".text", addr: "0x4000", href: "/", description: "executable code segment (Overview)" },
];

export default function MemoryLayoutSidebar() {
  const pathname = usePathname();

  // Semantic mapping across all pages:
  // Overview → .text
  // Events → .heap
  // Members → .data
  // Register → .stack
  const getActiveSegment = (): string => {
    if (!pathname || pathname === "/") return "text";
    if (pathname.startsWith("/events")) return "heap";
    if (pathname.startsWith("/members")) return "data";
    if (pathname.startsWith("/register")) return "stack";
    return "text";
  };

  const activeSegment = getActiveSegment();

  return (
    <aside
      className="hidden xl:flex fixed left-5 top-20 bottom-8 z-30 flex-col justify-center w-20 font-mono select-none"
      aria-label="Virtual Memory Layout"
    >
      <div className="flex flex-col items-center">
        {/* Top Bound: 0x7FFFFFFF [HIGH_MEM] */}
        <div className="text-[10px] text-[#8a7a5c] text-center mb-2 leading-tight">
          <div className="tracking-tighter font-semibold">0x7FFFFFFF</div>
          <div className="text-[9px] opacity-80">[HIGH_MEM]</div>
        </div>

        {/* Vertical Memory Segments Container */}
        <div className="w-full flex flex-col gap-1.5 p-1.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.4)]">
          {SEGMENTS.map((seg) => {
            const isActive = activeSegment === seg.id;
            const content = (
              <div
                className={`w-full py-1.5 px-1 rounded text-center transition-all duration-150 ${
                  isActive
                    ? "bg-[#ff9f1c] text-[#12100a] font-bold shadow-[0_0_12px_rgba(255,159,28,0.4)]"
                    : "bg-[#12100a]/80 text-[#8a7a5c] hover:text-[#e8dcc8] hover:bg-[#e8dcc8]/10 border border-[#e8dcc8]/15"
                }`}
              >
                <div
                  className={`text-[9px] tracking-tight leading-none mb-0.5 ${
                    isActive ? "text-[#12100a] font-bold opacity-90" : "text-[#8a7a5c]"
                  }`}
                >
                  {seg.addr}
                </div>
                <div
                  className={`text-[11px] tracking-wider leading-none font-semibold ${
                    isActive ? "text-[#12100a]" : "text-[#e8dcc8]"
                  }`}
                >
                  {seg.name}
                </div>
              </div>
            );

            if (seg.href === "#") {
              return (
                <div key={seg.id} title={`${seg.name}: ${seg.description}`}>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={seg.id}
                href={seg.href}
                title={`${seg.name}: ${seg.description}`}
                className="block cursor-pointer"
              >
                {content}
              </Link>
            );
          })}
        </div>

        {/* Bottom Bound: [LOW_MEM] 0x00400000 */}
        <div className="text-[10px] text-[#8a7a5c] text-center mt-2 leading-tight">
          <div className="text-[9px] opacity-80">[LOW_MEM]</div>
          <div className="tracking-tighter font-semibold">0x00400000</div>
        </div>
      </div>
    </aside>
  );
}
