// Interactive Semiconductor Skill Matrix Component

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/portfolio";

export default function InteractiveSkillsMatrix() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const activeGroup = skillGroups[activeGroupIndex];

  return (
    <div className="relative rounded-3xl border border-foreground/12 bg-card/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Background Circuit Grid Pattern */}
      <div className="absolute inset-0 opacity-15 circuit-grid pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-signal">
            SYSTEM ARCHITECTURE & MATRIX
          </span>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Semiconductor Skill Matrix
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3.5 py-1.5 text-xs font-mono text-signal">
          <Sparkles className="size-3.5 animate-pulse" />
          <span>Interactive Core Domain Explorer</span>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
        {/* Left: Interactive Domain Selector Circuit Rail */}
        <div className="space-y-3">
          <div className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-foreground/50">
            Select Technical Domain:
          </div>
          {skillGroups.map((group, index) => {
            const isActive = activeGroupIndex === index;
            return (
              <motion.button
                key={group.title}
                type="button"
                onClick={() => setActiveGroupIndex(index)}
                onMouseEnter={() => setActiveGroupIndex(index)}
                className={`group relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-signal bg-signal/12 shadow-[0_0_25px_rgba(66,232,224,0.18)]"
                    : "border-foreground/10 bg-foreground/[0.02] hover:border-signal/50 hover:bg-foreground/[0.04]"
                }`}
                whileHover={{ x: 4 }}
                data-cursor-type="inspect"
              >
                {/* Active Trace Signal Light */}
                {isActive && (
                  <motion.span
                    layoutId="activeTrace"
                    className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-signal shadow-[0_0_12px_#42e8e0]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3.5">
                  <span
                    className={`grid size-9 place-items-center rounded-xl border text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? "border-signal bg-signal text-[#061015]"
                        : "border-foreground/15 bg-foreground/5 text-foreground/70 group-hover:border-signal/50 group-hover:text-signal"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h4
                      className={`font-display text-base font-bold transition-colors ${
                        isActive ? "text-signal" : "text-foreground group-hover:text-signal"
                      }`}
                    >
                      {group.title}
                    </h4>
                    <span className="text-xs text-foreground/50">
                      {group.items.length} Modules & Technologies
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`size-5 transition-transform duration-300 ${
                    isActive ? "text-signal translate-x-1" : "text-foreground/30 group-hover:text-signal"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right: Active Domain Core Details View */}
        <div className="relative rounded-2xl border border-signal/30 bg-gradient-to-br from-[#0a1118]/90 via-[#070d13]/95 to-[#0f1d28]/90 p-7 shadow-[0_0_50px_rgba(66,232,224,0.12)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl border border-signal/40 bg-signal/15 text-signal shadow-[0_0_15px_rgba(66,232,224,0.3)]">
                    <Cpu className="size-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-signal">
                      DOMAIN MODULE 0{activeGroupIndex + 1}
                    </span>
                    <h4 className="font-display text-xl font-bold text-white">
                      {activeGroup.title}
                    </h4>
                  </div>
                </div>
                <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[10px] font-mono text-signal">
                  ONLINE
                </span>
              </div>

              {/* Technologies Chip Grid */}
              <div>
                <div className="mb-3 text-xs font-mono text-white/50 uppercase tracking-wider">
                  Associated Engineering Technologies:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGroup.items.map((item) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs font-semibold text-white/90 transition hover:border-signal/50 hover:bg-signal/10 hover:text-signal"
                      whileHover={{ scale: 1.02 }}
                    >
                      <CheckCircle2 className="size-4 text-signal shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status Signal */}
              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/40 p-3.5 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-signal" />
                  <span>Hardware & Software Synergy</span>
                </div>
                <span className="text-signal font-bold">100% Operational</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
