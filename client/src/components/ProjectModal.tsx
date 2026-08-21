// Signal Architecture style reminder: project details should read as a deliberate technical brief, not decorative overlay content.

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#05070a]/75 p-3 backdrop-blur-sm sm:items-center sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.section
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[1.6rem] border border-white/10 bg-card p-6 text-card-foreground shadow-2xl sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-foreground/10 text-foreground/70 transition hover:border-signal hover:text-signal" type="button" aria-label="Close project details" onClick={onClose}>
              <X size={18} />
            </button>
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-signal">Project / {project.number}</div>
            <h2 id="project-modal-title" className="font-display max-w-2xl text-3xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{project.title}</h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground/55">{project.category}</p>
            <div className="mt-9 grid gap-8 md:grid-cols-[1.35fr_0.65fr]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-signal">Project overview</h3>
                <div className="mt-4 space-y-4 text-base leading-7 text-foreground/70">
                  {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.035] p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-signal">Technology stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => <span key={technology} className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs font-semibold text-foreground/70">{technology}</span>)}
                </div>
                {project.github && (
                  <a className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground transition hover:text-signal" href={project.github} target="_blank" rel="noopener noreferrer">
                    View repository <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
