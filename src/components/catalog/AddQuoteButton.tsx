"use client";

import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useOverlay } from "@/hooks/useOverlay";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  name: string;
  className?: string;
};

/** Ürünü 1 adet olarak teklif listesine ekleyen küçük kare düğme (liste satırları ve kartlar). */
export function AddQuoteButton({ slug, name, className }: Props) {
  const cart = useQuoteCart();
  const drawer = useOverlay("quoteCart");
  const inList = cart.hydrated && cart.has(slug);

  return (
    <button
      type="button"
      aria-label={inList ? `${name} — ${tr.product.inQuote}` : `${name} — ${tr.product.addToQuote}`}
      aria-pressed={inList}
      onClick={() => {
        if (inList) return drawer.open();
        cart.upsert({ productSlug: slug, qty: 1, unit: "Adet" });
        toast.success(tr.quote.added, { description: name });
      }}
      className={cn(
        "grid size-11 cursor-pointer place-items-center rounded-btn border border-line bg-paper text-ink transition-colors duration-300",
        "hover:border-ink aria-pressed:border-ember-d aria-pressed:bg-ember-d aria-pressed:text-white",
        className,
      )}
    >
      {inList ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
    </button>
  );
}
