/**
 * Kurumsal sayfa metinleri — tasarım dosyalarından (D4Hakkimizda, D4Hizmetler, D4HizmetDetay,
 * D4Referanslar, D4Kariyer, D4SSS, D4Haberler, D4HaberDetay) ve İçerik Envanteri'nden birebir.
 * Yazım hataları düzeltildi: "İstermisiniz ?" → "İster misiniz?", "Kurumsal v25" → "G4".
 */
export const pageCopy = {
  about: {
    title: "Hakkımızda",
    lead: "Yenilikçi vizyonumuz ve kurumsal yaklaşımımızla sizlere daha yakından tanıtmak istiyoruz.",
    coverImageKey: "kurumsal/hakkimizda-1",
    intro: [
      "Kalite, güven ve sürdürülebilir başarı anlayışıyla hareket eden şirketimiz; modern iş modeli, profesyonel yaklaşımı ve gelişime açık vizyonuyla sektörde fark yaratmayı hedeflemektedir.",
      "Geleceğe değer katan projelerimiz ve müşteri memnuniyetini esas alan hizmet anlayışımızla büyümeye ve üretmeye devam ediyoruz.",
    ],
    vision: {
      tag: "Vizyonumuz",
      before: "G4 olarak vizyonumuz; yatırım, inşaat ve medikal alanlarında yenilikçi projeler geliştirerek güvenilirliği, kalite anlayışı ve profesyonel hizmet yapısıyla",
      accent: "sektörüne yön veren güçlü bir marka",
      after: "olmaktır.",
    },
    sectors: [
      {
        title: "Yatırım ve İnşaat",
        imageKey: "hizmetler/insaat",
        domain: "construction",
        lead: "Yatırım ve inşaat alanında; güçlü altyapılar oluşturan, geleceğe değer katan ve modern yaşam ihtiyaçlarına uygun projeler geliştiren şirketimiz, güvenilirlik ve kaliteyi her zaman ön planda tutmaktadır.",
        paragraphs: [
          "Estetik, dayanıklılık ve fonksiyonelliği bir araya getiren projelerimizle sürdürülebilir yapılar inşa ederek sektörde güçlü bir konum elde etmeyi amaçlıyoruz.",
        ],
      },
      {
        title: "Medikal",
        imageKey: "hizmetler/medikal",
        domain: "medical",
        lead: "Medikal sektöründe ise insan sağlığını merkeze alan hizmet anlayışımızla; kaliteli medikal ürün tedariği, sağlık çözümleri ve yenilikçi teknolojiler konusunda profesyonel hizmet sunmaktayız.",
        paragraphs: [
          "Sağlık sektöründeki gelişmeleri yakından takip ederek modern, güvenilir ve yüksek standartlara sahip çözümleri müşterilerimizle buluşturuyoruz.",
          "Güven odaklı yaklaşımımız sayesinde medikal alanda uzun vadeli iş birlikleri kurmayı ve güçlü bir marka değeri oluşturmayı hedefliyoruz.",
        ],
      },
    ],
    band: ["Kalite", "Güven", "Sürdürülebilir Başarı"],
  },
  services: {
    tag: "Profesyonel Çözümler",
    title: "Hizmetlerimiz",
    lead: "Kaliteli, güvenilir ve yenilikçi hizmet anlayışımızla sektörümüzde fark yaratıyoruz.",
    formTitle: "Teklif Formu",
    formText: "Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır.",
  },
  references: {
    title: "Referanslar",
    lead: "Güvenimizi ve kalitemizi tercih eden firmalarla gerçekleştirdiğimiz projelerden bazılarını burada inceleyebilirsiniz.",
    cta: "Bizimle Çalışmak İster misiniz?",
    drift: "NBA Güven · Güven Ayrancı · Ufuk Üniversitesi · Electro BISMED",
  },
  career: {
    ghost: "İK",
    titleLines: ["İnsan Kaynakları", "Formu"],
    lead: "Kariyerine yön verecek, ilham veren bir ekipte yer almak ister misin? Aramıza katıl, geleceği birlikte inşa edelim.",
    steps: [
      "Güncel açık pozisyonlar ya da genel iş başvurusu için İK formunu doldurup tarafımıza iletiniz.",
      "Formdaki tüm alanları eksiksiz olarak doldurun.",
      "Başvuru değerlendirme komitesi başvuruları değerlendirecek ve olumlu değerlendirilen adaylar mülakat için randevulu olarak G4 tarafından çağırılacaktır.",
    ],
    asideTitle: { before: "Bizimle Çalışmak", accent: "İster misiniz?" },
    asideLead: "İşimize geniş bir bakış açısıyla yaklaşıp hayal ederiz, farklı çözüm yolları ve yeni fikirlerle yaklaşımda bulunuruz.",
    asideText: "Sizler için de ne yapabileceğimizi bilmek isteriz, bizimle iletişime geçip tanışmaya ne dersiniz?",
    formTag: "İK Başvuru Formu",
    subject: "İK Başvurusu",
  },
  faq: {
    titleLines: ["Sık Sorulan", "Sorular"],
    lead: "Sıkça gelen soruların hızlı ve net yanıtları; aradığınızı bulamazsanız bize ulaşın.",
  },
  news: {
    titleLines: ["Güncel", "Haberler"],
    tag: "Güncel Haberler",
    next: "Sonraki",
    share: "Paylaş",
    kicker: "Haber",
    source: "G4 · Kurumsal",
  },
  search: {
    title: "Arama",
    lead: "Ürün adı, Ref kodu, ürün grubu veya hizmet adıyla arayın.",
  },
} as const;
