'use client';

import { useCallback, useRef, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import type { SssItem } from '@/app/(main-layout)/_helpers/service/getSss/getSss.types';
import { cn } from '@/lib/utils';

export default function Sss({ items }: { items: SssItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = useCallback(
    (i: number) => {
      if (openIndex === i) {
        setOpenIndex(null);
        return;
      }

      const openItem = () => {
        setOpenIndex(i);
        setTimeout(() => {
          itemRefs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 200);
      };

      if (openIndex !== null) {
        setOpenIndex(null);
        setTimeout(openItem, 200);
      } else {
        openItem();
      }
    },
    [openIndex]
  );

  return (
    <div className="bg-[#f5f6f7] min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.15em] text-[#cc0636] mb-1">
            SSS
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#091530] font-alt">
            Sıkça Sorulan Sorular
          </h1>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-2">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn(
                  'rounded-xl border bg-white transition-all duration-200',
                  isOpen
                    ? 'border-[#cc0636]/30 shadow-md shadow-[#cc0636]/8'
                    : 'border-[#091530]/8'
                )}
              >
                <button
                  onClick={() => handleToggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isOpen ? 'text-[#cc0636]' : 'text-[#091530]'
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180 text-[#cc0636]' : 'text-[#091530]/30'
                    )}
                  />
                </button>

                {/* Animated answer panel */}
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-in-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      className="prose prose-sm max-w-none px-5 pb-5 text-[#091530]/55 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5 [&_strong]:text-[#091530]/80 [&_a]:text-[#cc0636] [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
