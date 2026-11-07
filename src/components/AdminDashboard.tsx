import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  ShieldCheck,
  Users,
  Utensils,
  Truck,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { donations, impactStats, setSelectedDonation, addToast } = useFoodBridge();

  const [auditFilter, setAuditFilter] = useState('all');

  const pendingVerifications = [
    {
      id: 'ver-1',
      name: 'Sri Sarada Niketan Orphanage & Girls Home, Guntur',
      type: 'Registered NGO Trust',
      taxId: 'AP Trust Reg: 248/2019',
      submittedDate: 'Yesterday',
      status: 'Pending',
    },
    {
      id: 'ver-2',
      name: 'Ravi Teja (Delivery Auto Courier, Vijayawada)',
      type: 'AP Volunteer Courier',
      driverLicense: 'AP16-DL-***4892 (Clean Record)',
      submittedDate: 'Today',
      status: 'Pending',
    },
  ];

  const handleApprovePartner = (name: string) => {
    addToast('Partner Verified', `${name} has been approved and granted verified credentials.`, 'success');
  };

  return (
    <div className="py-10 bg-stone-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Platform Operations & Safety Console
                </h1>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                  Superadmin Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Food Safety Auditing, Non-Profit Verification & Regional Dispatch Oversight
              </p>
            </div>
          </div>
        </div>

        {/* Global Impact & Health Metrics (tabular figures) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Rescued Food Weight</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {impactStats.totalFoodDonatedKg.toLocaleString()} kg
            </p>
            <p className="text-xs text-emerald-600 font-medium">99.4% safe temperature transit</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Beneficiary Meals</span>
            <p className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
              {impactStats.mealsServed.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Across 94 community centers</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Courier Fleet</span>
            <p className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">
              {impactStats.activeVolunteers} Couriers
            </p>
            <p className="text-xs text-slate-500">Avg transit time: 38 mins</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-stone-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">CO2 Emissions Saved</span>
            <p className="text-2xl font-extrabold text-amber-500 font-mono tabular-nums">
              {impactStats.carbonSavedKg.toLocaleString()} kg
            </p>
            <p className="text-xs text-slate-500">Equivalent to 2,100 tree years</p>
          </div>
        </div>

        {/* Verification Queue & Safety Audit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pending Verifications */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Partner NGO & Volunteer Verifications</span>
              </h3>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                2 Pending
              </span>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-slate-800">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-slate-500">{item.type} · {item.taxId || item.driverLicense}</p>
                    <span className="text-[10px] text-slate-400">Submitted {item.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprovePartner(item.name)}
                      className="px-3 py-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Activity Feed */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>Live Platform Handover Log</span>
              </h3>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto text-xs">
              {donations.map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{d.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {d.donorOrg} → {d.status} (PIN: {d.handoverPin})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDonation(d)}
                    className="text-emerald-600 font-semibold shrink-0 ml-2"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
