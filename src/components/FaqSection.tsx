import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Answers & Regulations
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Clear guidelines on food hygiene, donor liability, logistics, and verification.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-stone-200 dark:divide-slate-800 border-y border-stone-200 dark:border-slate-800">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-stone-100 dark:bg-slate-900 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Box */}
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Have specific cold-chain or volume logistics questions?
              </p>
              <p className="text-xs text-slate-500">
                Our food rescue coordinators are on standby 24/7.
              </p>
            </div>
          </div>
          <a
            href="mailto:safety@foodbridge.org"
            className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-xl hover:bg-stone-50 whitespace-nowrap"
          >
            Contact Safety Team
          </a>
        </div>

      </div>
    </section>
  );
};
