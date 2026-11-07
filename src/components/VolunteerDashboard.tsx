import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { FoodDonation } from '../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Navigation,
  ChevronRight,
  Flame,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const {
    donations,
    currentUser,
    setSelectedDonation,
    acceptVolunteerMission,
    advanceVolunteerStep,
    addToast,
    openLiveTracking,
  } = useFoodBridge();

  const [activeTab, setActiveTab] = useState<'active_mission' | 'available_jobs' | 'stats' | 'profile'>('active_mission');
  const [isAvailableForDispatch, setIsAvailableForDispatch] = useState(true);
  const [enteredPin, setEnteredPin] = useState('');

  // Active missions where this volunteer is assigned
  const activeMissions = donations.filter(
    (d) =>
      d.assignedVolunteer?.volunteerId === currentUser.id &&
      ['Assigned to Volunteer', 'Picked Up'].includes(d.status)
  );

  // Available jobs in need of a courier: approved donations without a courier yet
  const availableJobs = donations.filter(
    (d) => d.status === 'Approved' && !d.assignedVolunteer
  );

  // Completed delivery missions
  const pastDeliveries = donations.filter(
    (d) =>
      ['Delivered', 'Completed'].includes(d.status) &&
      (d.assignedVolunteer?.volunteerId === currentUser.id ||
        d.assignedVolunteer?.volunteerName?.includes('Kalyan') ||
        d.assignedVolunteer?.volunteerName?.includes('David'))
  );

  const currentMission = activeMissions[0]; // Primary focused mission

  const handleVerifyPinAndPickup = (donationId: string) => {
    if (!enteredPin || enteredPin.length !== 4) {
      addToast('PIN Required', 'Please enter the 4-digit verification code from the donor chef/manager.', 'warning');
      return;
    }
    const success = advanceVolunteerStep(donationId, 'in_transit_to_ngo', enteredPin);
    if (success) {
      setEnteredPin('');
    }
  };

  return (
    <div className="py-10 bg-stone-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Volunteer Header Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Courier Certified
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                <span>Fleet: {currentUser.organizationName || 'GreenWheels Courier Network'}</span>
                <span aria-hidden="true">·</span>
                <span>Vehicle: Electric Cargo Van / Insulated Transport</span>
              </p>
            </div>
          </div>

          {/* Availability Toggle & Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 border-t md:border-t-0 md:border-l border-stone-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
            <div>
              <p className="text-slate-400">Total Missions Completed</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                56
              </p>
            </div>
            <div>
              <p className="text-slate-400">Volunteer Hours</p>
              <p className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">
                84h
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-slate-400 mb-1">Dispatch Status</p>
              <button
                onClick={() => {
                  setIsAvailableForDispatch(!isAvailableForDispatch);
                  addToast(
                    isAvailableForDispatch ? 'Dispatch Paused' : 'Ready for Missions',
                    isAvailableForDispatch ? 'You are marked off-duty.' : 'You will receive nearby pickup alerts.',
                    'info'
                  );
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isAvailableForDispatch
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-stone-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-stone-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isAvailableForDispatch ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {isAvailableForDispatch ? 'On-Duty · Ready' : 'Off-Duty'}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('active_mission')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'active_mission'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Active Mission Workspace ({activeMissions.length})
          </button>
          <button
            onClick={() => setActiveTab('available_jobs')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'available_jobs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Open Rescue Missions in City ({availableJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'stats'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Impact Achievements & Badges
          </button>
        </div>

        {/* TAB 1: ACTIVE MISSION WORKSPACE */}
        {activeTab === 'active_mission' && (
          <div className="space-y-6">
            {!currentMission ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800 space-y-3">
                <Truck className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No active courier delivery in progress
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Local shelters are waiting for food! Check the open rescue missions in your city to accept a dispatch.
                </p>
                <button
                  onClick={() => setActiveTab('available_jobs')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
                >
                  View Open Missions ({availableJobs.length})
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-8">
                
                {/* Mission Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentMission.imageUrl}
                      alt={currentMission.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
                        <span>LIVE MISSION #{currentMission.id.toUpperCase()}</span>
                        <span aria-hidden="true">·</span>
                        <span>{currentMission.category}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {currentMission.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Quantity: <strong className="text-slate-800 dark:text-slate-200">{currentMission.quantity}</strong> (Serves ~{currentMission.servingsCount} people)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => openLiveTracking(currentMission)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Launch GPS Radar & Telemetry</span>
                    </button>
                    <button
                      onClick={() => setSelectedDonation(currentMission)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-50"
                    >
                      View Full Manifest
                    </button>
                  </div>
                </div>

                {/* INTERACTIVE STEP-BY-STEP MISSION ROUTE */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Interactive Delivery Sequence
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Pick-Up Section (Donor) */}
                    <div className={`p-5 rounded-2xl border transition-all ${
                      currentMission.status === 'Assigned to Volunteer'
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-400 ring-2 ring-blue-500/20'
                        : 'bg-stone-50 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                          <Navigation className="w-4 h-4" />
                          Step 1: Pick Up from Donor
                        </span>
                        {currentMission.status === 'Picked Up' && (
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {currentMission.donorOrg} ({currentMission.donorName})
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{currentMission.pickupAddress}, {currentMission.city}</span>
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Landmark: {currentMission.landmark}
                        </p>
                        <p className="text-slate-500 text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {currentMission.donorPhone}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-stone-200 dark:border-slate-700 mt-2">
                          <strong>Note:</strong> {currentMission.specialInstructions || 'Ring back kitchen bell.'}
                        </p>
                      </div>

                      {/* Pick up Actions */}
                      {currentMission.status === 'Assigned to Volunteer' && (
                        <div className="mt-4 pt-4 border-t border-blue-200/60 dark:border-blue-800/60 space-y-3">
                          {currentMission.assignedVolunteer?.currentStep === 'heading_to_donor' ? (
                            <button
                              onClick={() => advanceVolunteerStep(currentMission.id, 'at_pickup')}
                              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                              <span>I Have Arrived at Donor Kitchen</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Verify Donor 4-Digit Handover PIN:
                              </p>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  maxLength={4}
                                  placeholder="e.g. 4821"
                                  value={enteredPin}
                                  onChange={(e) => setEnteredPin(e.target.value)}
                                  className="w-32 px-3 py-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-xl text-center focus:ring-2 focus:ring-emerald-500"
                                />
                                <button
                                  onClick={() => handleVerifyPinAndPickup(currentMission.id)}
                                  className="flex-1 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
                                >
                                  Verify PIN & Confirm Pickup
                                </button>
                              </div>
                              <p className="text-[10px] text-slate-500">
                                (Ask chef/manager for code, or test with PIN: <strong className="font-mono text-emerald-600">{currentMission.handoverPin}</strong>)
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Drop-Off Section (NGO Shelter) */}
                    <div className={`p-5 rounded-2xl border transition-all ${
                      currentMission.status === 'Picked Up'
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-stone-50 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                          <Truck className="w-4 h-4" />
                          Step 2: Deliver to Shelter
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Destination
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {currentMission.requestedBy?.ngoName || 'Amma Vodi Ashram & Destitute Home'}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Ashram Campus Road, {currentMission.city}, Andhra Pradesh</span>
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Beneficiaries Waiting: <strong className="text-emerald-600">{currentMission.requestedBy?.beneficiaryCount || currentMission.servingsCount} persons</strong>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-stone-200 dark:border-slate-700 mt-2">
                          <strong>NGO Note:</strong> "{currentMission.requestedBy?.requestNotes || 'Food needed for tonight dinner service.'}"
                        </p>
                      </div>

                      {/* Drop-off Actions */}
                      {currentMission.status === 'Picked Up' && (
                        <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/60 space-y-3">
                          <button
                            onClick={() => advanceVolunteerStep(currentMission.id, 'delivered')}
                            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirm Successful Handover to Shelter</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: AVAILABLE JOBS IN NEED OF COURIER */}
        {activeTab === 'available_jobs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Open Rescue Missions Waiting for Couriers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                These approved donations have been requested by verified shelters and are ready for pickup.
              </p>
            </div>

            {availableJobs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  All current donations have couriers assigned!
                </h3>
                <p className="text-xs text-slate-500">
                  Great job! You're on standby. New surplus notifications appear in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-emerald-600">{job.category}</span>
                        <span>{job.dietaryType}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>Pickup: <strong>{job.donorOrg}</strong> ({job.pickupAddress})</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Window: {job.pickupTimeWindow}</span>
                        </p>
                        <p className="text-xs font-semibold text-emerald-600">
                          Destination: {job.requestedBy?.ngoName || 'Local Shelter'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedDonation(job)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                      >
                        Inspect Details
                      </button>
                      <button
                        onClick={() => acceptVolunteerMission(job.id)}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Accept Mission</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMPACT STATS & BADGES */}
        {activeTab === 'stats' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Volunteer Badges & Verified Community Service Hours
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official certificate-ready log of your food rescue deliveries and carbon footprint contributions.
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 mx-auto flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                  Master Courier
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  Completed 50+ on-time delivery rescue missions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Food Safety Certified
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Passed hot/cold-chain temperature compliance checks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 mx-auto flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">
                  5,000+ Meals Delivered
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  Nourished over 5,000 community members in need.
                </p>
              </div>
            </div>

            {/* Past Delivery Records */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Completed Courier Delivery Archive
              </h3>
              <div className="divide-y divide-stone-100 dark:divide-slate-800 border-t border-stone-200 dark:border-slate-800">
                {pastDeliveries.map((p) => (
                  <div key={p.id} className="py-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{p.title}</p>
                      <p className="text-slate-500">
                        {p.donorOrg} → {p.requestedBy?.ngoName} ({p.quantity})
                      </p>
                    </div>
                    <span className="text-emerald-600 font-semibold font-mono">
                      Safe Handover Completed
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
