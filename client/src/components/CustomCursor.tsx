// Signal Architecture style reminder: the desktop cursor behaves like a quiet, responsive instrument indicator.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.36, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.36, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };
    const onOver = (event: Event) => {
      const target = event.target as HTMLElement;
      const active = Boolean(target.closest("a, button, [data-cursor]"));
      document.body.dataset.cursorActive = active ? "true" : "false";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      delete document.body.dataset.cursorActive;
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
