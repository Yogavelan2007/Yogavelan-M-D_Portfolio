// Advanced Creative Electronics & VLSI Engineer Portfolio — Main Page

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { toast } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Microchip,
  Radio,
  Send,
  ShieldCheck,
  Terminal,
  TerminalSquare,
  UserRound,
  Workflow,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import HeroEnvironment from "@/components/HeroEnvironment";
import InteractiveSkillsMatrix from "@/components/InteractiveSkillsMatrix";
import CertificationVault from "@/components/CertificationVault";
import ProjectCaseStudyCard from "@/components/ProjectCaseStudyCard";
import ProjectModal from "@/components/ProjectModal";
import SectionHeading from "@/components/SectionHeading";
import { TechTags } from "@/components/TechTags";
import { experiences, projects, type Project } from "@/data/portfolio";
import { codingProfiles } from "@/data/codingProfiles";
import { useGsap } from "@/hooks/useGsap";
import { sendContactMessage } from "@/utils/emailService";

gsap.registerPlugin(ScrollTrigger);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PORTFOLIO_EMAIL = "yogavelanmd@gmail.com";
const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_EMAIL)}&su=${encodeURIComponent("Portfolio inquiry")}`;

// Animated Viewport Counter
function ViewportCounter({ value, suffix = "", label, started }: { value: number; suffix?: string; label: string; started: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasFinished = useRef(false);

  useEffect(() => {
    if (!started || hasFinished.current) return;
    let frameId = 0;
    const startedAt = performance.now();
    const duration = 900;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        hasFinished.current = true;
        setDisplayValue(value);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <div className="min-w-0">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/50">{label}</div>
      <div className="mt-1.5 font-display text-3xl font-bold tracking-tight text-signal sm:text-4xl">
        {started ? `${displayValue}${suffix}` : "0"}
      </div>
    </div>
  );
}

export default function Home() {
  const scopeRef = useRef<HTMLElement>(null);
  const codingSectionRef = useRef<HTMLElement>(null);
  const experienceSectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { scrollYProgress } = useScroll();

  // Loading Screen Timer
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  // Section Observer for Navbar Active Link
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }),
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Coding Counters
  useEffect(() => {
    const section = codingSectionRef.current;
    if (!section || countersStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [countersStarted]);

  // GSAP ScrollTrigger Animations
  useGsap(scopeRef, () => {
    // Section reveal animations
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Experience PCB Trace Drawing Animation
    if (experienceSectionRef.current) {
      gsap.fromTo(
        ".experience-trace-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: experienceSectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        }
      );
    }
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim() || !EMAIL_PATTERN.test(form.email)) {
      toast.error("Please complete every field with a valid email address.");
      return;
    }
    setIsSending(true);
    try {
      await sendContactMessage(form);
      toast.success("Message transmitted successfully. Thank you for reaching out!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Message transmission failed. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  // Technical Focus Cards Data for About Dashboard
  const engineeringFocusCards = [
    {
      title: "DIGITAL DESIGN",
      icon: Cpu,
      category: "Logic Gates & RTL",
      desc: "CMOS logic synthesis, logic gate minimization, and schematic design using Synopsys tools.",
    },
    {
      title: "EMBEDDED SYSTEMS",
      icon: Radio,
      category: "Firmware & Microcontrollers",
      desc: "ESP32 & STM32 system integration, PCB assembly, sensor interfacing, and hardware debugging.",
    },
    {
      title: "RTL / VERILOG",
      icon: Terminal,
      category: "Verilog HDL & AMBA Protocols",
      desc: "RTL design, FSM architecture, AMBA AHB/APB bus protocols, functional verification & testbenches.",
    },
    {
      title: "FPGA ARCHITECTURE",
      icon: Layers,
      category: "Arty S7 & Xilinx Vivado",
      desc: "3D NoC router logic, timing constraints, hardware simulation, and waveform signal analysis.",
    },
    {
      title: "AI / ML HARDWARE",
      icon: Workflow,
      category: "Computer Vision & Edge AI",
      desc: "YOLOv8 & EfficientNet model integration with FPGA state controllers for real-time inference.",
    },
  ];

  return (
    <main ref={scopeRef} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <LoadingScreen visible={loading} />
      <CustomCursor />
      <Navbar activeId={activeId} />

      {/* Top Scroll Progress Indicator Rail */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#42e8e0] via-[#00b8ff] to-[#8967ff] shadow-[0_0_12px_#42e8e0]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO SECTION */}
      <HeroEnvironment onScrollTo={scrollTo} />

      {/* 2. ABOUT SECTION — ENGINEERING PROFILE DASHBOARD */}
      <section id="about" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10 circuit-grid pointer-events-none" />
        <div className="container relative">
          <SectionHeading
            index="01"
            eyebrow="ENGINEERING PROFILE DASHBOARD"
            title={<>About <span className="text-gradient-cyan">Me</span></>}
            copy="At the intersection of digital circuits, RTL design, firmware development, and intelligent hardware systems."
          />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
            {/* Bio Card */}
            <div className="gsap-reveal rounded-3xl border border-foreground/12 bg-card/60 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-signal/30 bg-signal/15 text-signal shadow-[0_0_15px_rgba(66,232,224,0.25)]">
                <UserRound className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                3rd-Year Electronics Engineering Student specializing in VLSI Design and Technology.
              </h3>
              <div className="mt-5 space-y-4 text-base leading-7 text-foreground/75">
                <p>
                  My engineering journey focuses on bridging hardware architectures and intelligent algorithms—from transistor-level logic and Verilog RTL design to FPGA synthesis and embedded IoT systems.
                </p>
                <p>
                  I thrive on solving real-world engineering challenges, whether designing an ARM AMBA bus bridge, simulating thermal 3D NoC routers, or building computer vision edge controllers.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 font-mono text-xs font-bold text-signal">
                <span className="h-px w-10 bg-signal shadow-[0_0_8px_#42e8e0]" />
                <span>Hardware → Digital Design → Firmware → AI</span>
              </div>
            </div>

            {/* Education & Focus Area Dashboard Cards */}
            <div className="space-y-6">
              {/* Education Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="gsap-reveal rounded-3xl border border-foreground/12 bg-card/50 p-6 backdrop-blur-xl shadow-lg"
              >
                <div className="flex items-center gap-3 text-signal">
                  <GraduationCap className="size-6" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">
                    Academic Background
                  </span>
                </div>
                <h4 className="mt-3 font-display text-2xl font-bold text-foreground">
                  B.E. Electronics Engineering
                </h4>
                <p className="mt-1 font-mono text-xs font-semibold text-signal">
                  VLSI Design and Technology Specialization
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground/70">
                  Chennai Institute of Technology (2024 – 2028)<br />
                  <span className="font-mono font-bold text-foreground">CGPA: 7.97</span>
                </p>
              </motion.div>

              {/* Engineering Focus Grid */}
              <div className="gsap-reveal space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground/50">
                  Engineering Focus Areas:
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {engineeringFocusCards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="group rounded-2xl border border-foreground/12 bg-foreground/[0.03] p-4 transition-all duration-300 hover:border-signal/50 hover:bg-signal/10"
                      >
                        <div className="flex items-center gap-2.5 text-signal">
                          <IconComponent className="size-4 animate-pulse" />
                          <span className="font-mono text-xs font-bold">{card.title}</span>
                        </div>
                        <p className="mt-2 text-xs text-foreground/70 leading-relaxed">
                          {card.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION — ELECTRONIC SIGNAL PATH TIMELINE */}
      <section ref={experienceSectionRef} id="experience" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="container relative">
          <SectionHeading
            index="02"
            eyebrow="FIELD & INDUSTRY INTERNSHIPS"
            title={<>Experience, built <span className="text-gradient-cyan">in the lab.</span></>}
            copy="Hands-on engineering internships spanning embedded firmware, PCB testing, Verilog RTL, and ASIC design flows."
          />

          {/* Electronic Signal Trace Timeline Container */}
          <div className="relative ml-4 border-l border-foreground/15 pl-8 sm:ml-8 sm:pl-12">
            {/* GSAP Progressively Drawn PCB Trace Line */}
            <div className="experience-trace-line absolute -left-px top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#42e8e0] via-[#00b8ff] to-transparent shadow-[0_0_12px_#42e8e0]" />

            <div className="space-y-10">
              {experiences.map((experience, index) => (
                <article
                  key={experience.company}
                  className="gsap-reveal relative rounded-3xl border border-foreground/12 bg-card/60 p-7 shadow-xl backdrop-blur-xl transition duration-300 hover:border-signal/50 sm:p-9"
                  data-cursor-type="inspect"
                >
                  {/* Glowing Node Test Point */}
                  <span className="absolute -left-[2.7rem] top-9 grid size-6 place-items-center rounded-full border-4 border-background bg-signal shadow-[0_0_16px_#42e8e0] sm:-left-[3.75rem]">
                    <span className="size-2 rounded-full bg-[#04090e]" />
                  </span>

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-signal">
                        <span>TP-0{index + 1}</span>
                        <span className="h-px w-8 bg-signal/40" />
                        <span>{experience.period}</span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                        {experience.role}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-foreground/75">
                        {experience.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-foreground/12 bg-foreground/[0.04] px-3.5 py-1.5 text-xs font-mono text-foreground/70">
                      <MapPin className="size-3.5 text-signal" />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl text-sm sm:text-base leading-7 text-foreground/75">
                    {experience.description}
                  </p>
                  {experience.detail && (
                    <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-foreground/75">
                      {experience.detail}
                    </p>
                  )}

                  <div className="mt-6">
                    <TechTags tags={experience.technologies} compact />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION — ENGINEERING CASE STUDIES */}
      <section id="projects" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(66,232,224,0.08),transparent_45%)] pointer-events-none" />
        <div className="container relative">
          <SectionHeading
            index="03"
            eyebrow="ENGINEERING CASE STUDIES"
            title={<>Featured <span className="text-gradient-cyan">Projects</span></>}
            copy="Practical systems implemented across Embedded IoT, RTL Verilog, 3D NoC FPGA Architecture, AMBA Buses, AI Vision, and Synopsys EDA."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCaseStudyCard
                key={project.id}
                project={project}
                onInspect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SKILLS SECTION — INTERACTIVE SEMICONDUCTOR MATRIX */}
      <section id="skills" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="container">
          <SectionHeading
            index="04"
            eyebrow="INTERACTIVE MATRIX"
            title={<>Technical <span className="text-gradient-cyan">Skills Matrix</span></>}
            copy="Explore technical competencies across VLSI, FPGA, embedded firmware, programming languages, and AI frameworks."
          />

          <InteractiveSkillsMatrix />
        </div>
      </section>

      {/* 6. CODING PROFILES SECTION — PRESERVED DATA WITH ENHANCED METRICS UI */}
      <section ref={codingSectionRef} id="coding" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="container">
          <SectionHeading
            index="05"
            eyebrow="PROBLEM SOLVING & PRACTICE"
            title={<>Coding & <span className="text-gradient-cyan">Metrics</span></>}
            copy="Strengthening algorithmic thinking, data structures, and competitive problem solving."
          />

          <div className="gsap-reveal grid gap-6 md:grid-cols-3">
            {codingProfiles.map((profile) => (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/12 bg-card/60 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-signal/60 hover:shadow-[0_0_30px_rgba(66,232,224,0.15)]"
                whileHover={{ y: -4 }}
                data-cursor-type="inspect"
              >
                <div
                  className="absolute -right-12 -top-12 size-36 rounded-full opacity-15 blur-2xl transition group-hover:opacity-35"
                  style={{ background: profile.accent }}
                />

                <div className="relative flex h-14 items-center justify-between">
                  <img
                    src={profile.logo}
                    alt={`${profile.name} logo`}
                    className="max-h-12 max-w-[120px] object-contain object-left transition duration-300 group-hover:scale-105"
                  />
                  <span className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-[10px] font-mono text-foreground/70">
                    @{profile.username}
                  </span>
                </div>

                <div className="relative mt-6">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/60">
                    {profile.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-5">
                    {profile.metrics.map((metric) => (
                      <ViewportCounter
                        key={metric.label}
                        value={metric.value}
                        suffix={metric.suffix}
                        label={metric.label}
                        started={countersStarted}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mt-8 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-foreground/70 transition group-hover:text-signal">
                  <span>Inspect Profile</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ACHIEVEMENTS SECTION — CREATIVE ENGINEERING KNOWLEDGE CORE */}
      <section id="achievements" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="container">
          <SectionHeading
            index="06"
            eyebrow="ENGINEERING KNOWLEDGE CORE"
            title={<>Certification <span className="text-gradient-cyan">Vault</span></>}
            copy="Verified engineering & technological credentials initialized within an interactive knowledge matrix."
          />

          <CertificationVault />
        </div>
      </section>

      {/* 8. CONTACT SECTION — ENGINEER COMMUNICATION TERMINAL */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 opacity-15 circuit-grid pointer-events-none" />
        <div className="container relative">
          <SectionHeading
            index="07"
            eyebrow="COMMUNICATION TERMINAL"
            title={<>Establish <span className="text-gradient-cyan">Connection.</span></>}
            copy="Have an engineering project, internship opportunity, or technical inquiry? Send a message directly to my terminal."
          />

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
            {/* Terminal Sidebar */}
            <aside className="gsap-reveal rounded-3xl border border-foreground/12 bg-card/60 p-7 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
                <div className="flex items-center gap-2.5 text-signal font-mono text-xs font-bold">
                  <TerminalSquare className="size-5" />
                  <span>TERMINAL_STATUS: READY</span>
                </div>
                <span className="size-2.5 rounded-full bg-signal shadow-[0_0_8px_#42e8e0] animate-ping" />
              </div>

              <p className="font-display text-xl font-semibold leading-relaxed text-foreground">
                Open to technical exchange, VLSI & embedded engineering roles, and project collaborations.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={EMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compose an email via Gmail"
                  className="contact-link"
                >
                  <Mail className="size-5" />
                  <span>
                    <span>Direct Email</span>
                    <strong>{PORTFOLIO_EMAIL}</strong>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Linkedin className="size-5" />
                  <span>
                    <span>LinkedIn Profile</span>
                    <strong>YOGAVELAN M D</strong>
                  </span>
                </a>
                <a
                  href="https://github.com/Yogavelan2007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Github className="size-5" />
                  <span>
                    <span>GitHub Repositories</span>
                    <strong>Yogavelan2007</strong>
                  </span>
                </a>
              </div>
            </aside>

            {/* Contact Form */}
            <form
              className="gsap-reveal rounded-3xl border border-foreground/12 bg-card/70 p-7 backdrop-blur-xl shadow-xl sm:p-9"
              onSubmit={submitForm}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="field-label">
                  Your Name
                  <input
                    className="field-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </label>
                <label className="field-label">
                  Email Address
                  <input
                    className="field-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <label className="field-label mt-5">
                Subject
                <input
                  className="field-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What is the subject of your inquiry?"
                  required
                />
              </label>

              <label className="field-label mt-5">
                Message Content
                <textarea
                  className="field-input min-h-36 resize-y"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your engineering idea, system requirements, or project opportunity..."
                  required
                />
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#42e8e0] to-[#00b8ff] px-6 py-4 text-sm font-bold text-[#040a0f] shadow-[0_0_25px_rgba(66,232,224,0.25)] transition duration-300 hover:shadow-[0_0_35px_rgba(66,232,224,0.45)] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {isSending ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" />
                    <span>Transmitting Signal…</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Route Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/10 bg-card/40">
        <div className="container flex flex-col justify-between gap-6 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 place-items-center rounded-xl border border-signal/40 bg-signal/15 text-signal">
              <Cpu className="size-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-foreground">
                YOGAVELAN M D
              </div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-signal">
                ELECTRONICS ENGINEER · VLSI · EMBEDDED · FPGA
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-foreground/70">
            <a href="https://github.com/Yogavelan2007" target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/" target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              LinkedIn
            </a>
            <a href={EMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              Email
            </a>
            <button type="button" onClick={() => scrollTo("home")} className="inline-flex items-center gap-1 text-signal hover:underline">
              Return to Top <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="container border-t border-foreground/8 py-4 text-center text-[10px] font-mono text-foreground/40">
          © 2026 YOGAVELAN M D. ALL RIGHTS RESERVED. ELECTRONICS ENGINEERING PORTFOLIO.
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
