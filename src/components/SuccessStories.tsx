import React from 'react';
import { SUCCESS_STORIES, PARTNER_LOGOS } from '../data/mockData';
import { Quote, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const SuccessStories: React.FC = () => {
  return (
    <section id="stories" className="py-20 bg-stone-50 dark:bg-slate-900/60 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Community Impact & Dignity
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Real Stories of Rescued Food & Hope
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Behind every rescued meal is a chef who cared, a volunteer who drove across town, and a child or elder who went to sleep nourished.
          </p>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Asset */}
                <div className="relative h-48 w-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    +{story.mealsShared.toLocaleString()} Meals Served
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{story.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{story.donorOrg}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Quote */}
                  <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80">
                    <p className="text-xs italic text-slate-700 dark:text-slate-300 relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-amber-400 before:rounded-full">
                      "{story.quote}"
                    </p>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white mt-2">
                      — {story.author}, <span className="text-slate-500 font-normal">{story.authorRole}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Strip */}
        <div className="pt-10 border-t border-stone-200 dark:border-slate-800">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by Humanitarian Shelters, Hotels & Supermarkets
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {PARTNER_LOGOS.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-1 shadow-xs"
              >
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400">{partner.category}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
