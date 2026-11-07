import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodDonation, User, UserRole, DonationStatus, ImpactStats, AndhraCity } from '../types';
import { INITIAL_DONATIONS, DEMO_USERS, INITIAL_IMPACT_STATS } from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface FoodBridgeContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (updated: Partial<User>) => void;
  
  // Navigation & View
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: AndhraCity | 'All Andhra Pradesh';
  setSelectedCity: (city: AndhraCity | 'All Andhra Pradesh') => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Donations
  donations: FoodDonation[];
  createDonation: (data: Partial<FoodDonation>) => void;
  broadcastWeddingEmergency: (title: string, city: AndhraCity, servings: number, address: string) => void;
  requestFood: (donationId: string, req: { ngoId: string; ngoName: string; beneficiaryCount: number; requestNotes: string; urgency: 'Standard' | 'Urgent' }) => void;
  approveRequest: (donationId: string) => void;
  acceptVolunteerMission: (donationId: string) => void;
  advanceVolunteerStep: (donationId: string, nextStep: 'heading_to_donor' | 'at_pickup' | 'in_transit_to_ngo' | 'delivered', inputPin?: string) => boolean;
  submitFeedback: (donationId: string, feedback: { rating: number; notes: string; mealsDeliveredCount: number }) => void;
  cancelDonation: (donationId: string, reason?: string) => void;
  
  // Modals & Overlays
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register' | 'forgot_password';
  setAuthMode: (mode: 'login' | 'register' | 'forgot_password') => void;
  selectedDonation: FoodDonation | null;
  setSelectedDonation: (don: FoodDonation | null) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  
  // Next-Level Modals & Handlers
  isLiveTrackingOpen: boolean;
  setIsLiveTrackingOpen: (open: boolean) => void;
  trackingDonation: FoodDonation | null;
  openLiveTracking: (donation: FoodDonation) => void;
  updateLiveTrackingProgress: (donationId: string, progressDelta: number) => void;
  
  isCertificateModalOpen: boolean;
  setIsCertificateModalOpen: (open: boolean) => void;
  certificateDonation: FoodDonation | null;
  openCertificate: (donation: FoodDonation) => void;
  
  markHandiReturned: (donationId: string) => void;
  speakEmergencyAlert: (text: string, lang?: 'te' | 'en') => void;
  
  // Stats & Toasts
  impactStats: ImpactStats;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Utilities
  shareOnWhatsApp: (donation: FoodDonation) => void;
}

const FoodBridgeContext = createContext<FoodBridgeContextType | undefined>(undefined);

export const FoodBridgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('foodbridge_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('foodbridge_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('foodbridge_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // User & Role State
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('foodbridge_current_user_ap');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS.donor;
  });

  const switchRole = (role: UserRole) => {
    const targetUser = DEMO_USERS[role];
    setCurrentUser(targetUser);
    localStorage.setItem('foodbridge_current_user_ap', JSON.stringify(targetUser));
    addToast(
      `Switched to ${role.toUpperCase()} View`,
      `Active account: ${targetUser.name} (${targetUser.organizationName || targetUser.role}) in ${targetUser.city}, AP`,
      'info'
    );
  };

  const updateUserProfile = (updated: Partial<User>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('foodbridge_current_user_ap', JSON.stringify(next));
      return next;
    });
    addToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  // Active Tab & City Filter
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<AndhraCity | 'All Andhra Pradesh'>('All Andhra Pradesh');

  // Donations state
  const [donations, setDonations] = useState<FoodDonation[]>(() => {
    const saved = localStorage.getItem('foodbridge_donations_ap');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_DONATIONS;
  });

  useEffect(() => {
    localStorage.setItem('foodbridge_donations_ap', JSON.stringify(donations));
  }, [donations]);

  // Dynamic Impact Stats Calculation
  const impactStats: ImpactStats = {
    totalFoodDonatedKg: INITIAL_IMPACT_STATS.totalFoodDonatedKg + (donations.length - INITIAL_DONATIONS.length) * 45,
    mealsServed: donations.reduce((acc, curr) => {
      if (curr.status === 'Completed' || curr.status === 'Delivered') {
        return acc + curr.servingsCount;
      }
      return acc;
    }, INITIAL_IMPACT_STATS.mealsServed),
    activeVolunteers: INITIAL_IMPACT_STATS.activeVolunteers,
    partnerNgos: INITIAL_IMPACT_STATS.partnerNgos,
    carbonSavedKg: Math.round(INITIAL_IMPACT_STATS.carbonSavedKg + (donations.length * 60)),
    andhraDistrictsCovered: INITIAL_IMPACT_STATS.andhraDistrictsCovered,
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);

  // Next-Level States: Live GPS Tracking & Annadanam Certificates
  const [isLiveTrackingOpen, setIsLiveTrackingOpen] = useState(false);
  const [trackingDonation, setTrackingDonation] = useState<FoodDonation | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateDonation, setCertificateDonation] = useState<FoodDonation | null>(null);

  const openLiveTracking = (donation: FoodDonation) => {
    // Ensure donation has live tracking parameters
    let activeDon = donation;
    if (!activeDon.liveTracking) {
      activeDon = {
        ...activeDon,
        liveTracking: {
          isLive: true,
          routeProgressPercent: 25,
          etaMinutes: 18,
          distanceKm: 3.8,
          speedKmh: 30,
          foodCoreTempCelsius: 64.6,
          vehicleNumber: 'AP 16 TX 4921 (Covered Auto)',
          driverCurrentLocation: `Departed ${donation.donorOrg}, navigating via ${donation.landmark || 'Main Road'} in ${donation.city}`,
          lastGpsPingTime: 'Just now',
          routeWaypoints: [
            `${donation.donorOrg} (${donation.pickupAddress})`,
            'District Highway Link',
            'River Bridge / Flyover Crossing',
            'Ashram Campus Main Gate',
            `${donation.requestedBy?.ngoName || 'Beneficiary Shelter'}`
          ],
        },
      };
      // update state list
      setDonations((prev) => prev.map((d) => (d.id === donation.id ? activeDon : d)));
    }
    setTrackingDonation(activeDon);
    setIsLiveTrackingOpen(true);
  };

  const updateLiveTrackingProgress = (donationId: string, progressDelta: number) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const currentProg = d.liveTracking?.routeProgressPercent || 0;
        const newProg = Math.min(100, Math.max(0, currentProg + progressDelta));
        const newEta = Math.max(0, Math.round(20 * (1 - newProg / 100)));
        const newDist = parseFloat((4.5 * (1 - newProg / 100)).toFixed(1));
        const temp = parseFloat((65 - (newProg / 100) * 2.5).toFixed(1));

        let driverLoc = 'En route';
        if (newProg < 30) driverLoc = `Departed ${d.donorOrg}, heading through ${d.city}`;
        else if (newProg < 70) driverLoc = `Crossing central district bridge / flyover at 32 km/h`;
        else if (newProg < 95) driverLoc = `Approaching ${d.requestedBy?.ngoName || 'Ashram'} destination`;
        else driverLoc = `Arrived at ${d.requestedBy?.ngoName || 'Shelter'} - Handover in progress`;

        const updated: FoodDonation = {
          ...d,
          liveTracking: d.liveTracking
            ? {
                ...d.liveTracking,
                routeProgressPercent: newProg,
                etaMinutes: newEta,
                distanceKm: newDist,
                foodCoreTempCelsius: temp,
                driverCurrentLocation: driverLoc,
                lastGpsPingTime: 'Just now',
              }
            : undefined,
        };

        if (trackingDonation?.id === donationId) {
          setTrackingDonation(updated);
        }
        return updated;
      })
    );
  };

  const openCertificate = (donation: FoodDonation) => {
    setCertificateDonation(donation);
    setIsCertificateModalOpen(true);
  };

  const markHandiReturned = (donationId: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          handiVesselLedger: d.handiVesselLedger
            ? {
                ...d.handiVesselLedger,
                isReturnedToMandapam: true,
                returnedAt: new Date().toISOString(),
                acknowledgedByDonor: true,
              }
            : undefined,
        };
        return updated;
      })
    );
    addToast('Handis Returned & Cleared', 'Stainless steel vessels have been returned and acknowledged by the Kalyana Mandapam.', 'success');
  };

  const speakEmergencyAlert = (text: string, lang: 'te' | 'en' = 'en') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
      addToast('Voice SOS Broadcasted', 'Emergency audio announcement playing through speaker.', 'info');
    }
  };

  // Operations
  const createDonation = (data: Partial<FoodDonation>) => {
    const newId = `ap-don-${Date.now().toString().slice(-4)}`;
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    
    const newDonation: FoodDonation = {
      id: newId,
      title: data.title || 'Andhra Meals Surplus Donation',
      teluguTitle: data.teluguTitle || 'ఆహార దానం',
      category: data.category || 'Andhra Meals & Rice',
      description: data.description || 'Piping hot fresh Andhra meal prepared with commercial hygiene standards.',
      imageUrl: data.imageUrl || '/src/assets/images/andhra_wedding_feast_1793868976555.jpg',
      quantity: data.quantity || '40 kg (80 meals)',
      servingsCount: data.servingsCount || 80,
      dietaryType: data.dietaryType || 'Vegetarian',
      prepTime: data.prepTime || new Date().toISOString(),
      expiryTime: data.expiryTime || new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
      pickupAddress: data.pickupAddress || currentUser.address,
      landmark: data.landmark || 'Near Main Road',
      city: data.city || currentUser.city,
      district: data.district || 'Andhra Pradesh',
      pickupTimeWindow: data.pickupTimeWindow || 'Today within 3 hours',
      donorId: currentUser.id,
      donorName: currentUser.name,
      donorOrg: currentUser.organizationName || 'Kalyana Mandapam / Restaurant',
      donorType: data.donorType || 'Kalyana Mandapam / Function Hall',
      donorPhone: currentUser.phone,
      donorEmail: currentUser.email,
      storageReq: data.storageReq || 'Keep Warm (>60°C)',
      allergens: data.allergens || [],
      specialInstructions: data.specialInstructions || 'Handover verification code required upon pickup.',
      status: 'Available',
      handoverPin: randomPin,
      isEmergencyAlert: data.isEmergencyAlert || false,
      vesselReturnRequired: data.vesselReturnRequired || false,
      timeline: [
        {
          status: 'Available',
          timestamp: new Date().toISOString(),
          note: `New listing posted by ${currentUser.name} (${currentUser.organizationName || 'Donor'}).`,
          actor: currentUser.name,
        },
      ],
    };

    setDonations((prev) => [newDonation, ...prev]);
    setIsCreateModalOpen(false);
    addToast('Donation Listed Successfully!', `"${newDonation.title}" in ${newDonation.city} is live for local NGOs to request.`, 'success');
  };

  const broadcastWeddingEmergency = (title: string, city: AndhraCity, servings: number, address: string) => {
    const newId = `ap-sos-${Date.now().toString().slice(-4)}`;
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();

    const emergencyDonation: FoodDonation = {
      id: newId,
      title: `🚨 EMERGENCY WEDDING SURPLUS: ${title}`,
      teluguTitle: 'అత్యవసర కల్యాణ మండపం ఆహార దానం',
      category: 'Kalyana Mandapam Feast',
      description: `Urgent wedding banquet surplus in ${city}! Large quantity of hot Andhra meals (Bagara rice, Sambar, Pappu, Curries) immediately available. Shelters and couriers requested for emergency dispatch.`,
      imageUrl: '/src/assets/images/andhra_wedding_feast_1793868976555.jpg',
      quantity: `${servings} full meals (Large Handis)`,
      servingsCount: servings,
      dietaryType: 'Vegetarian',
      prepTime: new Date().toISOString(),
      expiryTime: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
      pickupAddress: address || 'Kalyana Mandapam, Main Road',
      landmark: 'Near City Centre',
      city,
      district: `${city} District, Andhra Pradesh`,
      pickupTimeWindow: 'IMMEDIATE PICKUP (Within next 90 mins)',
      donorId: currentUser.id,
      donorName: currentUser.name,
      donorOrg: currentUser.organizationName || 'Grand Kalyana Mandapam',
      donorType: 'Kalyana Mandapam / Function Hall',
      donorPhone: currentUser.phone,
      donorEmail: currentUser.email,
      storageReq: 'Keep Warm (>60°C)',
      allergens: ['Dairy (Ghee)'],
      specialInstructions: 'Bring clean food transfer buckets/handis or log vessel return.',
      status: 'Available',
      handoverPin: randomPin,
      isEmergencyAlert: true,
      vesselReturnRequired: true,
      timeline: [
        {
          status: 'Available',
          timestamp: new Date().toISOString(),
          note: `🚨 Emergency Wedding SOS broadcasted by ${currentUser.name}. ${servings} meals ready in ${city}.`,
          actor: currentUser.name,
        },
      ],
    };

    setDonations((prev) => [emergencyDonation, ...prev]);
    setIsEmergencyModalOpen(false);
    addToast(
      '🚨 Emergency Wedding Alert Dispatched!',
      `Push alert sent to volunteer couriers and shelters across ${city}!`,
      'warning'
    );
  };

  const requestFood = (
    donationId: string,
    req: { ngoId: string; ngoName: string; beneficiaryCount: number; requestNotes: string; urgency: 'Standard' | 'Urgent' }
  ) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          status: 'Requested',
          requestedBy: {
            ...req,
            requestedAt: new Date().toISOString(),
          },
          timeline: [
            ...d.timeline,
            {
              status: 'Requested',
              timestamp: new Date().toISOString(),
              note: `Food requested by ${req.ngoName} for ${req.beneficiaryCount} beneficiaries in ${d.city}. Note: "${req.requestNotes}"`,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );
    addToast('Request Sent to Donor', 'The donor in Andhra Pradesh has been notified to review your pickup request.', 'success');
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation((prev) => (prev ? { ...prev, status: 'Requested' } : null));
    }
  };

  const approveRequest = (donationId: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          status: 'Approved',
          timeline: [
            ...d.timeline,
            {
              status: 'Approved',
              timestamp: new Date().toISOString(),
              note: `Donation approved for ${d.requestedBy?.ngoName}. Open for volunteer courier pickup in ${d.city}.`,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );
    addToast('Request Approved!', 'Nearby Andhra volunteers can now accept this food rescue mission.', 'success');
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation((prev) => (prev ? { ...prev, status: 'Approved' } : null));
    }
  };

  const acceptVolunteerMission = (donationId: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          status: 'Assigned to Volunteer',
          assignedVolunteer: {
            volunteerId: currentUser.id,
            volunteerName: currentUser.name,
            volunteerPhone: currentUser.phone,
            vehicleType: 'Covered Auto / Eco Delivery Van',
            assignedAt: new Date().toISOString(),
            currentStep: 'heading_to_donor',
          },
          timeline: [
            ...d.timeline,
            {
              status: 'Assigned to Volunteer',
              timestamp: new Date().toISOString(),
              note: `Mission accepted by volunteer courier ${currentUser.name} in ${d.city}.`,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );
    addToast('Mission Accepted!', 'You have been assigned to this delivery. Follow the route steps.', 'success');
    if (selectedDonation && selectedDonation.id === donationId) {
      setSelectedDonation((prev) => (prev ? { ...prev, status: 'Assigned to Volunteer' } : null));
    }
  };

  const advanceVolunteerStep = (
    donationId: string,
    nextStep: 'heading_to_donor' | 'at_pickup' | 'in_transit_to_ngo' | 'delivered',
    inputPin?: string
  ): boolean => {
    let success = true;
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        
        // If transitioning to in_transit_to_ngo (Picked Up), verify Donor PIN
        if (nextStep === 'in_transit_to_ngo') {
          if (inputPin && inputPin.trim() !== d.handoverPin) {
            addToast('Invalid Verification PIN', `The 4-digit handover PIN provided by the donor is incorrect. Please recheck with the chef/manager.`, 'error');
            success = false;
            return d;
          }
        }

        let newStatus: DonationStatus = d.status;
        let note = '';

        if (nextStep === 'at_pickup') {
          note = `Volunteer ${d.assignedVolunteer?.volunteerName || 'courier'} arrived at ${d.donorOrg} pickup location in ${d.city}.`;
        } else if (nextStep === 'in_transit_to_ngo') {
          newStatus = 'Picked Up';
          note = `Handover verified with PIN ${d.handoverPin}. Food safely loaded into vehicle in ${d.city} en route to ${d.requestedBy?.ngoName}.`;
        } else if (nextStep === 'delivered') {
          newStatus = 'Delivered';
          note = `Food delivered safely to ${d.requestedBy?.ngoName}. Hot meals handed over with dignity.`;
        }

        const updated: FoodDonation = {
          ...d,
          status: newStatus,
          assignedVolunteer: d.assignedVolunteer
            ? {
                ...d.assignedVolunteer,
                currentStep: nextStep,
              }
            : undefined,
          timeline: [
            ...d.timeline,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );

    if (success) {
      addToast('Status Updated', `Delivery progress successfully logged in ${currentUser.city}!`, 'success');
    }
    return success;
  };

  const submitFeedback = (
    donationId: string,
    feedback: { rating: number; notes: string; mealsDeliveredCount: number }
  ) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          status: 'Completed',
          feedback: {
            ...feedback,
            submittedAt: new Date().toISOString(),
          },
          timeline: [
            ...d.timeline,
            {
              status: 'Completed',
              timestamp: new Date().toISOString(),
              note: `Beneficiary feedback submitted with ${feedback.rating}/5 stars: "${feedback.notes}". Impact: ${feedback.mealsDeliveredCount} meals served in ${d.city}.`,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );
    addToast('Feedback & Impact Recorded', 'Dhanyavadalu! Thank you for sharing your feedback and confirming Annadanam distribution.', 'success');
  };

  const cancelDonation = (donationId: string, reason?: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== donationId) return d;
        const updated: FoodDonation = {
          ...d,
          status: 'Cancelled',
          timeline: [
            ...d.timeline,
            {
              status: 'Cancelled',
              timestamp: new Date().toISOString(),
              note: `Donation cancelled: ${reason || 'Cancelled by donor/admin'}.`,
              actor: currentUser.name,
            },
          ],
        };
        return updated;
      })
    );
    addToast('Donation Cancelled', 'The donation has been marked as cancelled.', 'info');
  };

  const shareOnWhatsApp = (donation: FoodDonation) => {
    const text = encodeURIComponent(
      `🍲 *FOODBRIDGE ANDHRA PRADESH - FOOD RESCUE ALERT*\n\n` +
      `*Food:* ${donation.title}\n` +
      `*Quantity:* ${donation.quantity} (~${donation.servingsCount} Meals)\n` +
      `*Location:* ${donation.donorOrg}, ${donation.pickupAddress}, ${donation.city}, AP\n` +
      `*Safe Until:* ${new Date(donation.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n` +
      `*Status:* ${donation.status}\n\n` +
      `Please coordinate via FoodBridge AP: https://foodbridge.ap.community`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <FoodBridgeContext.Provider
      value={{
        currentUser,
        switchRole,
        updateUserProfile,
        activeTab,
        setActiveTab,
        selectedCity,
        setSelectedCity,
        isDarkMode,
        toggleDarkMode,
        donations,
        createDonation,
        broadcastWeddingEmergency,
        requestFood,
        approveRequest,
        acceptVolunteerMission,
        advanceVolunteerStep,
        submitFeedback,
        cancelDonation,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        selectedDonation,
        setSelectedDonation,
        isLiveTrackingOpen,
        setIsLiveTrackingOpen,
        trackingDonation,
        openLiveTracking,
        updateLiveTrackingProgress,
        isCertificateModalOpen,
        setIsCertificateModalOpen,
        certificateDonation,
        openCertificate,
        markHandiReturned,
        speakEmergencyAlert,
        impactStats,
        toasts,
        addToast,
        removeToast,
        shareOnWhatsApp,
      }}
    >
      {children}
    </FoodBridgeContext.Provider>
  );
};

export const useFoodBridge = (): FoodBridgeContextType => {
  const context = useContext(FoodBridgeContext);
  if (!context) {
    throw new Error('useFoodBridge must be used within a FoodBridgeProvider');
  }
  return context;
};
