"use client";
import { useLocale, useTranslations } from "next-intl";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, type FormEvent, type KeyboardEvent } from "react";
import { routes } from "@/data/navigation.data";
import { useCatalogSummary } from "@/hooks/useCatalogSummary";
import { useOverlay } from "@/hooks/useOverlay";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import { useSearchOverlay } from "@/hooks/useSearchOverlay";
import type { SearchFilter } from "@/lib/catalog";
import { cn, EASE_SOFT } from "@/lib/utils";
import { SearchResultRow } from "./SearchResultRow";
import type { NavLinkItem, SearchEntryWithImage } from "./types";

const NO_ENTRIES: SearchEntryWithImage[] = [];

const FILTERS: SearchFilter[] = ["all", "urun", "grup", "hizmet"];
const MAX_RESULTS = 8;

/** Tam ekran site içi arama (tasarım: D4Header .so). Ctrl/⌘ + K ile de açılır. */
export function SearchOverlay({ categories }: { categories: readonly NavLinkItem[] }) {
  const t = useTranslations();
  const locale = useLocale();
  // Dizin katman ilk açıldığında /api/katalog-ozet'ten gelir (plan 8.5).
  const { isOpen } = useOverlay("search");
  const summary = useCatalogSummary(isOpen);
  const search = useSearchOverlay(summary?.searchIndex ?? NO_ENTRIES);
  const loading = summary === null;
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = search.query.trim().length > 0;
  const shown = search.results.slice(0, MAX_RESULTS);

  const close = () => search.close();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const query = search.query.trim();
    if (!query) return;
    const first = shown[0];
    close();
    router.push(first ? first.entry.href : `${routes.search}?q=${encodeURIComponent(query)}`);
  };

  /** Ok tuşlarıyla sonuçlar arasında gezinme. */
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = Array.from(resultsRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-result]") ?? []);
    if (!links.length) return;
    event.preventDefault();
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    links[(current + step + links.length) % links.length]?.focus();
  };

  const returnFocus = useReturnFocus(inputRef);

  return (
    <Dialog.Root open={search.isOpen} onOpenChange={search.setOpen}>
      <AnimatePresence>
        {search.isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined} onKeyDown={onKeyDown} {...returnFocus}>
              <motion.div
                className="fixed inset-0 z-[200] overflow-auto bg-ivory/60 backdrop-blur-[14px] backdrop-saturate-[1.4]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Dialog.Title className="sr-only">{t("search.open")}</Dialog.Title>
                <Dialog.Close
                  className={cn(
                    "fixed top-6 right-6 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-full py-0 pr-1.5 pl-3.5",
                    "text-[13px] tracking-[0.06em] text-muted transition-colors duration-200 hover:bg-ink/6 hover:text-ink",
                  )}
                >
                  {t("common.close").toLocaleUpperCase(locale)}
                  <i aria-hidden="true" className="flex size-7 items-center justify-center rounded-full border border-line text-base not-italic">
                    ×
                  </i>
                </Dialog.Close>

                <div className="mx-auto flex max-w-[720px] flex-col gap-7 px-7 pt-[16vh] pb-16">
                  <form
                    role="search"
                    onSubmit={submit}
                    className={cn(
                      "relative flex items-center gap-4 pb-3.5",
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line after:content-['']",
                      "before:absolute before:inset-x-0 before:bottom-0 before:z-[1] before:h-[1.5px] before:origin-left before:scale-x-0 before:bg-ink before:content-['']",
                      "before:transition-transform before:duration-[600ms] before:ease-soft focus-within:before:scale-x-100",
                    )}
                  >
                    <Search size={22} strokeWidth={1.8} className="flex-none text-faint" aria-hidden="true" />
                    <label htmlFor="site-arama" className="sr-only">
                      {t("search.open")}
                    </label>
                    <input
                      ref={inputRef}
                      id="site-arama"
                      type="search"
                      autoComplete="off"
                      placeholder={t("search.placeholder")}
                      value={search.query}
                      onChange={(event) => search.setQuery(event.target.value)}
                      className={cn(
                        "min-h-14 min-w-0 flex-1 border-0 bg-transparent p-0 font-display text-[clamp(26px,3.4vw,40px)] font-normal tracking-[-0.03em] text-ink outline-none",
                        "placeholder:text-[#9AAAB6] focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden",
                      )}
                    />
                    {hasQuery ? (
                      <button
                        type="button"
                        onClick={() => search.setQuery("")}
                        className="min-h-9 flex-none cursor-pointer px-1 text-[13px] text-faint hover:text-ink"
                      >
                        {t("search.clear")}
                      </button>
                    ) : null}
                    <span aria-hidden="true" className="flex-none rounded-btn border border-line px-[7px] py-[3px] font-mono text-[11px] text-faint">
                      ESC
                    </span>
                  </form>

                  {hasQuery ? (
                    <div className="flex flex-col gap-[18px]">
                      <div role="group" aria-label={t("search.filterLabel")} className="flex flex-wrap gap-[22px]">
                        {FILTERS.map((filter) => (
                          <button
                            key={filter}
                            type="button"
                            aria-pressed={search.filter === filter}
                            onClick={() => search.setFilter(filter)}
                            className={cn(
                              "relative cursor-pointer py-1.5 text-sm text-faint transition-colors duration-200 hover:text-ink aria-pressed:text-ink",
                              "after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:scale-x-0 after:bg-ember-d after:content-['']",
                              "after:transition-transform after:duration-400 after:ease-soft aria-pressed:after:scale-x-100",
                            )}
                          >
                            {t(`search.filters.${filter}`)}
                            <sup className="ml-[3px] text-[10px] text-faint">{search.counts[filter]}</sup>
                          </button>
                        ))}
                      </div>

                      <div ref={resultsRef} aria-live="polite" className="flex flex-col">
                        {shown.map((hit, position) => (
                          <SearchResultRow key={`${hit.entry.type}-${hit.entry.href}`} hit={hit} position={position} onSelect={close} />
                        ))}
                        {search.results.length > MAX_RESULTS ? (
                          <Link
                            href={`${routes.search}?q=${encodeURIComponent(search.query.trim())}`}
                            onClick={close}
                            className="mt-3 self-start font-mono text-xs tracking-[0.06em] text-ember-d uppercase no-underline hover:underline"
                          >
                            {t("i18n.allResults", { count: search.results.length })}
                          </Link>
                        ) : null}
                        {loading ? (
                          <p role="status" className="py-[18px] text-[15px] leading-[1.6] text-muted">
                            {t("search.loading")}
                          </p>
                        ) : null}
                        {!loading && shown.length === 0 ? (
                          <p className="py-[18px] text-[15px] leading-[1.6] text-muted">
                            “{search.query}” {t("search.noResultsBefore")}{" "}
                            <Link href={routes.contact} onClick={close} className="font-semibold text-ink">
                              {t("search.noResultsLink")}
                            </Link>
                            {t("search.noResultsAfter")}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col gap-7"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.1 }}
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-xs tracking-[0.08em] text-faint uppercase">{t("search.popular")}</span>
                        <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
                          {(t.raw("navLinks.popularSearches") as string[]).map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => search.setQuery(term)}
                              className="cursor-pointer border-b border-transparent py-1 text-[15px] text-ink transition-colors duration-200 hover:border-ink"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="text-xs tracking-[0.08em] text-faint uppercase">{t("search.groups")}</span>
                        <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
                          {categories.map((category) => (
                            <Link
                              key={category.href}
                              href={category.href}
                              onClick={close}
                              className="border-b border-transparent py-1 text-[15px] text-ink no-underline transition-colors duration-200 hover:border-ink"
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
