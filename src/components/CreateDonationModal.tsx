import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { FoodCategory, DietaryType, StorageRequirement, AndhraCity } from '../types';
import { FOOD_PRESETS, ANDHRA_CITIES } from '../data/mockData';
import { X, Sparkles, Utensils, Clock, MapPin, ShieldCheck, BellRing } from 'lucide-react';

export const CreateDonationModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createDonation, currentUser } = useFoodBridge();

  const [title, setTitle] = useState('');
  const [teluguTitle, setTeluguTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Kalyana Mandapam Feast');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('50 kg (100 full meals)');
  const [servingsCount, setServingsCount] = useState<number>(100);
  const [dietaryType, setDietaryType] = useState<DietaryType>('Vegetarian');
  const [storageReq, setStorageReq] = useState<StorageRequirement>('Keep Warm (>60°C)');
  const [pickupAddress, setPickupAddress] = useState(currentUser.address || 'Sri Rama Kalyana Mandapam, Benz Circle');
  const [landmark, setLandmark] = useState('Near MG Road');
  const [city, setCity] = useState<AndhraCity>(currentUser.city || 'Vijayawada');
  const [pickupTimeWindow, setPickupTimeWindow] = useState('Today within 3 hours (Before 4:30 PM)');
  const [safeHours, setSafeHours] = useState<number>(4);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['Dairy (Ghee & Curd)']);
  const [specialInstructions, setSpecialInstructions] = useState('Stainless steel handis provided. Please return empty vessels or bring transfer pots.');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/andhra_wedding_feast_1793868976555.jpg');
  const [vesselReturnRequired, setVesselReturnRequired] = useState(true);
  const [isEmergencyAlert, setIsEmergencyAlert] = useState(false);

  if (!isCreateModalOpen) return null;

  const allergenOptions = ['Dairy (Ghee/Curd)', 'Peanuts (Groundnuts)', 'Mustard seeds', 'Gluten (Maida)', 'None'];

  const toggleAllergen = (item: string) => {
    if (item === 'None') {
      setSelectedAllergens(['None']);
      return;
    }
    const filtered = selectedAllergens.filter((a) => a !== 'None');
    if (filtered.includes(item)) {
      setSelectedAllergens(filtered.filter((a) => a !== item));
    } else {
      setSelectedAllergens([...filtered, item]);
    }
  };

  const applyPreset = (preset: (typeof FOOD_PRESETS)[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setQuantity(preset.quantity);
    setServingsCount(preset.servingsCount);
    setDietaryType(preset.dietaryType);
    setStorageReq(preset.storageReq);
    setSelectedAllergens(preset.allergens);
    setDescription(preset.description);
    setCity(preset.city);
    if (preset.category === 'Kalyana Mandapam Feast') {
      setImageUrl('/src/assets/images/andhra_wedding_feast_1793868976555.jpg');
      setSafeHours(4);
      setVesselReturnRequired(true);
    } else if (preset.category === 'South Indian Tiffins') {
      setImageUrl('/src/assets/images/andhra_tiffin_surplus_1793868976294.jpg');
      setSafeHours(5);
      setVesselReturnRequired(false);
    } else if (preset.category === 'Temple Prasadam & Annadanam') {
      setImageUrl('/src/assets/images/andhra_annadanam_hero_1793868959841.jpg');
      setSafeHours(8);
      setVesselReturnRequired(false);
    } else {
      setImageUrl('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80');
      setSafeHours(36);
      setVesselReturnRequired(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const expiryDate = new Date(now.getTime() + safeHours * 3600 * 1000).toISOString();

    createDonation({
      title,
      teluguTitle,
      category,
      description,
      quantity,
      servingsCount,
      dietaryType,
      storageReq,
      prepTime: now.toISOString(),
      expiryTime: expiryDate,
      pickupAddress,
      landmark,
      city,
      district: `${city} District, Andhra Pradesh`,
      pickupTimeWindow,
      allergens: selectedAllergens,
      specialInstructions,
      imageUrl,
      vesselReturnRequired,
      isEmergencyAlert,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                List Surplus Food Donation (ఆహార దానం)
              </h3>
              <p className="text-xs text-slate-500">
                {currentUser.organizationName || currentUser.name} · {city}, Andhra Pradesh
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Andhra Presets */}
        <div className="p-5 bg-stone-50 dark:bg-slate-800/40 border-b border-stone-200 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Andhra Food Templates (కల్యాణ భోజనం, టిఫిన్లు, ప్రసాదం):
          </p>
          <div className="flex flex-wrap gap-2">
            {FOOD_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 transition-colors"
              >
                + {preset.title.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          
          {/* Title & City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Indian Food Item / Feast Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Wedding Feast: Sona Masoori Rice, Tomato Pappu & Sambar"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Andhra City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as AndhraCity)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              >
                {ANDHRA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Telugu Title Optional */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Telugu Title (తెలుగులో పేరు - ఐచ్ఛికం)
            </label>
            <input
              type="text"
              value={teluguTitle}
              onChange={(e) => setTeluguTitle(e.target.value)}
              placeholder="ఉదా: కల్యాణ భోజనం - వేడి అన్నం, పప్పు, సాంబార్"
              className="w-full px-3.5 py-2 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Category & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Kalyana Mandapam Feast">Kalyana Mandapam Feast</option>
                <option value="Andhra Meals & Rice">Andhra Meals & Rice</option>
                <option value="South Indian Tiffins">South Indian Tiffins</option>
                <option value="Temple Prasadam & Annadanam">Temple Prasadam & Annadanam</option>
                <option value="Rythu Bazaar Fresh Produce">Rythu Bazaar Fresh Produce</option>
                <option value="Sweets & Bakery">Sweets & Bakery</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Dietary Type *
              </label>
              <select
                value={dietaryType}
                onChange={(e) => setDietaryType(e.target.value as DietaryType)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Pure Sattvic (No Onion/Garlic)">Pure Sattvic (No Onion/Garlic)</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>

          {/* Quantity & Servings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Quantity Description *
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 4 Handis (120 full meals) / 150 Idlis"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Estimated People Served *
              </label>
              <input
                type="number"
                min="1"
                value={servingsCount}
                onChange={(e) => setServingsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Food Description & Preparation Notes *
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Freshly made Sona Masoori rice with Andhra tomato pappu and drumstick sambar. Clean thermal handis."
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              required
            />
          </div>

          {/* Storage & Safe Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Storage & Temperature Requirements *
              </label>
              <select
                value={storageReq}
                onChange={(e) => setStorageReq(e.target.value as StorageRequirement)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Keep Warm (>60°C)">Keep Warm (&gt;60°C)</option>
                <option value="Normal Room Temp (Cool & Dry)">Normal Room Temp (Cool & Dry)</option>
                <option value="Refrigerated (0-4°C)">Refrigerated (0-4°C)</option>
                <option value="Consume Within 2 Hours">Consume Within 2 Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Safe Consumption Window *
              </label>
              <select
                value={safeHours}
                onChange={(e) => setSafeHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value={3}>Next 3 Hours (Hot Cooked Meals)</option>
                <option value={5}>Next 5 Hours (Tiffins & Rice)</option>
                <option value={10}>Next 10 Hours (Temple Prasadam)</option>
                <option value={24}>Within 24 Hours (Dry Sweets / Produce)</option>
                <option value={48}>Within 48 Hours (Rythu Produce)</option>
              </select>
            </div>
          </div>

          {/* Vessel Return Checkbox & Emergency SOS Toggle */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={vesselReturnRequired}
                onChange={(e) => setVesselReturnRequired(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Stainless Steel Handis / Dabbas (Vessel Return Required from NGO)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-amber-600">
              <input
                type="checkbox"
                checked={isEmergencyAlert}
                onChange={(e) => setIsEmergencyAlert(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="font-bold flex items-center gap-1">
                <BellRing className="w-3.5 h-3.5" />
                Mark as URGENT Wedding Banquet SOS Alert
              </span>
            </label>
          </div>

          {/* Pickup Address & Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Mandapam / Kitchen Address *
              </label>
              <input
                type="text"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Pickup Window *
              </label>
              <input
                type="text"
                value={pickupTimeWindow}
                onChange={(e) => setPickupTimeWindow(e.target.value)}
                placeholder="e.g. Today before 4:30 PM"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Select Andhra Food Photo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { url: '/src/assets/images/andhra_wedding_feast_1793868976555.jpg', label: 'Wedding Banquet Feast' },
                { url: '/src/assets/images/andhra_tiffin_surplus_1793868976294.jpg', label: 'South Indian Tiffins' },
                { url: '/src/assets/images/andhra_annadanam_hero_1793868959841.jpg', label: 'Annadanam Prasadam' },
              ].map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImageUrl(img.url)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img.url
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-16 object-cover" />
                  <p className="text-[10px] text-center py-1 bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm"
            >
              Publish Andhra Food Donation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
