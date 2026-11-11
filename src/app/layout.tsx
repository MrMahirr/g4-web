import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import type { HeaderData } from "@/components/layout/types";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { container } from "@/core/container";
import { corporateLinks, routes } from "@/data/navigation.data";
import { siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import { siteGraph } from "@/lib/structured-data";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · G4",
  },
  description: siteDescription,
  applicationName: "G4",
  // Kanonik adres burada verilmez: kökte verilirse tüm alt sayfalara anasayfa adresi olarak miras kalır.
  openGraph: { type: "website", locale: "tr_TR", siteName: "G4", title: siteTitle, description: siteDescription },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
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
        <JsonLd data={siteGraph(catalog.getCompany())} />
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
