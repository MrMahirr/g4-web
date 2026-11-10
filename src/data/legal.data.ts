import type { LegalDocument } from "@/core/types";

/**
 * Mevcut sitedeki metinler kullanılabilir bir hukuk metni değildir. Bu taslaklar
 * gerçek metinler müşteri/hukuk ekibi tarafından onaylanana kadar geçicidir.
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    approvalPending: true,
    paragraphs: [
      "Bu taslak, G4 internet sitesinde kullanılan zorunlu çerezler hakkında genel bilgilendirme amacı taşır.",
      "Çerez tercihleri, çerez türleri, saklama süreleri ve üçüncü taraf aktarımları; site yayına alınmadan önce hukuk onayıyla bu metne eklenecektir.",
    ],
  },
  {
    slug: "kvkk-aydinlatma-metni",
    title: "KVKK Aydınlatma Metni",
    approvalPending: true,
    paragraphs: [
      "Bu taslak, iletişim ve teklif taleplerinde paylaşılan kişisel verilerin işlenmesine ilişkin nihai aydınlatma metni değildir.",
      "Veri sorumlusu bilgileri, işleme amaçları, hukuki sebepler, saklama süreleri ve başvuru yolları hukuk onayı sonrasında yayımlanacaktır.",
    ],
  },
];
