import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { UserRole, AndhraCity } from '../types';
import { ANDHRA_CITIES } from '../data/mockData';
import {
  Sun,
  Moon,
  Utensils,
  HeartHandshake,
  ShieldCheck,
  Truck,
  ChevronDown,
  Plus,
  LogIn,
  MapPin,
  BellRing,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    activeTab,
    setActiveTab,
    selectedCity,
    setSelectedCity,
    isDarkMode,
    toggleDarkMode,
    setIsCreateModalOpen,
    setIsEmergencyModalOpen,
    setIsAuthModalOpen,
    setAuthMode,
  } = useFoodBridge();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roles: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'donor', label: 'Donor (Kalyana Mandapam / Hotel)', icon: Utensils, color: 'text-emerald-600' },
    { id: 'ngo', label: 'NGO / Ashramam (Amma Vodi)', icon: HeartHandshake, color: 'text-amber-600' },
    { id: 'volunteer', label: 'Volunteer Courier (AP Seva)', icon: Truck, color: 'text-blue-600' },
    { id: 'admin', label: 'AP Operations Desk', icon: ShieldCheck, color: 'text-purple-600' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'donor') setActiveTab('donor_dash');
    else if (role === 'ngo') setActiveTab('ngo_dash');
    else if (role === 'volunteer') setActiveTab('volunteer_dash');
    else if (role === 'admin') setActiveTab('admin_dash');
  };

  const getDashboardTabForRole = (role: UserRole) => {
    switch (role) {
      case 'donor':
        return 'donor_dash';
      case 'ngo':
        return 'ngo_dash';
      case 'volunteer':
        return 'volunteer_dash';
      case 'admin':
        return 'admin_dash';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single brand wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Food<span className="text-emerald-600 dark:text-emerald-400">Bridge</span>
            <span className="text-amber-500 text-xs font-mono ml-1 font-semibold uppercase">AP</span>
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeTab === 'explore' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Andhra Food Catalog
          </button>
          <button
            onClick={() => setActiveTab('how_it_works')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeTab === 'how_it_works' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeTab === 'stories' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            Annadanam Stories
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              activeTab === 'faq' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
            }`}
          >
            FAQ
          </button>

          {/* Role-specific dashboard direct tab */}
          <button
            onClick={() => setActiveTab(getDashboardTabForRole(currentUser.role))}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab.includes('_dash')
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            {currentUser.role === 'donor' && 'Mandapam Hub'}
            {currentUser.role === 'ngo' && 'Ashramam Portal'}
            {currentUser.role === 'volunteer' && 'Courier Fleet'}
            {currentUser.role === 'admin' && 'AP Mission Console'}
          </button>
        </nav>

        {/* Zone 3: Actions (City Selector, SOS, Role Switcher, Primary CTA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Andhra City Filter Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 text-slate-700 dark:text-slate-200"
              title="Filter by Andhra Pradesh district / city"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[110px]">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCityDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsCityDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-stone-100 dark:border-slate-800">
                    Filter by AP City:
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCity('All Andhra Pradesh');
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs ${
                      selectedCity === 'All Andhra Pradesh' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-stone-50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    All Andhra Pradesh
                  </button>
                  {ANDHRA_CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCity(c);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs ${
                        selectedCity === c ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-stone-50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Wedding Emergency SOS Broadcast Shortcut */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 border border-amber-300 dark:border-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Kalyana Mandapam emergency food alert"
          >
            <BellRing className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Wedding SOS</span>
          </button>

          {/* Theme Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Interactive Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="capitalize font-semibold truncate max-w-[85px]">{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsRoleDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-stone-100 dark:border-slate-800 text-xs text-slate-500">
                    Switch Active Andhra Persona:
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isCurrent = currentUser.role === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-xs transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${r.color} shrink-0`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{r.label}</p>
                          <p className="text-[10px] text-slate-400">
                            {r.id === 'donor' && 'Srinivas Varma (Vijayawada)'}
                            {r.id === 'ngo' && 'Amma Vodi Ashram (Vijayawada)'}
                            {r.id === 'volunteer' && 'Kalyan (Visakhapatnam)'}
                            {r.id === 'admin' && 'Dr. Ramakrishna (Amaravati)'}
                          </p>
                        </div>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                        )}
                      </button>
                    );
                  })}
                  <div className="border-t border-stone-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-600 hover:bg-stone-50"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Sign in with custom AP account
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Primary Action Button */}
          {currentUser.role === 'donor' ? (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Donate Food</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab(getDashboardTabForRole(currentUser.role))}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm whitespace-nowrap shrink-0"
            >
              Dashboard
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 text-xs">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 text-slate-700 dark:text-slate-200"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('explore');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 text-slate-700 dark:text-slate-200"
            >
              Andhra Food Catalog
            </button>
            <button
              onClick={() => {
                setIsEmergencyModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 font-bold text-amber-600 flex items-center gap-1.5"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Broadcast Wedding Emergency SOS</span>
            </button>
            <button
              onClick={() => {
                setActiveTab(getDashboardTabForRole(currentUser.role));
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 font-bold text-emerald-600"
            >
              Open {currentUser.role.toUpperCase()} Workspace
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
