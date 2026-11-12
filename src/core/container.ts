import type { ICatalog } from "@/core/interfaces/ICatalog";
import { JsonCatalogRepository } from "@/core/repositories/JsonCatalogRepository";
import { ImageResolverService } from "@/core/services/ImageResolverService";
import { NewsCatalogService } from "@/core/services/NewsCatalogService";
import { ProductCatalogService } from "@/core/services/ProductCatalogService";
import { ReferenceCatalogService } from "@/core/services/ReferenceCatalogService";
import { ServiceCatalogService } from "@/core/services/ServiceCatalogService";
import { SiteContentService } from "@/core/services/SiteContentService";
import type { Locale } from "@/i18n/request";
import tr from "../../messages/tr.json";
import en from "../../messages/en.json";

const catalogs = new Map<Locale, ICatalog>();

/** Composition root: her dil için katalog servislerini bir kez kurar ve önbellekte tutar. */
export function getCatalog(locale: Locale): ICatalog {
  const existing = catalogs.get(locale);
  if (existing) return existing;
  const messages = locale === "tr" ? tr : en;
  const repository = new JsonCatalogRepository(locale);
  const catalog: ICatalog = {
    site: new SiteContentService(repository),
    services: new ServiceCatalogService(repository),
    products: new ProductCatalogService(repository, messages.i18n.subGroups),
    references: new ReferenceCatalogService(repository),
    news: new NewsCatalogService(repository),
    images: new ImageResolverService(repository),
  };
  catalogs.set(locale, catalog);
  return catalog;
}
