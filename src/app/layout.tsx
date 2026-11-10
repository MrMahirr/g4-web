import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { HeaderData } from "@/components/layout/types";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { container } from "@/core/container";
import { corporateLinks, routes } from "@/data/navigation.data";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "G4 Yatırım İnşaat ve Danışmanlık A.Ş.",
    template: "%s · G4",
  },
  description:
    "Hastaneler, klinikler ve sağlık kuruluşları için medikal ürünler, hastane tekstili ve tıbbi cihazlar.",
};

/** Header'ın ihtiyaç duyduğu veriyi sunucuda hazırlar; istemciye yalnız gereken alanlar gider. */
function buildHeaderData(): HeaderData {
  const catalog = container.resolve("CatalogService");
  const company = catalog.getCompany();
  const imageSrc = (key: string | undefined) => catalog.getImage(key)?.src;

  return {
    phone: company.phone,
    email: company.email,
    corporateLinks,
    serviceLinks: catalog.getServices().map((service) => ({ label: service.title, href: routes.service(service.slug) })),
    categoryLinks: catalog
      .getCategories()
      .map((category) => ({ label: category.title, href: routes.category(category.slug) })),
    menuImages: { kurumsal: imageSrc("menu/kurumsal"), hizmetler: imageSrc("menu/hizmetler") },
    searchIndex: catalog.getSearchIndex().map((entry) => ({ ...entry, imageSrc: imageSrc(entry.imageKey) })),
    quoteProducts: catalog.getProducts().map((product) => ({
      slug: product.slug,
      name: product.name,
      code: product.code,
      imageSrc: imageSrc(product.imageKey),
    })),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const catalog = container.resolve("CatalogService");

  return (
    <html lang="tr" className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}>
      <body>
        <StoreProvider>
          <MotionProvider>
            <SiteHeader data={buildHeaderData()} />
            <main id="icerik">{children}</main>
            <SiteFooter company={catalog.getCompany()} services={catalog.getServices()} />
            <Toaster position="bottom-right" toastOptions={{ className: "font-sans" }} />
          </MotionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
