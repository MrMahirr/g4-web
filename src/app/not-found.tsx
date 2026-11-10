import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { container as ioc } from "@/core/container";
import { routes } from "@/data/navigation.data";

export default function NotFound() {
  const catalog = ioc.resolve("CatalogService");
  const categories = catalog.getCategories().filter((category) => category.productCount > 0).slice(0, 4);

  return (
    <Container as="section" className="relative isolate flex min-h-[65vh] flex-col justify-center overflow-hidden py-24">
      <span aria-hidden="true" className="pointer-events-none absolute -right-5 top-0 -z-10 font-display text-[clamp(16rem,40vw,34rem)] font-extrabold leading-none text-outline text-ink/10">404</span>
      <p className="font-mono text-xs uppercase tracking-[.14em] text-ember-d">Sayfa bulunamadı</p>
      <h1 className="mt-5 max-w-3xl font-display text-d2">Aradığınız sayfa burada yok.</h1>
      <p className="mt-5 max-w-xl text-lead text-muted">Adres değişmiş olabilir. Ürün gruplarımıza göz atabilir veya ana sayfaya dönebilirsiniz.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Button href={routes.home}>Ana Sayfa</Button><Button href={routes.products} variant="ghost">Ürünler</Button></div>
      <nav aria-label="Popüler ürün grupları" className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">{categories.map((category) => <Link key={category.slug} href={routes.category(category.slug)} className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-ember-d">{category.title}</Link>)}</nav>
    </Container>
  );
}
