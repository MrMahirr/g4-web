import type { IImageResolver } from "@/core/interfaces/IImageResolver";
import type { INewsCatalog } from "@/core/interfaces/INewsCatalog";
import type { IProductCatalog } from "@/core/interfaces/IProductCatalog";
import type { IReferenceCatalog } from "@/core/interfaces/IReferenceCatalog";
import type { IServiceCatalog } from "@/core/interfaces/IServiceCatalog";
import type { ISiteContent } from "@/core/interfaces/ISiteContent";

export interface ICatalog {
  readonly site: ISiteContent;
  readonly services: IServiceCatalog;
  readonly products: IProductCatalog;
  readonly references: IReferenceCatalog;
  readonly news: INewsCatalog;
  readonly images: IImageResolver;
}
