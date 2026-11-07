/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FoodBridgeProvider, useFoodBridge } from './context/FoodBridgeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedDonations } from './components/FeaturedDonations';
import { SuccessStories } from './components/SuccessStories';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CreateDonationModal } from './components/CreateDonationModal';
import { WeddingEmergencyModal } from './components/WeddingEmergencyModal';
import { DonationDetailModal } from './components/DonationDetailModal';
import { LiveRouteTrackerModal } from './components/LiveRouteTrackerModal';
import { AnnadanamCertificateModal } from './components/AnnadanamCertificateModal';
import { HandiReturnTracker } from './components/HandiReturnTracker';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { NgoDashboard } from './components/NgoDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { DonorDashboard } from './components/DonorDashboard';
import { AdminDashboard } from './components/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { activeTab, currentUser, setActiveTab, setIsCreateModalOpen } = useFoodBridge();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Role Context Bar */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-emerald-200">
              Active Session:
            </span>
            <span>
              {currentUser.name} ({currentUser.organizationName || currentUser.role.toUpperCase()})
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-100">
            <span>Viewing as: <strong className="capitalize text-white">{currentUser.role}</strong></span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                if (currentUser.role === 'donor') setActiveTab('donor_dash');
                else if (currentUser.role === 'ngo') setActiveTab('ngo_dash');
                else if (currentUser.role === 'volunteer') setActiveTab('volunteer_dash');
                else if (currentUser.role === 'admin') setActiveTab('admin_dash');
              }}
              className="underline hover:text-white font-medium"
            >
              Open {currentUser.role.toUpperCase()} Workspace
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <HowItWorks />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <HandiReturnTracker />
            </div>
            <FeaturedDonations limit={6} />
            <SuccessStories />
            <FaqSection />
          </>
        )}

        {activeTab === 'explore' && (
          <div className="py-8 space-y-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <HandiReturnTracker />
            </div>
            <FeaturedDonations showHeader={true} />
          </div>
        )}

        {activeTab === 'how_it_works' && (
          <div className="py-8">
            <HowItWorks />
            <FaqSection />
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="py-8">
            <SuccessStories />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="py-8">
            <FaqSection />
          </div>
        )}

        {activeTab === 'donor_dash' && <DonorDashboard />}
        {activeTab === 'ngo_dash' && <NgoDashboard />}
        {activeTab === 'volunteer_dash' && <VolunteerDashboard />}
        {activeTab === 'admin_dash' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <CreateDonationModal />
      <WeddingEmergencyModal />
      <DonationDetailModal />
      <LiveRouteTrackerModal />
      <AnnadanamCertificateModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <FoodBridgeProvider>
      <MainAppContent />
    </FoodBridgeProvider>
  );
}
