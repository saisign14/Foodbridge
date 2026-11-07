import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { Utensils, Search, HeartHandshake, ArrowRight, ShieldCheck, Clock, Users, BellRing, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    impactStats,
    setIsCreateModalOpen,
    setIsEmergencyModalOpen,
    setActiveTab,
    switchRole,
    selectedCity,
  } = useFoodBridge();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-14 border-b border-stone-200 dark:border-slate-800">
      
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Paths */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mission Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>Andhra Pradesh Food Rescue Mission</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 font-bold">అన్నదాన సేవా యజ్ఞం</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-balance">
              Don't Waste Food. <br />
              <span className="text-emerald-600 dark:text-emerald-400">Share Happiness.</span>
            </h1>

            {/* Subtitle with Telugu touch */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Connecting Andhra Pradesh's Kalyana Mandapams, function halls, beach hotels, temple trusts, and Rythu Bazaars across <strong>Vijayawada, Visakhapatnam, Guntur, Tirupati, and Rajahmundry</strong> directly with local orphanages, old-age homes, and community shelters.
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  switchRole('donor');
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition-all group whitespace-nowrap shrink-0"
              >
                <Utensils className="w-4 h-4" />
                <span>Donate Food (ఆహార దానం)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('explore');
                }}
                className="flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-700/80 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Find Food in AP</span>
              </button>

              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 rounded-xl border border-amber-300 dark:border-amber-800 transition-all whitespace-nowrap shrink-0"
              >
                <BellRing className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Wedding SOS</span>
              </button>

              <button
                onClick={() => {
                  switchRole('volunteer');
                  setActiveTab('volunteer_dash');
                }}
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 whitespace-nowrap"
              >
                <HeartHandshake className="w-4 h-4 text-blue-500" />
                <span>Join Courier Seva</span>
              </button>
            </div>

            {/* Regional trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-stone-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Good Samaritan Legal Protection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Hot Sambar & Rice Thermal Transport</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-500" />
                <span>13 Districts Across Andhra Pradesh</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-slate-800 group">
              <img
                src="/src/assets/images/andhra_annadanam_hero_1793868959841.jpg"
                alt="Community volunteers serving traditional South Indian Andhra meals on banana leaves"
                className="w-full h-80 sm:h-96 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-stone-200 dark:border-slate-700/80 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Live Dispatch: Vijayawada</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      140 Wedding Meals Dispatched to Amma Vodi Ashram
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md font-bold">
                    Safe Handover
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Impact Statistics Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Food Rescued in AP
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {impactStats.totalFoodDonatedKg.toLocaleString()}+ <span className="text-lg font-normal text-slate-500">kg</span>
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Prevented from landfill spoilage
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Wholesome Meals Served
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                {impactStats.mealsServed.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                To children, elders & shelters
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Active Andhra Volunteers
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-500 dark:text-amber-400 font-mono tabular-nums">
                {impactStats.activeVolunteers.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                Auto & cargo courier couriers
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Partner Ashrams & NGOs
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {impactStats.partnerNgos.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                Across 13 AP Districts
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
