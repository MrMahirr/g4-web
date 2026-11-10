import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "nav" | "footer" | "badge";

function dimensions(size: LogoSize): { width: number; height: number; box: string } {
  switch (size) {
    case "nav":
      return { width: 45, height: 38, box: "px-2 py-1.5" };
    case "footer":
      return { width: 64, height: 54, box: "px-3 py-2.5" };
    case "badge":
      return { width: 40, height: 34, box: "" };
    default: {
      const exhaustive: never = size;
      return exhaustive;
    }
  }
}

type Props = {
  size?: LogoSize;
  /** Dönen rozet içinde: beyaza çevrilmiş tek renk, kutusuz. */
  inverted?: boolean;
  /** Dekoratif kullanımda boş bırakılır. */
  alt?: string;
  className?: string;
};

/** G4 logosu — kural: her zaman beyaz kutuda, yanına metin eklenmez. */
export function G4Logo({ size = "nav", inverted = false, alt = "G4", className }: Props) {
  const { width, height, box } = dimensions(size);
  const image = (
    <Image
      src="/logo/g4-logo.png"
      alt={alt}
      width={width}
      height={height}
      className={cn("block object-contain", inverted && "brightness-0 invert")}
      style={{ width, height }}
    />
  );

  if (inverted) return image;
  return <span className={cn("flex rounded-btn bg-paper", box, className)}>{image}</span>;
}
