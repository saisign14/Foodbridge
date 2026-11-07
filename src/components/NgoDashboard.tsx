import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { FoodDonation } from '../types';
import { FeaturedDonations } from './FeaturedDonations';
import { HandiReturnTracker } from './HandiReturnTracker';
import {
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Star,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Building,
  Navigation,
  Award,
} from 'lucide-react';

export const NgoDashboard: React.FC = () => {
  const {
    donations,
    currentUser,
    setSelectedDonation,
    updateUserProfile,
    openLiveTracking,
    openCertificate,
  } = useFoodBridge();

  const [activeTab, setActiveTab] = useState<'requests' | 'browse' | 'history' | 'profile'>('requests');
  const [orgCapacity, setOrgCapacity] = useState(currentUser.stats?.mealsShared || 150);

  // Filter donations relevant to this NGO
  const myRequests = donations.filter(
    (d) => d.requestedBy?.ngoId === currentUser.id || d.status === 'Requested' || d.status === 'Approved' || d.status === 'Assigned to Volunteer' || d.status === 'Picked Up'
  );

  const completedHistory = donations.filter(
    (d) =>
      (d.status === 'Completed' || d.status === 'Delivered') &&
      (d.requestedBy?.ngoId === currentUser.id ||
        d.requestedBy?.ngoName?.includes('Amma Vodi') ||
        d.requestedBy?.ngoName?.includes('Sneha Nilayam') ||
        d.requestedBy?.ngoName?.includes('Vrudhashramam'))
  );

  return (
    <div className="py-10 bg-stone-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* NGO Header Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
              <Building className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentUser.organizationName || 'Amma Vodi Orphanage & Old Age Home, Vijayawada'}
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified NGO
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                <span>Coordinator: {currentUser.name}</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser.address}, {currentUser.city}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
            <div>
              <p className="text-slate-400">Total Meals Received</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                4,620+
              </p>
            </div>
            <div>
              <p className="text-slate-400">Active Requests</p>
              <p className="text-2xl font-extrabold text-amber-500 font-mono tabular-nums">
                {myRequests.filter((d) => ['Requested', 'Approved', 'Assigned to Volunteer', 'Picked Up'].includes(d.status)).length}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'requests'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Active Deliveries & Requests ({myRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'browse'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Browse Available Food Nearby
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'history'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Received Food History & Feedback
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === 'profile'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-900'
            }`}
          >
            Organization Profile
          </button>
        </div>

        {/* TAB 1: ACTIVE REQUESTS & LIVE TRACKING */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <HandiReturnTracker />

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Live Food Requests & In-Transit Tracking
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Monitor donor approvals, assigned courier volunteer dispatch, and estimated delivery times.
                </p>
              </div>
            </div>

            {myRequests.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800">
                <HeartHandshake className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No active food requests
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Browse fresh surplus food listings nearby and submit requests for your community beneficiaries.
                </p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl"
                >
                  Browse Available Food
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {myRequests.map((req) => {
                  const isAssigned = !!req.assignedVolunteer;
                  const isPickedUp = req.status === 'Picked Up';
                  const isDelivered = req.status === 'Delivered';

                  return (
                    <div
                      key={req.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6"
                    >
                      {/* Top Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={req.imageUrl}
                            alt={req.title}
                            className="w-16 h-16 rounded-2xl object-cover shrink-0"
                          />
                          <div>
                            <span className="text-[11px] font-semibold text-emerald-600 uppercase">
                              {req.category} · {req.dietaryType}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {req.title}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Donor: <span className="font-semibold text-slate-700 dark:text-slate-300">{req.donorOrg}</span> ({req.city})
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => openLiveTracking(req)}
                            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Live GPS Radar & Temp</span>
                          </button>
                          <button
                            onClick={() => setSelectedDonation(req)}
                            className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* SIMULATED LIVE DELIVERY STAGES TRACKER */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          Live Journey Status
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                          
                          {/* Step 1: Requested */}
                          <div className={`p-3.5 rounded-2xl border transition-colors ${
                            req.status === 'Requested'
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 font-bold'
                              : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700 text-slate-500'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span>1. Request Sent</span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                            <p className="text-[11px] font-normal text-slate-500">
                              Awaiting Donor Confirmation
                            </p>
                          </div>

                          {/* Step 2: Approved */}
                          <div className={`p-3.5 rounded-2xl border transition-colors ${
                            req.status === 'Approved'
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200 font-bold'
                              : req.status === 'Requested'
                              ? 'bg-stone-50 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800 text-slate-400'
                              : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700 text-slate-500'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span>2. Donor Approved</span>
                              {['Approved', 'Assigned to Volunteer', 'Picked Up', 'Delivered', 'Completed'].includes(req.status) && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <p className="text-[11px] font-normal text-slate-500">
                              Food reserved for your shelter
                            </p>
                          </div>

                          {/* Step 3: Courier En Route */}
                          <div className={`p-3.5 rounded-2xl border transition-colors ${
                            req.status === 'Assigned to Volunteer' || req.status === 'Picked Up'
                              ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-900 dark:text-indigo-200 font-bold'
                              : ['Delivered', 'Completed'].includes(req.status)
                              ? 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700 text-slate-500'
                              : 'bg-stone-50 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800 text-slate-400'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span>3. Courier In Transit</span>
                              <Truck className="w-4 h-4 text-indigo-600" />
                            </div>
                            <p className="text-[11px] font-normal text-slate-500">
                              {req.assignedVolunteer ? req.assignedVolunteer.volunteerName : 'Matching local driver...'}
                            </p>
                          </div>

                          {/* Step 4: Delivered */}
                          <div className={`p-3.5 rounded-2xl border transition-colors ${
                            ['Delivered', 'Completed'].includes(req.status)
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-stone-50 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800 text-slate-400'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span>4. Handover at Shelter</span>
                              {['Delivered', 'Completed'].includes(req.status) && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <p className="text-[11px] font-normal text-slate-500">
                              Safe meals served
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Extra info for pickup */}
                      <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span>Feeds: <strong className="text-slate-900 dark:text-white">{req.servingsCount} persons</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span>Pickup Time Window: <strong className="text-slate-900 dark:text-white">{req.pickupTimeWindow}</strong></span>
                        </div>
                        {req.status === 'Delivered' && (
                          <button
                            onClick={() => setSelectedDonation(req)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                          >
                            Submit Feedback & Rating
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BROWSE SURPLUS FOOD */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <FeaturedDonations showHeader={false} />
          </div>
        )}

        {/* TAB 3: RECEIVED HISTORY & FEEDBACK */}
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Received Food History & Feedback Log
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Past surplus foods safely collected, quality verified, and served to community beneficiaries.
              </p>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-slate-800">
              {completedHistory.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        From {item.donorOrg} · {item.quantity} · Serves {item.servingsCount}
                      </p>
                      {item.feedback && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 italic mt-0.5">
                          "{item.feedback.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400">
                      {new Date(item.prepTime).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => openCertificate(item)}
                      className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 font-bold flex items-center gap-1 hover:bg-amber-100"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Certificate</span>
                    </button>
                    <button
                      onClick={() => setSelectedDonation(item)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-50"
                    >
                      Audit Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORGANIZATION PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                NGO Organization Profile & Kitchen Logistics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Keep your community shelter details up-to-date for donor verification and volunteer dispatch.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={currentUser.organizationName || ''}
                  onChange={(e) => updateUserProfile({ organizationName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => updateUserProfile({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="text"
                    value={currentUser.phone}
                    onChange={(e) => updateUserProfile({ phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Shelter / Kitchen Street Address
                </label>
                <input
                  type="text"
                  value={currentUser.address}
                  onChange={(e) => updateUserProfile({ address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Andhra City / District
                </label>
                <select
                  value={currentUser.city}
                  onChange={(e) => updateUserProfile({ city: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  {['Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati', 'Rajahmundry', 'Kakinada', 'Nellore', 'Kurnool', 'Anantapur'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <span className="font-bold">Verification Status: Verified 501(c)(3) Community Partner</span>
                <p className="text-[11px] mt-0.5">
                  Your organization is authorized to receive commercial food surplus under standard hygiene guidelines.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
