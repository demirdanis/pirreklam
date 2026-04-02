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
  href: string;
  logoUrl: string;
}

export interface HeaderData {
  contacts: HeaderContactItem[];
  navItems: HeaderNavItem[];
  socialLinks: HeaderSocialLink[];
}
