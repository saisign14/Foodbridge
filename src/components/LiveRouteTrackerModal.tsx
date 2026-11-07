import React, { useState, useEffect } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  X,
  Navigation,
  Truck,
  MapPin,
  Clock,
  Thermometer,
  ShieldCheck,
  Phone,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  QrCode,
  Share2,
  CheckCircle2,
  Compass,
  Radio,
  Flame,
} from 'lucide-react';

export const LiveRouteTrackerModal: React.FC = () => {
  const {
    isLiveTrackingOpen,
    setIsLiveTrackingOpen,
    trackingDonation,
    updateLiveTrackingProgress,
    speakEmergencyAlert,
    shareOnWhatsApp,
    addToast,
  } = useFoodBridge();

  const [isSimulating, setIsSimulating] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Auto-drive simulation timer
  useEffect(() => {
    let interval: any;
    if (isSimulating && trackingDonation) {
      interval = setInterval(() => {
        const progress = trackingDonation.liveTracking?.routeProgressPercent || 0;
        if (progress >= 100) {
          setIsSimulating(false);
          addToast('Courier Arrived!', `The courier has arrived at ${trackingDonation.requestedBy?.ngoName || 'the shelter'}.`, 'success');
        } else {
          updateLiveTrackingProgress(trackingDonation.id, 8);
        }
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isSimulating, trackingDonation]);

  if (!isLiveTrackingOpen || !trackingDonation) return null;

  const tracking = trackingDonation.liveTracking || {
    routeProgressPercent: 35,
    etaMinutes: 14,
    distanceKm: 2.8,
    speedKmh: 30,
    foodCoreTempCelsius: 64.2,
    vehicleNumber: 'AP 16 TX 4921',
    driverCurrentLocation: 'Navigating near city junction',
    lastGpsPingTime: 'Just now',
    routeWaypoints: [
      `${trackingDonation.donorOrg} (Pickup)`,
      'City Junction Flyover',
      'Central District Road',
      `${trackingDonation.requestedBy?.ngoName || 'Ashram'} (Drop-off)`,
    ],
  };

  const progress = tracking.routeProgressPercent;
  const isSafeTemp = tracking.foodCoreTempCelsius >= 60 || tracking.foodCoreTempCelsius <= 4;

  const handleSpeakStatus = () => {
    const text = `FoodBridge Live Tracking: Courier is currently ${tracking.driverCurrentLocation}. Estimated arrival in ${tracking.etaMinutes} minutes. Food core temperature is ${tracking.foodCoreTempCelsius} degrees Celsius, within safe holding guidelines.`;
    speakEmergencyAlert(text, 'en');
  };

  // Calculate vehicle coordinates on SVG route
  // SVG path viewBox is 0 0 600 240
  // Start: (60, 180), Control1: (180, 60), Control2: (380, 200), End: (540, 70)
  const t = progress / 100;
  // Cubic Bezier interpolation
  const p0 = { x: 60, y: 170 };
  const p1 = { x: 200, y: 50 };
  const p2 = { x: 380, y: 200 };
  const p3 = { x: 530, y: 70 };

  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;

  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  const vehicleX = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
  const vehicleY = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live GPS Radar
                </span>
                <span className="text-xs text-slate-400">{trackingDonation.city}, Andhra Pradesh</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white mt-0.5">
                {trackingDonation.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakStatus}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Speak Live Status (Audio Announcement)"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => shareOnWhatsApp(trackingDonation)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Share Live Radar on WhatsApp"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => setIsLiveTrackingOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE VECTOR ROUTE MAP */}
        <div className="relative bg-slate-950 p-4 sm:p-6 overflow-hidden border-b border-slate-800">
          
          {/* Subtle Andhra River / Coast Motif */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,120 Q150,90 300,140 T600,100" fill="none" stroke="#0284c7" strokeWidth="40" />
              <path d="M0,160 Q200,200 400,160 T600,220" fill="none" stroke="#0ea5e9" strokeWidth="20" />
            </svg>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[2.6/1] max-h-72">
            <svg viewBox="0 0 600 240" className="w-full h-full">
              {/* Background Roads Grid */}
              <line x1="40" y1="60" x2="560" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="40" y1="180" x2="560" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="200" y1="20" x2="200" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="400" y1="20" x2="400" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

              {/* Inactive Base Route */}
              <path
                d="M 60,170 C 200,50 380,200 530,70"
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Active Traveled Route Glow */}
              <path
                d="M 60,170 C 200,50 380,200 530,70"
                fill="none"
                stroke="#10b981"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="600"
                strokeDashoffset={600 - (progress / 100) * 600}
                className="transition-all duration-300"
              />

              {/* Waypoint Nodes */}
              <circle cx="60" cy="170" r="12" fill="#047857" />
              <circle cx="60" cy="170" r="6" fill="#34d399" />
              <text x="60" y="205" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                {trackingDonation.donorOrg.split(' ')[0]} (Pickup)
              </text>

              <circle cx="270" cy="120" r="5" fill="#64748b" />
              <text x="270" y="105" textAnchor="middle" fill="#64748b" fontSize="9">
                Prakasam / Godavari Bridge
              </text>

              <circle cx="530" cy="70" r="14" fill="#b45309" />
              <circle cx="530" cy="70" r="7" fill="#fbbf24" />
              <text x="530" y="45" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                {trackingDonation.requestedBy?.ngoName?.split(' ')[0] || 'Ashram'} (Drop-off)
              </text>

              {/* Moving Courier Vehicle Marker */}
              <g transform={`translate(${vehicleX}, ${vehicleY})`}>
                <circle r="20" fill="#10b981" opacity="0.25" className="animate-ping" />
                <circle r="14" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                {/* Truck icon in center */}
                <path
                  d="M -6,-3 L 1,-3 L 4,0 L 6,0 L 6,4 L -6,4 Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </div>

          {/* Map Overlay HUD (Live Speed & Location Tag) */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 text-xs text-white flex items-center gap-3 shadow-lg">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Current Position</p>
              <p className="font-semibold text-emerald-300 truncate max-w-[240px]">
                {tracking.driverCurrentLocation}
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 text-xs text-white flex items-center gap-3 shadow-lg">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">Current Speed</p>
              <p className="font-mono font-extrabold text-amber-400 text-sm">
                {tracking.speedKmh} km/h
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Navigation className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Live Telemetry & Control Bar */}
        <div className="p-6 space-y-6">
          
          {/* Key Metrics Grid (tabular numbers) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* ETA */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Estimated Arrival</span>
              </span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {tracking.etaMinutes} <span className="text-sm font-normal text-slate-500">mins</span>
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">On-time delivery pace</p>
            </div>

            {/* Distance Remaining */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                <span>Distance Left</span>
              </span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {tracking.distanceKm} <span className="text-sm font-normal text-slate-500">km</span>
              </p>
              <p className="text-[11px] text-slate-500">Total Route: 4.8 km</p>
            </div>

            {/* Food Core Temperature Gauge */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                <span>Food Core Temp</span>
              </span>
              <p className="text-2xl font-extrabold text-amber-500 font-mono tabular-nums">
                {tracking.foodCoreTempCelsius}°C
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Safe Warm Zone (&gt;60°C)</span>
              </p>
            </div>

            {/* Vehicle & Courier */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-purple-500" />
                <span>Courier Fleet</span>
              </span>
              <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                {tracking.vehicleNumber}
              </p>
              <p className="text-[11px] text-slate-500">
                Courier: {trackingDonation.assignedVolunteer?.volunteerName || 'Kalyan C.'}
              </p>
            </div>

          </div>

          {/* Interactive Simulation Player & Progress Bar */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Route Completion: <span className="font-mono text-emerald-600">{progress}%</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                    isSimulating
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Simulation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Simulate Live Drive</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => updateLiveTrackingProgress(trackingDonation.id, 20)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-stone-100"
                >
                  Step (+20%)
                </button>

                <button
                  onClick={() => updateLiveTrackingProgress(trackingDonation.id, -100)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="Reset route to start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-stone-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Handover PIN & QR Code Handshake Drawer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  Digital Handover Authentication & Handis
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  Donor Handover PIN: <strong className="font-mono text-sm tracking-widest">{trackingDonation.handoverPin}</strong>
                  {trackingDonation.vesselReturnRequired && ' · Stainless Steel Handi Return Monitored'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowQrModal(true);
                addToast('QR Code Generated', 'Scan with courier camera to confirm instant custody transfer.', 'info');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm whitespace-nowrap"
            >
              Show Digital QR Handshake
            </button>
          </div>

        </div>

        {/* QR Code Popover Simulation */}
        {showQrModal && (
          <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border border-stone-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                FoodBridge Handover QR Pass
              </h3>
              <div className="w-48 h-48 mx-auto bg-stone-100 dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-emerald-500">
                <QrCode className="w-32 h-32 text-slate-800 dark:text-slate-100" />
                <span className="text-[10px] font-mono text-slate-500 mt-1">PIN: {trackingDonation.handoverPin}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Scan on pickup at {trackingDonation.donorOrg} to log custody and verify thermal temperature.
              </p>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-stone-100 dark:bg-slate-800 rounded-xl"
              >
                Close QR Code
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
