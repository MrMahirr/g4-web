import type { ReactNode } from "react";
import { preloadCatalogSummary } from "@/hooks/useCatalogSummary";

/** Hata sessizce yutulur; katman açılınca hook yeniden dener. */
const preloadSummary = () => void preloadCatalogSummary().catch(() => {});

export function IconButton({
  label,
  onClick,
  onPreload,
  children,
}: {
  label: string;
  onClick: () => void;
  onPreload?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      // Katalog özetini düğmeye yaklaşınca çekmeye başla; katman açılınca hazır olsun.
      onPointerEnter={() => {
        preloadSummary();
        onPreload?.();
      }}
      onFocus={() => {
        preloadSummary();
        onPreload?.();
      }}
      className="relative flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-ink/7"
    >
      {children}
    </button>
  );
}
