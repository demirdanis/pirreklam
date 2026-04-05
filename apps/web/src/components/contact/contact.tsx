import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import type { ContactData } from './contact.types';

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  return (
    <section
      id="contact"
      className="bg-surface-secondary-light-a py-4 md:py-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#16223f] sm:text-4xl">
            İletişim
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#cc0636]" />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left — contact cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="group flex items-start gap-4 rounded-2xl border border-surface-secondary-light-b bg-white p-2 lg:p-4 transition-shadow hover:shadow-md"
            >
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e32231]/10 group-hover:bg-[#e32231] transition-colors">
                <Phone className="h-5 w-5 text-[#e32231] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold  tracking-wider text-text-mute">
                  Telefon
                </p>
                <p className="mt-1 text-lg font-bold text-text-primary-dark">
                  {data.phone}
                </p>
                <p className="text-xs text-text-mute">
                  Türkiye&apos;nin her yerinden
                </p>
              </div>
            </a>

            <a
              href={`https://wa.me/90${data.whatsapp.replace(/\s|^0/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-surface-secondary-light-b bg-white p-2 lg:p-4 transition-shadow hover:shadow-md"
            >
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e32231]/10 group-hover:bg-[#e32231] transition-colors">
                <MessageCircle className="h-5 w-5 text-[#e32231] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold  tracking-wider text-text-mute">
                  WhatsApp
                </p>
                <p className="mt-1 text-lg font-bold text-text-primary-dark">
                  {data.whatsapp}
                </p>
                <p className="text-xs text-text-mute">
                  Hızlı sipariş için yazın
                </p>
              </div>
            </a>

            <a
              href={`mailto:${data.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-surface-secondary-light-b bg-white p-2 lg:p-4 transition-shadow hover:shadow-md"
            >
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e32231]/10 group-hover:bg-[#e32231] transition-colors">
                <Mail className="h-5 w-5 text-[#e32231] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold  tracking-wider text-text-mute">
                  E-Posta
                </p>
                <p className="mt-1 text-base font-bold text-text-primary-dark">
                  {data.email}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-surface-secondary-light-b bg-whitep-2 lg:p-4 ">
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e32231]/10">
                <MapPin className="h-5 w-5 text-[#e32231]" />
              </div>
              <div>
                <p className="text-xs font-semibold  tracking-wider text-text-mute">
                  Adres
                </p>
                <p className="mt-1 text-sm font-medium text-text-primary-dark leading-relaxed">
                  {data.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-surface-secondary-light-b bg-white p-2 lg:p-4 ">
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e32231]/10">
                <Clock className="h-5 w-5 text-[#e32231]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold  tracking-wider text-text-mute mb-2">
                  Çalışma Saatleri
                </p>
                {data.workingHours.map((wh) => (
                  <div key={wh.days} className="flex justify-between text-sm">
                    <span className="text-[#585d5d]">{wh.days}</span>
                    <span className="font-semibold text-[#16223f]">
                      {wh.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — map */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden  border border-surface-secondary-light-b min-h-60  lg:min-h-158 h-60">
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '480px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pir Reklam Konum"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
