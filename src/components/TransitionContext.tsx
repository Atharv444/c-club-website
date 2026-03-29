"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import TerminalWipe from "./TerminalWipe";

type TransitionContextType = {
  navigateWithWipe: (path: string, reverse?: boolean) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigateWithWipe: () => {},
});

export const useTransitionWipe = () => useContext(TransitionContext);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const navigateWithWipe = (path: string, reverse = false) => {
    // Only trigger if we aren't already wiping
    if (isActive) return;

    setIsReverse(reverse);
    setIsActive(true);

    // Give the wipe animation time to cover the screen (800ms)
    // We navigate at 1000ms to ensure the screen is completely obscured
    setTimeout(() => {
      router.push(path);

      // Once the navigation event fires, give the new layout 300ms to mount and render fully
      // before we pull the wipe screen away, revealing it.
      setTimeout(() => {
        setIsActive(false);
      }, 300);
    }, 1000);
  };

  return (
    <TransitionContext.Provider value={{ navigateWithWipe }}>
      {children}
      <TerminalWipe isActive={isActive} isReverse={isReverse} />
    </TransitionContext.Provider>
  );
}
