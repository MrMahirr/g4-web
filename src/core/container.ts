import type { ICatalogRepository } from "@/core/interfaces/ICatalogRepository";
import type { ICatalogService } from "@/core/interfaces/ICatalogService";
import type { IInquiryService } from "@/core/interfaces/IInquiryService";
import { StaticCatalogRepository } from "@/core/repositories/StaticCatalogRepository";
import { CatalogService } from "@/core/services/CatalogService";
import { InquiryService } from "@/core/services/InquiryService";

/**
 * Küçük IoC kabı. Sayfalar ve bileşenler somut sınıfları değil bu anahtarları kullanır:
 *
 *   const catalog = container.resolve("CatalogService");
 *
 * Veri kaynağı değişirse yalnız aşağıdaki "CatalogRepository" kaydı değişir.
 * Yalnız sunucu tarafında kullanılır (tüm içeriği içe aktarır); istemci bileşenlerine
 * veri prop olarak geçilir.
 */
interface ServiceMap {
  CatalogRepository: ICatalogRepository;
  CatalogService: ICatalogService;
  InquiryService: IInquiryService;
}

type Factory<K extends keyof ServiceMap> = (container: Container) => ServiceMap[K];

class Container {
  private readonly factories = new Map<keyof ServiceMap, Factory<keyof ServiceMap>>();
  private readonly instances = new Map<keyof ServiceMap, ServiceMap[keyof ServiceMap]>();

  /** Kayıt (aynı anahtarla yeniden çağrılırsa öncekinin yerini alır — testlerde sahte kaynak için). */
  register<K extends keyof ServiceMap>(key: K, factory: Factory<K>): this {
    this.factories.set(key, factory);
    this.instances.delete(key);
    return this;
  }

  /** Tekil örnek döndürür; ilk çağrıda oluşturur. */
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

export const container = new Container()
  .register("CatalogRepository", () => new StaticCatalogRepository())
  .register("CatalogService", (c) => new CatalogService(c.resolve("CatalogRepository")))
  .register("InquiryService", () => new InquiryService());

export type { Container };
