// Signal Architecture style reminder: headings carry data-label precision and strong editorial hierarchy.

import { ReactNode } from "react";

export default function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <div className="gsap-reveal mb-10 max-w-3xl sm:mb-14">
      <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-signal">
        <span className="inline-block h-px w-8 bg-current" />
        <span>{index}</span>
        <span className="text-foreground/55">{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">{title}</h2>
      {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65 sm:text-lg">{copy}</p>}
    </div>
  );
}
