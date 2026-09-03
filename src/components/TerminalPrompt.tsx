"use client";

import React from "react";

interface TerminalPromptProps {
  command?: string;
  comment?: string;
  showCursor?: boolean;
  className?: string;
}

export default function TerminalPrompt({
  command,
  comment,
  showCursor = false,
  className = "",
}: TerminalPromptProps) {
  return (
    <div className={`font-mono text-sm md:text-base select-none ${className}`}>
      {command && (
        <div className="flex items-center flex-wrap gap-x-1 text-[#e8dcc8]">
          <span>{command}</span>
          {showCursor && (
            <span className="cursor-blink ml-1 text-[#ff9f1c]">█</span>
          )}
        </div>
      )}
      {comment && (
        <p className="text-[#8a7a5c] text-xs md:text-sm mt-1 font-medium">
          {comment.startsWith("//") ? comment : `// ${comment}`}
        </p>
      )}
    </div>
  );
}
