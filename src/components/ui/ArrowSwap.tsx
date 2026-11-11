import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Oku tetikleyen üst öğenin grup adı (Tailwind sınıfları sabit yazılmalı, bu yüzden eşleme tablosu). */
type Trigger = "bt" | "row" | "cg" | "acc" | "plain";

const PLAY: Record<Trigger, string> = {
  bt: "group-hover/bt:animate-arrow-swap",
  row: "group-hover/row:animate-arrow-swap group-focus-visible/row:animate-arrow-swap",
  cg: "group-hover/cg:animate-arrow-swap group-focus-visible/cg:animate-arrow-swap",
  acc: "group-hover/acc:animate-arrow-swap group-focus-visible/acc:animate-arrow-swap",
  plain: "group-hover:animate-arrow-swap group-focus-visible:animate-arrow-swap",
};

/**
 * Tek ok geçişi: üst öğenin üzerine gelince ok hızlanarak dışarı kayıp söner,
 * görünmezken karşı taraftan girer ve yumuşakça yerine oturur. Aynı anda hiçbir zaman iki ok görünmez.
 */
export function ArrowSwap({ trigger, direction = "right", size = 18 }: { trigger: Trigger; direction?: "right" | "up-right"; size?: number }) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight;
  return (
    <Icon
      size={size}
      aria-hidden="true"
      className={cn(direction === "up-right" && "[--arrow-y:-14px] [--arrow-x:14px]", "will-change-transform motion-reduce:animate-none!", PLAY[trigger])}
    />
  );
}
