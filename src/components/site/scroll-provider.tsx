"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  MOTION_QUERY,
  parallax,
  registerScrollPlugins,
  reveal,
} from "@/lib/motion/primitives";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Runs before first paint so revealed elements are never visible-then-hidden.
 * It only hides content when the visitor has NOT asked for reduced motion and
 * JS is actually running — so a no-JS or reduced-motion visitor gets the fully
 * composed page with nothing to wait for.
 */
export const motionReadyScript = `try{if(matchMedia('${MOTION_QUERY}').matches){document.documentElement.classList.add('motion-ready')}}catch(e){}`;

const refreshOnLoad = () => ScrollTrigger.refresh();

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerScrollPlugins();

      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        reveal(root.current!);
        parallax(root.current!);

        // Sibling sections create their pins in their own layout effects, which
        // run BEFORE this parent effect but whose pin-spacing is not applied to
        // the layout until after paint. Anything measured before that point
        // resolves against a document roughly half its final height, so every
        // trigger has to be re-measured once the pins have real boxes — and
        // again once webfonts land and shift text.
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener("load", refreshOnLoad);

        return () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("load", refreshOnLoad);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
