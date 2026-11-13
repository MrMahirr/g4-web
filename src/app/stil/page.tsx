import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { G4Logo } from "@/components/shared/G4Logo";
import { ListRow } from "@/components/shared/ListRow";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Field, Textarea, TextInput } from "@/components/ui/Field";
import { Chip, Tag } from "@/components/ui/Tag";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

export const metadata: Metadata = {
  title: "Stil Kılavuzu",
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: "Beyaz", hex: "#FFFFFF", token: "paper", swatch: "bg-paper text-ink", use: "Kart, form, header" },
  { name: "Sabah", hex: "#F6F9FB", token: "ivory", swatch: "bg-ivory text-ink", use: "Sayfa arka planı" },
  { name: "Şifa Mavisi", hex: "#EAF3F8", token: "tint", swatch: "bg-tint text-ink", use: "Vurgulu bölümler, footer" },
  { name: "Buz", hex: "#E7EFF4", token: "sand", swatch: "bg-sand text-ink", use: "Görsel zemini, şablon" },
  { name: "Derin Lacivert", hex: "#1E3040", token: "ink", swatch: "bg-ink text-white", use: "Başlık, metin, koyu düğme" },
  { name: "Arduvaz", hex: "#4C6274", token: "muted", swatch: "bg-muted text-white", use: "İkincil metin" },
  { name: "Kor (logo)", hex: "#E4482F", token: "ember", swatch: "bg-ember text-ink", use: "Vurgu, ikon" },
  { name: "Kor Koyu", hex: "#B8321D", token: "ember-d", swatch: "bg-ember-d text-white", use: "Birincil düğme, bağlantı" },
  { name: "Şarap (logo)", hex: "#8E1B26", token: "wine", swatch: "bg-wine text-white", use: "Hover, ikincil vurgu" },
  { name: "Çizgi", hex: "#D3E0E8", token: "line", swatch: "bg-line text-ink", use: "Ayırıcı ve hücre" },
] as const;

function Section({ no, title, note, children }: { no: string; title: string; note: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-[clamp(24px,4vw,64px)] border-t border-line py-20 max-stack:grid-cols-1">
      <div className="sticky top-6 flex flex-col gap-3 self-start max-stack:static">
        <span className="font-mono text-xs text-ember-d">{no}</span>
        <h2 className="font-display text-[34px] leading-none font-bold tracking-[-0.04em]">{title}</h2>
        <p className="text-sm leading-[1.65] text-muted">{note}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-3.5">{children}</div>
    </section>
  );
}

function TypeRow({ label, spec, children }: { label: string; spec: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)_240px] items-center gap-5 border-b border-line py-5 max-stack:grid-cols-1">
      <span className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</span>
      <div className="min-w-0">{children}</div>
      <div>
        <Chip>{spec}</Chip>
      </div>
    </div>
  );
}

function Box({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col gap-4 rounded-card bg-paper p-7 ${className ?? ""}`}>{children}</div>;
}

/** Geliştirme sırasında tasarım (D4DesignPattern) ile yan yana karşılaştırma sayfası. Üretimde 404. */
export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Stil Kılavuzu" }]}
        title={[
          <span key="baslik">
            Şifa <span className="text-ember">·</span> Açık Palet
          </span>,
        ]}
        description="Tasarım D: beyaz ve açık mavi zemin, Geist + Inter. Logodaki kor kırmızısı yalnızca vurgu ve eylemde."
        ghost="D"
      >
        <div className="flex items-center gap-4">
          <G4Logo size="footer" />
          <Tag>Tailwind 4 · motion · Radix · lucide</Tag>
        </div>
      </PageHero>

      <Container as="main" className="pb-[120px]">
        <Section no="01" title="Renk" note="Tailwind sınıfı: bg-*, text-*, border-* (ör. bg-tint, text-muted).">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-2.5">
            {COLORS.map((color) => (
              <div key={color.token} className="flex flex-col overflow-hidden rounded-btn bg-paper">
                <div className={`flex h-[150px] flex-col justify-between p-3.5 font-mono text-[11px] ${color.swatch}`}>
                  <span>{color.token}</span>
                  <span>{color.hex}</span>
                </div>
                <div className="flex flex-col gap-1 p-3.5">
                  <strong className="font-display text-[15px]">{color.name}</strong>
                  <span className="text-xs leading-snug text-muted">{color.use}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          no="02"
          title="Tipografi"
          note="Geist başlık ve vurgular, Inter okunacak metin, Geist kod, etiket ve sayılar. Türkçe: ğ ü ş ı ö ç İ."
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3">
            <Box className="gap-2.5">
              <Chip className="self-start">font-display</Chip>
              <span className="font-display text-[64px] leading-none font-bold tracking-[-0.05em]">Aa Ğğ</span>
              <strong className="font-display text-xl tracking-[-0.02em]">Geist</strong>
            </Box>
            <Box className="gap-2.5">
              <Chip className="self-start">font-sans</Chip>
              <span className="text-[64px] leading-none tracking-[-0.03em]">Aa Şş</span>
              <strong className="text-xl font-semibold">Inter</strong>
            </Box>
            <Box className="gap-2.5">
              <Chip className="self-start">font-mono</Chip>
              <span className="font-mono text-[52px] leading-[1.1] font-medium tracking-[-0.02em]">01-110V</span>
              <strong className="font-mono text-lg">Geist · font-mono</strong>
            </Box>
          </div>
          <div className="border-t border-line">
            <TypeRow label="Display · text-d1" spec="clamp(48px, 8.4vw, 132px)">
              <span className="font-display text-d1 !text-[clamp(2.75rem,5.2778vw,4.75rem)]">
                Güvenilir Çözümler
              </span>
            </TypeRow>
            <TypeRow label="Başlık · text-d2" spec="clamp(36px, 5vw, 76px)">
              <span className="font-display text-d2 !text-[50px]">Ürün Grupları</span>
            </TypeRow>
            <TypeRow label="Alt başlık · text-d3" spec="clamp(22px, 2.2vw, 30px)">
              <span className="font-display text-d3">G4 Medikal Faaliyetler</span>
            </TypeRow>
            <TypeRow label="Giriş · text-lead" spec="clamp(18px, 1.5vw, 21px) / 1.65">
              <p className="text-lead text-muted">
                Hastaneler, klinikler ve sağlık kuruluşları için ihtiyaç duyduğunuz ürün ve çözümleri tek çatı altında
                sunuyoruz.
              </p>
            </TypeRow>
            <TypeRow label="Gövde · text-base" spec="16px / 1.75 / muted">
              <p className="leading-[1.75] text-muted">
                Ürün temin süreçlerini hızlı, güvenilir ve etkin bir şekilde yönetiyoruz.
              </p>
            </TypeRow>
            <TypeRow label="Etiket · <Tag>" spec="12px / BÜYÜK / +4% / ◆">
              <Tag>Medikal Ürünler</Tag>
            </TypeRow>
            <TypeRow label="Ürün kodu · font-mono" spec="Geist 12–13px">
              <span className="font-mono text-[13px] tracking-[0.04em]">REF: 01-110V-20010</span>
            </TypeRow>
            <TypeRow label="Sayı · <CountUp>" spec="tabular-nums / −5%">
              <CountUp value={567} className="font-display text-[72px] leading-none font-bold tracking-[-0.05em]" />
            </TypeRow>
            <TypeRow label="Kontur · text-outline" spec="-webkit-text-stroke 1.5px">
              <span className="font-display text-d2 !text-[54px] text-outline">Çözümler</span>
            </TypeRow>
          </div>
        </Section>

        <Section no="03" title="Butonlar" note="Metin + ok kutusu. Üzerine gelince zıt renk alttan dolar, ok çıkıp geri girer.">
          <Box className="flex-row flex-wrap items-center gap-3">
            <Button href="#">Sipariş Ver</Button>
            <Button href="#" variant="coal">
              Devamını Oku
            </Button>
            <Button href="#" variant="ghost" arrow="none">
              Bilgi Talep Et
            </Button>
            <Button href="#" size="sm" arrow="up-right">
              Bilgi Talep Et
            </Button>
            <UnderlineLink href="#">Tümünü Göster</UnderlineLink>
          </Box>
          <Box className="flex-row flex-wrap items-center gap-3 bg-tint">
            <Button href="#" variant="ivory">
              Tüm Ürünler
            </Button>
            <Button href="#" variant="ghost">
              Ürünleri Gör
            </Button>
            <Button disabled>Gönderiliyor</Button>
          </Box>
        </Section>

        <Section no="04" title="Bileşenler" note="Liste satırı, görsel kabı, boş görsel şablonu, form alanı.">
          <div className="border-t border-line">
            <ListRow href="#" index="01" title="20 cm Bayonet Bipolar Forseps" meta="REF: 01-110V-20010" previewSrc={null} />
            <ListRow href="#" index="02" title="Cerrahi Sütur Çeşitleri" meta="G4 ÜRÜNLERİ" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-start gap-4">
            <Picture src={null} alt="" className="h-[200px]" />
            <Picture src="/logo/g4-logo.png" alt="" fit="contain" curtain className="h-[200px] rounded-card" />
            <Box className="gap-6">
              <Field id="stil-ad" label="Adınız / Soyadınız*">
                <TextInput id="stil-ad" />
              </Field>
              <Field id="stil-konu" label="Konu*">
                <TextInput id="stil-konu" auto readOnly defaultValue="Sipariş Talebi – 01-110V-20010" />
              </Field>
              <Field id="stil-mail" label="E-posta adresiniz*" error="Geçerli bir e-posta adresi girin.">
                <TextInput id="stil-mail" type="email" invalid defaultValue="ornek@" />
              </Field>
              <Field id="stil-mesaj" label="Mesajınız*">
                <Textarea id="stil-mesaj" />
              </Field>
            </Box>
          </div>
        </Section>

        <Section
          no="05"
          title="Hareket"
          note="Giriş ve kaydırma hareketleri motion ile; sürekli döngüler Tailwind animate-* sınıflarıyla. 'Hareketi azalt' tercihinde hepsi durur."
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-3">
            <Box>
              <MaskedHeading as="h2" size="d2" lines={["Kalıcı", "Değerler"]} className="!text-[34px]" />
              <strong className="font-display">Satır maskesi · MaskedHeading</strong>
            </Box>
            <Box>
              <Reveal kind="up">
                <div className="h-[90px] rounded-btn bg-tint" />
              </Reveal>
              <strong className="font-display">Yukarı belirme · Reveal up</strong>
            </Box>
            <Box>
              <Reveal kind="skew">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Tek çatı altında</p>
              </Reveal>
              <strong className="font-display">Eğik giriş · Reveal skew</strong>
            </Box>
            <Box>
              <span className="grid h-[1.5em] overflow-hidden font-display text-xl font-medium">
                {["Genel Tıbbi Sarf", "Tıbbi Cihazlar", "Bipolar Forceps"].map((word, index) => (
                  <span
                    key={word}
                    className="col-start-1 row-start-1 animate-rot-word motion-reduce:animate-none motion-reduce:not-first:hidden"
                    style={{ animationDelay: `${index * 3}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <strong className="font-display">Dönen kelime · animate-rot-word</strong>
            </Box>
            <Box>
              <span className="flex items-center gap-2 font-mono text-[13px] text-muted">
                <span className="size-[7px] animate-dot-pulse rounded-full bg-ember motion-reduce:animate-none" />
                0539 516 3606
              </span>
              <strong className="font-display">Nabız noktası · animate-dot-pulse</strong>
            </Box>
            <Box>
              <div className="relative h-[90px] overflow-hidden rounded-btn bg-tint grain" />
              <strong className="font-display">Tanecik dokusu · grain</strong>
            </Box>
          </div>
        </Section>
      </Container>
    </>
  );
}
