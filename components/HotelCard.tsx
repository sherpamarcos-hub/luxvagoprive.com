
import React, { useEffect, useState } from 'react';
import { MapPin, Heart, Crown, ShieldCheck, Zap } from 'lucide-react';
import { Hotel } from '../types';
import { getHotelInsight } from '../services/geminiService';

interface HotelCardProps {
  hotel: Hotel;
  isWishlisted: boolean;
  onToggleWishlist: (hotel: Hotel, e: React.MouseEvent) => void;
  onClick: (hotel: Hotel) => void;
  isDarkMode: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  hotel, 
  isWishlisted, 
  onToggleWishlist, 
  onClick, 
  isDarkMode 
}) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchInsight = async () => {
      try {
        await new Promise(r => setTimeout(r, Math.random() * 1500));
        const insight = await getHotelInsight(hotel);
        if (isMounted) setAiInsight(insight);
      } catch (e) {
        if (isMounted) setAiInsight("Auditado LuxVago Privé.");
      }
    };
    fetchInsight();
    return () => { isMounted = false; };
  }, [hotel.id]);

  return (
    <div 
      onClick={() => onClick(hotel)}
      className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-500 cursor-pointer border border-zinc-200/50 dark:border-white/5 group relative active:scale-[0.98]"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
        />
        
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
          {hotel.isZenithAward && (
            <div className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl">
              <Crown size={20} className="text-gold" />
            </div>
          )}
          <div className="px-3 py-1.5 bg-gold/90 backdrop-blur-xl rounded-xl flex items-center gap-1.5 shadow-2xl border border-white/20">
             <Zap size={10} className="text-onyx" />
             <span className="text-[8px] font-black text-onyx uppercase tracking-tighter">Foresight: {hotel.sovereigntyAudit?.foresightRating}%</span>
          </div>
        </div>

        <div className="absolute top-5 right-5 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(hotel, e); }}
            className={`p-3.5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all ${
              isWishlisted ? 'bg-gold text-onyx' : 'bg-black/40 text-white'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />

        <div className="absolute bottom-5 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
           <div className="bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/10">
              <p className="text-[9px] leading-tight text-white font-medium italic border-l-2 border-gold pl-3 truncate">
                {aiInsight || "Sincronizando..."}
              </p>
           </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl serif font-bold text-zinc-900 dark:text-white transition-colors duration-500">{hotel.name}</h3>
            <div className="flex items-center gap-1.5 text-zinc-500/80 dark:text-zinc-400">
              <MapPin size={10} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{hotel.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-emerald-500/10 rounded-xl border border-zinc-200/50 dark:border-emerald-500/30">
               <ShieldCheck size={12} className="text-emerald-500" />
               <span className="text-[9px] font-bold text-zinc-800 dark:text-emerald-500 uppercase tracking-tighter">Auditado</span>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5 transition-colors duration-500">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gold font-bold">$</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">${hotel.pricePerNight}</span>
            </div>
          </div>
          
          <button className="bg-zinc-900 dark:bg-gold text-white dark:text-onyx px-5 py-3 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:brightness-110 transition-all">
            Ver Protocolo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
