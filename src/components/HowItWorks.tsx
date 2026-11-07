import React from 'react';
import { Utensils, HeartHandshake, Truck, Smile, ShieldCheck, QrCode } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Mandapam & Kitchen Surplus Listing',
      role: 'Kalyana Mandapams, Caterers & Rythu Bazaars',
      description: 'Catering staff and chefs catalog surplus wedding feasts, Sona Masoori rice, sambar handis, or fresh produce with prep time, vessel count, and safe consumption window in under 2 minutes.',
      icon: Utensils,
      color: 'emerald',
      features: ['Wedding SOS 1-Click Broadcast', 'Steel handi custody logging', 'Secure 4-digit handover PIN'],
    },
    {
      number: '02',
      title: 'Ashrams & Shelters Match & Request',
      role: 'Verified Andhra NGOs & Orphanages',
      description: 'Local orphanages, old-age homes, and destitute ashrams in Vijayawada, Vizag, Guntur, and Tirupati browse nearby hot meals and instantly reserve food for their evening dining hall.',
      icon: HeartHandshake,
      color: 'amber',
      features: ['Beneficiary headcount matching', 'Vegetarian & Sattvic tagging', 'Direct WhatsApp coordination'],
    },
    {
      number: '03',
      title: 'Courier Live GPS Radar & Transit',
      role: 'Certified Andhra Volunteer Couriers',
      description: 'Volunteers accept missions in insulated vans/autos, verify donor PIN at mandapams, and stream real-time vector GPS radar, travel speed, and food core thermal telemetry (&gt;60°C).',
      icon: Truck,
      color: 'blue',
      features: ['Live animated vector GPS radar', 'Food core thermometer gauge', 'Auto-drive route simulation'],
    },
    {
      number: '04',
      title: 'Annadanam Seva & Vessel Return',
      role: 'Sanctified Meal Distribution',
      description: 'Hot nutritious meals are served to community beneficiaries with dignity. Donors receive an Official Annadanam Certificate of Appreciation, and stainless steel handis are logged back to the mandapam.',
      icon: Smile,
      color: 'rose',
      features: ['Annadanam Seva Certificate (PDF/Print)', 'Handi Return Ledger tracking', 'Zero food waste in Andhra Pradesh'],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-stone-50 dark:bg-slate-900/60 border-b border-stone-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            A Transparent Community Cycle
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How FoodBridge Works
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From commercial kitchens to community plates in under 90 minutes. A coordinated network engineered for maximum food safety and human dignity.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-stone-300 dark:text-slate-700">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    {step.role}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub Features */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-slate-800 space-y-1.5">
                  {step.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Food Safety Charter Banner */}
        <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Food Safety & Good Samaritan Compliance Charter
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                All food is inspected under strict hygiene protocols: temperature monitoring (&gt;60°C or &lt;4°C), mandatory allergen labeling, and safe transit windows.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0">
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>PIN Verification System Enabled</span>
          </div>
        </div>

      </div>
    </section>
  );
};
