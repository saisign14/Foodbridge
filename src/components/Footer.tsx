import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { Utensils, Heart, Phone, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useFoodBridge();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Food<span className="text-emerald-400">Bridge</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              A Community Service Project dedicated to eradicating food waste and hunger by connecting commercial kitchens directly with shelters, orphanages, and elders.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bill Emerson Good Samaritan Act Compliant</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-emerald-400 transition-colors">
                  Explore Surplus Food
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('donor_dash')} className="hover:text-emerald-400 transition-colors">
                  Restaurant & Hotel Donor Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ngo_dash')} className="hover:text-emerald-400 transition-colors">
                  NGO & Shelter Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('volunteer_dash')} className="hover:text-emerald-400 transition-colors">
                  Volunteer Courier Network
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stories')} className="hover:text-emerald-400 transition-colors">
                  Community Impact Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & Guidelines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Food Safety & Standards
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Hot Holding Standards (&gt;60°C)</li>
              <li>Cold Chain Transportation (0-4°C)</li>
              <li>Allergen Cross-Contact Protocols</li>
              <li>Volunteer Background Verification</li>
              <li>Handover PIN Authorization</li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency Food Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Emergency Food Hotline
            </h4>
            <p className="text-stone-400 text-xs">
              Immediate Kalyana Mandapam banquet surplus or Annadanam coordination:
            </p>
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-1">
              <p className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 1800 425 2929 (Toll Free AP)</span>
              </p>
              <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>annadanam@foodbridge.ap.org</span>
              </p>
            </div>
            <p className="text-[11px] text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Benz Circle, MG Road, Vijayawada, AP - 520010</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 FoodBridge. Community Service Project for Zero Hunger. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Good Samaritan Food Act</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
