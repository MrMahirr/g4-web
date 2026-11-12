import type { ICatalogService } from "@/core/interfaces/ICatalogService";
import type { IInquiryService } from "@/core/interfaces/IInquiryService";
import { JsonCatalogRepository } from "@/core/repositories/JsonCatalogRepository";
import { CatalogService } from "@/core/services/CatalogService";
import { InquiryService } from "@/core/services/InquiryService";
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

const catalogs = new Map<Locale, ICatalogService>();

/** İstenen yerel ayar için tekil katalog servisini döndürür. */
export function getCatalog(locale: Locale): ICatalogService {
  const existing = catalogs.get(locale);
  if (existing) return existing;

  const messages = locale === "tr" ? tr : en;
  const catalog = new CatalogService(new JsonCatalogRepository(locale), messages.i18n);
  catalogs.set(locale, catalog);
  return catalog;
}
