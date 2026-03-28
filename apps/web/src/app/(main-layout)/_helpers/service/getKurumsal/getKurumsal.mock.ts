import type { KurumsalData } from '@/components/kurumsal/kurumsal.types';

export async function getKurumsalData(): Promise<KurumsalData> {
  return {
    title: "1961'den Beri Sektörün Pir'i",
    paragraphs: [
      'PİR REKLAM LTD. ŞTİ. plastik frekans baskı, promosyon hediyelik eşya, çanta, ev tekstil ambalaj, serigrafi sticker ürünleri imalatı sektöründe 1961 yılında kurulmuş olup, bugüne titiz ve kaliteye önem veren çalışmaları ile iki nesildir müşterilerine en iyi hizmeti vererek gelmiştir.',
      'Sunduğumuz ürün yelpazesi içerisinde Ruhsat Kabı, Pasaport Kılıfı, Kredi Kartlık, Fotoğraf Kabı, Şans oyunları kupon kılıfları, Döviz Kabı, Av Tezkeresi Kabı ve Elbise Kılıfları gibi birçok ürün grubu yer almaktadır.',
      'Ruhsat Kabı ve Pasaport Kılıfı imalatı konusunda en tecrübeli firmaların başında yer alan firmamız uygun fiyat politikası ve kaliteli ürünleriyle sektörün liderleri arasındadır. Bugün 1800 m² kapalı alan ve alanında uzman kadromuzla bu sektörde istihdam sağlayarak daha da büyük hedeflere ilerlemekteyiz.',
    ],
    stats: [
      { value: '1961', label: 'Kuruluş Yılı' },
      { value: '60+', label: 'Yıllık Deneyim' },
      { value: '1800 m²', label: 'Kapalı Üretim Alanı' },
      { value: '2 Nesil', label: 'Aile Şirketi' },
    ],
    features: [
      {
        icon: 'factory',
        title: 'Yerli Üretim',
        desc: "Tüm ürünlerimiz Türkiye'de kendi üretim tesislerimizde imal edilmektedir.",
      },
      {
        icon: 'award',
        title: 'Tescilli Marka',
        desc: 'Pir Reklam ve Pir Plastik markalarımız Türk Patent Enstitüsü tarafından tescil edilmiştir.',
      },
      {
        icon: 'users',
        title: 'Uzman Kadro',
        desc: 'Alanında deneyimli ekibimizle müşterilerimize en iyi hizmeti sunuyoruz.',
      },
      {
        icon: 'trending',
        title: 'Sektör Lideri',
        desc: "Plastik promosyon ürünleri segmentinde Türkiye'nin önde gelen üreticilerinden biriyiz.",
      },
    ],
  };
}
