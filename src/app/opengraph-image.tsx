import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { ogLogoSrc } from "@/lib/og-logo";

/*
  Varsayılan paylaşım görseli (Tasarım D · Şifa paleti). Kendi görseli olan sayfalar
  (ürün, kategori, hizmet, haber) bunu pageMetadata ile ezer. Derlemede bir kez üretilir.
  Yazı tipi next/og'un gömülü Geist'i — sitenin yazı tipiyle aynı, Türkçe karakterleri içerir.
*/

export const alt = "G4";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1e3040";
const MUTED = "#4c6274";
const EMBER = "#e4482f";
const TINT = "#eaf3f8";
const LINE = "#d3e0e8";

export default async function OpengraphImage() {
  const t = await getTranslations({ locale: "tr", namespace: "home" });
  const [line1, line2, line3] = t.raw("hero.lines") as string[];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: TINT,
        color: INK,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo her zaman beyaz kutuda (tasarım kuralı). */}
        <div style={{ display: "flex", background: "#ffffff", padding: "14px 20px", borderRadius: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse yalnız <img> destekler */}
          <img src={ogLogoSrc} alt="" height={56} style={{ objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: MUTED }}>
          {t("hero.tag").toLocaleUpperCase("tr")}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.98, letterSpacing: -4 }}>
        <span>{line1}</span>
        <span style={{ color: EMBER }}>{line2}</span>
        <span>{line3}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${LINE}`,
          paddingTop: 24,
          fontSize: 24,
          color: MUTED,
        }}
      >
        <span>G4</span>
        <span>g4.com.tr</span>
      </div>
    </div>,
    size,
  );
}
