import type { ImageEntry, ImageKey } from "@/core/types";

export interface IImageResolver {
  getImage(key: ImageKey | undefined): ImageEntry | null;
}
