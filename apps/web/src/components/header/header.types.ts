export interface HeaderNavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeaderContactItem {
  icon: 'phone' | 'whatsapp';
  label: string;
  value: string;
  href: string;
}

export interface HeaderSocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'pinterest' | 'linkedin';
  href: string;
  label: string;
}

export interface HeaderData {
  logo: {
    text: string;
    tagline: string;
    href: string;
  };
  contacts: HeaderContactItem[];
  loginHref: string;
  cartHref: string;
  navItems: HeaderNavItem[];
  socialLinks: HeaderSocialLink[];
}
