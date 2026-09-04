// Precision Custom Reticle Cursor for Engineering Portfolio

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
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.32, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.32, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement;
      const interactiveEl = target.closest("a, button, input, textarea, [data-cursor]");
      
      if (interactiveEl) {
        document.body.dataset.cursorActive = "true";
        const cursorType = interactiveEl.getAttribute("data-cursor-type") || "default";
        document.body.dataset.cursorType = cursorType;
      } else {
        document.body.dataset.cursorActive = "false";
        delete document.body.dataset.cursorType;
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onOver);
    
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      delete document.body.dataset.cursorActive;
      delete document.body.dataset.cursorType;
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring flex items-center justify-center text-[8px] font-mono text-[#42e8e0] font-bold" />
    </div>
  );
}
