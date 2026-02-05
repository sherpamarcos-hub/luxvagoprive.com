
import React from 'react';
import { X, Star, Check, Award, Shield } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  options: FilterOptions;
  setOptions: (options: FilterOptions) => void;
  availableAmenities: string[];
  isDarkMode: boolean;
}

const FilterSheet: React.FC<FilterSheetProps> = ({ 
  isOpen, 
  onClose, 
  options, 
  setOptions,
  availableAmenities,
  isDarkMode
}) => {
  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    const newAmenities = options.selectedAmenities.includes(amenity)
      ? options.selectedAmenities.filter(a => a !== amenity)
      : [...options.selectedAmenities, amenity];
    setOptions({ ...options, selectedAmenities: newAmenities });
  };

  const handleReset = () => {
    setOptions({
      minRating: 0,
      selectedAmenities: [],
      maxDistance: 20,
      priceRange: [0, 1000]
    });
  };

  return (
    <div className="fixed inset-0 z-[3000] flex flex-col justify-end">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0c0d0f] rounded-t-[3.5rem] shadow-2xl w-full max-w-md mx-auto p-10 space-y-10 animate-in slide-in-from-bottom-full duration-500 overflow-y-auto max-h-[90vh] border-t border-gold/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white serif italic">Filtros Zenith</h2>
            <p className="text-[9px] text-gold font-black uppercase tracking-[0.3em]">Refinar Protocolos de Busca</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gold"
          >
            <X size={24} />
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-white uppercase tracking-widest flex justify-between">
            Teto de Ativo
            <span className="text-gold font-black">${options.priceRange[0]} — ${options.priceRange[1]}</span>
          </h3>
          <div className="relative h-12 flex items-center">
            <div className="absolute w-full h-1 bg-white/10 rounded-full"></div>
            <div 
              className="absolute h-1 bg-gold rounded-full"
              style={{
                left: `${(options.priceRange[0] / 1000) * 100}%`,
                right: `${100 - (options.priceRange[1] / 1000) * 100}%`
              }}
            ></div>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={options.priceRange[0]}
              onChange={(e) => {
                const val = Math.min(parseInt(e.target.value), options.priceRange[1] - 50);
                setOptions({ ...options, priceRange: [val, options.priceRange[1]] });
              }}
              className="absolute w-full bg-transparent appearance-none pointer-events-none cursor-pointer z-20 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-onyx [&::-webkit-slider-thumb]:shadow-xl"
            />
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={options.priceRange[1]}
              onChange={(e) => {
                const val = Math.max(parseInt(e.target.value), options.priceRange[0] + 50);
                setOptions({ ...options, priceRange: [options.priceRange[0], val] });
              }}
              className="absolute w-full bg-transparent appearance-none pointer-events-none cursor-pointer z-20
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-onyx [&::-webkit-slider-thumb]:shadow-xl"
            />
          </div>
        </div>

        {/* Rating Filter -> Tiers */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-white uppercase tracking-widest flex justify-between">
            Assinatura Zenith
            <span className="text-gold font-black">{options.minRating > 0 ? `Tier ${options.minRating}+` : 'Qualquer'}</span>
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((tier) => (
              <button
                key={tier}
                onClick={() => setOptions({ ...options, minRating: tier })}
                className={`py-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 font-black text-[10px] ${
                  options.minRating === tier 
                    ? 'bg-gold border-gold text-onyx shadow-lg' 
                    : 'bg-black border-white/10 text-gold hover:border-gold/50'
                }`}
              >
                {tier === 0 ? 'TUDO' : (
                  <>
                    <Award size={14} /> TIER {tier}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Protocolos de Luxo</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableAmenities.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-tight ${
                  options.selectedAmenities.includes(amenity)
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'bg-black border-white/5 text-pearl/40 hover:border-white/20'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  options.selectedAmenities.includes(amenity) ? 'bg-gold text-onyx' : 'bg-white/5'
                }`}>
                  {options.selectedAmenities.includes(amenity) && <Check size={12} strokeWidth={4} />}
                </div>
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 pt-6 border-t border-white/10">
          <button 
            onClick={handleReset}
            className="flex-1 py-6 text-steel font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            Resetar
          </button>
          <button 
            onClick={onClose}
            className="flex-[2] bg-gold text-onyx py-6 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
          >
            Aplicar Sincronia
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSheet;
