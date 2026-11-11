"use client";

import type { ReactNode } from "react";

export function BackToTopLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
