// Advanced Semiconductor Boot Sequence Loading Screen

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, Terminal } from "lucide-react";

export default function LoadingScreen({ visible }: { visible: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);

  const bootLogs = [
    "SYSTEM INITIALIZING...",
    "LOADING DIGITAL CORE & RTL PIPELINES...",
    "VLSI & EMBEDDED MODULES ONLINE",
    "SYSTEM READY: YOGAVELAN M D PORTFOLIO",
  ];

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 280);
    return () => clearInterval(interval);
  }, [visible, bootLogs.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#060a0f] px-6 text-white font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } }}
        >
          {/* Subtle PCB Grid background */}
          <div className="absolute inset-0 opacity-20 circuit-grid pointer-events-none" />

          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#090f17]/90 p-8 shadow-[0_0_60px_rgba(66,232,224,0.12)] backdrop-blur-xl">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs tracking-widest text-[#42e8e0]">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 animate-spin text-[#42e8e0]" style={{ animationDuration: "6s" }} />
                <span>BOOT_SEQUENCE_v3.6</span>
              </div>
              <span className="rounded bg-[#42e8e0]/10 px-2 py-0.5 text-[10px] font-bold text-[#42e8e0]">
                0x42E8E0
              </span>
            </div>

            {/* Title / Name */}
            <div className="my-6 text-center">
              <motion.h1
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                YOGAVELAN M D
              </motion.h1>
              <p className="mt-1 text-xs tracking-widest text-white/50 uppercase">
                Electronics / VLSI Design & Technology Engineer
              </p>
            </div>

            {/* Boot Log Console */}
            <div className="my-6 rounded-xl border border-white/8 bg-black/60 p-4 text-left font-mono text-xs">
              <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase tracking-wider">
                <Terminal className="size-3 text-[#42e8e0]" />
                <span>Console Log Output</span>
              </div>
              {bootLogs.slice(0, stepIndex + 1).map((log, index) => (
                <motion.div
                  key={log}
                  className={`py-0.5 flex items-center gap-2 ${
                    index === stepIndex ? "text-[#42e8e0] font-bold" : "text-white/60"
                  }`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-[10px] opacity-40">&gt;</span>
                  <span>{log}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#42e8e0] via-[#00b8ff] to-[#8967ff] shadow-[0_0_12px_#42e8e0]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((stepIndex + 1) / bootLogs.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-white/40">
                <span>INITIALIZING HARDWARE CORES</span>
                <span className="text-[#42e8e0]">{Math.round(((stepIndex + 1) / bootLogs.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
