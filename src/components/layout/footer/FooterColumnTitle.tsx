import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function FooterColumnTitle({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="mb-3 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">
      <Icon size={14} aria-hidden="true" className="text-ember-d" />
      {children}
    </span>
  );
}
