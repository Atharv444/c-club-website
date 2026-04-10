"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface BootContextType {
  booted: boolean;
  completeBoot: () => void;
}

const BootContext = createContext<BootContextType>({
  booted: false,
  completeBoot: () => {},
});

export function useBootContext() {
  return useContext(BootContext);
}

export function BootProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [checked, setChecked] = useState(false);

  // Check localStorage on mount — if previously booted, skip immediately
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasBooted = localStorage.getItem("cclub_booted");
      if (wasBooted === "true") {
        setBooted(true);
      }
    }
    setChecked(true);
  }, []);

  const completeBoot = useCallback(() => {
    setBooted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("cclub_booted", "true");
    }
  }, []);

  // Don't render children until we've checked localStorage
  // This prevents a flash of boot sequence for returning visitors
  if (!checked) return null;

  return (
    <BootContext.Provider value={{ booted, completeBoot }}>
      {children}
    </BootContext.Provider>
  );
}
