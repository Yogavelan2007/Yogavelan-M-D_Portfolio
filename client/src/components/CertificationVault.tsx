// Creative Engineering Knowledge Core / Certification Vault Component

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, CheckCircle2, Cpu, ExternalLink, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { certifications } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

// Enhance certifications data with engineering domains
const enhancedCertifications = certifications.map((cert, index) => {
  const domains = [
    "Software & Logic",
    "Embedded Systems",
    "Artificial Intelligence",
    "Industrial IoT",
    "Programming",
    "Networking",
    "VLSI Design",
    "Hardware & Sensors",
    "ASIC & SoC Design",
  ];
  return {
    ...cert,
    id: `cert-${index + 1}`,
    number: `0${index + 1}`,
    domain: domains[index] || "Electronics",
  };
});

export default function CertificationVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<(typeof enhancedCertifications)[0] | null>(null);
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);

  // GSAP ScrollTrigger Trace Drawing & System Boot Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate PCB circuit trace lines
      gsap.fromTo(
        ".cert-trace-path",
        { strokeDashoffset: 1000, opacity: 0.2 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Central Core Power-up
      gsap.fromTo(
        coreRef.current,
        { opacity: 0, scale: 0.6, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Sequential Certification Node Reveal
      gsap.fromTo(
        ".cert-node-card",
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl border border-foreground/12 bg-card/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Background Circuit Grid & Dots */}
      <div className="absolute inset-0 opacity-15 circuit-grid pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pcb-dots pointer-events-none" />

      {/* Technical Status Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-foreground/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-signal">
            <Zap className="size-3.5 text-signal animate-pulse" />
            <span>KNOWLEDGE CORE / VERIFICATION VAULT</span>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
            Certifications & System Credentials
          </h3>
        </div>

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5 font-mono text-xs text-signal shadow-[0_0_15px_rgba(66,232,224,0.2)]">
          <span className="size-2 rounded-full bg-signal animate-ping" />
          <span className="font-bold">SYSTEM STATUS: ONLINE & VERIFIED</span>
        </div>
      </div>

      {/* Central Core Visual & Certification Network */}
      <div className="relative z-10 mt-10">
        {/* Desktop Central Core Visualization */}
        <div className="hidden lg:flex flex-col items-center justify-center my-6">
          <div
            ref={coreRef}
            className="relative grid size-32 place-items-center rounded-3xl border border-signal/50 bg-gradient-to-br from-[#0c1924]/90 via-[#071017]/95 to-[#10202d]/90 shadow-[0_0_50px_rgba(66,232,224,0.25)] backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center p-3">
              <Cpu className="size-10 text-signal animate-pulse" />
              <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-signal">
                KNOWLEDGE CORE
              </span>
              <span className="text-[8px] font-mono text-white/50">
                9 MODULES VERIFIED
              </span>
            </div>
            {/* Pulsing Corner LED Nodes */}
            {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} size-2.5 rounded-full bg-signal shadow-[0_0_10px_#42e8e0]`}
              />
            ))}
          </div>
        </div>

        {/* Certification Module Grid Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {enhancedCertifications.map((cert) => {
            const isHovered = hoveredCertId === cert.id;
            return (
              <motion.article
                key={cert.id}
                onMouseEnter={() => setHoveredCertId(cert.id)}
                onMouseLeave={() => setHoveredCertId(null)}
                onClick={() => setSelectedCert(cert)}
                className={`cert-node-card group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                  isHovered
                    ? "border-signal bg-signal/15 shadow-[0_0_30px_rgba(66,232,224,0.2)] -translate-y-1.5"
                    : "border-foreground/12 bg-foreground/[0.025] hover:border-signal/50 hover:bg-foreground/[0.04]"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                data-cursor-type="inspect"
              >
                {/* Active Circuit Signal Line Glow */}
                {isHovered && (
                  <motion.div
                    layoutId="activeCertGlow"
                    className="absolute inset-0 rounded-2xl border border-signal shadow-[0_0_20px_rgba(66,232,224,0.25)] pointer-events-none"
                  />
                )}

                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-signal mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                      MODULE {cert.number}
                    </span>
                    <span className="rounded bg-signal/15 px-2 py-0.5 text-[#42e8e0] border border-signal/30">
                      VERIFIED
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-signal transition-colors">
                    {cert.title}
                  </h4>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 border-t border-foreground/10 pt-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-foreground/50 uppercase">
                      Issuer: {cert.issuer}
                    </div>
                    <div className="text-[11px] font-semibold text-signal">
                      {cert.domain}
                    </div>
                  </div>

                  <div className="grid size-9 place-items-center rounded-xl border border-signal/30 bg-signal/10 text-signal group-hover:rotate-12 transition-transform duration-300">
                    <Award className="size-4" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Expansion Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#04080d]/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative w-full max-w-xl rounded-3xl border border-signal/40 bg-gradient-to-br from-[#0a121b]/95 via-[#070d13]/98 to-[#0d1e2b]/95 p-7 text-white shadow-[0_0_60px_rgba(66,232,224,0.25)]"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-[#42e8e0] hover:text-[#42e8e0]"
              >
                <X className="size-4" />
              </button>

              {/* Status Header */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#42e8e0] mb-4">
                <ShieldCheck className="size-4" />
                <span>KNOWLEDGE MODULE {selectedCert.number} / VERIFIED</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold text-white leading-snug">
                {selectedCert.title}
              </h3>

              {/* Detail Breakdown Grid */}
              <div className="my-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">Issuing Organization:</span>
                  <span className="text-white font-semibold mt-0.5 block">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">Technical Domain:</span>
                  <span className="text-[#42e8e0] font-semibold mt-0.5 block">{selectedCert.domain}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">Verification Status:</span>
                  <span className="text-emerald-400 font-semibold mt-0.5 block">100% VERIFIED</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">System Record:</span>
                  <span className="text-white/80 mt-0.5 block">RECORDED</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#42e8e0]">
                  <Sparkles className="size-3.5 animate-pulse" />
                  <span>Credential Authenticated</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:border-[#42e8e0] hover:text-[#42e8e0]"
                >
                  Close Module
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
