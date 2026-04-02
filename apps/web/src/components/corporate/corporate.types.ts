export interface CorporateStat {
  value: string;
  label: string;
}

export interface CorporateFeature {
  title: string;
  desc: string;
}

export interface CorporateData {
  title: string;
  content: string;
  stats: CorporateStat[];
  features: CorporateFeature[];
}
