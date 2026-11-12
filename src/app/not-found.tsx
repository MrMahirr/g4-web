import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";

export default async function NotFound() {
  const t = await getTranslations();
  const catalog = getCatalog(await getLocale());
  const categories = catalog.products.getCategories().filter((category) => category.productCount > 0).slice(0, 4);

  return (
    <Container as="section" className="relative isolate flex min-h-[65vh] flex-col justify-center overflow-hidden py-24">
      <span aria-hidden="true" className="pointer-events-none absolute -right-5 top-0 -z-10 font-display text-[clamp(16rem,40vw,34rem)] font-extrabold leading-none text-outline text-ink/10">404</span>
      <p className="font-mono text-xs uppercase tracking-[.14em] text-ember-d">{t("i18n.notFound.eyebrow")}</p>
      <h1 className="mt-5 max-w-3xl font-display text-d2">{t("i18n.notFound.title")}</h1>
      <p className="mt-5 max-w-xl text-lead text-muted">{t("i18n.notFound.text")}</p>
      <div className="mt-8 flex flex-wrap gap-3"><Button href={routes.home}>{t("common.home")}</Button><Button href={routes.products} variant="ghost">{t("nav.products")}</Button></div>
      <nav aria-label={t("i18n.notFound.popular")} className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">{categories.map((category) => <Link key={category.slug} href={routes.category(category.slug)} className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-ember-d">{category.title}</Link>)}</nav>
    </Container>
  );
}
