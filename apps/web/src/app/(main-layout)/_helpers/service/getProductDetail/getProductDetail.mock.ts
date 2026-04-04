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

const LUX1 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Dikisli-Damla-Lux-Suni-Deri-Ruhsat-Kabi-k-3.webp';
const LUX2 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/03/Dikisli-Lux-Desenli-Termo-Deri-Evlilik-Cuzdani-Kilifi-taba-a.webp';
const LUX3 =
  'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp';

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

export async function getProductDetailData(
  slug: string
): Promise<ProductDetailData | null> {
  return DIKISLI_LUX_SUNI;
}
