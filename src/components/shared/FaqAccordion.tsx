"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Reveal } from "@/components/motion/Reveal";
import type { FaqItem } from "@/core/types";
import { cn } from "@/lib/utils";

/** SSS akordeonu (tasarım: .qa) — Radix Accordion; klavye ile açılır/kapanır, ilk soru açık başlar. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="multiple" defaultValue={items[0] ? [items[0].id] : []} className="border-b border-line">
      {items.map((item, index) => (
        <Reveal key={item.id} index={index}>
          <Accordion.Item value={item.id} className="border-t border-line">
            <Accordion.Header asChild>
              <h2>
                <Accordion.Trigger
                  className={cn(
                    "group grid w-full cursor-pointer grid-cols-[64px_minmax(0,1fr)_48px] items-center gap-4 py-[30px] text-left",
                    "font-display text-[clamp(19px,1.8vw,24px)] font-semibold tracking-[-0.02em] text-ink",
                    "max-[43.75rem]:grid-cols-[40px_minmax(0,1fr)_48px]",
                  )}
                >
                  <span className="font-mono text-[13px] font-normal text-ember-d">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative size-12 rounded-btn border border-line transition-[background-color,border-color,rotate] duration-[600ms] ease-soft",
                      "group-data-[state=open]:rotate-180 group-data-[state=open]:border-ember-d group-data-[state=open]:bg-ember-d group-data-[state=open]:text-white",
                    )}
                  >
                    <span className="absolute inset-x-[15px] top-[23px] h-0.5 bg-current" />
                    <span className="absolute inset-x-[15px] top-[23px] h-0.5 rotate-90 bg-current transition-transform duration-500 ease-soft group-data-[state=open]:rotate-0" />
                  </span>
                </Accordion.Trigger>
              </h2>
            </Accordion.Header>
            <Accordion.Content className="data-[state=open]:animate-faq-in motion-reduce:animate-none">
              <p className="pr-16 pb-8 pl-20 text-lead text-pretty text-muted max-[43.75rem]:pr-0 max-[43.75rem]:pl-14">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        </Reveal>
      ))}
    </Accordion.Root>
  );
}
