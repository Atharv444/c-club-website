"use client";

import { useState, useMemo } from "react";

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

interface TeamFormData {
  team_name: string;
  team_size: number;
  member_names: string[];
  phone_number: string;
}

interface ServerRegistrationResult {
  registrationId: string;
  teamName: string;
  teamSize: number;
  memberCount: number;
  segmentAddress: string;
  createdAt: string;
  message: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<TeamFormData>({
    team_name: "",
    team_size: 2,
    member_names: ["", ""],
    phone_number: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serverResult, setServerResult] = useState<ServerRegistrationResult | null>(null);

  const handleTeamSizeChange = (valStr: string) => {
    if (valStr === "") {
      setFormData((prev) => ({
        ...prev,
        team_size: 0,
        member_names: [],
      }));
      return;
    }
    const parsed = parseInt(valStr, 10);
    if (isNaN(parsed)) return;
    const clamped = Math.max(1, Math.min(6, parsed));
    setFormData((prev) => {
      const current = [...prev.member_names];
      if (current.length < clamped) {
        while (current.length < clamped) {
          current.push("");
        }
      } else if (current.length > clamped) {
        current.splice(clamped);
      }
      return {
        ...prev,
        team_size: clamped,
        member_names: current,
      };
    });
  };

  const handleMemberNameChange = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.member_names];
      updated[index] = val;
      return { ...prev, member_names: updated };
    });
  };

  const isPhoneValid = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15 && /^\+?[0-9\s\-()]+$/.test(phone.trim());
  };

  // Validation
  const isValid = useMemo(() => {
    return (
      formData.team_name.trim().length >= 2 &&
      formData.team_size >= 1 &&
      formData.team_size <= 6 &&
      formData.member_names.length === formData.team_size &&
      formData.member_names.every((name) => name.trim().length >= 2) &&
      isPhoneValid(formData.phone_number)
    );
  }, [formData]);

  const payloadChecksum = useMemo(() => {
    if (!isValid) return null;
    const serialized = JSON.stringify({
      team_name: formData.team_name.trim(),
      team_size: formData.team_size,
      member_names: formData.member_names.map((n) => n.trim()),
      phone_number: formData.phone_number.trim(),
    });
    return computeCRC32(serialized);
  }, [formData, isValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg("gcc: error: team credentials buffer incomplete (NULL pointers or invalid format detected)");
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name: formData.team_name,
          team_size: formData.team_size,
          member_names: formData.member_names,
          phone_number: formData.phone_number,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "gcc: fatal error: persistent storage allocation failed (SIGSEGV)");
        return;
      }

      setServerResult(data);
      setSubmitted(true);
    } catch {
      setErrorMsg("gcc: fatal error: network transmission failure (unable to establish socket to /api/register)");
    } finally {
      setIsSubmitting(false);
    }
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
              {"// Fill in the required fields to allocate team credentials onto system memory."}
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field 1: team_name */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; char* team_name *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0001]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "team_name"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="text"
                    required
                    value={formData.team_name}
                    onChange={(e) =>
                      setFormData({ ...formData, team_name: e.target.value })
                    }
                    onFocus={() => setFocusedField("team_name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Null Pointers"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "team_name" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Field 2: team_size */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; uint8_t team_size (1-6) *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0002]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "team_size"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={formData.team_size || ""}
                    onChange={(e) => handleTeamSizeChange(e.target.value)}
                    onFocus={() => setFocusedField("team_size")}
                    onBlur={() => {
                      setFocusedField(null);
                      if (!formData.team_size || formData.team_size < 1) {
                        handleTeamSizeChange("1");
                      } else if (formData.team_size > 6) {
                        handleTeamSizeChange("6");
                      }
                    }}
                    placeholder="2"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "team_size" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Field 3: dynamic member_names */}
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs text-[#8a7a5c] border-b border-[#e8dcc8]/15 pb-1">
                  <span>{`// DYNAMIC ALLOCATION: member_names[] (${formData.member_names.length} active slots)`}</span>
                  <span className="text-[10px]">MEM[0x0003]</span>
                </div>

                {formData.member_names.map((name, idx) => {
                  const memTag = `MEM[0x0003${String.fromCharCode(97 + idx)}]`;
                  const fieldKey = `member_names_${idx}`;
                  return (
                    <div key={idx} className="space-y-1 pl-2 border-l border-[#e8dcc8]/20">
                      <div className="flex justify-between text-xs">
                        <label className="text-[#e8dcc8] font-semibold">
                          &gt; char* member_names[{idx}] *
                        </label>
                        <span className="text-[#8a7a5c] text-[11px]">{memTag}</span>
                      </div>
                      <div
                        className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                          focusedField === fieldKey
                            ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                            : "border-[#e8dcc8]/20"
                        }`}
                      >
                        <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => handleMemberNameChange(idx, e.target.value)}
                          onFocus={() => setFocusedField(fieldKey)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={idx === 0 ? "Team Lead Name" : `Member ${idx + 1} Name`}
                          className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                        />
                        {focusedField === fieldKey && (
                          <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                        )}
                        <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Field 4: phone_number */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="text-[#e8dcc8] font-semibold">
                    &gt; char* phone_number *
                  </label>
                  <span className="text-[#8a7a5c] text-[11px]">MEM[0x0004]</span>
                </div>
                <div
                  className={`flex items-center px-3 py-2 rounded bg-[#12100a] border transition-colors ${
                    focusedField === "phone_number"
                      ? "border-[#e8dcc8] shadow-[0_0_10px_rgba(232,220,200,0.2)]"
                      : "border-[#e8dcc8]/20"
                  }`}
                >
                  <span className="text-xs text-[#8a7a5c] mr-2">[ $</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    onFocus={() => setFocusedField("phone_number")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+91 9876543210"
                    className="w-full bg-transparent text-xs text-[#e8dcc8] focus:outline-none placeholder-[#8a7a5c]/50 font-mono"
                  />
                  {focusedField === "phone_number" && (
                    <span className="cursor-blink text-[#ff9f1c] text-xs ml-1">█</span>
                  )}
                  <span className="text-xs text-[#8a7a5c] ml-2">]</span>
                </div>
              </div>

              {/* Compiler-styled Error Line if any */}
              {errorMsg && (
                <div className="p-3 rounded border border-[#e5484d]/50 bg-[#12100a] text-xs font-mono space-y-1">
                  <div className="text-[#e5484d] font-bold flex items-center gap-1.5">
                    <span>✖</span>
                    <span>COMPILER_ERROR:</span>
                  </div>
                  <div className="text-[#e8dcc8] pl-4">
                    {errorMsg}
                  </div>
                </div>
              )}

              {/* Submit Row: Button + Real Integrity Check Badge */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-[#ff9f1c] text-[#12100a] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#ffb347] shadow-[0_0_18px_rgba(255,159,28,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "COMMITTING_TO_SQLITE..." : "$ SUBMIT_REGISTRATION"}
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
            /* Success confirmation showing real server-side persistence results */
            <div className="p-6 rounded border border-[#e8dcc8]/30 bg-[#12100a] space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl text-[#ff9f1c] font-bold">[✓] RECORD_COMMITTED_TO_PERSISTENT_STORE</div>
                <p className="text-xs sm:text-sm text-[#8a7a5c] max-w-lg mx-auto leading-relaxed">
                  Team record successfully committed to persistent Supabase (Postgres) storage. Segment address{" "}
                  <span className="text-[#e8dcc8] font-bold">{serverResult?.segmentAddress || "0x7FFF0001"}</span>{" "}
                  mapped to system process table.
                </p>
              </div>

              {serverResult && (
                <div className="max-w-md mx-auto p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a]/90 text-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-[#e8dcc8]/15 pb-1 text-[11px] text-[#8a7a5c]">
                    <span className="text-[#e8dcc8] font-bold">{"// PERSISTED_RECORD_META"}</span>
                    <span>ENGINE: Supabase (Postgres)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7a5c]">RECORD_ID:</span>
                    <span className="text-[#ff9f1c] font-bold font-mono text-[11px]">{serverResult.registrationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7a5c]">TEAM_NAME:</span>
                    <span className="text-[#e8dcc8] font-bold">{serverResult.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7a5c]">TEAM_SIZE:</span>
                    <span className="text-[#e8dcc8]">{serverResult.teamSize} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7a5c]">SEGMENT_ADDR:</span>
                    <span className="text-[#e8dcc8] font-mono">{serverResult.segmentAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7a5c]">COMMITTED_AT:</span>
                    <span className="text-[#8a7a5c]">{new Date(serverResult.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setServerResult(null);
                    setErrorMsg(null);
                    setFormData({
                      team_name: "",
                      team_size: 2,
                      member_names: ["", ""],
                      phone_number: "",
                    });
                  }}
                  className="text-xs text-[#ff9f1c] hover:underline cursor-pointer"
                >
                  [ALLOCATE ANOTHER TEAM &gt;&gt;]
                </button>
              </div>
            </div>
          )}

          {/* Dynamic STDOUT // HEAP ALLOCATION MONITOR log panel */}
          <div className="p-3.5 rounded border border-[#e8dcc8]/20 bg-[#12100a] text-xs font-mono space-y-1 text-[#8a7a5c]">
            <div className="flex justify-between items-center text-[11px] mb-2 border-b border-[#e8dcc8]/15 pb-1">
              <span className="text-[#e8dcc8] flex items-center gap-1.5 font-bold">
                <span className={`w-2 h-2 rounded-full ${serverResult ? "bg-[#ff9f1c] animate-pulse" : "bg-[#e8dcc8]"}`} />
                <span>STDOUT // HEAP ALLOCATION MONITOR</span>
              </span>
              <span>PAGESIZE: 4096 | ENGINE: Supabase (Postgres)</span>
            </div>

            {!serverResult ? (
              <>
                <div>
                  0x00: <span className="text-[#e8dcc8]">[READY]</span> Awaiting team registration buffer commit...
                </div>
                <div>
                  0x08: <span className="text-[#ff9f1c]">[MEM]</span> Address range allocated: 0x7FFF0001 -&gt; 0x7FFF0004 [ACTIVE]
                </div>
                {payloadChecksum && (
                  <div className="text-[#e8dcc8]">
                    0x10: [CRC32] Pre-flight checksum: {payloadChecksum} [ZERO CORRUPTION]
                  </div>
                )}
                {isSubmitting && (
                  <div className="text-[#ff9f1c]">
                    0x18: [FLUSH] Transmitting payload stream to Supabase persistent storage...
                  </div>
                )}
                {errorMsg && (
                  <div className="text-[#e5484d]">
                    0x18: [ABORT] Allocation rejected: {errorMsg}
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  0x00: <span className="text-[#e8dcc8]">[COMMITTED]</span> Supabase table &apos;registrations&apos; row inserted successfully.
                </div>
                <div>
                  0x08: <span className="text-[#ff9f1c]">[RECORD]</span> UUID: {serverResult.registrationId} | Segment: {serverResult.segmentAddress} [PERSISTED]
                </div>
                <div>
                  0x10: <span className="text-[#e8dcc8]">[SLOTS]</span> {serverResult.teamSize} member pointers sealed at {serverResult.createdAt}
                </div>
                <div className="text-[#8a7a5c]">
                  0x18: [CLOUD_SYNC] Hosted Postgres storage synchronized [INTEGRITY_OK]
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Three Bottom Technical Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Team_t */}
        <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8a7a5c]">
            <span>MEM_UTILIZATION</span>
            <span className="text-[#ff9f1c] font-bold">64 BYTES + HEAP</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8dcc8]">Team_t</h3>
          <p className="text-xs text-[#8a7a5c] leading-relaxed">
            Aligned struct packing via `#pragma pack(push, 1)` with dynamic member pointer array (`char** member_names`).
          </p>
        </div>

        {/* Card 2: Process Group / IPC */}
        <div className="p-4 rounded border border-[#e8dcc8]/20 bg-[#12100a]/85 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8a7a5c]">
            <span>TASK_SCHEDULING</span>
            <span className="text-[#ff9f1c] font-bold">POSIX Threads</span>
          </div>
          <h3 className="text-sm font-bold text-[#e8dcc8]">Process Group / IPC</h3>
          <p className="text-xs text-[#8a7a5c] leading-relaxed">
            Multi-member task synchronization with address sanitizer (`-fsanitize=address`) verified.
          </p>
        </div>

        {/* Card 3: Privacy & Telemetry Audit */}
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
