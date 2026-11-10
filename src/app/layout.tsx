import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { container } from "@/core/container";
import { Toaster } from "sonner";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const catalog = container.resolve("CatalogService");
  return (
    <html lang="tr" className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}>
      <body>
        <StoreProvider>
          <MotionProvider>
            <SiteChrome company={catalog.getCompany()} categories={catalog.getCategories()} services={catalog.getServices()} products={catalog.getProducts()} searchIndex={catalog.getSearchIndex()} />
            <main id="icerik">{children}</main>
            <Toaster richColors position="bottom-right" />
          </MotionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
