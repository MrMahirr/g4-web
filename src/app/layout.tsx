import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import type { HeaderData } from "@/components/layout/types";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getCatalog } from "@/core/container";
import { corporateLinks, routes } from "@/data/navigation.data";
import { siteTitle, siteUrl } from "@/lib/seo";
import { siteGraph } from "@/lib/structured-data";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Gövde fontu önceden yüklenmez: mobilde LCP görseliyle bant genişliği için yarışmasın (plan 15 · K-P2).
// İlk karede yedek font görünür; next/font'un adjustFontFallback ayarı kaymayı (CLS) önler.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const description = (await getTranslations("i18n"))("siteDescription");
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: "%s · G4",
    },
    description,
    applicationName: "G4",
    // Kanonik adres burada verilmez: kökte verilirse tüm alt sayfalara anasayfa adresi olarak miras kalır.
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "tr_TR",
      siteName: "G4",
      title: siteTitle,
      description,
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

/** Header'ın ihtiyaç duyduğu veriyi sunucuda hazırlar; istemciye yalnız gereken alanlar gider. */
function buildHeaderData(locale: "tr" | "en"): HeaderData {
  const catalog = getCatalog(locale);
  const company = catalog.site.getCompany();
  const imageSrc = (key: string | undefined) => catalog.images.getImage(key)?.src;

  return {
    phone: company.phone,
    email: company.email,
    corporateLinks,
    serviceLinks: catalog.services.getServices().map((service) => ({
      label: service.title,
      href: routes.service(service.slug),
    })),
    categoryLinks: catalog
      .products.getCategories()
      .map((category) => ({ label: category.title, href: routes.category(category.slug) })),
    menuImages: { kurumsal: imageSrc("menu/kurumsal"), hizmetler: imageSrc("menu/hizmetler") },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const catalog = getCatalog(locale);
  const description = (await getTranslations("i18n"))("siteDescription");

  return (
    <html lang={locale} className={`${geist.variable} ${inter.variable}`}>
      <body>
      <JsonLd data={siteGraph(catalog.site.getCompany(), description)} />
        <NextIntlClientProvider>
        <StoreProvider>
          <MotionProvider>
            <SiteHeader data={buildHeaderData(locale)} />
            <main id="icerik">{children}</main>
      <SiteFooter company={catalog.site.getCompany()} services={catalog.services.getServices()} />
            <ScrollToTop />
            <Toaster position="bottom-right" toastOptions={{ className: "font-sans" }} />
          </MotionProvider>
        </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
