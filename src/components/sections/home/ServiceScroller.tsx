"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ServiceScroller({ children }: { children: ReactNode }) {
  const strip = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const element = strip.current;
    if (!element) return;
    const update = () => {
      const distance = element.scrollWidth - element.clientWidth;
      setProgress(distance > 0 ? element.scrollLeft / distance : 1);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  return <><div className="services-line" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div><div ref={strip} className="service-strip" tabIndex={0} aria-label="Medikal hizmetler şeridi">{children}</div></>;
}
