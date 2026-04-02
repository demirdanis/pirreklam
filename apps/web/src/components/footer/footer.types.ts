export interface FooterNavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterNavSection {
  title: string;
  links: FooterNavLink[];
}

export interface FooterSocialLink {
  href: string;
  logoUrl: string;
}

export interface FooterContactInfo {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
}

export interface FooterData {
  logo: {
    text: string;
    tagline: string;
    description: string;
    href: string;
  };
  contact: FooterContactInfo;
  sections: FooterNavSection[];
  socialLinks: FooterSocialLink[];

  googleReviewHref: string;
  etbisHref: string;
  copyright: string;
}
