// Floating Glassmorphic Navbar for Engineering Portfolio

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { navItems } from "@/data/portfolio";

export default function Navbar({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 ${
          scrolled
            ? "border-foreground/12 bg-background/85 shadow-[0_15px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* Brand / Name Logo */}
        <button
          className="group flex items-center gap-3 rounded-xl text-left"
          onClick={() => goTo("home")}
          type="button"
          aria-label="Go to home"
        >
          <div className="grid size-10 place-items-center rounded-xl border border-signal/40 bg-signal/15 text-signal transition-transform group-hover:rotate-6 shadow-[0_0_15px_rgba(66,232,224,0.3)]">
            <Cpu className="size-5 animate-pulse" />
          </div>
          <span className="hidden sm:block leading-none">
            <span className="font-display block text-base font-bold tracking-tight text-foreground">
              YOGAVELAN M D
            </span>
            <span className="mt-0.5 block font-mono text-[9px] font-bold uppercase tracking-widest text-signal">
              VLSI · EMBEDDED · FPGA
            </span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`relative rounded-lg px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-signal/15 text-signal shadow-[0_0_12px_rgba(66,232,224,0.2)]"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Action Rail */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={toggleTitle}
            className="relative flex h-9 w-[72px] items-center rounded-full border border-foreground/15 bg-foreground/[0.05] p-1 text-foreground transition hover:border-signal/60"
            data-cursor-type="default"
          >
            <motion.span
              className="absolute grid size-7 place-items-center rounded-full bg-signal text-[#04090e] shadow-[0_0_12px_#42e8e0]"
              animate={{ x: theme === "dark" ? 34 : 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span key="moon" initial={{ opacity: 0, rotate: -40 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 40 }}>
                    <Moon className="size-3.5 fill-current" />
                  </motion.span>
                ) : (
                  <motion.span key="sun" initial={{ opacity: 0, rotate: 40 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -40 }}>
                    <Sun className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
            <Sun className="ml-1 text-foreground/40 size-3.5" />
            <Moon className="ml-auto mr-1 text-foreground/40 size-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="grid size-10 place-items-center rounded-xl border border-foreground/15 text-foreground xl:hidden"
            onClick={() => setOpen((val) => !val)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-foreground/15 bg-background/95 p-4 shadow-2xl backdrop-blur-2xl xl:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className={`rounded-xl px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-widest ${
                    activeId === item.id ? "bg-signal/15 text-signal" : "text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
