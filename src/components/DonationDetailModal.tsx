import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  X,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle2,
  Truck,
  HeartHandshake,
  Star,
  Copy,
  ChevronRight,
  Sparkles,
  Share2,
  BellRing,
  UtensilsCrossed,
  Navigation,
  Award,
} from 'lucide-react';

export const DonationDetailModal: React.FC = () => {
  const {
    selectedDonation,
    setSelectedDonation,
    currentUser,
    requestFood,
    approveRequest,
    acceptVolunteerMission,
    advanceVolunteerStep,
    submitFeedback,
    cancelDonation,
    shareOnWhatsApp,
    addToast,
    openLiveTracking,
    openCertificate,
  } = useFoodBridge();

  const [isRequesting, setIsRequesting] = useState(false);
  const [beneficiaryCount, setBeneficiaryCount] = useState<number>(50);
  const [requestNotes, setRequestNotes] = useState('');
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent'>('Standard');

  const [enteredPin, setEnteredPin] = useState('');

  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackNotes, setFeedbackNotes] = useState('');

  if (!selectedDonation) return null;

  const handleClose = () => {
    setSelectedDonation(null);
    setIsRequesting(false);
    setIsSubmittingFeedback(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestFood(selectedDonation.id, {
      ngoId: currentUser.id,
      ngoName: currentUser.organizationName || currentUser.name,
      beneficiaryCount,
      requestNotes: requestNotes || 'Our ashram dining hall is ready to serve hot meals.',
      urgency,
    });
    setIsRequesting(false);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(selectedDonation.id, {
      rating: feedbackRating,
      notes: feedbackNotes || 'Food was delicious, hot, and fed all our beneficiaries with pure joy.',
      mealsDeliveredCount: selectedDonation.servingsCount,
    });
    setIsSubmittingFeedback(false);
  };

  const copyPinToClipboard = () => {
    navigator.clipboard?.writeText(selectedDonation.handoverPin);
    addToast('PIN Copied', `Handover code ${selectedDonation.handoverPin} copied to clipboard.`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* Header Photo */}
        <div className="relative h-60 w-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
          <img
            src={selectedDonation.imageUrl}
            alt={selectedDonation.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => shareOnWhatsApp(selectedDonation)}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md transition-colors"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header titles */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold mb-1">
                <span>{selectedDonation.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDonation.dietaryType}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDonation.city}, AP</span>
              </div>
              {selectedDonation.teluguTitle && (
                <p className="text-sm font-semibold text-amber-300">
                  {selectedDonation.teluguTitle}
                </p>
              )}
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {selectedDonation.title}
              </h2>
            </div>

            <div className="bg-emerald-600/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Feeds ~{selectedDonation.servingsCount} People</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-15rem)] overflow-y-auto text-xs">
          
          {/* Status & Handover PIN Bar */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">Current Status</p>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                {selectedDonation.status}
              </p>
            </div>

            {/* Handover PIN Display */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-slate-700">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Handover PIN</p>
                <p className="text-base font-mono font-bold text-slate-900 dark:text-white tracking-widest">
                  {selectedDonation.handoverPin}
                </p>
              </div>
              <button
                onClick={copyPinToClipboard}
                className="p-1.5 text-slate-400 hover:text-slate-600"
                title="Copy PIN code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Food Description & Quantity
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedDonation.description}
            </p>
          </div>

          {/* Andhra Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Storage & Climate */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="font-semibold text-slate-500 uppercase">Storage & Holding Temp</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {selectedDonation.storageReq}
              </p>
              <p className="text-[11px] text-slate-500">Andhra Climate: Maintain hot holding (&gt;60°C) or consume immediately</p>
            </div>

            {/* Safe Deadline */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="font-semibold text-slate-500 uppercase">Safe Consumption Deadline</span>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {new Date(selectedDonation.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[11px] text-slate-500">Prepared at {new Date(selectedDonation.prepTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>

            {/* Pickup Mandapam Address */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="font-semibold text-slate-500 uppercase">Pickup Location ({selectedDonation.city})</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedDonation.pickupAddress}</span>
              </p>
              <p className="text-[11px] text-slate-500">Landmark: {selectedDonation.landmark}</p>
              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                Window: {selectedDonation.pickupTimeWindow}
              </p>
            </div>

            {/* Donor / Mandapam Contact */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="font-semibold text-slate-500 uppercase">Mandapam / Donor Details</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedDonation.donorOrg} ({selectedDonation.donorType})
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {selectedDonation.donorPhone}
                </span>
                <span>{selectedDonation.city}, AP</span>
              </div>
            </div>

          </div>

          {/* Vessel Return Notice & Allergens */}
          <div className="space-y-3">
            {selectedDonation.vesselReturnRequired && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <span className="font-bold">⚠️ Stainless Steel Vessel Return Notice: </span>
                This food is packed in large catering handis. The receiving NGO or volunteer courier must return the clean, washed vessels to {selectedDonation.donorOrg} within 24 hours.
              </div>
            )}

            {selectedDonation.allergens.length > 0 && (
              <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                <span className="font-bold">Allergens / Ingredients: </span>
                <span>{selectedDonation.allergens.join(', ')}</span>
              </div>
            )}

            {selectedDonation.specialInstructions && (
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300">
                <span className="font-bold">Mandapam Instructions: </span>
                {selectedDonation.specialInstructions}
              </div>
            )}
          </div>

          {/* Requested By Info */}
          {selectedDonation.requestedBy && (
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  Requested by: {selectedDonation.requestedBy.ngoName}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                  Beneficiaries: {selectedDonation.requestedBy.beneficiaryCount}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                "{selectedDonation.requestedBy.requestNotes}"
              </p>
            </div>
          )}

          {/* Assigned Volunteer Info */}
          {selectedDonation.assignedVolunteer && (
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  AP Volunteer Assigned: {selectedDonation.assignedVolunteer.volunteerName}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">
                  {selectedDonation.assignedVolunteer.vehicleType} · {selectedDonation.assignedVolunteer.volunteerPhone}
                </span>
              </div>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                Stage: {selectedDonation.assignedVolunteer.currentStep?.replace(/_/g, ' ').toUpperCase()}
              </p>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Annadanam Handover Audit Trail
            </h4>
            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-slate-800">
              {selectedDonation.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 text-xs">
                  <span className="absolute left-1 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-slate-900" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{event.status}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{event.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NGO Request Form */}
          {isRequesting && (
            <form onSubmit={handleRequestSubmit} className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-4">
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Request Annadanam for Your Ashram / Shelter
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Beneficiary Count Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedDonation.servingsCount}
                    value={beneficiaryCount}
                    onChange={(e) => setBeneficiaryCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Standard">Standard (Today's meal)</option>
                    <option value="Urgent">Urgent (Immediate relief)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Notes for Mandapam & Volunteer Courier
                </label>
                <textarea
                  rows={2}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="e.g. For evening dining hall at Amma Vodi Ashram. We will wash and return steel handis."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Confirm & Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsRequesting(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Feedback Form */}
          {isSubmittingFeedback && (
            <form onSubmit={handleFeedbackSubmit} className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-4">
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Submit Beneficiary Receipt & Annadanam Feedback
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${feedbackRating >= star ? 'fill-current' : 'text-slate-300'}`}
                    />
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  How was the food taste, temperature, and service?
                </label>
                <textarea
                  rows={2}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="The Sambar and Rice were piping hot and delicious. The children at the ashram were overjoyed..."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmittingFeedback(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Action Bar */}
        <div className="p-6 bg-stone-50 dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Live GPS Radar trigger */}
            <button
              onClick={() => openLiveTracking(selectedDonation)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 animate-pulse" />
              <span>Live GPS Radar & Temp</span>
            </button>

            {/* Certificate trigger */}
            {['Completed', 'Delivered'].includes(selectedDonation.status) && (
              <button
                onClick={() => openCertificate(selectedDonation)}
                className="px-3.5 py-2 text-xs font-bold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 hover:bg-amber-200 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Annadanam Certificate</span>
              </button>
            )}

            {/* WhatsApp Share */}
            <button
              onClick={() => shareOnWhatsApp(selectedDonation)}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-300 dark:border-emerald-700 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            {/* NGO Actions */}
            {currentUser.role === 'ngo' && selectedDonation.status === 'Available' && !isRequesting && (
              <button
                onClick={() => setIsRequesting(true)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Request Food for Our Ashram</span>
              </button>
            )}

            {currentUser.role === 'ngo' && selectedDonation.status === 'Delivered' && !isSubmittingFeedback && (
              <button
                onClick={() => setIsSubmittingFeedback(true)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm"
              >
                <Star className="w-4 h-4" />
                <span>Confirm Receipt & Submit Feedback</span>
              </button>
            )}

            {/* Donor Actions */}
            {currentUser.role === 'donor' && selectedDonation.status === 'Requested' && (
              <button
                onClick={() => approveRequest(selectedDonation.id)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Request for {selectedDonation.requestedBy?.ngoName}</span>
              </button>
            )}

            {/* Volunteer Actions */}
            {currentUser.role === 'volunteer' && selectedDonation.status === 'Approved' && (
              <button
                onClick={() => acceptVolunteerMission(selectedDonation.id)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
              >
                <Truck className="w-4 h-4" />
                <span>Accept Delivery Mission</span>
              </button>
            )}

            {currentUser.role === 'volunteer' && selectedDonation.status === 'Assigned to Volunteer' && (
              <div className="flex items-center gap-2">
                {selectedDonation.assignedVolunteer?.currentStep === 'heading_to_donor' ? (
                  <button
                    onClick={() => advanceVolunteerStep(selectedDonation.id, 'at_pickup')}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    <span>Arrived at {selectedDonation.donorOrg}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Enter Donor PIN"
                      value={enteredPin}
                      onChange={(e) => setEnteredPin(e.target.value)}
                      className="w-28 px-3 py-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-lg text-center"
                    />
                    <button
                      onClick={() => advanceVolunteerStep(selectedDonation.id, 'in_transit_to_ngo', enteredPin)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                    >
                      Verify PIN & Start
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentUser.role === 'volunteer' && selectedDonation.status === 'Picked Up' && (
              <button
                onClick={() => advanceVolunteerStep(selectedDonation.id, 'delivered')}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Delivery to {selectedDonation.requestedBy?.ngoName}</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
