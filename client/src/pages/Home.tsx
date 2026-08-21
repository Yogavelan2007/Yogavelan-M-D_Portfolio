// Signal Architecture style reminder: content follows a vertical signal path, with technical clarity before visual spectacle.

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { toast } from "sonner";
import { gsap } from "gsap";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  CircuitBoard,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Microchip,
  Send,
  TerminalSquare,
  UserRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ProjectModal from "@/components/ProjectModal";
import SectionHeading from "@/components/SectionHeading";
import { certifications, experiences, projects, skillGroups, type Project } from "@/data/portfolio";
import { codingProfiles } from "@/data/codingProfiles";
import { useGsap } from "@/hooks/useGsap";
import { sendContactMessage } from "@/utils/emailService";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PORTFOLIO_EMAIL = "yogavelanmd@gmail.com";
const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_EMAIL)}&su=${encodeURIComponent("Portfolio inquiry")}`;

function chipGlyph(variant: Project["visual"]) {
  const glyphs = {
    pill: "0101",
    noc: "3D",
    traffic: "AI",
    bridge: "AHB",
    sentinel: "CV",
    synopsys: "CMOS",
  };
  return glyphs[variant];
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />;
  }
  return (
    <div className={`engineering-art artifact-${project.visual} relative h-full overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(66,232,224,0.2),transparent_33%),linear-gradient(140deg,rgba(16,29,42,0.95),rgba(5,8,12,1))]`}>
      <div className="absolute inset-0 opacity-45 circuit-grid" />
      <div className="artifact-halo absolute left-[15%] top-[19%] size-[68%] rounded-[26%] border border-signal/35 bg-[#0b141b]/80 shadow-[0_0_42px_rgba(66,232,224,0.12)] transition duration-500 group-hover:rotate-3" />
      <div className="artifact-core absolute left-1/2 top-1/2 grid size-[35%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-signal/50 bg-[#0e2029] font-display text-xl font-bold tracking-[-0.06em] text-signal shadow-[0_0_28px_rgba(66,232,224,0.15)]">
        {chipGlyph(project.visual)}
      </div>
      <div className="artifact-scan absolute inset-x-[9%] top-1/2 h-px bg-signal/45" />
      <div className="artifact-trace artifact-trace-a" /><div className="artifact-trace artifact-trace-b" /><div className="artifact-trace artifact-trace-c" />
      <div className="artifact-caption absolute bottom-4 left-5 text-[9px] font-bold uppercase tracking-[0.2em] text-signal/80">{project.visual === "bridge" ? "bus interface / verify" : project.visual === "sentinel" ? "image signal / classify" : "logic surface / simulate"}</div>
      {["left-[8%] top-1/2", "right-[7%] top-[28%]", "bottom-[9%] right-[28%]"].map((position) => <span key={position} className={`artifact-node absolute ${position} size-2 rounded-full bg-signal shadow-[0_0_15px_rgba(66,232,224,0.9)]`} />)}
    </div>
  );
}

function TechTags({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  return <div className={`flex flex-wrap ${compact ? "gap-1.5" : "gap-2"}`}>{tags.map((tag) => <span key={tag} className={`rounded-full border border-foreground/10 bg-foreground/[0.035] font-semibold text-foreground/65 transition duration-300 group-hover:border-signal/35 group-hover:text-foreground ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"}`}>{tag}</span>)}</div>;
}

function ViewportCounter({ value, suffix = "", label, started }: { value: number; suffix?: string; label: string; started: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasFinished = useRef(false);
  const numericValue = value;

  useEffect(() => {
    if (!started || hasFinished.current) return;

    let frameId = 0;
    const startedAt = performance.now();
    const duration = 820;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(numericValue * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        hasFinished.current = true;
        setDisplayValue(numericValue);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, numericValue]);

  return <div className="min-w-0"><div className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/47">{label}</div><div className="mt-2 font-display text-3xl font-bold tracking-[-0.07em] text-signal sm:text-4xl">{started ? `${displayValue}${suffix}` : "0"}</div></div>;
}

export default function Home() {
  const scopeRef = useRef<HTMLElement>(null);
  const codingSectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }),
      { rootMargin: "-36% 0px -52% 0px", threshold: 0.01 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [countersStarted]);

  useGsap(scopeRef, () => {
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
      gsap.fromTo(element, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" } });
    });
    gsap.to(".hero-orbit", { rotate: 360, duration: 48, ease: "none", repeat: -1 });
    gsap.to(".hero-signal", { strokeDashoffset: -260, duration: 4, ease: "none", repeat: -1 });
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
      toast.success("Message sent. Thank you for reaching out.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Message could not be sent. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main ref={scopeRef} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <LoadingScreen visible={loading} />
      <CustomCursor />
      <Navbar activeId={activeId} />
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-signal shadow-[0_0_12px_rgba(66,232,224,0.9)]" style={{ scaleX: scrollYProgress }} />

      <section id="home" className="relative min-h-[770px] overflow-hidden border-b border-foreground/10 pt-28 sm:pt-36 lg:min-h-[810px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(66,232,224,0.1),transparent_24%),radial-gradient(circle_at_85%_76%,rgba(137,103,255,0.1),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.16] circuit-grid" />
        <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,var(--background)_2%,transparent_50%,var(--background)_100%)] lg:w-[62%]" />
        <div className="container relative z-10 grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
          <div className="gsap-reveal relative z-20 max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-signal"><span className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_rgba(66,232,224,1)]" />Available for engineering opportunities</div>
            <h1 className="font-display text-[clamp(3.8rem,9vw,7.8rem)] font-bold leading-[0.84] tracking-[-0.075em] text-foreground">YOGAVELAN<br /><span className="text-gradient">M D</span></h1>
            <div className="mt-8 flex items-start gap-4"><span className="mt-2 h-px w-9 shrink-0 bg-signal" /><p className="font-display max-w-xl text-xl font-medium leading-snug tracking-[-0.025em] text-foreground/86 sm:text-2xl">VLSI Design & Embedded Systems Enthusiast</p></div>
            <p className="mt-6 max-w-xl text-base leading-7 text-foreground/66 sm:text-lg">Electronics Engineering student passionate about VLSI, embedded systems, FPGA design, AI-driven hardware, and building real-world engineering solutions.</p>
            <div className="mt-7 flex flex-wrap gap-2"><TechTags tags={["VLSI", "Embedded Systems", "FPGA", "Verilog", "Python", "AI"]} /></div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => scrollTo("projects")} className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-bold text-[#061015] shadow-[0_0_26px_rgba(66,232,224,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(66,232,224,0.34)]"><span>Inspect Projects</span><ArrowDownRight size={17} /></button>
              <button type="button" onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/[0.03] px-5 py-3.5 text-sm font-bold text-foreground transition hover:border-signal/60 hover:text-signal">Open Channel <Send size={15} /></button>
              <a href="https://drive.google.com/file/d/102TKMKQlTP-AOjBjeE9q3b6Bm9hWM0KG/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/[0.03] px-5 py-3.5 text-sm font-bold text-foreground transition hover:border-signal/60 hover:text-signal">Resume <Download size={16} /></a>
            </div>
            <div className="mt-11 flex items-center gap-3"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/42">Connect</span><span className="h-px w-7 bg-foreground/15" /><a aria-label="GitHub profile" href="https://github.com/Yogavelan2007" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={18} /></a><a aria-label="LinkedIn profile" href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={18} /></a><a aria-label="Compose an email via Gmail" href={EMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="social-link"><Mail size={18} /></a></div>
          </div>

          <div className="gsap-reveal relative mx-auto aspect-square w-full max-w-[570px] lg:ml-auto">
            <img src="/images/yogavelan-electronics-hero.jpg" alt="Electronic circuit board with components and signal traces" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen" />
            <div className="absolute inset-[6%] rounded-full border border-signal/20" />
            <div className="hero-orbit absolute inset-[12%] rounded-full border border-dashed border-signal/35" />
            <div className="absolute inset-[22%] grid place-items-center rounded-[27%] border border-signal/45 bg-[#0d1921]/75 shadow-[0_0_70px_rgba(66,232,224,0.15)] backdrop-blur-sm">
              <Microchip className="size-20 text-signal sm:size-28" strokeWidth={1.15} />
              <span className="absolute bottom-[18%] text-[9px] font-bold uppercase tracking-[0.28em] text-signal">signal core</span>
            </div>
            <svg className="absolute inset-0 size-full" viewBox="0 0 560 560" fill="none" aria-hidden="true"><path className="hero-signal" d="M28 340C110 340 135 110 250 110C385 110 355 440 542 440" stroke="#42E8E0" strokeWidth="1.5" strokeDasharray="7 10" /><path d="M52 450C140 450 158 350 243 350C330 350 360 214 511 214" stroke="rgba(137,103,255,0.68)" strokeWidth="1" strokeDasharray="3 9" /></svg>
            <div className="absolute left-0 top-[30%] rounded-xl border border-signal/25 bg-background/75 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-signal backdrop-blur-md">Electronics</div>
          </div>
        </div>
        <button type="button" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/42 lg:flex" onClick={() => scrollTo("about")}>Scroll to inspect <ArrowDownRight size={15} /></button>
      </section>

      <section id="about" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-[0.09] circuit-grid" />
        <div className="container relative">
          <SectionHeading index="01" eyebrow="Profile" title={<>About <span className="text-gradient">Me</span></>} copy="At the intersection of digital design, firmware, and intelligent systems." />
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="gsap-reveal rounded-[1.6rem] border border-foreground/10 bg-card/45 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-9">
              <div className="flex size-11 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal"><UserRound size={21} /></div>
              <p className="mt-7 font-display text-2xl font-medium leading-snug tracking-[-0.035em] text-foreground sm:text-3xl">An Electronics Engineering student specializing in VLSI Design and Technology.</p>
              <div className="mt-6 space-y-4 text-base leading-7 text-foreground/66"><p>My work explores how RTL, Verilog HDL, FPGA platforms, embedded systems, IoT, and AI-based projects can be connected into practical engineering solutions.</p><p>I enjoy translating technical ideas into systems where hardware and software reinforce each other—from circuit assembly and firmware to digital verification and computer vision.</p></div>
              <div className="mt-8 flex items-center gap-3 text-sm font-bold text-signal"><span className="h-px w-10 bg-signal" />Hardware → Digital Design → AI</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <motion.div whileHover={{ y: -5 }} className="gsap-reveal rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.025] p-6"><GraduationCap className="text-signal" size={24} /><div className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/48">Education</div><h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">B.E. Electronics Engineering</h3><p className="mt-3 text-sm leading-6 text-foreground/64">VLSI Design and Technology<br />Chennai Institute of Technology<br />2024 – 2028 · CGPA: 7.97</p></motion.div>
              <motion.div whileHover={{ y: -5 }} className="gsap-reveal rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.025] p-6"><CircuitBoard className="text-signal" size={24} /><div className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/48">Focus areas</div><h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">Systems, from logic to impact.</h3><div className="mt-5"><TechTags tags={["VLSI", "Embedded", "FPGA", "AI"]} /></div></motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="container">
          <SectionHeading index="02" eyebrow="Practical work" title={<>Experience, built <span className="text-gradient">in the field.</span></>} />
          <div className="relative ml-2 border-l border-foreground/12 pl-8 sm:ml-5 sm:pl-12">
            <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-signal via-signal/40 to-transparent" />
            <div className="space-y-7">
              {experiences.map((experience, index) => <article key={experience.company} className="gsap-reveal relative rounded-[1.5rem] border border-foreground/10 bg-card/45 p-6 backdrop-blur-sm transition hover:border-signal/35 sm:p-8"><span className="absolute -left-[2.58rem] top-8 grid size-5 place-items-center rounded-full border-4 border-background bg-signal shadow-[0_0_15px_rgba(66,232,224,0.85)] sm:-left-[3.6rem]"><span className="size-1.5 rounded-full bg-[#061015]" /></span><div className="flex flex-col justify-between gap-5 md:flex-row"><div><div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-signal"><span>0{index + 1}</span><span className="h-px w-8 bg-signal/50" />{experience.period}</div><h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">{experience.role}</h3><p className="mt-1 text-base font-semibold text-foreground/65">{experience.company}</p></div><div className="flex h-fit items-center gap-2 rounded-full border border-foreground/10 px-3 py-1.5 text-xs font-semibold text-foreground/52"><MapPin size={14} />{experience.location}</div></div><p className="mt-6 max-w-3xl leading-7 text-foreground/67">{experience.description}</p>{experience.detail && <p className="mt-3 max-w-3xl leading-7 text-foreground/67">{experience.detail}</p>}<div className="mt-6"><TechTags tags={experience.technologies} compact /></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative border-b border-foreground/10 py-24 sm:py-32">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(66,232,224,0.07),transparent_43%)]" />
        <div className="container relative"><SectionHeading index="03" eyebrow="Selected systems" title={<>Featured <span className="text-gradient">Projects</span></>} copy="A selection of work across embedded IoT, RTL, FPGA, AI, verification, and electronic design automation." />
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project) => <motion.article key={project.id} className="group gsap-reveal overflow-hidden rounded-[1.65rem] border border-foreground/10 bg-card/45 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-colors hover:border-signal/45" whileHover={{ y: -6 }} transition={{ duration: 0.22 }} data-cursor><div className="relative h-56 overflow-hidden border-b border-foreground/10"><ProjectVisual project={project} /><div className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#071015]/75 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-sm">SYSTEM {project.number}</div></div><div className="p-6 sm:p-7"><div className="text-[10px] font-bold uppercase tracking-[0.19em] text-signal">{project.category}</div><h3 className="mt-3 font-display text-2xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[1.8rem]">{project.title}</h3><p className="mt-4 line-clamp-2 text-sm leading-6 text-foreground/65">{project.description[0]}</p><div className="mt-5"><TechTags tags={project.technologies.slice(0, 4)} compact /></div><div className="mt-7 flex items-center justify-between gap-3"><button type="button" className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-signal" onClick={() => setSelectedProject(project)}>Inspect System <ArrowUpRight size={16} /></button>{project.github ? <a aria-label={`Open ${project.title} repository`} href={project.github} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-xl border border-foreground/10 text-foreground/70 transition hover:border-signal hover:text-signal"><Github size={18} /></a> : <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/38">System brief</span>}</div></div></motion.article>)}
          </div>
        </div>
      </section>

      <section id="skills" className="relative border-b border-foreground/10 py-24 sm:py-32"><div className="container"><SectionHeading index="04" eyebrow="Capability map" title={<>Technical <span className="text-gradient">Skills</span></>} copy="A working toolkit arranged around the systems that interest me, without artificial proficiency scores." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skillGroups.map((group, index) => <motion.article key={group.title} className={`gsap-reveal rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.026] p-6 ${index === 0 ? "xl:col-span-2" : ""}`} whileHover={{ y: -4 }}><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg border border-signal/25 bg-signal/10 text-xs font-bold text-signal">0{index + 1}</span><h3 className="font-display text-xl font-bold tracking-[-0.035em]">{group.title}</h3></div><div className="mt-6"><TechTags tags={group.items} /></div></motion.article>)}</div></div></section>

      <section ref={codingSectionRef} id="coding" className="relative overflow-hidden border-b border-foreground/10 py-24 sm:py-32"><div className="code-ghost select-none" aria-hidden="true">&lt;/&gt; &nbsp; {'{ }'} &nbsp; #include &nbsp; while() &nbsp; 1010</div><div className="container relative"><SectionHeading index="05" eyebrow="Practice" title={<>Coding & <span className="text-gradient">Problem Solving</span></>} copy="Beyond hardware and VLSI design, I continuously strengthen my programming and problem-solving skills through coding platforms." /><div className="gsap-reveal overflow-x-auto pb-2"><div className="grid min-w-[780px] grid-cols-3 divide-x divide-foreground/10 overflow-hidden rounded-[1.55rem] border border-foreground/10 bg-card/50 backdrop-blur-sm">{codingProfiles.map((profile) => <motion.a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="group relative flex min-h-[258px] flex-col overflow-hidden p-7 text-left transition hover:bg-foreground/[0.035] sm:p-8" whileHover={{ y: -3 }}><div className="absolute -right-12 -top-12 size-36 rounded-full opacity-15 blur-2xl transition group-hover:opacity-30" style={{ background: profile.accent }} /><div className="relative flex h-14 items-center"><img src={profile.logo} alt={`${profile.name} logo`} className="max-h-12 max-w-[120px] object-contain object-left transition duration-300 group-hover:scale-105" /></div><h3 className="relative mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">{profile.name}</h3><div className="relative mt-6 flex items-end gap-7">{profile.metrics.map((metric) => <ViewportCounter key={metric.label} value={metric.value} suffix={metric.suffix} label={metric.label} started={countersStarted} />)}</div><span className="relative mt-auto inline-flex items-center gap-2 pt-7 text-xs font-bold uppercase tracking-[0.14em] text-foreground/55 transition group-hover:text-signal">Inspect profile <ArrowUpRight size={15} /></span></motion.a>)}</div></div></div></section>

      <section id="achievements" className="relative border-b border-foreground/10 py-24 sm:py-32"><div className="container"><SectionHeading index="06" eyebrow="Learning record" title={<>Achievements & <span className="text-gradient">Certifications</span></>} /><div className="grid gap-4 md:grid-cols-2">{certifications.map((certification, index) => <motion.article key={certification.title} className="gsap-reveal flex gap-5 rounded-[1.4rem] border border-foreground/10 bg-foreground/[0.026] p-6 transition hover:border-signal/38" whileHover={{ x: 4 }}><div className="grid size-12 shrink-0 place-items-center rounded-xl border border-signal/25 bg-signal/10 text-signal"><Award size={23} /></div><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/42">Certification / 0{index + 1}</div><h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.035em]">{certification.title}</h3><p className="mt-2 text-sm leading-6 text-foreground/59">{certification.issuer}</p></div></motion.article>)}</div></div></section>

      <section id="contact" className="relative overflow-hidden py-24 sm:py-32"><div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(66,232,224,0.14),transparent_29%),radial-gradient(circle_at_18%_88%,rgba(137,103,255,0.1),transparent_26%)]" /><div className="container relative"><SectionHeading index="07" eyebrow="Channel / Contact" title={<>Let&apos;s build something <span className="text-gradient">together.</span></>} copy="Have an idea, project, internship opportunity, or simply want to connect? Feel free to reach out." /><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16"><aside className="gsap-reveal rounded-[1.5rem] border border-foreground/10 bg-card/40 p-7 backdrop-blur-sm"><div className="grid size-11 place-items-center rounded-xl border border-signal/25 bg-signal/10 text-signal"><TerminalSquare size={22} /></div><p className="mt-7 font-display text-2xl font-medium leading-snug tracking-[-0.035em]">Open to technical exchange, engineering review, and relevant opportunities.</p><div className="mt-8 space-y-4"><a href={EMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" aria-label="Compose an email via Gmail" className="contact-link"><Mail size={18} /><span><span>Route / Email</span><strong>{PORTFOLIO_EMAIL}</strong></span></a><a href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/" target="_blank" rel="noopener noreferrer" className="contact-link"><Linkedin size={18} /><span><span>Connect / LinkedIn</span><strong>YOGAVELAN M D</strong></span></a><a href="https://github.com/Yogavelan2007" target="_blank" rel="noopener noreferrer" className="contact-link"><Github size={18} /><span><span>Review / GitHub</span><strong>Yogavelan2007</strong></span></a></div></aside><form className="gsap-reveal rounded-[1.5rem] border border-foreground/10 bg-card/55 p-6 backdrop-blur-sm sm:p-8" onSubmit={submitForm} noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Name<input className="field-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" required /></label><label className="field-label">Email<input className="field-input" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /></label></div><label className="field-label mt-5">Subject<input className="field-input" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="What would you like to discuss?" required /></label><label className="field-label mt-5">Message<textarea className="field-input min-h-36 resize-y" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Describe the idea, system, or opportunity." required /></label><button type="submit" disabled={isSending} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-bold text-[#061015] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-65">{isSending ? <><LoaderCircle className="animate-spin" size={17} />Routing message…</> : <><Send size={16} />Route Message</>}</button></form></div></div></section>

      <footer className="border-t border-foreground/10 bg-foreground/[0.025]"><div className="container flex flex-col justify-between gap-7 py-9 md:flex-row md:items-center"><div className="flex items-center gap-4"><img src="/images/yogavelan-signal-mark.png" alt="" className="size-14" /><div><div className="font-display text-xl font-bold tracking-[-0.05em]">YOGAVELAN M D</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-signal/75">VLSI · Embedded · FPGA</div></div></div><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-foreground/55"><a href="https://github.com/Yogavelan2007" target="_blank" rel="noopener noreferrer" className="hover:text-signal">GitHub</a><a href="https://www.linkedin.com/in/yogavelan-m-d-499b52312/" target="_blank" rel="noopener noreferrer" className="hover:text-signal">LinkedIn</a><a href={EMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-signal">Email</a><button type="button" onClick={() => scrollTo("home")} className="inline-flex items-center gap-1.5 text-foreground hover:text-signal">Return to origin <ArrowUpRight size={14} /></button></div></div><div className="container border-t border-foreground/8 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/38">© 2026 Yogavelan M D. All rights reserved.</div></footer>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
