import type { BreadcrumbList, FAQPage, NewsArticle, Organization, Product, Service, Thing, WithContext } from "schema-dts";
import type { Crumb } from "@/components/shared/Breadcrumb";
import type { CompanyInfo, FaqItem, ImageEntry, NewsItem, ProductItem, ServiceItem } from "@/core/types";
import { company as companyData } from "@/data/company.data";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/seo";

/** Şemalar arası bağlantı kimlikleri (ör. haberin yayıncısı = kuruluş). */
export const schemaIds = {
  organization: `${siteUrl}/#organization`,
  localBusiness: `${siteUrl}/#localbusiness`,
  website: `${siteUrl}/#website`,
} as const;

const organizationRef: Organization = {
  "@type": "Organization",
  "@id": schemaIds.organization,
  name: companyData.legalName,
  url: absoluteUrl("/"),
};

/**
 * Kök: Organization + LocalBusiness + WebSite. Her sayfada bir kez basılır.
 * `sameAs` bilinçli olarak yok: footer'daki X/LinkedIn hesapları şimdilik Güven Hastanesi'ne ait (plan: K6),
 * G4'ün kendi hesapları gelince eklenir.
 */
export function siteGraph(company: CompanyInfo): { "@context": "https://schema.org"; "@graph": Thing[] } {
  const address = {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.district,
    addressRegion: company.address.city,
    addressCountry: "TR",
  } as const;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": schemaIds.organization,
        name: company.legalName,
        alternateName: company.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo/g4-logo.png"),
        description: siteDescription,
        email: company.email,
        telephone: company.phone.tel,
        address,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: company.phone.tel,
          email: company.email,
          areaServed: "TR",
          availableLanguage: "Turkish",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": schemaIds.localBusiness,
        name: company.legalName,
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        telephone: company.phone.tel,
        email: company.email,
        address,
        hasMap: company.address.mapsUrl,
        parentOrganization: organizationRef,
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        name: company.shortName,
        url: absoluteUrl("/"),
        inLanguage: "tr-TR",
        publisher: organizationRef,
      },
    ],
  };
}

/**
 * Sayfa yolundan BreadcrumbList. Bağlantısız ara öğeler ("Kurumsal") atlanır;
 * son öğe geçerli sayfadır ve `currentPath` adresini alır.
 */
export function breadcrumbLd(crumbs: Crumb[], currentPath: string): WithContext<BreadcrumbList> {
  const items = crumbs
    .map((crumb, index) => ({ ...crumb, href: index === crumbs.length - 1 ? currentPath : crumb.href }))
    .filter((crumb): crumb is Required<Crumb> => Boolean(crumb.href));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

/** Ürün. Fiyat verisi olmadığı için `offers` yok (plan 8.2). */
export function productLd(
  product: ProductItem,
  path: string,
  images: ImageEntry[],
  categoryTitle: string | undefined,
): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: absoluteUrl(path),
    ...(product.code ? { sku: product.code, mpn: product.code } : {}),
    ...(categoryTitle ? { category: categoryTitle } : {}),
    ...(images.length ? { image: images.map((image) => absoluteUrl(image.src)) } : {}),
  };
}

/** Hizmet; sağlayıcı kökteki kuruluş. */
export function serviceLd(service: ServiceItem, path: string, image: ImageEntry | null): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: absoluteUrl(path),
    provider: organizationRef,
    areaServed: { "@type": "Country", name: "Türkiye" },
    ...(image ? { image: absoluteUrl(image.src) } : {}),
  };
}

export function newsArticleLd(item: NewsItem, path: string, description: string, image: ImageEntry | null): WithContext<NewsArticle> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description,
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    inLanguage: "tr-TR",
    mainEntityOfPage: absoluteUrl(path),
    author: organizationRef,
    publisher: organizationRef,
    ...(image ? { image: [absoluteUrl(image.src)] } : {}),
  };
}

export function faqLd(items: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
