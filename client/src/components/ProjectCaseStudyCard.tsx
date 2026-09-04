// Engineering Case Study Card with Domain-Specific Visual Identity

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, ExternalLink, Github, Layers, Radio, ShieldCheck, Terminal, Workflow } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { TechTags } from "./TechTags";

// Domain-Specific Engineering Graphic Component
function EngineeringDomainGraphic({ visual }: { visual: Project["visual"] }) {
  switch (visual) {
    case "pill":
      // Embedded IoT Microcontroller & Sensors
      return (
        <div className="relative size-full bg-gradient-to-br from-[#0c1924] via-[#071119] to-[#04090e] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#42e8e0]">
            <span className="flex items-center gap-1.5"><Radio className="size-3 animate-pulse" /> ESP32_BUS</span>
            <span>RTC DS3231</span>
          </div>
          {/* Signal flow nodes */}
          <div className="my-auto flex items-center justify-around">
            <div className="grid size-12 place-items-center rounded-xl border border-[#42e8e0]/40 bg-[#42e8e0]/10 text-xs font-mono text-[#42e8e0]">
              ESP32
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#42e8e0] to-[#8967ff] animate-pulse" />
            <div className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/5 text-[10px] font-mono text-white/80">
              SERVO
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#8967ff] to-[#42e8e0] animate-pulse" />
            <div className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/5 text-[10px] font-mono text-white/80">
              LCD
            </div>
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>SCHEDULER: OK</span>
            <span>BLUETOOTH LINK</span>
          </div>
        </div>
      );

    case "noc":
      // Thermal 3D NoC FPGA Architecture
      return (
        <div className="relative size-full bg-gradient-to-br from-[#121624] via-[#0a0d17] to-[#05060b] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8967ff]">
            <span className="flex items-center gap-1.5"><Layers className="size-3" /> 3D_NoC_ROUTER</span>
            <span>FPGA: ARTY S7</span>
          </div>
          {/* 3D Mesh Grid Simulation */}
          <div className="my-auto grid grid-cols-3 gap-2 px-6">
            {[1, 2, 3, 4, 5, 6].map((node) => (
              <div
                key={node}
                className={`h-8 rounded-lg border flex items-center justify-center font-mono text-[9px] ${
                  node === 3 || node === 5
                    ? "border-[#42e8e0] bg-[#42e8e0]/20 text-[#42e8e0] shadow-[0_0_10px_#42e8e0]"
                    : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                NODE_0{node}
              </div>
            ))}
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>THERMAL MONITORING</span>
            <span>VIVADO SIM</span>
          </div>
        </div>
      );

    case "traffic":
      // AI Computer Vision & FPGA FSM Traffic Controller
      return (
        <div className="relative size-full bg-gradient-to-br from-[#1a140a] via-[#100c06] to-[#080502] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#f4b43e]">
            <span className="flex items-center gap-1.5"><Workflow className="size-3" /> YOLOv8_NANO</span>
            <span>FSM CONTROLLER</span>
          </div>
          {/* Bounding Box Simulation */}
          <div className="my-auto relative h-20 rounded-xl border border-dashed border-[#f4b43e]/40 bg-black/40 flex items-center justify-center">
            <div className="absolute top-2 left-2 rounded bg-[#f4b43e] px-1.5 py-0.5 text-[8px] font-mono font-bold text-black">
              VEHICLE_DETECT: 98.4%
            </div>
            <span className="font-mono text-xs text-[#f4b43e]">CONGESTION: HIGH → EXTEND GREEN SIGNAL</span>
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>SIGNAL TIMING: DYNAMIC</span>
            <span>VERILOG HDL</span>
          </div>
        </div>
      );

    case "bridge":
      // AMBA AHB to APB Bus Architecture
      return (
        <div className="relative size-full bg-gradient-to-br from-[#07191e] via-[#040e12] to-[#020709] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00f0ff]">
            <span className="flex items-center gap-1.5"><Cpu className="size-3" /> ARM_AMBA_BRIDGE</span>
            <span>AHB ➔ APB</span>
          </div>
          {/* Bus State Machine */}
          <div className="my-auto flex items-center justify-center gap-3 font-mono text-xs">
            <div className="rounded-lg border border-[#00f0ff]/50 bg-[#00f0ff]/10 px-3 py-2 text-[#00f0ff]">
              AHB SLAVE
            </div>
            <span className="text-white/40">➔</span>
            <div className="rounded-lg border border-[#8967ff]/50 bg-[#8967ff]/10 px-3 py-2 text-[#8967ff]">
              FSM BRIDGE
            </div>
            <span className="text-white/40">➔</span>
            <div className="rounded-lg border border-[#00f0ff]/50 bg-[#00f0ff]/10 px-3 py-2 text-[#00f0ff]">
              APB MASTER
            </div>
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>READ / WRITE TRANSACTIONS</span>
            <span>VERIFIED</span>
          </div>
        </div>
      );

    case "sentinel":
      // SentinelAI Computer Vision Deep Learning
      return (
        <div className="relative size-full bg-gradient-to-br from-[#1c0d18] via-[#10070e] to-[#080307] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#ff4b8b]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="size-3" /> EFFICIENTNET</span>
            <span>MTCNN FACE DETECT</span>
          </div>
          {/* AI Face Matrix Simulation */}
          <div className="my-auto flex items-center justify-around font-mono text-xs">
            <div className="relative size-16 rounded-xl border border-[#ff4b8b]/60 bg-black/50 flex flex-col items-center justify-center">
              <span className="text-[8px] text-[#ff4b8b]">CLASSIFIER</span>
              <span className="text-xs font-bold text-white">REAL</span>
              <span className="text-[8px] text-[#42e8e0]">99.2%</span>
            </div>
            <div className="space-y-1 text-[9px] text-white/60">
              <div>FRAME: 1080p</div>
              <div>OPENCV STREAM</div>
              <div>PYTORCH MODEL</div>
            </div>
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>REAL-TIME ANALYSIS</span>
            <span>DEEP LEARNING</span>
          </div>
        </div>
      );

    case "synopsys":
      // Synopsys CMOS Digital Logic Simulation
      return (
        <div className="relative size-full bg-gradient-to-br from-[#0c141d] via-[#070b10] to-[#030508] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#42e8e0]">
            <span className="flex items-center gap-1.5"><Terminal className="size-3" /> SYNOPSYS_EDA</span>
            <span>CUSTOM COMPILER</span>
          </div>
          {/* Logic Waveform Line */}
          <div className="my-auto space-y-1.5">
            <div className="text-[9px] font-mono text-white/50">CLK Waveform:</div>
            <svg className="w-full h-8" viewBox="0 0 300 30" fill="none">
              <path
                d="M0 25 H30 V5 H60 V25 H90 V5 H120 V25 H150 V5 H180 V25 H210 V5 H240 V25 H270 V5 H300"
                stroke="#42e8e0"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="text-[9px] font-mono text-white/40 flex justify-between">
            <span>SCHEMATIC & PRIMEWAVE</span>
            <span>FULL ADDER CMOS</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ProjectCaseStudyCard({
  project,
  onInspect,
}: {
  project: Project;
  onInspect: (project: Project) => void;
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-foreground/12 bg-card/60 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-signal/60 hover:shadow-[0_0_35px_rgba(66,232,224,0.15)] flex flex-col justify-between"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
      data-cursor-type="inspect"
    >
      {/* Top Banner Graphic Header */}
      <div className="relative h-52 w-full border-b border-foreground/10 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <EngineeringDomainGraphic visual={project.visual} />
        )}
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-white backdrop-blur-md">
          SYSTEM {project.number}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-signal">
            {project.category}
          </div>
          <h3 className="mt-2.5 font-display text-2xl font-bold leading-snug text-foreground group-hover:text-signal transition-colors">
            {project.title}
          </h3>
          <p className="mt-3.5 line-clamp-2 text-sm leading-6 text-foreground/70">
            {project.description[0]}
          </p>
        </div>

        <div className="mt-6">
          <TechTags tags={project.technologies.slice(0, 5)} compact />

          <div className="mt-7 flex items-center justify-between gap-3 border-t border-foreground/10 pt-5">
            <button
              type="button"
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-signal"
            >
              <span>Inspect Case Study</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {project.github ? (
              <a
                aria-label={`Open ${project.title} repository`}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-9 place-items-center rounded-xl border border-foreground/15 text-foreground/70 transition hover:border-signal hover:text-signal"
              >
                <Github className="size-4" />
              </a>
            ) : (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/40">
                SYSTEM BRIEF
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
