// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface OptionItem {
  id: string;
  label: string;
  /** Shown in the accordion below selector when this option is selected */
  description?: string;
}

export interface OptionGroup {
  /** e.g., "BASKI SEÇENEKLERİ" */
  title: string;
  options: OptionItem[];
}

export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export interface TierPrice {
  qty: 200 | 500 | 1000;
  /** Per-unit price, VAT excluded */
  perUnitExVat: number;
}

export interface VariantData {
  /**
   * Key format:
   *  - with sub option : "{mainId}__{subId}__{colorId}"
   *  - without sub     : "{mainId}__{colorId}"
   */
  key: string;
  mainOptionId: string;
  subOptionId?: string;
  colorId: string;
  productCode: string;
  images: string[];
  /** Single-piece price, VAT excluded */
  singleUnitPriceExVat: number;
  tiers: TierPrice[];
}

export interface RelatedProduct {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
}

export interface ProductDetailData {
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
  breadcrumb: { label: string; href: string }[];
  mainOptionGroup: OptionGroup;
  /** Nullable – not all products have sub-options */
  subOptionGroup?: OptionGroup;
  colors: ColorOption[];
  variants: VariantData[];
  relatedProducts: RelatedProduct[];
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function v(
  mainId: string,
  colorId: string,
  productCode: string,
  images: string[],
  singlePrice: number,
  tiers: TierPrice[],
  subId?: string
): VariantData {
  const key = subId
    ? `${mainId}__${subId}__${colorId}`
    : `${mainId}__${colorId}`;
  return {
    key,
    mainOptionId: mainId,
    subOptionId: subId,
    colorId,
    productCode,
    images,
    singleUnitPriceExVat: singlePrice,
    tiers,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED IMAGES (in production each variant gets its own photos)
// ─────────────────────────────────────────────────────────────────────────────

const LUX1 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Dikisli-Damla-Lux-Suni-Deri-Ruhsat-Kabi-k-3.webp';
const LUX2 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/03/Dikisli-Lux-Desenli-Termo-Deri-Evlilik-Cuzdani-Kilifi-taba-a.webp';
const LUX3 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp';

const BIA1 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp';
const BIA2 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/03/Mat-Biala-Tekli-Kredi-Kartlik-siyah-gumus-k.webp';
const BIA3 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Dikisli-Damla-Lux-Suni-Deri-Ruhsat-Kabi-k-3.webp';

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT 1 – Dikişli Lüx Suni Deri Ruhsat Kabı (has sub-options)
// ─────────────────────────────────────────────────────────────────────────────
//
// Compatibility matrix (main × sub × color):
//   gofre    + tual    : bakir, siyah, lacivert, kahverengi   (4 variants)
//   gofre    + deri    : siyah, bordo, lacivert, taba          (4 variants)
//   gofre    + klasik  : siyah, mavi, kahverengi               (3 variants)
//   gofre_damla + tual : bakir, siyah, bordo                   (3 variants)
//   gofre_damla + deri : lacivert, kahverengi, taba            (3 variants)
//   gofre_damla + klasik: *** NOT AVAILABLE ***                (intentional gap)
//
// Therefore:
//   "mavi"       is ONLY compatible with gofre+klasik
//   "klasik" sub is NOT compatible with gofre_damla (dimmed when gofre_damla selected)
//   "gofre_damla" is NOT compatible when (sub=klasik OR color=mavi) is selected
// ─────────────────────────────────────────────────────────────────────────────

const DIKISLI_LUX_SUNI: ProductDetailData = {
  slug: 'dikisli-lux-suni-deri-ruhsat-kabi-2',
  title: 'Dikişli Lüx Suni Deri Ruhsat Kabı',
  categorySlug: 'plastik-urunler',
  categoryTitle: 'Plastik Ürünler',
  subcategorySlug: 'ruhsat-kabi',
  subcategoryTitle: 'Ruhsat Kabı',
  breadcrumb: [
    { label: 'Anasayfa', href: '/' },
    { label: 'Plastik Ürünler', href: '/plastik-urunler' },
    { label: 'Ruhsat Kabı', href: '/plastik-urunler/ruhsat-kabi' },
    {
      label: 'Dikişli Lüx Suni Deri Ruhsat Kabı',
      href: '/plastik-urunler/ruhsat-kabi/dikisli-lux-suni-deri-ruhsat-kabi-2',
    },
  ],

  mainOptionGroup: {
    title: 'BASKI SEÇENEKLERİ',
    options: [
      {
        id: 'gofre',
        label: 'Gofre Kabartma',
        description:
          'Gofre kabartma yöntemi ile logo, yazı ve desenleriniz ürün yüzeyine üç boyutlu olarak işlenir. Kalıcı ve şık görünüm sağlar. Minimum sipariş adedi uygulanmaktadır.',
      },
      {
        id: 'gofre_damla',
        label: 'Gofre Kabartma + Damla Etiket',
        description:
          'Gofre kabartma üzerine özel damla etiket uygulaması yapılır. Logonuz hem kabartmalı hem de şeffaf koruyucu damla ile kaplanır; çarpıcı ve uzun ömürlü sonuç elde edilir.',
      },
    ],
  },

  subOptionGroup: {
    title: 'LÜX SUNİ DERİ DESENLER',
    options: [
      {
        id: 'tual',
        label: 'Tual',
        description:
          'Tual doku yapısına sahip premium suni deri. İnce dokulu yüzeyi ile kurumsal kimliğinize sadelik ve zarafet katar.',
      },
      {
        id: 'deri',
        label: 'Deri Desen',
        description:
          'Gerçek deri görünümünde suni deri. Detaylı doku baskısı sayesinde hakiki deri izlenimi verir.',
      },
      {
        id: 'klasik',
        label: 'Klasik Mat',
        // no description – intentionally nullable
      },
    ],
  },

  colors: [
    { id: 'bakir', label: 'Bakır', hex: '#b87333' },
    { id: 'siyah', label: 'Siyah', hex: '#1c1c1c' },
    { id: 'lacivert', label: 'Lacivert', hex: '#1a2b5f' },
    { id: 'kahverengi', label: 'Kahverengi', hex: '#6b3e26' },
    { id: 'bordo', label: 'Bordo', hex: '#6d1f2d' },
    { id: 'mavi', label: 'Mavi', hex: '#1e4d8c' },
    { id: 'taba', label: 'Taba', hex: '#c19a6b' },
  ],

  variants: [
    // ── gofre + tual ──
    v(
      'gofre',
      'bakir',
      'R-DS-L+G-TU-BK',
      [LUX1, LUX2, LUX3],
      18,
      [
        { qty: 200, perUnitExVat: 15 },
        { qty: 500, perUnitExVat: 12 },
        { qty: 1000, perUnitExVat: 10 },
      ],
      'tual'
    ),
    v(
      'gofre',
      'siyah',
      'R-DS-L+G-TU-SY',
      [LUX1, LUX2],
      18,
      [
        { qty: 200, perUnitExVat: 15 },
        { qty: 500, perUnitExVat: 12 },
        { qty: 1000, perUnitExVat: 10 },
      ],
      'tual'
    ),
    v(
      'gofre',
      'lacivert',
      'R-DS-L+G-TU-LV',
      [LUX1, LUX2],
      18,
      [
        { qty: 200, perUnitExVat: 15 },
        { qty: 500, perUnitExVat: 12 },
        { qty: 1000, perUnitExVat: 10 },
      ],
      'tual'
    ),
    v(
      'gofre',
      'kahverengi',
      'R-DS-L+G-TU-KH',
      [LUX1, LUX2],
      18,
      [
        { qty: 200, perUnitExVat: 15 },
        { qty: 500, perUnitExVat: 12 },
        { qty: 1000, perUnitExVat: 10 },
      ],
      'tual'
    ),

    // ── gofre + deri ──
    v(
      'gofre',
      'siyah',
      'R-DS-L+G-DR-SY',
      [LUX2, LUX1],
      20,
      [
        { qty: 200, perUnitExVat: 17 },
        { qty: 500, perUnitExVat: 14 },
        { qty: 1000, perUnitExVat: 12 },
      ],
      'deri'
    ),
    v(
      'gofre',
      'bordo',
      'R-DS-L+G-DR-BR',
      [LUX2, LUX1],
      20,
      [
        { qty: 200, perUnitExVat: 17 },
        { qty: 500, perUnitExVat: 14 },
        { qty: 1000, perUnitExVat: 12 },
      ],
      'deri'
    ),
    v(
      'gofre',
      'lacivert',
      'R-DS-L+G-DR-LV',
      [LUX2, LUX1],
      20,
      [
        { qty: 200, perUnitExVat: 17 },
        { qty: 500, perUnitExVat: 14 },
        { qty: 1000, perUnitExVat: 12 },
      ],
      'deri'
    ),
    v(
      'gofre',
      'taba',
      'R-DS-L+G-DR-TB',
      [LUX2, LUX3],
      20,
      [
        { qty: 200, perUnitExVat: 17 },
        { qty: 500, perUnitExVat: 14 },
        { qty: 1000, perUnitExVat: 12 },
      ],
      'deri'
    ),

    // ── gofre + klasik ──
    v(
      'gofre',
      'siyah',
      'R-DS-L+G-KL-SY',
      [LUX3, LUX1],
      16,
      [
        { qty: 200, perUnitExVat: 13 },
        { qty: 500, perUnitExVat: 11 },
        { qty: 1000, perUnitExVat: 9 },
      ],
      'klasik'
    ),
    v(
      'gofre',
      'mavi',
      'R-DS-L+G-KL-MV',
      [LUX3, LUX1],
      16,
      [
        { qty: 200, perUnitExVat: 13 },
        { qty: 500, perUnitExVat: 11 },
        { qty: 1000, perUnitExVat: 9 },
      ],
      'klasik'
    ),
    v(
      'gofre',
      'kahverengi',
      'R-DS-L+G-KL-KH',
      [LUX3],
      16,
      [
        { qty: 200, perUnitExVat: 13 },
        { qty: 500, perUnitExVat: 11 },
        { qty: 1000, perUnitExVat: 9 },
      ],
      'klasik'
    ),

    // ── gofre_damla + tual ──
    v(
      'gofre_damla',
      'bakir',
      'R-DS-L+GD-TU-BK',
      [LUX1, LUX2, LUX3],
      22,
      [
        { qty: 200, perUnitExVat: 18 },
        { qty: 500, perUnitExVat: 15 },
        { qty: 1000, perUnitExVat: 12.5 },
      ],
      'tual'
    ),
    v(
      'gofre_damla',
      'siyah',
      'R-DS-L+GD-TU-SY',
      [LUX1, LUX2],
      22,
      [
        { qty: 200, perUnitExVat: 18 },
        { qty: 500, perUnitExVat: 15 },
        { qty: 1000, perUnitExVat: 12.5 },
      ],
      'tual'
    ),
    v(
      'gofre_damla',
      'bordo',
      'R-DS-L+GD-TU-BR',
      [LUX1, LUX2],
      22,
      [
        { qty: 200, perUnitExVat: 18 },
        { qty: 500, perUnitExVat: 15 },
        { qty: 1000, perUnitExVat: 12.5 },
      ],
      'tual'
    ),

    // ── gofre_damla + deri ──
    v(
      'gofre_damla',
      'lacivert',
      'R-DS-L+GD-DR-LV',
      [LUX2, LUX3],
      24,
      [
        { qty: 200, perUnitExVat: 20 },
        { qty: 500, perUnitExVat: 17 },
        { qty: 1000, perUnitExVat: 14 },
      ],
      'deri'
    ),
    v(
      'gofre_damla',
      'kahverengi',
      'R-DS-L+GD-DR-KH',
      [LUX2],
      24,
      [
        { qty: 200, perUnitExVat: 20 },
        { qty: 500, perUnitExVat: 17 },
        { qty: 1000, perUnitExVat: 14 },
      ],
      'deri'
    ),
    v(
      'gofre_damla',
      'taba',
      'R-DS-L+GD-DR-TB',
      [LUX2, LUX3],
      24,
      [
        { qty: 200, perUnitExVat: 20 },
        { qty: 500, perUnitExVat: 17 },
        { qty: 1000, perUnitExVat: 14 },
      ],
      'deri'
    ),

    // ── gofre_damla + klasik : NOT AVAILABLE ──
  ],

  relatedProducts: [
    {
      id: 'dikisli-suni-deri',
      title: 'Dikişli Suni Deri Ruhsat Kabı',
      imageUrl: LUX2,
      href: '/plastik-urunler/ruhsat-kabi/dikisli-suni-deri-ruhsat-kabi',
    },
    {
      id: 'dikisli-termo-deri',
      title: 'Dikişli Termo Deri Ruhsat Kabı',
      imageUrl: LUX1,
      href: '/plastik-urunler/ruhsat-kabi/dikisli-termo-deri-ruhsat-kabi',
    },
    {
      id: 'dikisli-parcali-lux',
      title: 'Dikişli Parçalı Lüx Suni Deri Ruhsat Kabı',
      imageUrl: LUX2,
      href: '/plastik-urunler/ruhsat-kabi/dikisli-parcali-lux-suni-deri-ruhsat-kabi',
    },
    {
      id: 'hakiki-deri',
      title: 'Hakiki Deri Ruhsat Kabı',
      imageUrl: LUX3,
      href: '/plastik-urunler/ruhsat-kabi/hakiki-deri-ruhsat-kabi-kredi-kartlik-cepli',
    },
    {
      id: 'oval-kenar',
      title: 'Dikişli Oval Kenar Ruhsat Kabı',
      imageUrl: LUX1,
      href: '/plastik-urunler/ruhsat-kabi/dikisli-oval-kenar-mat-desensiz-termo-deri-ruhsat-kabi',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT 2 – Çıt Çıt Kapaklı Mat Biala Ruhsat Kabı (NO sub-options)
// ─────────────────────────────────────────────────────────────────────────────
//
// Compatibility matrix (main × color):
//   1_renk : beyaz, siyah, kirmizi, mavi, sari, yesil, turuncu  (all 7)
//   2_renk : beyaz, siyah, kirmizi, mavi, sari                   (5 – no yesil/turuncu)
//   3_renk : beyaz, siyah, kirmizi                               (3 only)
//
// Therefore:
//   "yesil" & "turuncu"  are ONLY compatible with 1_renk
//   "mavi"  & "sari"     are NOT compatible with 3_renk
// ─────────────────────────────────────────────────────────────────────────────

const CIT_CIT_KAPAKLI: ProductDetailData = {
  slug: 'cit-cit-kapakli-mat-biala-ruhsat-kabi',
  title: 'Çıt Çıt Kapaklı Mat Biala Ruhsat Kabı',
  categorySlug: 'plastik-urunler',
  categoryTitle: 'Plastik Ürünler',
  subcategorySlug: 'ruhsat-kabi',
  subcategoryTitle: 'Ruhsat Kabı',
  breadcrumb: [
    { label: 'Anasayfa', href: '/' },
    { label: 'Plastik Ürünler', href: '/plastik-urunler' },
    { label: 'Ruhsat Kabı', href: '/plastik-urunler/ruhsat-kabi' },
    {
      label: 'Çıt Çıt Kapaklı Mat Biala Ruhsat Kabı',
      href: '/plastik-urunler/ruhsat-kabi/cit-cit-kapakli-mat-biala-ruhsat-kabi',
    },
  ],

  mainOptionGroup: {
    title: 'BASKI SEÇENEKLERİ',
    options: [
      {
        id: '1_renk',
        label: '1 Renk Boya',
        description:
          'Tek renk boya baskı ile logonuz veya yazınız ürün yüzeyine uygulanır. Ekonomik fiyat avantajı ile tüm renk seçeneklerinde geçerlidir.',
      },
      {
        id: '2_renk',
        label: '2 Renk Boya',
        description:
          'İki farklı renk kullanılarak daha detaylı ve etkili bir baskı elde edilir. Beyaz, siyah, kırmızı, mavi ve sarı renk seçeneklerinde uygulanmaktadır.',
      },
      {
        id: '3_renk',
        label: '3 Renk Boya',
        description:
          'Üç renk boya baskı ile en çarpıcı görüntü sağlanır. Yalnızca beyaz, siyah ve kırmızı renk seçeneklerinde uygulanmaktadır.',
      },
    ],
  },

  // No subOptionGroup

  colors: [
    { id: 'beyaz', label: 'Beyaz', hex: '#e8e8e8' },
    { id: 'siyah', label: 'Siyah', hex: '#1c1c1c' },
    { id: 'kirmizi', label: 'Kırmızı', hex: '#e32231' },
    { id: 'mavi', label: 'Mavi', hex: '#1e4d8c' },
    { id: 'sari', label: 'Sarı', hex: '#f5c518' },
    { id: 'yesil', label: 'Yeşil', hex: '#2d6a4f' },
    { id: 'turuncu', label: 'Turuncu', hex: '#e8720c' },
  ],

  variants: [
    // ── 1_renk : all 7 ──
    v('1_renk', 'beyaz', 'R-C-MB+S1-BY', [BIA1, BIA2, BIA3], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'siyah', 'R-C-MB+S1-SY', [BIA1, BIA2], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'kirmizi', 'R-C-MB+S1-KR', [BIA1, BIA2], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'mavi', 'R-C-MB+S1-MV', [BIA1], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'sari', 'R-C-MB+S1-SR', [BIA1], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'yesil', 'R-C-MB+S1-YS', [BIA1], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),
    v('1_renk', 'turuncu', 'R-C-MB+S1-TU', [BIA1], 8, [
      { qty: 200, perUnitExVat: 6.5 },
      { qty: 500, perUnitExVat: 5.5 },
      { qty: 1000, perUnitExVat: 4.5 },
    ]),

    // ── 2_renk : 5 colors ──
    v('2_renk', 'beyaz', 'R-C-MB+S2-BY', [BIA2, BIA1], 10, [
      { qty: 200, perUnitExVat: 8.5 },
      { qty: 500, perUnitExVat: 7.5 },
      { qty: 1000, perUnitExVat: 6.5 },
    ]),
    v('2_renk', 'siyah', 'R-C-MB+S2-SY', [BIA2, BIA1], 10, [
      { qty: 200, perUnitExVat: 8.5 },
      { qty: 500, perUnitExVat: 7.5 },
      { qty: 1000, perUnitExVat: 6.5 },
    ]),
    v('2_renk', 'kirmizi', 'R-C-MB+S2-KR', [BIA2, BIA1], 10, [
      { qty: 200, perUnitExVat: 8.5 },
      { qty: 500, perUnitExVat: 7.5 },
      { qty: 1000, perUnitExVat: 6.5 },
    ]),
    v('2_renk', 'mavi', 'R-C-MB+S2-MV', [BIA2], 10, [
      { qty: 200, perUnitExVat: 8.5 },
      { qty: 500, perUnitExVat: 7.5 },
      { qty: 1000, perUnitExVat: 6.5 },
    ]),
    v('2_renk', 'sari', 'R-C-MB+S2-SR', [BIA2], 10, [
      { qty: 200, perUnitExVat: 8.5 },
      { qty: 500, perUnitExVat: 7.5 },
      { qty: 1000, perUnitExVat: 6.5 },
    ]),

    // ── 3_renk : 3 colors ──
    v('3_renk', 'beyaz', 'R-C-MB+S3-BY', [BIA1, BIA2, BIA3], 12, [
      { qty: 200, perUnitExVat: 10.5 },
      { qty: 500, perUnitExVat: 9 },
      { qty: 1000, perUnitExVat: 8 },
    ]),
    v('3_renk', 'siyah', 'R-C-MB+S3-SY', [BIA1, BIA2], 12, [
      { qty: 200, perUnitExVat: 10.5 },
      { qty: 500, perUnitExVat: 9 },
      { qty: 1000, perUnitExVat: 8 },
    ]),
    v('3_renk', 'kirmizi', 'R-C-MB+S3-KR', [BIA1, BIA2], 12, [
      { qty: 200, perUnitExVat: 10.5 },
      { qty: 500, perUnitExVat: 9 },
      { qty: 1000, perUnitExVat: 8 },
    ]),
  ],

  relatedProducts: [
    {
      id: 'standart-mat-biala',
      title: 'Standart Mat Biala Ruhsat Kabı',
      imageUrl: BIA1,
      href: '/plastik-urunler/ruhsat-kabi/standart-mat-biala-ruhsat-kabi',
    },
    {
      id: 'ekonomik-ince-mat-biala',
      title: 'Ekonomik İnce Mat Biala Ruhsat Kabı',
      imageUrl: BIA2,
      href: '/plastik-urunler/ruhsat-kabi/ekonomik-ince-mat-biala-ruhsat-kabi',
    },
    {
      id: 'lux-kalin-deri-biala',
      title: 'Lüx Kalın Deri Desen Biala Ruhsat Kabı',
      imageUrl: BIA1,
      href: '/plastik-urunler/ruhsat-kabi/lux-kalin-deri-desen-biala-ruhsat-kabi',
    },
    {
      id: 'ofset-baski',
      title: 'Ofset Baskı Folyo Pvc Ruhsat Kabı',
      imageUrl: BIA3,
      href: '/plastik-urunler/ruhsat-kabi/ofset-baski-folyo-pvc-ruhsat-kabi',
    },
    {
      id: 'dikisli-lux-suni',
      title: 'Dikişli Lüx Suni Deri Ruhsat Kabı',
      imageUrl: BIA3,
      href: '/plastik-urunler/ruhsat-kabi/dikisli-lux-suni-deri-ruhsat-kabi-2',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LOOKUP MAP
// ─────────────────────────────────────────────────────────────────────────────

const DETAIL_MAP: Record<
  string,
  Record<string, Record<string, ProductDetailData>>
> = {
  'plastik-urunler': {
    'ruhsat-kabi': {
      'dikisli-lux-suni-deri-ruhsat-kabi-2': DIKISLI_LUX_SUNI,
      'cit-cit-kapakli-mat-biala-ruhsat-kabi': CIT_CIT_KAPAKLI,
    },
  },
};

export async function getProductDetailData(
  category: string,
  subcategory: string,
  product: string
): Promise<ProductDetailData | null> {
  return DETAIL_MAP[category]?.[subcategory]?.[product] ?? null;
}
