export interface KurumsalStat {
  value: string;
  label: string;
}

export interface KurumsalFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface KurumsalData {
  title: string;
  paragraphs: string[];
  stats: KurumsalStat[];
  features: KurumsalFeature[];
}
