import React, { useState, useMemo } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { FoodCategory, DietaryType, FoodDonation, AndhraCity } from '../types';
import { ANDHRA_CITIES } from '../data/mockData';
import {
  Search,
  MapPin,
  Clock,
  Users,
  ArrowUpRight,
  Flame,
  Filter,
  Plus,
  Share2,
  BellRing,
  UtensilsCrossed,
  Navigation,
  Award,
} from 'lucide-react';

export const FeaturedDonations: React.FC<{ limit?: number; showHeader?: boolean }> = ({
  limit,
  showHeader = true,
}) => {
  const {
    donations,
    setSelectedDonation,
    setIsCreateModalOpen,
    setIsEmergencyModalOpen,
    selectedCity,
    setSelectedCity,
    switchRole,
    shareOnWhatsApp,
    openLiveTracking,
    openCertificate,
  } = useFoodBridge();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = [
    'All',
    'Kalyana Mandapam Feast',
    'Andhra Meals & Rice',
    'South Indian Tiffins',
    'Temple Prasadam & Annadanam',
    'Rythu Bazaar Fresh Produce',
    'Sweets & Bakery',
  ];

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // City filter
      if (selectedCity !== 'All Andhra Pradesh' && item.city !== selectedCity) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'All' && item.dietaryType !== selectedDietary) {
        return false;
      }
      // Status filter
      if (statusFilter === 'available' && item.status !== 'Available') {
        return false;
      }
      if (
        statusFilter === 'in_progress' &&
        !['Requested', 'Approved', 'Assigned to Volunteer', 'Picked Up'].includes(item.status)
      ) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesTelugu = item.teluguTitle?.toLowerCase().includes(query) || false;
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDonor = item.donorOrg.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query) || item.pickupAddress.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTelugu && !matchesDesc && !matchesDonor && !matchesCity) {
          return false;
        }
      }
      return true;
    });
  }, [donations, selectedCity, selectedCategory, selectedDietary, statusFilter, searchQuery]);

  const displayedDonations = limit ? filteredDonations.slice(0, limit) : filteredDonations;

  const getExpiryCountdown = (expiryIso: string) => {
    const diffMs = new Date(expiryIso).getTime() - Date.now();
    if (diffMs <= 0) return 'Expired';
    const hours = Math.floor(diffMs / (3600 * 1000));
    const minutes = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h remaining`;
    }
    if (hours === 0) return `${minutes}m remaining`;
    return `${hours}h ${minutes}m remaining`;
  };

  const getStatusBadge = (status: FoodDonation['status']) => {
    switch (status) {
      case 'Available':
        return <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Available in AP</span>;
      case 'Requested':
        return <span className="text-amber-700 dark:text-amber-300 font-semibold">Ashram Requested</span>;
      case 'Approved':
        return <span className="text-blue-700 dark:text-blue-300 font-semibold">Approved · Ready for Courier</span>;
      case 'Assigned to Volunteer':
        return <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Courier Dispatched</span>;
      case 'Picked Up':
        return <span className="text-purple-700 dark:text-purple-300 font-semibold">En Route to Ashram</span>;
      case 'Delivered':
        return <span className="text-teal-700 dark:text-teal-300 font-semibold">Delivered Safely</span>;
      case 'Completed':
        return <span className="text-stone-600 dark:text-slate-400 font-medium">Annadanam Served</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <section id="explore" className="py-16 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Surplus Food Feed · ఆంధ్రప్రదేశ్
                </span>
                <span className="text-xs font-bold text-amber-600">అన్నదానం</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Active Indian Food Donations in Andhra Pradesh
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Browse hot wedding meals, morning tiffins, and fresh Rythu Bazaar produce across Vijayawada, Vizag, Guntur, Tirupati, and beyond.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 rounded-xl transition-colors shadow-xs"
              >
                <BellRing className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Wedding Emergency SOS</span>
              </button>

              <button
                onClick={() => {
                  switchRole('donor');
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>List Food Surplus</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-stone-50 dark:bg-slate-900 rounded-3xl p-5 border border-stone-200 dark:border-slate-800 space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search food, mandapam, dish (పప్పు, బిర్యానీ), city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            {/* City Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="All Andhra Pradesh">All Andhra Pradesh</option>
                {ANDHRA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Dietary Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="All">All Diets</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Pure Sattvic (No Onion/Garlic)">Pure Sattvic (No Onion/Garlic)</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            {/* Status Segmented Buttons */}
            <div className="md:col-span-3 flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-stone-200 dark:border-slate-700">
              <button
                onClick={() => setStatusFilter('all')}
                className={`flex-1 py-1 px-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
                  statusFilter === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('available')}
                className={`flex-1 py-1 px-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
                  statusFilter === 'available'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setStatusFilter('in_progress')}
                className={`flex-1 py-1 px-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center ${
                  statusFilter === 'in_progress'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Active
              </button>
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200/80 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {displayedDonations.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 dark:bg-slate-900 rounded-3xl border border-dashed border-stone-300 dark:border-slate-800">
            <UtensilsCrossed className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No food listings found for {selectedCity}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try selecting "All Andhra Pradesh" or switching categories. You can also list a new donation from your Mandapam or Kitchen.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All Andhra Pradesh');
                setSelectedCategory('All');
                setSelectedDietary('All');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-600/30 rounded-xl hover:bg-emerald-50"
            >
              Reset City & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDonations.map((item) => {
              const countdown = getExpiryCountdown(item.expiryTime);
              const isUrgent = item.isEmergencyAlert || countdown.includes('m remaining') || countdown.includes('1h');

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDonation(item)}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Container */}
                    <div className="relative h-48 w-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Emergency / SOS tag */}
                      {item.isEmergencyAlert && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                          <BellRing className="w-3 h-3" />
                          <span>Wedding Alert</span>
                        </div>
                      )}

                      {/* City Badge */}
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{item.city}</span>
                      </div>

                      {/* Remaining Safe Hours */}
                      <div className={`absolute bottom-3 left-3 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono tabular-nums flex items-center gap-1 shadow-sm ${
                        isUrgent
                          ? 'bg-amber-500 text-white font-bold'
                          : 'bg-slate-950/75 text-white'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{countdown}</span>
                      </div>

                      {/* Servings count */}
                      <div className="absolute bottom-3 right-3 bg-emerald-600/90 text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>Feeds ~{item.servingsCount}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Unboxed category and location metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.dietaryType}</span>
                      </div>

                      {/* Telugu micro-title */}
                      {item.teluguTitle && (
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 line-clamp-1 mb-0.5">
                          {item.teluguTitle}
                        </p>
                      )}

                      <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Mandapam / Donor & Storage */}
                      <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate"><strong>{item.donorOrg}</strong>, {item.pickupAddress}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            {item.storageReq}
                          </span>
                          {item.vesselReturnRequired && (
                            <span className="text-amber-600 font-semibold">
                              Steel Handis (Return Req.)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer with Status & Action */}
                  <div className="px-5 py-3.5 bg-stone-50 dark:bg-slate-800/60 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-xs">
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Live GPS Radar trigger for active/in-transit/assigned items */}
                      {['Assigned to Volunteer', 'Picked Up', 'Approved', 'Requested'].includes(item.status) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openLiveTracking(item);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 shadow-xs transition-colors"
                          title="Open Live GPS Vector Radar"
                        >
                          <Navigation className="w-3 h-3 animate-pulse" />
                          <span>Live Radar</span>
                        </button>
                      )}

                      {/* Certificate trigger for delivered / completed items */}
                      {['Completed', 'Delivered'].includes(item.status) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCertificate(item);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 hover:bg-amber-200 flex items-center gap-1 shadow-xs transition-colors"
                          title="View Official Annadanam Seva Certificate"
                        >
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>Certificate</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareOnWhatsApp(item);
                        }}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDonation(item);
                        }}
                        className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
