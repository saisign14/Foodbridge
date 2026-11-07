import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { FoodDonation } from '../types';
import { HandiReturnTracker } from './HandiReturnTracker';
import {
  Utensils,
  Plus,
  CheckCircle2,
  Clock,
  Copy,
  Users,
  ShieldCheck,
  Building2,
  ArrowRight,
  Flame,
  Navigation,
  Award,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const {
    donations,
    currentUser,
    setIsCreateModalOpen,
    setIsEmergencyModalOpen,
    setSelectedDonation,
    approveRequest,
    cancelDonation,
    addToast,
    openLiveTracking,
    openCertificate,
  } = useFoodBridge();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter listings by current donor or demo donor
  const myListings = donations.filter(
    (d) => d.donorId === currentUser.id || d.donorOrg.includes(currentUser.organizationName || 'Horizon') || currentUser.role === 'donor'
  );

  const displayedListings = myListings.filter((d) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return ['Available', 'Requested', 'Approved', 'Assigned to Volunteer', 'Picked Up'].includes(d.status);
    if (filterStatus === 'completed') return ['Delivered', 'Completed'].includes(d.status);
    return true;
  });

  const incomingRequests = myListings.filter((d) => d.status === 'Requested');

  const copyPin = (pin: string) => {
    navigator.clipboard?.writeText(pin);
    addToast('PIN Copied', `Handover code ${pin} copied for the delivery courier.`, 'info');
  };

  return (
    <div className="py-10 bg-stone-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Donor Organization Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentUser.organizationName || 'Grand Horizon Bistro & Banquets'}
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Food Donor
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Executive Chef: {currentUser.name} · {currentUser.address}, {currentUser.city}
              </p>
            </div>
          </div>

          {/* Quick Actions & Metrics */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Total Meals Donated</p>
              <p className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
                {currentUser.stats?.mealsShared || 3850}+
              </p>
            </div>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-3 text-xs font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 hover:bg-amber-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>🚨 Wedding Emergency SOS</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>List New Surplus Food</span>
            </button>
          </div>
        </div>

        {/* Mandapam Vessel Custody Ledger */}
        <HandiReturnTracker />

        {/* Action Needed: Incoming Requests Banner */}
        {incomingRequests.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/40 rounded-3xl p-6 border border-amber-300 dark:border-amber-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Action Required ({incomingRequests.length} Pending Approval)
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Local Shelters Have Requested Food
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomingRequests.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/60 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                      Requested by: {item.requestedBy?.ngoName} (Feeds ~{item.requestedBy?.beneficiaryCount} people)
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic mt-1">
                      "{item.requestedBy?.requestNotes}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedDonation(item)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Inspect Food
                    </button>
                    <button
                      onClick={() => approveRequest(item.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Request</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listings Filter Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900'
              }`}
            >
              All Listings ({myListings.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                filterStatus === 'active'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900'
              }`}
            >
              Active / In Transit
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900'
              }`}
            >
              Delivered & Completed
            </button>
          </div>
        </div>

        {/* Donor Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-600">{item.category}</span>
                  <span className="font-mono text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                  {item.description}
                </p>

                {/* Handover PIN Display for Donor */}
                <div className="mt-4 p-3 bg-stone-50 dark:bg-slate-800/60 rounded-xl border border-stone-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Courier Handover PIN
                    </span>
                    <p className="text-base font-mono font-bold text-slate-900 dark:text-white tracking-widest">
                      {item.handoverPin}
                    </p>
                  </div>
                  <button
                    onClick={() => copyPin(item.handoverPin)}
                    className="p-1.5 text-slate-400 hover:text-slate-600"
                    title="Copy PIN"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">
                  Feeds ~{item.servingsCount} people
                </span>

                <div className="flex items-center gap-2">
                  {['Assigned to Volunteer', 'Picked Up', 'Approved', 'Requested'].includes(item.status) && (
                    <button
                      onClick={() => openLiveTracking(item)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 shadow-xs transition-colors"
                      title="Track Courier GPS"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Track GPS</span>
                    </button>
                  )}

                  {['Completed', 'Delivered'].includes(item.status) && (
                    <button
                      onClick={() => openCertificate(item)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 hover:bg-amber-200 flex items-center gap-1 shadow-xs transition-colors"
                      title="View Official Annadanam Seva Certificate"
                    >
                      <Award className="w-3 h-3 text-amber-600" />
                      <span>Certificate</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedDonation(item)}
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                  >
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
