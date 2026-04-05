import { Award, Factory, TrendingUp, Users } from 'lucide-react';
import type {
  CorporateData,
  CorporateFeature,
  CorporateStat,
} from './corporate.types';

interface CorporateProps {
  data: CorporateData;
}

const FEATURE_ICONS = [Award, Factory, Users, TrendingUp];

export default function Corporate({ data }: CorporateProps) {
  return (
    <section id="corporate" className="bg-white py-4 md:py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#16223f] sm:text-4xl">
            {data.title}
          </h2>
          <div className="mx-auto lg:mx-0 mt-4 h-1 w-16 rounded-full bg-[#cc0636]" />
        </div>

        <div className="grid gap-6 lg:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — text */}
          <div
            className="flex flex-col gap-6 text-text-secondary-dark leading-relaxed text-base prose max-w-none [&>p]:mb-0"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* Right — feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.features.map((feature: CorporateFeature, index: number) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length] ?? Award;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-surface-secondary-light-b bg-white p-2 md:p-4  transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
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
        <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {data.stats.map((stat: CorporateStat) => (
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
