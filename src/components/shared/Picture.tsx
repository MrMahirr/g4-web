import Image from "next/image";
import { CurtainFrame } from "@/components/motion/CurtainFrame";
import { cn } from "@/lib/utils";

type Props = {
  /** Yerel görsel yolu (public/ altı). Boşsa "Görsel alanı" şablonu çizilir. */
  src?: string | null;
  /** Dekoratif görsellerde boş string verilir. */
  alt: string;
  /** contain: beyaz zeminde sığdır (ürün/kategori). cover: alanı doldur (hizmet, haber, hero). */
  fit?: "cover" | "contain";
  /** Ekrana girerken yarı saydam, sol alta çapraz açılan gradyan perde. */
  curtain?: boolean;
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
  zoomOnHover = false,
  eager = false,
  sizes = "(max-width: 960px) 100vw, 50vw",
  placeholderLabel = "Görsel alanı",
  className,
}: Props) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border border-dashed border-[#b9cad6] bg-checker p-4",
          "text-center font-mono text-xs tracking-[0.06em] text-muted uppercase",
          className,
        )}
      >
        {placeholderLabel}
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
      {curtain ? <CurtainFrame>{image}</CurtainFrame> : image}
    </div>
  );
}
