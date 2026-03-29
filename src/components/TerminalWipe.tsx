"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";

export default function TerminalWipe({ 
  isActive, 
  isReverse 
}: { 
  isActive: boolean; 
  isReverse: boolean;
}) {
  const variants: Variants = {
    initial: (isRev: boolean) => ({
      y: isRev ? "100%" : "-100%",
    }),
    animate: {
      y: "0%",
      transition: { duration: 0.8, ease: "easeInOut" } // Fast entry, smooth settle
    },
    exit: (isRev: boolean) => ({
      y: isRev ? "-100%" : "100%",
      transition: { duration: 0.8, ease: "easeInOut" }
    })
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
           key="terminal-wipe"
           custom={isReverse}
           variants={variants}
           initial="initial"
           animate="animate"
           exit="exit"
           className="fixed inset-0 z-[9999] pointer-events-none flex flex-col bg-[#050505] overflow-hidden"
        >
           {/* Terminal Scanning Grid */}
           <div 
             className="absolute inset-0 opacity-20 pointer-events-none"
             style={{
                backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
             }}
           />

           {/* Glowing Wipe Edge leading and trailing */}
           <div className="absolute top-0 w-full h-1 bg-[#00ff41] shadow-[0_0_15px_#00ff41]" />
           <div className="absolute bottom-0 w-full h-1 bg-[#00ff41] shadow-[0_0_15px_#00ff41]" />
           
           {/* Faint Flickering Scanlines / Ghosting Effect */}
           <div className="absolute inset-0 flex flex-col justify-between mix-blend-screen overflow-hidden">
             {/* Trailing edge ghosting */}
             <motion.div 
               className="w-full h-48 bg-gradient-to-b from-[#00ff41]/20 to-transparent" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: [0, 0.5, 0.2, 0.6, 0] }} 
               transition={{ duration: 0.8, times: [0, 0.3, 0.5, 0.8, 1], repeat: Infinity }}
             />
             <motion.div 
               className="w-full h-48 bg-gradient-to-t from-[#00ff41]/20 to-transparent"
               initial={{ opacity: 0 }} 
               animate={{ opacity: [0, 0.5, 0.2, 0.6, 0] }} 
               transition={{ duration: 0.8, times: [0, 0.3, 0.5, 0.8, 1], repeat: Infinity }}
             />
           </div>
           
           {/* System Redraw Text */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <span className="font-mono text-[#00ff41] text-xs md:text-sm animate-pulse tracking-[0.3em] opacity-40">
               {isReverse ? "[ FLUSHING BUFFER... ]" : "[ REDRAWING BUFFER... ]"}
             </span>
           </div>

           {/* TV Static overlay for ghosting artifacts */}
           <div 
             className="absolute inset-0 opacity-10 pointer-events-none mix-blend-lighter"
             style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")'
             }}
           />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
