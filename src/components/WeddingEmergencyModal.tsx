import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { AndhraCity } from '../types';
import { ANDHRA_CITIES } from '../data/mockData';
import { X, Flame, AlertTriangle, BellRing, Sparkles, Building2, MapPin } from 'lucide-react';

export const WeddingEmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, broadcastWeddingEmergency, currentUser } = useFoodBridge();

  const [mandapamName, setMandapamName] = useState(currentUser.organizationName || 'Sri Rama Kalyana Mandapam');
  const [city, setCity] = useState<AndhraCity>(currentUser.city || 'Vijayawada');
  const [servings, setServings] = useState<number>(150);
  const [address, setAddress] = useState(currentUser.address || 'Near Benz Circle, MG Road');
  const [foodSummary, setFoodSummary] = useState('Hot Sona Masoori Rice, Andhra Tomato Pappu, Drumstick Sambar, Dondakaya Fry, and Curd');

  if (!isEmergencyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    broadcastWeddingEmergency(
      `${mandapamName} - ${foodSummary}`,
      city,
      servings,
      address
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* Urgent Header */}
        <div className="p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BellRing className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                  Andhra SOS
                </span>
                <span className="text-xs font-semibold">అత్యవసర ప్రకటన</span>
              </div>
              <h3 className="text-lg font-bold leading-tight">
                Kalyana Mandapam Wedding Surplus Alert
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Note */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            This immediately dispatches high-priority mobile notifications to registered orphanages, elder homes, and volunteer courier groups in your Andhra Pradesh city for pickup within 60–90 minutes.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Kalyana Mandapam / Function Hall Name *
            </label>
            <input
              type="text"
              value={mandapamName}
              onChange={(e) => setMandapamName(e.target.value)}
              placeholder="e.g. Sri Venkateswara Kalyana Vedika / A-One Convention"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Select Andhra City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as AndhraCity)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                {ANDHRA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Servings Available *
              </label>
              <input
                type="number"
                min="20"
                step="10"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Food Menu Details *
            </label>
            <textarea
              rows={2}
              value={foodSummary}
              onChange={(e) => setFoodSummary(e.target.value)}
              placeholder="e.g. 4 Handis Hot Sona Masoori Rice, Drumstick Sambar, Tomato Pappu, Gutti Vankaya, Laddu"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Exact Mandapam Address & Pickup Point *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near Benz Circle, MG Road (Enter via rear kitchen ramp)"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <BellRing className="w-4 h-4" />
              <span>Broadcast Emergency SOS Now</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
