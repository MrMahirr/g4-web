import type { NewsItem } from "@/core/types";

/**
 * 4 haber — metinler mevcut siteden birebir (vault: 15 - Haber Detay).
 * DİKKAT: İçerikler 2020 tarihli hazır şablon verisidir (başlık ile metin uyuşmuyor).
 * Güncel haberler gelince bu dosya değiştirilecek.
 */
export const news: NewsItem[] = [
  {
    id: "news-arge",
    slug: "yeni-ar-ge-merkezimiz-faaliyete-gecti",
    title: "Yeni AR-GE Merkezimiz Faaliyete Geçti",
    publishedAt: "2020-02-18T14:06:00+03:00",
    paragraphs: [
      "Topluma ve çevreye katkıda bulunmayı hedefleyen firmamız, yeni bir sosyal sorumluluk projesini daha başlattı. Bu proje kapsamında özellikle eğitimde fırsat eşitliği yaratmayı hedefliyoruz. Kırsal kesimlerdeki okullarda eğitim materyalleri desteği sağlanacak, öğrencilerin ihtiyaç duyduğu altyapı eksiklikleri giderilecektir. Bunun yanı sıra, çevre bilincini artırmak için çeşitli eğitim programları düzenlenecek ve doğa koruma projeleri desteklenecektir. Çalışanlarımızın gönüllü desteğiyle yürütülen bu projede, toplumun her kesimine ulaşmayı amaçlıyoruz.",
      "Sosyal sorumluluk projemiz, sadece eğitim alanında değil, aynı zamanda sağlık ve çevre gibi önemli konularda da topluma destek olmayı hedefliyor. Proje kapsamında, bölgedeki sağlık merkezlerine gerekli tıbbi ekipman desteği sağlanırken, çevreyi koruma bilincinin yaygınlaştırılması için de farklı etkinlikler düzenlenecektir. Bu proje, firmamızın toplumsal değer yaratma konusundaki hassasiyetini yansıtırken, çalışanlarımızın ve yerel toplumun da projeye aktif katılımını sağlamaktadır.",
    ],
    imageKey: "haberler/yeni-ar-ge-merkezimiz-faaliyete-gecti",
    galleryKeys: [
      "haberler/yeni-ar-ge-merkezimiz-faaliyete-gecti-1",
      "haberler/yeni-ar-ge-merkezimiz-faaliyete-gecti-2",
    ],
  },
  {
    id: "news-odul",
    slug: "en-inovatif-sirket-odulunu-kazandik",
    title: "En İnovatif Şirket Ödülünü Kazandık",
    publishedAt: "2020-02-18T14:05:00+03:00",
    paragraphs: [
      "Firmamız, teknolojinin her geçen gün hızla değiştiği bu dönemde, geleceğin ihtiyaçlarına bugünden hazırlık yapmak adına kapsamlı bir yatırım planı oluşturdu. Yapay zeka, nesnelerin interneti (IoT), büyük veri ve dijital dönüşüm gibi yenilikçi alanlarda yapılan bu yatırımlar, müşteri memnuniyetini artırmanın yanı sıra operasyonel verimliliği de sağlamak amacıyla tasarlanmıştır. Bu yatırımlar, hizmet kalitemizi ve rekabet gücümüzü daha ileri taşımak için stratejik olarak planlanmış olup, sektördeki diğer kuruluşlara da örnek teşkil etmektedir.",
      "Teknolojik altyapımıza yapılan bu yenilikçi yatırımlar, hem müşterilerimize sunduğumuz hizmetlerin kalitesini artıracak hem de çalışanlarımızın daha yaratıcı ve verimli çözümler geliştirmesine olanak tanıyacaktır. Gelişen teknolojilere yapılan bu yatırımlar sayesinde, firmamızın sektördeki öncü konumunu sürdüreceği inancındayız. Aynı zamanda, bu adımların toplumsal fayda sağlaması için sürdürülebilir teknolojilere öncelik veriyoruz. Çevre dostu teknolojilerin entegrasyonunu sağlayarak, doğayı koruma sorumluluğumuzu da yerine getirmekte kararlıyız.",
    ],
    imageKey: "haberler/en-inovatif-sirket-odulunu-kazandik",
    galleryKeys: ["haberler/en-inovatif-sirket-odulunu-kazandik-1"],
  },
  {
    id: "news-zirve",
    slug: "global-teknoloji-zirvesinde-yer-aldik",
    title: "Global Teknoloji Zirvesinde Yer Aldık",
    publishedAt: "2020-02-18T14:04:00+03:00",
    paragraphs: [
      "Firmamızın 2024 yılı boyunca gerçekleştirdiği tüm faaliyetleri, finansal performansını, sürdürülebilirlik projelerini ve sosyal sorumluluk çalışmalarını içeren Yıllık Faaliyet Raporumuz yayımlandı. Şeffaflık ve hesap verebilirlik ilkelerimiz doğrultusunda hazırlanan bu rapor, hissedarlarımız, iş ortaklarımız ve müşterilerimiz için önemli bir bilgi kaynağı niteliğindedir. Raporda, yıl boyunca elde edilen başarılar, karşılaşılan zorluklar ve geleceğe yönelik stratejik hedeflerimiz detaylı bir şekilde ele alınmıştır.",
      "Faaliyet raporumuzda ayrıca, çevre dostu üretim süreçlerimiz, topluma katkı sağlayan sosyal sorumluluk projelerimiz ve çalışanlarımızın gelişimine yönelik gerçekleştirdiğimiz eğitim programları da yer almaktadır. Tüm paydaşlarımızın erişimine açık olan bu rapor, firmamızın sürdürülebilir büyüme hedeflerine olan bağlılığını bir kez daha ortaya koymaktadır.",
    ],
    imageKey: "haberler/global-teknoloji-zirvesinde-yer-aldik",
    galleryKeys: [
      "haberler/global-teknoloji-zirvesinde-yer-aldik-1",
      "haberler/global-teknoloji-zirvesinde-yer-aldik-2",
      "haberler/global-teknoloji-zirvesinde-yer-aldik-3",
    ],
  },
  {
    id: "news-lansman",
    slug: "yeni-urun-lansmanimiz-gerceklesti",
    title: "Yeni Ürün Lansmanımız Gerçekleşti",
    publishedAt: "2020-02-18T13:52:00+03:00",
    paragraphs: [
      "Firmamız, sektörde yenilikçi ve sürdürülebilir çözümler sunma misyonuyla yeni bir projeyi daha hayata geçirdi. Bu proje kapsamında, müşteri odaklı yaklaşımımızı bir adım öteye taşıyarak hem bireysel hem de kurumsal müşterilerimizin ihtiyaçlarına yönelik kapsamlı çözümler geliştirdik. Yenilikçi teknolojiler ve uzman ekibimizin titiz çalışmalarıyla şekillenen bu proje, sektörde yeni bir standart belirlemeyi hedefliyor. Çevre dostu uygulamalar ve sürdürülebilir kaynak kullanımıyla dikkat çeken projemiz, hem bugünün hem de geleceğin ihtiyaçlarına cevap verecek şekilde tasarlandı.",
      "Projemizin hayata geçirilmesi sürecinde, yerel ve uluslararası iş ortaklarımızla güçlü bir iş birliği yürüttük. Bu sayede, en son teknolojileri ve en iyi uygulamaları projemize entegre ederek yüksek kalite standartlarını yakaladık. Müşteri memnuniyetini en üst düzeyde tutmayı amaçlayan bu yeni girişimimiz, aynı zamanda bölgesel kalkınmaya ve istihdama da önemli katkılar sağlayacak. Projemizin getirdiği yenilikler ve sunduğu avantajlar, hem iş dünyasında hem de toplum genelinde büyük bir heyecanla karşılandı. Gelecekte de benzer projelerle sektöre öncülük etmeye ve değer yaratmaya devam edeceğiz. Yürüttüğümüz bu çalışmalar, firmamızın vizyonunu ve topluma sağladığımız değeri arttırmaktadır.",
    ],
    imageKey: "haberler/yeni-urun-lansmanimiz-gerceklesti",
    galleryKeys: ["haberler/yeni-urun-lansmanimiz-gerceklesti-1"],
  },
];
