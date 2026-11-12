import Image from "next/image";
import { useTranslations } from "next-intl";
import { CurtainFrame } from "@/components/motion/CurtainFrame";
import { cn } from "@/lib/utils";

type Props = {
  /** Yerel görsel yolu (public/ altı). Boşsa yer tutucu şablon çizilir (etiket: common.imagePlaceholder). */
  src?: string | null;
  /** Dekoratif görsellerde boş string verilir. */
  alt: string;
  /** contain: beyaz zeminde sığdır (ürün/kategori). cover: alanı doldur (hizmet, haber, hero). */
  fit?: "cover" | "contain";
  /** Ekrana girerken yarı saydam, sağ üstten sol alta çapraz açılan iki katmanlı gradyan perde. */
  curtain?: boolean;
  /** Perdeyi yatay aynalar (ters köşeden açılır). */
  curtainMirrored?: boolean;
  /** false: perde katmanı çizilmez, kaydırmaya bağlı yakınlaşma (1.3x → 1) kalır. */
  curtainVeil?: boolean;
  /** Üzerine (veya `group` işaretli üst öğeye) gelince yakınlaşma. */
  zoomOnHover?: boolean;
  /** Ekran üstü (LCP) görsel: tembel yükleme kapatılır. */
  eager?: boolean;
  /** Tarayıcıya görselin kaplayacağı genişlik ipucu. */
  sizes?: string;
  placeholderLabel?: string;
  /** Kap boyutu (yükseklik / en-boy oranı) ve köşe yarıçapı buradan verilir: "h-[560px] rounded-btn". */
  className?: string;
};

/** Görsel kabı. Boyutu çağıran belirler; görsel kabı doldurur. */
export function Picture({
  src,
  alt,
  fit = "cover",
  curtain = false,
  curtainMirrored = false,
  curtainVeil = true,
  zoomOnHover = false,
  eager = false,
  sizes = "(max-width: 960px) 100vw, 50vw",
  placeholderLabel,
  className,
}: Props) {
  // Sunucu ve istemci bileşenlerinde çalışır (async değil); varsayılan etiket aktif dilden gelir.
  const t = useTranslations("common");
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border border-dashed border-[#b9cad6] bg-checker p-4",
          "text-center font-mono text-xs tracking-[0.06em] text-muted uppercase",
          className,
        )}
      >
        {placeholderLabel ?? t("imagePlaceholder")}
      </div>
    );
  }

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={cn(
        fit === "contain" ? "object-contain p-[12%]" : "object-cover",
        zoomOnHover && "transition-transform duration-1000 ease-soft group-hover:scale-[1.07] hover:scale-[1.07]",
      )}
    />
  );

  return (
    <div className={cn("relative overflow-hidden", fit === "contain" ? "bg-paper" : "bg-sand", className)}>
      {curtain ? (
        <CurtainFrame mirrored={curtainMirrored} veil={curtainVeil}>
          {image}
        </CurtainFrame>
      ) : (
        image
      )}
    </div>
  );
}
