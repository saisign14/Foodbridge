import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { X, Award, Printer, Share2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AnnadanamCertificateModal: React.FC = () => {
  const { isCertificateModalOpen, setIsCertificateModalOpen, certificateDonation, addToast } = useFoodBridge();

  if (!isCertificateModalOpen || !certificateDonation) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = certificateDonation.certificateId || `AP-SEVA-2026-${certificateDonation.id.slice(-4)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 flex flex-col">
        
        {/* Modal Controls */}
        <div className="p-4 bg-stone-100 dark:bg-slate-800/80 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Official Annadanam Seva Certificate (అన్నదాన సేవా ప్రశంసా పత్రం)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 rounded-lg hover:bg-stone-50 flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={() => setIsCertificateModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CARD */}
        <div className="p-8 sm:p-12 bg-amber-50/40 dark:bg-slate-950 text-slate-900 dark:text-white relative border-8 border-double border-amber-500/40 m-4 rounded-2xl print:m-0 print:border-4">
          
          {/* Subtle Watermark emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-600" />
          </div>

          <div className="relative text-center space-y-6">
            
            {/* Top Emblem */}
            <div className="space-y-1">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-emerald-600 text-white flex items-center justify-center shadow-md">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mt-2">
                FoodBridge Andhra Pradesh Community Mission
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-950 dark:text-amber-100 font-serif">
                Certificate of Annadanam Appreciation
              </h1>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                అన్నదాతా సుఖీభవ · ఆహారం పరబ్రహ్మ స్వరూపం
              </p>
            </div>

            {/* Recipient */}
            <div className="py-2 space-y-1">
              <p className="text-xs text-slate-500 italic">This certificate of community honor is proudly presented to</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white underline decoration-amber-500/50 decoration-2 underline-offset-8">
                {certificateDonation.donorOrg}
              </h2>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 pt-1">
                Represented by: {certificateDonation.donorName} ({certificateDonation.city}, Andhra Pradesh)
              </p>
            </div>

            {/* Impact Details */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
              In grateful recognition of your humanitarian contribution in rescuing surplus nutritious Indian meals: <strong>"{certificateDonation.title}"</strong>, nourishing <strong>{certificateDonation.servingsCount} beneficiaries</strong> at <strong>{certificateDonation.requestedBy?.ngoName || 'local ashrams'}</strong> without letting wholesome food go to waste.
            </p>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto text-center border-t border-b border-amber-200 dark:border-slate-800 py-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Meals Served</p>
                <p className="text-lg font-bold text-emerald-600 font-mono">
                  {certificateDonation.servingsCount}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Food Rescued</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                  {certificateDonation.quantity.split(' ')[0]} kg
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">CO₂ Avoided</p>
                <p className="text-lg font-bold text-amber-500 font-mono">
                  {Math.round(certificateDonation.servingsCount * 0.75)} kg
                </p>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 flex items-end justify-between px-4 text-left text-xs">
              <div>
                <p className="font-mono text-[10px] text-slate-400">Certificate ID: {certificateId}</p>
                <p className="text-[11px] text-slate-500">Date: {new Date(certificateDonation.prepTime).toLocaleDateString()}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified AP Civil Supplies Nodal Partner</span>
                </p>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-sm text-slate-700 dark:text-slate-300 font-bold border-b border-stone-400 pb-0.5">
                  Dr. V. Ramakrishna
                </div>
                <p className="text-[10px] text-slate-400">AP State Mission Director</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
