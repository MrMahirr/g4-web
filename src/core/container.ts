import type { ICatalog } from "@/core/interfaces/ICatalog";
import type { IInquiryService } from "@/core/interfaces/IInquiryService";
import { JsonCatalogRepository } from "@/core/repositories/JsonCatalogRepository";
import { ImageResolverService } from "@/core/services/ImageResolverService";
import { InquiryService } from "@/core/services/InquiryService";
import { NewsCatalogService } from "@/core/services/NewsCatalogService";
import { ProductCatalogService } from "@/core/services/ProductCatalogService";
import { ReferenceCatalogService } from "@/core/services/ReferenceCatalogService";
import { ServiceCatalogService } from "@/core/services/ServiceCatalogService";
import { SiteContentService } from "@/core/services/SiteContentService";
import type { Locale } from "@/i18n/request";
import tr from "../../messages/tr.json";
import en from "../../messages/en.json";

/**
 * Küçük IoC kabı yalnızca dil bağımsız servisler içindir. Yerelleştirilmiş kataloglar
 * `getCatalog(locale)` ile alınır; bu sayede istek dili kayıtlı örneğe karışmaz.
 */
interface ServiceMap {
  InquiryService: IInquiryService;
}

type Factory<K extends keyof ServiceMap> = (container: Container) => ServiceMap[K];

class Container {
  private readonly factories = new Map<keyof ServiceMap, Factory<keyof ServiceMap>>();
  private readonly instances = new Map<keyof ServiceMap, ServiceMap[keyof ServiceMap]>();

  /** Kayıt ekler; aynı anahtardaki eski kaydı testler için değiştirir. */
  register<K extends keyof ServiceMap>(key: K, factory: Factory<K>): this {
    this.factories.set(key, factory);
    this.instances.delete(key);
    return this;
  }

  /** İlk çağrıda oluşturulan tekil örneği döndürür. */
  resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
    const existing = this.instances.get(key);
    if (existing) return existing as ServiceMap[K];

    const factory = this.factories.get(key);
    if (!factory) throw new Error(`Container: "${key}" kayıtlı değil.`);

    const instance = factory(this) as ServiceMap[K];
    this.instances.set(key, instance);
    return instance;
  }
}

export const container = new Container().register("InquiryService", () => new InquiryService());

export type { Container };

const catalogs = new Map<Locale, ICatalog>();

/** İstenen yerel ayar için tekil katalog servisini döndürür. */
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
