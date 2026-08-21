// Signal Architecture style reminder: the navigation is a compact instrument rail—clear, translucent, and precise.

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { navItems } from "@/data/portfolio";

export default function Navbar({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const toggleTitle = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4 ${scrolled ? "border-foreground/10 bg-background/85 shadow-[0_14px_40px_rgba(0,0,0,0.13)] backdrop-blur-xl" : "border-transparent bg-transparent"}`} aria-label="Main navigation">
        <button className="group flex items-center gap-2.5 rounded-xl py-1 text-left" onClick={() => goTo("home")} type="button" aria-label="Go to home">
          <img src="/images/yogavelan-signal-mark.png" alt="Yogavelan M D signal mark" className="size-12 transition-transform duration-300 group-hover:rotate-6" />
          <span className="hidden leading-none sm:block">
            <span className="font-display block text-sm font-bold tracking-[-0.04em] text-foreground">YOGAVELAN M D</span>
            <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.18em] text-signal/70">VLSI · Embedded · FPGA</span>
          </span>
        </button>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goTo(item.id)} className={`rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition ${activeId === item.id ? "bg-foreground/8 text-signal" : "text-foreground/60 hover:text-foreground"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" title={toggleTitle} className="theme-toggle relative flex h-10 w-[76px] items-center rounded-full border border-foreground/12 bg-foreground/[0.045] p-1 text-foreground transition hover:border-signal/70" data-cursor>
            <motion.span className="absolute grid size-8 place-items-center rounded-full bg-signal text-[#071116] shadow-[0_0_15px_rgba(66,232,224,0.3)]" animate={{ x: theme === "dark" ? 34 : 0 }} transition={{ type: "spring", stiffness: 480, damping: 30 }}>
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? <motion.span key="moon" initial={{ opacity: 0, rotate: -40 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 40 }}><Moon size={15} fill="currentColor" /></motion.span> : <motion.span key="sun" initial={{ opacity: 0, rotate: 40 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -40 }}><Sun size={16} /></motion.span>}
              </AnimatePresence>
            </motion.span>
            <Sun className="ml-1 text-foreground/45" size={14} />
            <Moon className="ml-auto mr-1 text-foreground/45" size={14} />
          </button>
          <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} className="grid size-10 place-items-center rounded-xl border border-foreground/12 text-foreground xl:hidden" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={19} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.2 }}>
            <div className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => <button type="button" key={item.id} onClick={() => goTo(item.id)} className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${activeId === item.id ? "bg-signal/15 text-signal" : "text-foreground/75 hover:bg-foreground/5"}`}>{item.label}</button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
