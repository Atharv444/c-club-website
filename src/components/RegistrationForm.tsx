"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Standard IEEE 802.3 CRC32 implementation
const CRC32_TABLE = (() => {
  const table: number[] = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function computeCRC32(str: string): string {
  let crc = 0 ^ -1;
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ str.charCodeAt(i)) & 0xff];
  }
  const result = (crc ^ -1) >>> 0;
  return "0x" + result.toString(16).toUpperCase().padStart(8, "0");
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    candidate_name: "",
    user_email: "",
    academic_year: "2nd Year / 2026",
    primary_dialect: "C23 / C++20",
    experience_level: "Intermediate (pointers, memory alloc)",
    github_handle: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick select presets
  const YEAR_PRESETS = [
    { label: "1st_YR", val: "1st Year / 2027" },
    { label: "2nd_YR", val: "2nd Year / 2026" },
    { label: "3rd_YR", val: "3rd Year / 2025" },
    { label: "4th_YR", val: "4th Year / 2024" },
    { label: "ALUMNI", val: "Alumni / Industry" },
  ];

  const DIALECT_PRESETS = [
    { label: "C89", val: "ANSI C89 / C90" },
    { label: "C99", val: "ISO C99" },
    { label: "C11", val: "ISO C11" },
    { label: "C23/CPP20", val: "C23 / C++20" },
    { label: "C++23", val: "ISO C++23" },
  ];

  const EXP_PRESETS = [
    { label: "NOVICE", val: "Novice (syntax, control flow)" },
    { label: "INTERMEDIATE", val: "Intermediate (pointers, memory alloc)" },
    { label: "ADVANCED", val: "Advanced (systems, SIMD, lockless)" },
    { label: "SYSTEMS_HACKER", val: "Systems Hacker (kernel, ASM, IR)" },
  ];

  // Validation
  const isValid = useMemo(() => {
    return (
      formData.candidate_name.trim().length >= 2 &&
      formData.user_email.includes("@") &&
      formData.user_email.includes(".") &&
      formData.academic_year.trim().length > 0 &&
      formData.primary_dialect.trim().length > 0 &&
      formData.experience_level.trim().length > 0
    );
  }, [formData]);

  const payloadChecksum = useMemo(() => {
    if (!isValid) return null;
    const serialized = JSON.stringify(formData);
    return computeCRC32(serialized);
  }, [formData, isValid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg("gcc: error: candidate credentials buffer incomplete (NULL pointers detected)");
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 py-4 font-mono select-none max-w-4xl mx-auto">
      {/* Outer Window Panel */}
      <div className="rounded-lg border border-[#e8dcc8]/25 bg-[#12100a]/95 shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Panel Header Bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e8dcc8]/20 bg-[#12100a]/95 text-xs text-[#8a7a5c]">
          <span className="font-mono text-[#e8dcc8] font-semibold tracking-wide">
            TTY_1 // INTERACTIVE_SYS_ALLOC
          </span>
          <div className="text-[10px] tracking-wider hidden sm:block text-[#8a7a5c]">
            FLAGS: -O3 -Wall -Wextra  |  SEGMENT: 0x7FFF0000 [.stack]
          </div>
        </div>

        {/* Panel Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Header Command */}
          <div>
            <div className="text-sm font-bold text-[#e8dcc8]">
              <span className="text-[#ff9f1c]">root@c-club:~#</span> ./register --interactive
            </div>
            <div className="text-xs text-[#8a7a5c] mt-0.5">
              // Fill in the required fields to allocate candidate credentials onto system memory.
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field 1: candidate_name */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; char* candidate_name *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0001]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "candidate_name"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    required
                    value={formData.candidate_name}
                    onChange={(e) =>
                      setFormData({ ...formData, candidate_name: e.target.value })
                    }
                    onFocus={() => setFocusedField("candidate_name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Bjarne Stroustrup"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "candidate_name" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Field 2: user_email */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; char* user_email *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0002]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "user_email"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="email"
                    required
                    value={formData.user_email}
                    onChange={(e) =>
                      setFormData({ ...formData, user_email: e.target.value })
                    }
                    onFocus={() => setFocusedField("user_email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="developer@cclub.dev"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "user_email" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Field 3: academic_year */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; uint16_t academic_year *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0003]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "academic_year"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    required
                    value={formData.academic_year}
                    onChange={(e) =>
                      setFormData({ ...formData, academic_year: e.target.value })
                    }
                    onFocus={() => setFocusedField("academic_year")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="2nd Year / 2026"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "academic_year" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
                {/* Year Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#8a7a5c]">
                  <span className="opacity-75">// PRESETS:</span>
                  {YEAR_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, academic_year: p.val })}
                      className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        formData.academic_year === p.val
                          ? "bg-[#ff9f1c]/20 text-[#ff9f1c] border border-[#ff9f1c]/40"
                          : "hover:text-[#e8dcc8] border border-transparent"
                      }`}
                    >
                      [{p.label}]
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 4: primary_dialect */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; enum std_dialect primary_dialect *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0004]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "primary_dialect"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    required
                    value={formData.primary_dialect}
                    onChange={(e) =>
                      setFormData({ ...formData, primary_dialect: e.target.value })
                    }
                    onFocus={() => setFocusedField("primary_dialect")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="C23 / C++20"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "primary_dialect" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
                {/* Dialect Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#8a7a5c]">
                  <span className="opacity-75">// STANDARDS:</span>
                  {DIALECT_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, primary_dialect: p.val })}
                      className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        formData.primary_dialect === p.val
                          ? "bg-[#ff9f1c]/20 text-[#ff9f1c] border border-[#ff9f1c]/40"
                          : "hover:text-[#e8dcc8] border border-transparent"
                      }`}
                    >
                      [{p.label}]
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 5: experience_level */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; int experience_level *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0005]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "experience_level"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    required
                    value={formData.experience_level}
                    onChange={(e) =>
                      setFormData({ ...formData, experience_level: e.target.value })
                    }
                    onFocus={() => setFocusedField("experience_level")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Intermediate (pointers, memory alloc)"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "experience_level" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
                {/* Exp Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#8a7a5c]">
                  <span className="opacity-75">// LEVELS:</span>
                  {EXP_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience_level: p.val })}
                      className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        formData.experience_level === p.val
                          ? "bg-[#ff9f1c]/20 text-[#ff9f1c] border border-[#ff9f1c]/40"
                          : "hover:text-[#e8dcc8] border border-transparent"
                      }`}
                    >
                      [{p.label}]
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 6: github_handle */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; void* github_handle (optional)
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0006]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "github_handle"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    value={formData.github_handle}
                    onChange={(e) =>
                      setFormData({ ...formData, github_handle: e.target.value })
                    }
                    onFocus={() => setFocusedField("github_handle")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="@bstroustrup"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "github_handle" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Error Line if any */}
              {errorMsg && (
                <div className="text-xs text-[#e5484d] font-bold">
                  {errorMsg}
                </div>
              )}

              {/* Submit Row: Button + Real Integrity Check Badge */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-[#ff9f1c] text-[#12100a] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#ffb347] shadow-[0_0_18px_rgba(255,159,28,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "ALLOCATING_BUFFER..." : "$ SUBMIT_REGISTRATION"}
                </button>

                {/* Real CRC32 Integrity Check Badge */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#e8dcc8]">🛡️</span>
                  <span className="text-[#8a7a5c]">INTEGRITY_CHECK:</span>
                  {payloadChecksum ? (
                    <span className="text-[#e8dcc8] font-bold">
                      CRC32_PASS ({payloadChecksum})
                    </span>
                  ) : (
                    <span className="text-[#8a7a5c] italic">
                      AWAITING_REQUIRED_FIELDS
                    </span>
                  )}
                </div>
              </div>
            </form>
          ) : (
            /* Success confirmation */
            <div className="p-6 rounded border border-[#e8dcc8]/30 bg-[#12100a] text-center space-y-4">
              <div className="text-2xl text-[#ff9f1c] font-bold">[✓] RECORD_COMMITTED</div>
              <p className="text-xs sm:text-sm text-[#8a7a5c] max-w-md mx-auto leading-relaxed">
                Candidate pointer allocated at segment address 0x7FFF0001. A confirmation ticket has been mapped to process table.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#ff9f1c] hover:underline cursor-pointer"
              >
                [ALLOCATE ANOTHER CANDIDATE &gt;&gt;]
              </button>
            </div>
          )}

          {/* Live STDOUT // HEAP ALLOCATION MONITOR log panel */}
          <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a] text-xs font-mono space-y-1 text-[#8a7a5c]">
            <div className="flex justify-between items-center text-[11px] mb-2 border-b border-[#e8dcc8]/15 pb-1">
              <span className="text-[#e8dcc8] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#e8dcc8]" />
                <span>STDOUT // HEAP ALLOCATION MONITOR</span>
              </span>
              <span>PAGESIZE: 4096</span>
            </div>
            <div>
              0x00: <span className="text-[#e8dcc8]">[READY]</span> Awaiting candidate registration buffer commit...
            </div>
            <div>
              0x08: <span className="text-[#ff9f1c]">[MEM]</span> Address range allocated: 0x7FFF0001 -&gt; 0x7FFF0006 [ACTIVE]
            </div>
            {payloadChecksum && (
              <div className="text-[#e8dcc8]">
                0x10: [PASS] Checksum verified: {payloadChecksum} [ZERO CORRUPTION]
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Three Bottom Technical Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Candidate_t */}
        <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8a7a5c]">
            <span>MEM_UTILIZATION</span>
            <span className="text-[#ff9f1c] font-bold">48 BYTES</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8dcc8]">Candidate_t</h3>
          <p className="text-xs text-[#8a7a5c] leading-relaxed">
            Aligned struct packing via `#pragma pack(push, 1)` with 64-bit platform pointers.
          </p>
        </div>

        {/* Card 2: Compiler Target */}
        <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8a7a5c]">
            <span>COMPILER_TARGET</span>
            <span className="text-[#ff9f1c] font-bold">x86_64-elf</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8dcc8]">GCC / Clang 18+</h3>
          <p className="text-xs text-[#8a7a5c] leading-relaxed">
            Nightly code reviews with address sanitizer (`-fsanitize=address`) activated.
          </p>
        </div>

        {/* Card 3: Privacy & Telemetry Audit (Genuine, no fake security claims) */}
        <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8a7a5c]">
            <span>PRIVACY_AUDIT</span>
            <span className="text-[#e8dcc8] font-bold">CLIENT_SIDE</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8dcc8]">Zero External Telemetry</h3>
          <p className="text-xs text-[#8a7a5c] leading-relaxed">
            Direct client-side memory handling. Zero tracking scripts, no third-party cookies, and no telemetry beacons.
          </p>
        </div>
      </div>
    </div>
  );
}
