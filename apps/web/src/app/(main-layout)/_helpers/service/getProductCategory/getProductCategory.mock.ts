export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  code: string;
  printOptions?: string[];
}

export interface SubCategory {
  id: string;
  slug: string;
  title: string;
  products: ProductItem[];
}

export interface ProductCategoryData {
  categorySlug: string;
  subcategorySlug: string;
  categoryTitle: string;
  subcategoryTitle: string;
  breadcrumb: { label: string; href: string }[];
  subcategories: SubCategory[];
}

const RUHSAT_KABI_DATA: ProductCategoryData = {
  categorySlug: 'plastik-urunler',
  subcategorySlug: 'ruhsat-kabi',
  categoryTitle: 'Plastik Ürünler',
  subcategoryTitle: 'Ruhsat Kabı',
  breadcrumb: [
    { label: 'Anasayfa', href: '/' },
    { label: 'Plastik Ürünler', href: '/plastik-urunler' },
    { label: 'Ruhsat Kabı', href: '/plastik-urunler/ruhsat-kabi' },
  ],
  subcategories: [
    {
      id: 'biala-pvc',
      slug: 'biala-pvc',
      title: 'Biala Pvc Ruhsat Kabı',
      products: [
        {
          id: 'ekonomik-ince-mat-biala-ruhsat-kabi',
          slug: 'ekonomik-ince-mat-biala-ruhsat-kabi',
          title: 'Ekonomik İnce Mat Biala Ruhsat Kabı',
          code: 'R-EMB+S1',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Ekonomik İnce Mat Biala Ruhsat Kabı',
          printOptions: ['1 Renk Boya'],
        },
        {
          id: 'standart-mat-biala-ruhsat-kabi',
          slug: 'standart-mat-biala-ruhsat-kabi',
          title: 'Standart Mat Biala Ruhsat Kabı',
          code: 'R-SMB+S3',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Standart Mat Biala Ruhsat Kabı',
          printOptions: [
            '1 Renk Boya',
            '2 Renk Boya',
            '3 Renk Boya',
            'UV Çok Renkli',
          ],
        },
        {
          id: 'standart-mat-biala-ruhsat-kabi-gofre',
          slug: 'standart-mat-biala-ruhsat-kabi-gofre',
          title: 'Standart Mat Biala Ruhsat Kabı (Gofre)',
          code: 'R-SMB+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Standart Mat Biala Ruhsat Kabı Gofre',
          printOptions: [
            'Gofre Kabartma',
            '1 Renk Boya + Gofre Kabartma',
            'Sıcak Varak Yaldız',
          ],
        },
        {
          id: 'lux-kalin-deri-desen-biala-ruhsat-kabi',
          slug: 'lux-kalin-deri-desen-biala-ruhsat-kabi',
          title: 'Lüx Kalın Deri Desen Biala Ruhsat Kabı',
          code: 'R-LB+S1',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Lüx Kalın Deri Desen Biala Ruhsat Kabı',
          printOptions: [
            '1 Renk Boya',
            '2 Renk Boya',
            'Gofre Kabartma',
            'UV Çok Renkli',
          ],
        },
      ],
    },
    {
      id: 'dikisli-suni-deri',
      slug: 'dikisli-suni-deri',
      title: 'Dikişli Suni Deri Ruhsat Kabı',
      products: [
        {
          id: 'dikisli-ekonomik-suni-deri-ruhsat-kabi-sungersiz',
          slug: 'dikisli-ekonomik-suni-deri-ruhsat-kabi-sungersiz',
          title: 'Dikişli Ekonomik Suni Deri Ruhsat Kabı – Süngersiz',
          code: 'R-DS-E+S1',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Ekonomik Suni Deri Ruhsat Kabı Süngersiz',
          printOptions: ['1 Renk Boya', 'Gofre Kabartma'],
        },
        {
          id: 'dikisli-suni-deri-ruhsat-kabi',
          slug: 'dikisli-suni-deri-ruhsat-kabi',
          title: 'Dikişli Suni Deri Ruhsat Kabı',
          code: 'R-DS-E+S2',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Suni Deri Ruhsat Kabı',
          printOptions: ['1 Renk Boya', '2 Renk Boya', 'UV Çok Renkli'],
        },
        {
          id: 'dikisli-lux-suni-deri-ruhsat-kabi',
          slug: 'dikisli-lux-suni-deri-ruhsat-kabi',
          title: 'Dikişli Lüx Suni Deri Ruhsat Kabı',
          code: 'R-DS-L+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Lüx Suni Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma', 'Gofre Kabartma + Damla Etiket'],
        },
        {
          id: 'dikisli-parcali-lux-suni-deri-ruhsat-kabi',
          slug: 'dikisli-parcali-lux-suni-deri-ruhsat-kabi',
          title: 'Dikişli Parçalı Lüx Suni Deri Ruhsat Kabı',
          code: 'R-PR-DS-L+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Parçalı Lüx Suni Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma'],
        },
      ],
    },
    {
      id: 'dikisli-termo-deri',
      slug: 'dikisli-termo-deri',
      title: 'Dikişli Termo Deri Ruhsat Kabı',
      products: [
        {
          id: 'u-model-dikisli-termo-deri-ruhsat-kabi',
          slug: 'u-model-dikisli-termo-deri-ruhsat-kabi',
          title: 'U Model Dikişli Termo Deri Ruhsat Kabı',
          code: 'R-DT-U+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'U Model Dikişli Termo Deri Ruhsat Kabı',
          printOptions: [],
        },
        {
          id: 'dikisli-mat-desensiz-termo-deri-ruhsat-kabi',
          slug: 'dikisli-mat-desensiz-termo-deri-ruhsat-kabi',
          title: 'Dikişli Mat Desensiz Termo Deri Ruhsat Kabı',
          code: 'R-DT-M+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Mat Desensiz Termo Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma', 'Gofre Kabartma + Damla Etiket'],
        },
        {
          id: 'dikisli-lux-desenli-termo-deri-ruhsat-kabi',
          slug: 'dikisli-lux-desenli-termo-deri-ruhsat-kabi',
          title: 'Dikişli Lüx Desenli Termo Deri Ruhsat Kabı',
          code: 'R-DT-L+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Lüx Desenli Termo Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma', 'Gofre Kabartma + Damla Etiket'],
        },
        {
          id: 'dikisli-parcali-lux-desenli-termo-deri-ruhsat-kabi',
          slug: 'dikisli-parcali-lux-desenli-termo-deri-ruhsat-kabi',
          title: 'Dikişli Parçalı Lüx Desenli Termo Deri Ruhsat Kabı',
          code: 'R-PR-DT-L+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Parçalı Lüx Desenli Termo Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma'],
        },
      ],
    },
    {
      id: 'dikisli-oval-kenar',
      slug: 'dikisli-oval-kenar',
      title: 'Dikişli Oval Kenar Ruhsat Kabı',
      products: [
        {
          id: 'dikisli-oval-kenar-mat-desensiz-termo-deri-ruhsat-kabi',
          slug: 'dikisli-oval-kenar-mat-desensiz-termo-deri-ruhsat-kabi',
          title: 'Dikişli Oval Kenar Mat Desensiz Termo Deri Ruhsat Kabı',
          code: 'R-OV-DT-M+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Oval Kenar Mat Desensiz Termo Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma', 'Gofre Kabartma + Damla Etiket'],
        },
        {
          id: 'dikisli-oval-kenar-lux-desenli-termo-deri-ruhsat-kabi',
          slug: 'dikisli-oval-kenar-lux-desenli-termo-deri-ruhsat-kabi',
          title: 'Dikişli Oval Kenar Lüx Desenli Termo Deri Ruhsat Kabı',
          code: 'R-OV-DT-L+GD',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Oval Kenar Lüx Desenli Termo Deri Ruhsat Kabı',
          printOptions: ['Gofre Kabartma', 'Gofre Kabartma + Damla Etiket'],
        },
      ],
    },
    {
      id: 'kapakli-ruhsat-kabi',
      slug: 'kapakli-ruhsat-kabi',
      title: 'Kapaklı Ruhsat Kabı',
      products: [
        {
          id: 'kapakli-suni-deri-ruhsat-kabi',
          slug: 'kapakli-suni-deri-ruhsat-kabi',
          title: 'Dikişli Kapaklı Suni Deri Ruhsat Kabı',
          code: 'R-K-DS+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Dikişli Kapaklı Suni Deri Ruhsat Kabı',
          printOptions: [],
        },
        {
          id: 'cit-cit-kapakli-mat-biala-ruhsat-kabi',
          slug: 'cit-cit-kapakli-mat-biala-ruhsat-kabi',
          title: 'Çıt Çıt Kapaklı Mat Biala Ruhsat Kabı',
          code: 'R-C-MB+S3',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Çıt Çıt Kapaklı Mat Biala Ruhsat Kabı',
          printOptions: ['1 Renk Boya', '2 Renk Boya', '3 Renk Boya'],
        },
      ],
    },
    {
      id: 'ofset-baskili',
      slug: 'ofset-baskili',
      title: 'Ofset Baskılı Ruhsat Kabı',
      products: [
        {
          id: 'ofset-baski-folyo-pvc-ruhsat-kabi',
          slug: 'ofset-baski-folyo-pvc-ruhsat-kabi',
          title: 'Ofset Baskı Folyo Pvc Ruhsat Kabı',
          code: 'R-OF-L25',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Ofset Baskı Folyo Pvc Ruhsat Kabı',
          printOptions: [],
        },
      ],
    },
    {
      id: 'is-makinasi',
      slug: 'is-makinasi',
      title: 'İş Makinası Ruhsat Kabı',
      products: [
        {
          id: 'is-makinasi-mat-biala-pvc-ruhsat-kabi-kartonsuz',
          slug: 'is-makinasi-mat-biala-pvc-ruhsat-kabi-kartonsuz',
          title: 'İş Makinası Mat Biala Pvc Ruhsat Kabı (Kartonsuz)',
          code: 'R-IM-MB+S1',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'İş Makinası Mat Biala Pvc Ruhsat Kabı Kartonsuz',
          printOptions: ['1 Renk Boya', 'Gofre Kabartma'],
        },
        {
          id: 'is-makinasi-mat-biala-pvc-ruhsat-kabi-u-model-kartonsuz',
          slug: 'is-makinasi-mat-biala-pvc-ruhsat-kabi-u-model-kartonsuz',
          title: 'İş Makinası Mat Biala Pvc Ruhsat Kabı U Model (Kartonsuz)',
          code: 'R-IM-MB+U1',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'İş Makinası Mat Biala Pvc Ruhsat Kabı U Model Kartonsuz',
          printOptions: ['1 Renk Boya'],
        },
      ],
    },
    {
      id: 'filo-cok-amacli',
      slug: 'filo-cok-amacli',
      title: 'Filo Çok Amaçlı Ruhsat Kabı',
      products: [
        {
          id: 'filo-cok-amacli-mat-biala-ruhsat-kabi',
          slug: 'filo-cok-amacli-mat-biala-ruhsat-kabi',
          title: 'Filo Çok Amaçlı Mat Biala Ruhsat Kabı',
          code: 'R-FL-MB+S2',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Filo Çok Amaçlı Mat Biala Ruhsat Kabı',
          printOptions: ['1 Renk Boya', '2 Renk Boya'],
        },
      ],
    },
    {
      id: 'hakiki-deri',
      slug: 'hakiki-deri',
      title: 'Hakiki Deri Ruhsat Kabı',
      products: [
        {
          id: 'hakiki-deri-ruhsat-kabi-kredi-kartlik-cepli',
          slug: 'hakiki-deri-ruhsat-kabi-kredi-kartlik-cepli',
          title: 'Hakiki Deri Ruhsat Kabı – Kredi Kartlık Cepli',
          code: 'R-HD-KR+G',
          imageUrl:
            'https://pirreklam.com.tr/wp-content/uploads/2026/02/Mat-Biala-Ruhsat-Kabi-kirmizi-beyaz-k2-1024x1024.webp',
          imageAlt: 'Hakiki Deri Ruhsat Kabı Kredi Kartlık Cepli',
          printOptions: ['Gofre Kabartma'],
        },
      ],
    },
  ],
};

const PRODUCT_CATEGORY_MAP: Record<
  string,
  Record<string, ProductCategoryData>
> = {
  'plastik-urunler': {
    'ruhsat-kabi': RUHSAT_KABI_DATA,
  },
};

export async function getProductCategoryData(
  category: string,
  subcategory: string
): Promise<ProductCategoryData | null> {
  return PRODUCT_CATEGORY_MAP[category]?.[subcategory] ?? null;
}
