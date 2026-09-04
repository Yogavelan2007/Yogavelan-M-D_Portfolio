// Advanced Interactive Theme-Aware Hero Environment for Electronics Engineering Portfolio

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDownRight, Download, Github, Linkedin, Mail, Send, Cpu, Zap, Activity } from "lucide-react";
import { TechTags } from "./TechTags";
import { useTheme } from "@/contexts/ThemeContext";

const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=yogavelanmd%40gmail.com&su=${encodeURIComponent("Portfolio inquiry")}`;

export default function HeroEnvironment({
  onScrollTo,
}: {
  onScrollTo: (id: string) => void;
}) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isDark = theme === "dark";

  // Floating microchip tags — Repositioned safely in peripheral margins
  const floatingTags = [
    { label: "ESP32", x: "4%", y: "84%", delay: 0 },
    { label: "VLSI", x: "88%", y: "15%", delay: 0.2 },
    { label: "FPGA", x: "84%", y: "78%", delay: 0.4 },
    { label: "VERILOG", x: "4%", y: "65%", delay: 0.6 },
    { label: "STM32", x: "90%", y: "45%", delay: 0.8 },
    { label: "RTL", x: "3%", y: "44%", delay: 1.0 },
    { label: "ARDUINO", x: "45%", y: "90%", delay: 1.2 },
    { label: "AI", x: "68%", y: "8%", delay: 1.4 },
  ];

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas animated PCB trace lines & signal particles (Theme-Aware)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic Circuit Nodes
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const nodeCount = 35;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    // Bus Signal Lines traveling toward central chip
    const particles: Array<{ x: number; y: number; targetX: number; targetY: number; progress: number; speed: number }> = [];
    for (let i = 0; i < 16; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: width * 0.75,
        targetY: height * 0.5,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Theme-based canvas colors
      const gridColor = isDark ? "rgba(66, 232, 224, 0.04)" : "rgba(2, 132, 199, 0.06)";
      const nodeColor = isDark ? "rgba(66, 232, 224, 0.5)" : "rgba(2, 132, 199, 0.45)";
      const particleColor = isDark ? "rgba(66, 232, 224, 0.85)" : "rgba(2, 132, 199, 0.85)";
      const glowColor = isDark ? "#42e8e0" : "#0284c7";

      // Draw subtle PCB grid background lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect close nodes with PCB trace lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const opacity = (isDark ? 0.25 : 0.2) * (1 - dist / 110);
            ctx.strokeStyle = isDark ? `rgba(66, 232, 224, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            const midX = nodes[i].x;
            const midY = nodes[j].y;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(midX, midY);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw signal particles moving along bus paths
      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerY = height * 0.5;

      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const currX = p.x + (centerX - p.x) * p.progress;
        const currY = p.y + (centerY - p.y) * p.progress;

        ctx.fillStyle = particleColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  // GSAP Entrance Boot Animation Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-role",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-ic-core",
          { opacity: 0, scale: 0.7, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.4)" },
          "-=0.9"
        )
        .fromTo(
          ".hero-chip-tag",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[820px] overflow-hidden border-b border-border pt-28 sm:pt-36 lg:min-h-[880px] bg-background text-foreground transition-colors duration-300"
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none z-0"
      />

      {/* Floating Microchip Tags — Theme Aware */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.label}
          className="hero-chip-tag absolute hidden sm:flex items-center gap-1.5 rounded-lg border border-signal/30 bg-card/85 px-2.5 py-1 text-[10px] font-mono font-bold text-signal shadow-md backdrop-blur-md z-10 pointer-events-none select-none transition-colors duration-300"
          style={{ left: tag.x, top: tag.y }}
          animate={{
            x: mousePos.x * 20 * (tag.delay + 1),
            y: mousePos.y * 20 * (tag.delay + 1),
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <span className="size-1.5 rounded-full bg-signal animate-pulse" />
          <span>{tag.label}</span>
        </motion.div>
      ))}

      <div className="container relative z-10 grid min-h-[660px] items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        {/* Left Side: Name, Role, Bio & CTAs */}
        <div className="relative z-20 max-w-2xl">
          {/* Status Badge */}
          <div className="hero-badge mb-6 inline-flex items-center gap-2.5 rounded-full border border-signal/30 bg-signal/10 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-signal shadow-sm transition-colors duration-300">
            <Zap className="size-3.5 text-signal animate-pulse" />
            <span>ELECTRONICS ENGINEERING CORE</span>
          </div>

          {/* Greeting & Name */}
          <div className="hero-title">
            <span className="font-display text-xl font-medium tracking-wide text-foreground/75 sm:text-2xl transition-colors duration-300">
              Hi, I'm
            </span>
            <h1 className="font-display text-[clamp(3.8rem,9vw,7.4rem)] font-bold leading-[0.88] tracking-tight text-foreground mt-1 transition-colors duration-300">
              Yogavelan
            </h1>
          </div>

          {/* Primary Professional Title */}
          <div className="hero-role mt-5 flex items-center gap-3">
            <span className="h-px w-10 shrink-0 bg-signal shadow-[0_0_8px_var(--signal)]" />
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              <span className="text-gradient-cyan">Electronics Engineer</span>
            </h2>
          </div>

          {/* Professional Introduction */}
          <p className="hero-desc mt-6 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg transition-colors duration-300">
            3rd-year Electronics Engineering student passionate about VLSI design, embedded firmware, RTL Verilog HDL, FPGA architecture, and AI-driven digital hardware.
          </p>

          {/* Core Supporting Tech Pills */}
          <div className="mt-7">
            <TechTags tags={["VLSI Design", "Embedded Systems", "RTL Verilog", "FPGA", "AMBA AHB/APB", "AI / ML"]} />
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onScrollTo("projects")}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-signal to-[#00b8ff] px-6 py-4 text-sm font-bold text-[#040a0f] shadow-[0_0_30px_var(--signal-glow)] transition duration-300 hover:scale-[1.02]"
              data-cursor-type="inspect"
            >
              <Cpu className="size-4 text-[#040a0f]" />
              <span>Explore My Work</span>
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => onScrollTo("contact")}
              className="inline-flex items-center gap-2.5 rounded-xl border border-foreground/15 bg-foreground/[0.04] px-6 py-4 text-sm font-bold text-foreground transition duration-300 hover:border-signal hover:bg-signal/10 hover:text-signal"
            >
              <span>Let's Connect</span>
              <Send className="size-4" />
            </button>

            <a
              href="https://drive.google.com/file/d/102TKMKQlTP-AOjBjeE9q3b6Bm9hWM0KG/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-foreground/15 bg-foreground/[0.04] px-5 py-4 text-sm font-bold text-foreground transition duration-300 hover:border-signal hover:text-signal"
            >
              <span>Resume</span>
              <Download className="size-4" />
            </a>
          </div>

          {/* Social Links Rail */}
          <div className="mt-11 flex items-center gap-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300">
              PORTFOLIO CHANNELS
            </span>
            <span className="h-px w-8 bg-foreground/15" />
            <a
              aria-label="GitHub profile"
              href="https://github.com/Yogavelan2007"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github className="size-4" />
            </a>
            <a
              aria-label="LinkedIn profile"
              href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              aria-label="Compose an email via Gmail"
              href={EMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Central Interactive Microchip Visual Core (Theme Aware) */}
        <div className="hero-ic-core relative mx-auto aspect-square w-full max-w-[500px] lg:ml-auto">
          {/* Outer Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-signal/20 animate-spin" style={{ animationDuration: "35s" }} />
          <div className="absolute inset-[10%] rounded-full border border-dashed border-signal/35 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
          
          {/* Circuit Pinout Rays */}
          <svg className="absolute inset-0 size-full opacity-60" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r="180" stroke="currentColor" className="text-signal/20" strokeWidth="1" strokeDasharray="6 8" />
            <line x1="250" y1="20" x2="250" y2="70" stroke="currentColor" className="text-signal" strokeWidth="2" />
            <line x1="250" y1="430" x2="250" y2="480" stroke="currentColor" className="text-signal" strokeWidth="2" />
            <line x1="20" y1="250" x2="70" y2="250" stroke="currentColor" className="text-signal" strokeWidth="2" />
            <line x1="430" y1="250" x2="480" y2="250" stroke="currentColor" className="text-signal" strokeWidth="2" />
            <line x1="85" y1="85" x2="120" y2="120" stroke="currentColor" className="text-signal/60" strokeWidth="1.5" />
            <line x1="380" y1="380" x2="415" y2="415" stroke="currentColor" className="text-signal/60" strokeWidth="1.5" />
          </svg>

          {/* Central Silicon IC Die Component (Theme Aware) */}
          <motion.div
            ref={chipRef}
            className="absolute inset-[20%] grid place-items-center rounded-3xl border border-signal/40 bg-card/90 shadow-[0_0_60px_var(--signal-glow)] backdrop-blur-md transition-colors duration-300"
            animate={{
              x: mousePos.x * 18,
              y: mousePos.y * 18,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* IC Chip Die Grid Pattern */}
            <div className="absolute inset-4 rounded-2xl border border-border bg-foreground/[0.04] p-5 flex flex-col justify-between transition-colors duration-300">
              <div className="flex items-center justify-between text-[10px] font-mono text-signal">
                <span>VLSI_CORE_3.0</span>
                <Activity className="size-3.5 text-signal animate-pulse" />
              </div>

              {/* Central Processor Icon */}
              <div className="my-auto flex flex-col items-center justify-center">
                <div className="relative grid size-20 place-items-center rounded-2xl border border-signal/60 bg-signal/15 shadow-[0_0_30px_var(--signal-glow)]">
                  <Cpu className="size-12 text-signal" />
                  <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-signal shadow-[0_0_10px_var(--signal)] animate-ping" />
                </div>
                <span className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-signal">
                  YOGAVELAN IC
                </span>
                <span className="text-[9px] font-mono text-foreground/60">
                  RTL · FPGA · EMBEDDED
                </span>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-foreground/50">
                <span>0xAF32_CORE</span>
                <span className="text-signal font-bold">CLK: 250MHz</span>
              </div>
            </div>
          </motion.div>

          {/* Glowing IC Corner Nodes */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} size-3 rounded-full bg-signal shadow-[0_0_15px_var(--signal)]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
