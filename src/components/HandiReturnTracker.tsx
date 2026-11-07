import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, Building2, Package } from 'lucide-react';

export const HandiReturnTracker: React.FC = () => {
  const { donations, markHandiReturned, currentUser } = useFoodBridge();

  const handiDonations = donations.filter(
    (d) => d.vesselReturnRequired && d.handiVesselLedger
  );

  if (handiDonations.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Stainless Steel Handi (Vessel) Custody Ledger</span>
              <span className="text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded">
                Mandapam Care
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Community trust ledger ensuring catering vessels are sanitized and returned to Kalyana Mandapams within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-stone-100 dark:divide-slate-800">
        {handiDonations.map((item) => {
          const ledger = item.handiVesselLedger!;
          const isReturned = ledger.isReturnedToMandapam;

          return (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isReturned
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                  }`}>
                    {isReturned ? 'Returned & Cleared' : 'In Custody with Ashram'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Mandapam: <strong>{item.donorOrg}</strong> ({item.city}) → Receiver: <strong>{item.requestedBy?.ngoName || 'Ashram'}</strong>
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                  <span>Containers: {ledger.itemsIncluded.join(', ')}</span>
                  <span>·</span>
                  <span>Deadline: {ledger.returnDeadlineDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isReturned ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Receipt Acknowledged</span>
                  </span>
                ) : (
                  <button
                    onClick={() => markHandiReturned(item.id)}
                    className="px-3.5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Handis Returned</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
