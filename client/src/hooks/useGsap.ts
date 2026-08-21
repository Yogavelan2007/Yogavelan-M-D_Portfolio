// Signal Architecture style reminder: motion should resemble a measured signal, never visual noise.

import { DependencyList, RefObject, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
  dependencies: DependencyList = [],
) {
  useLayoutEffect(() => {
    const context = gsap.context(setup, scope);
    return () => context.revert();
    // The caller explicitly controls the motion dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
