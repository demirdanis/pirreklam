import { Award, Factory, TrendingUp, Users } from 'lucide-react';
import type {
  KurumsalData,
  KurumsalFeature,
  KurumsalStat,
} from './kurumsal.types';

interface KurumsalProps {
  data: KurumsalData;
}

const iconMap = {
  award: Award,
  factory: Factory,
  users: Users,
  trending: TrendingUp,
};

export default function Kurumsal({ data }: KurumsalProps) {
  return (
    <section id="kurumsal" className="bg-white py-4 md:py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#16223f] sm:text-4xl">
            {data.title}
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#e32231]" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            {data.paragraphs.map((p: string, i: number) => (
              <p
                key={i}
                className="text-text-secondary-dark leading-relaxed text-base"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.features.map((feature: KurumsalFeature) => {
              const Icon =
                iconMap[feature.icon as keyof typeof iconMap] ?? Award;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-surface-secondary-light-b bg-white p-2 md:p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e32231]/10 group-hover:bg-[#e32231] transition-colors">
                      <Icon className="h-5 w-5 text-[#e32231] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#16223f]">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary-dark">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {data.stats.map((stat: KurumsalStat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-surface-secondary-light-b bg-surface-secondary-light-a  p-2 md:p-4 flex items-center gap-3"
            >
              <div>
                <p className="text-xl font-bold text-[#e32231]">{stat.value}</p>
                <p className="mt-0.5 text-xs text-text-secondary-dark font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
