"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type Props = {
  open: boolean;
  index: number;
  slides: { src: string; alt: string; width: number; height: number }[];
  onClose: () => void;
};

/** Ürün görsellerini tam ekran, yakınlaştırılabilir açar. Yalnız açılınca yüklenir (ProductDetail → dynamic). */
export default function ProductLightbox({ open, index, slides, onClose }: Props) {
  return (
    <Lightbox
      open={open}
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3 }}
      carousel={{ finite: slides.length <= 1 }}
      render={slides.length <= 1 ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
      styles={{ container: { backgroundColor: "rgba(246, 249, 251, 0.97)" }, button: { color: "#1E3040", filter: "none" } }}
      labels={{ Close: "Kapat", Next: "Sonraki", Previous: "Önceki", "Zoom in": "Yakınlaştır", "Zoom out": "Uzaklaştır" }}
    />
  );
}
