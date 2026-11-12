import type { IImageRepository } from "@/core/interfaces/IImageRepository";
import type { IImageResolver } from "@/core/interfaces/IImageResolver";
import type { ImageKey } from "@/core/types";

export class ImageResolverService implements IImageResolver {
  constructor(private readonly repository: IImageRepository) {}

  getImage(key: ImageKey | undefined) {
    return key ? this.repository.getImage(key) : null;
  }
}
