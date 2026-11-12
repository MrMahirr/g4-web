import type { ImageEntry, ImageKey } from "@/core/types";

export interface IImageRepository {
  getImage(key: ImageKey): ImageEntry | null;
}
