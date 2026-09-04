// Enhanced Engineering Case Study Details Modal

import { AnimatePresence, motion } from "framer-motion";
import { Cpu, ExternalLink, Github, Layers, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#04070a]/80 p-3 backdrop-blur-md sm:items-center sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-foreground/15 bg-card p-6 text-card-foreground shadow-2xl sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-foreground/15 text-foreground/70 transition hover:border-signal hover:text-signal"
              type="button"
              aria-label="Close project details"
              onClick={onClose}
            >
              <X className="size-5" />
            </button>

            {/* System Header */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-signal">
              <Cpu className="size-4 animate-pulse" />
              <span>ENGINEERING CASE STUDY / SYSTEM {project.number}</span>
            </div>

            <h2
              id="project-modal-title"
              className="mt-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-foreground/60">
              {project.category}
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_0.7fr]">
              {/* Detailed Engineering Brief */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-signal">
                  <Layers className="size-4" />
                  <span>Architecture & Technical Brief</span>
                </div>
                <div className="space-y-4 text-base leading-7 text-foreground/80">
                  {project.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Technology Stack Panel */}
              <div className="rounded-2xl border border-foreground/12 bg-foreground/[0.03] p-6 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-signal">
                  Technology Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <div className="pt-4 border-t border-foreground/10">
                    <a
                      className="inline-flex items-center gap-2 text-sm font-bold text-signal transition hover:underline"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      <span>Inspect Repository</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
