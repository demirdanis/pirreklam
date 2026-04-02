import { Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';

import type { FooterData } from './footer.types';
import Link from 'next/link';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-[#030e26] border-t border-[#2a2d2d]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href={data.logo.href}
              className="group inline-flex flex-col leading-none mb-4"
            >
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#f74e56] transition-colors font-alt">
                {data.logo.text}
              </span>
              <span className="text-[9px]  tracking-[0.2em] text-[#e32231] font-medium mt-0.5">
                {data.logo.tagline}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-xs">
              {data.logo.description}
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={data.contact.phoneHref}
                className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e32231]/10 text-[#e32231] group-hover:bg-[#730912]/20 transition-colors shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                {data.contact.phone}
              </a>
              <a
                href={data.contact.whatsappHref}
                className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e32231]/10 text-[#e32231] group-hover:bg-[#730912]/20 transition-colors shrink-0">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                {data.contact.whatsapp}
              </a>
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e32231]/10 text-[#e32231] group-hover:bg-[#730912]/20 transition-colors shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                {data.contact.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white transition-colors group">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#730912]/10 text-[#e32231] shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                {data.contact.address}
              </div>
            </div>
          </div>

          {/* Nav Sections */}
          {data.sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-xs font-bold  tracking-[0.15em] text-[#e32231]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white hover:translate-x-0.5 inline-block"
                      {...(link.isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2d2d]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Copyright */}
            <p className="text-xs text-white/30 text-center sm:text-left">
              {data.copyright}
            </p>

            {/* Social + Actions */}
            <div className="flex items-center gap-4">
              {/* Google Review */}
              <a
                href={data.googleReviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-[#2a2d2d] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-[#730912]/50 hover:text-white"
              >
                <Star className="h-3 w-3 text-yellow-400" />
                <span>Yorum Yap</span>
              </a>

              <div className="flex items-center gap-2">
                {data.socialLinks.map((social) => (
                  <a
                    key={`footer-social-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2d2d] text-white/40 transition-colors hover:border-[#730912]/50 hover:text-white hover:bg-[#730912]/10"
                  >
                    <img
                      src={social.logoUrl}
                      className="h-4 w-4 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
