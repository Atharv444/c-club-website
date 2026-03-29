"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransitionWipe } from "@/components/TransitionContext";

export default function TacticalCommandCenter() {
  const { navigateWithWipe } = useTransitionWipe();

  // Every 5 seconds -> tear UI horizontally for 0.1s
  const [digitalNoise, setDigitalNoise] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDigitalNoise(true);
      setTimeout(() => setDigitalNoise(false), 100);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black font-mono text-[#00ff41] overflow-hidden selection:bg-[#00ff41] selection:text-black">
      
      {/* 4. Global Map Layer & Sub-1% map phosphor flicker */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        animate={{ opacity: [0.98, 1, 0.99, 1, 0.98] }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        style={{
          filter: "invert(100%) grayscale(100%) sepia(100%) hue-rotate(80deg) saturate(300%) contrast(1.5) brightness(1.2)"
        }}
      >
        {/* Pointer events none permanently disables Zoom/Pan */}
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.5132%2C12.8158%2C77.5532%2C12.8358&layer=mapnik&marker=12.8258%2C77.5332"
          className="w-full h-full border-none pointer-events-none opacity-50"
          title="Static Recon Feed"
        />
      </motion.div>

      {/* Grid Overlay for FUI tracking constraints */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-10"
        style={{
           backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.4) 1px, transparent 1px)`,
           backgroundSize: "40px 40px",
        }}
      />

      {/* CRT Ghost Scan sweeping vertically every 4s */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-[#00ff41]/20 to-transparent z-10 pointer-events-none mix-blend-color-dodge shadow-[0_0_50px_rgba(0,255,65,0.4)]"
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Heavy Sub-CRT Base Scanline texture */}
      <div
         className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-20"
         style={{
           background: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,255,65,0.2) 1px, rgba(0,255,65,0.2) 2px)"
         }}
      />

      {/* 5. COMPONENTS CONSTRAINTS: Fixed framing outer border */}
      <div className="absolute inset-6 z-40 pointer-events-none border border-[#00ff41] shadow-[0_0_10px_#00ff41] opacity-80">
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-[#00ff41] shadow-[0_0_15px_#00ff41]" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-[#00ff41] shadow-[0_0_15px_#00ff41]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-[#00ff41] shadow-[0_0_15px_#00ff41]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-[#00ff41] shadow-[0_0_15px_#00ff41]" />
      </div>

      <div className="relative w-full h-full z-20 pointer-events-none">

        {/* 1. TOP LEFT Returning Button Module */}
        <div className="absolute top-10 left-10 z-50 pointer-events-auto">
           <button
             onClick={() => navigateWithWipe("/", true)}
             onMouseEnter={() => setBtnHovered(true)}
             onMouseLeave={() => setBtnHovered(false)}
             className={`glitch-chromatic relative text-xs border border-[#00ff41] bg-black/80 backdrop-blur-sm px-4 py-2 text-[#00ff41] tracking-widest font-bold phosphor-text transition-all duration-100 uppercase ${btnHovered ? 'shadow-[0_0_15px_#00ff41]' : ''}`}
             data-text="[ < RETURN TO MAIN SYSTEM ]"
             style={{
               backgroundImage: btnHovered ? 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,65,0.2) 2px, rgba(0,255,65,0.2) 4px)' : 'none'
             }}
           >
             <span className={`${btnHovered ? 'opacity-80' : ''}`}>
               {btnHovered ? (
                  <motion.span animate={{ opacity: [1, 0.4, 1, 0.8, 1] }} transition={{ duration: 0.15, repeat: Infinity }}>
                    [ &lt; RETURN TO MAIN SYSTEM ]
                  </motion.span>
               ) : (
                  <span>[ &lt; RETURN TO MAIN SYSTEM ]</span>
               )}
             </span>
           </button>
        </div>

        {/* 2. CENTRAL ANCHOR NODE (12.8258 N / 77.5332 E) Origin Point */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-3 h-3 bg-[#00ff41] rounded-full shadow-[0_0_20px_4px_#00ff41] animate-pulse pointer-events-none z-20" />

        {/* DATA CONNECTION: SHARP DOTTED VECTOR LINES */}
        {/* Exactly synced transform layer locks SVG with floating boxes during 5s anomaly glides */}
        <svg 
           className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible transition-transform duration-75"
           style={{ transform: digitalNoise ? 'translate(15px, -5px)' : 'translate(0px, 0px)' }}
        >
           {/* Line 1: To Top-Left Card (Facility Intel right-edge ~ mid-height) */}
           <motion.line 
              x1="50%" y1="50%" 
              x2="calc(50% - max(300px, 20vw))" y2="calc(50% - 85px)"
              fill="none" 
              stroke="#00ff41" 
              strokeWidth="1" 
              strokeDasharray="2 4"
              strokeLinecap="butt"
              style={{ filter: "drop-shadow(0 0 2px #00ff41)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, strokeDashoffset: [-20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeInOut" },
                strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" },
                opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
           />

           {/* Line 2: To Bottom-Right Card (Top-Left corner exact calculation) */}
           <motion.line 
              x1="50%" y1="50%" 
              x2="calc(50% + max(280px, 15vw))" y2="calc(50% + 40px)"
              fill="none" 
              stroke="#00ff41" 
              strokeWidth="1" 
              strokeDasharray="2 4"
              strokeLinecap="butt"
              style={{ filter: "drop-shadow(0 0 2px #00ff41)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, strokeDashoffset: [-20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
                strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" },
                opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
           />
        </svg>

        {/* 3. TERMINAL POP-UP MODULES */}

        {/* Card A (Facility Intel) */}
        <motion.div 
            className={`absolute z-30 pointer-events-auto min-w-[320px] border border-[#00ff41] bg-black/80 backdrop-blur-md p-5 shadow-[0_0_20px_rgba(0,255,65,0.15)] glitch-border transition-transform duration-75 ${digitalNoise ? 'intense-glitch' : ''}`}
            style={{ 
               top: 'calc(50% - 160px)', 
               right: 'calc(50% + max(300px, 20vw))', 
               transform: digitalNoise ? 'translate(15px, -5px)' : 'translate(0px, 0px)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            {/* Header */}
            <div className="border-b border-[#00ff41]/40 pb-3 mb-4 flex items-center gap-2">
               <div className="w-2 h-2 bg-[#00ff41] animate-pulse" />
               <span className="text-[12px] font-bold tracking-widest text-[#00ff41] glitch-chromatic phosphor-text uppercase" data-text="[ FACILITY_INTEL: C_CLUB_HQ ]">
                 [ FACILITY_INTEL: C_CLUB_HQ ]
               </span>
            </div>
            
            <div className="text-[11px] leading-8 tracking-wider text-[#00ff41] font-bold flex flex-col gap-1 overflow-hidden uppercase phosphor-text">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1.5 }} className="whitespace-nowrap overflow-hidden">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; FACILITY: DSATM CS Department A BLOCK">&gt; FACILITY: DSATM CS Department A BLOCK</span>
               </motion.div>
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 2.2 }} className="whitespace-nowrap overflow-hidden">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; ROOM: 204">&gt; ROOM: 204</span>
               </motion.div>
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 2.9 }} className="whitespace-nowrap overflow-hidden">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; COORDINATES: 12.8258 N | 77.5332 E">&gt; COORDINATES: 12.8258 N | 77.5332 E</span>
               </motion.div>
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 3.6 }} className="whitespace-nowrap overflow-hidden flex items-center">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; STATUS: ONLINE [v2.8]">&gt; STATUS: ONLINE [v2.8]</span>
                 <motion.span 
                    className="ml-1 inline-block w-2.5 h-[1.1em] bg-[#00ff41] translate-y-[2px]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                 />
               </motion.div>
            </div>
        </motion.div>

        {/* Card B (Hackathon Event) */}
        <motion.div 
            className={`absolute z-30 pointer-events-auto min-w-[320px] border border-[#00ff41] bg-black/80 backdrop-blur-md p-5 shadow-[0_0_20px_rgba(0,255,65,0.15)] glitch-border transition-transform duration-75 ${digitalNoise ? 'intense-glitch' : ''}`}
            style={{ 
               top: 'calc(50% + 40px)', 
               left: 'calc(50% + max(280px, 15vw))', 
               transform: digitalNoise ? 'translate(15px, -5px)' : 'translate(0px, 0px)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
        >
            {/* Header */}
            <div className="border-b border-[#00ff41]/40 pb-3 mb-4 flex items-center gap-2">
               <div className="w-2 h-2 bg-[#00ff41] animate-pulse" />
               <span className="text-[12px] font-bold tracking-widest text-[#00ff41] glitch-chromatic phosphor-text uppercase" data-text="[ UPCOMING_EVENT: C++_CHALLENGE ]">
                 [ UPCOMING_EVENT: C++_CHALLENGE ]
               </span>
            </div>
            
            <div className="text-[11px] leading-8 tracking-wider text-[#00ff41] font-bold flex flex-col gap-1 overflow-hidden uppercase phosphor-text">
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1.8 }} className="whitespace-nowrap overflow-hidden">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; EVENT: ANNUAL HACKATHON 2026">&gt; EVENT: ANNUAL HACKATHON 2026</span>
               </motion.div>
               <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 2.5 }} className="whitespace-nowrap overflow-hidden">
                 <span className={`glitch-chromatic ${digitalNoise ? 'intense-glitch' : ''}`} data-text="&gt; TIMELINE: OCT 24-26">&gt; TIMELINE: OCT 24-26</span>
               </motion.div>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 3.5 }} className="mt-2 w-full">
                 <span className="bg-[#00ff41] text-black px-2 py-1 flex w-fit items-center glitch-hover cursor-pointer border border-[#00ff41] hover:bg-black hover:text-[#00ff41] shadow-[0_0_10px_#00ff41] animate-pulse">
                   &gt; [ REGISTER_NOW &gt;&gt; ]
                 </span>
               </motion.div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
