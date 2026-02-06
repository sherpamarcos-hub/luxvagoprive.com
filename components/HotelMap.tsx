
import React, { useEffect, useRef, useState } from 'react';
import { Star, Heart, X, MapPin, Sparkles, Shield } from 'lucide-react';
import { Hotel } from '../types';
import L from 'leaflet';

interface HotelMapProps {
  hotels: Hotel[];
  initialSelectedId?: string | null;
  onSelectHotel: (hotel: Hotel) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (hotel: Hotel, e: React.MouseEvent) => void;
  isDarkMode: boolean;
}

const HotelMap: React.FC<HotelMapProps> = ({ hotels, initialSelectedId, onSelectHotel, isWishlisted, onToggleWishlist, isDarkMode }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (initialSelectedId) {
      const hotel = hotels.find(h => h.id === initialSelectedId);
      if (hotel) setActiveHotel(hotel);
    }
  }, [initialSelectedId, hotels]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        fadeAnimation: true,
        markerZoomAnimation: true
      }).setView([20, 0], 2);
    }

    const map = mapRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // Camadas de alta fidelidade da CartoDB
    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 20,
      detectRetina: true, // Crucial para nitidez em dispositivos mobile e Mac/Retina
      className: 'map-tiles-high-res'
    }).addTo(map);

    // Limpeza de marcadores antigos
    (Object.values(markersRef.current) as L.Marker[]).forEach(marker => marker.remove());
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    hotels.forEach(hotel => {
      const { lat, lng } = hotel.coords;
      const pos: L.LatLngExpression = [lat, lng];
      bounds.extend(pos);

      const isPartner = !hotel.isExternal;
      // Marcadores com design de luxo e contraste aprimorado
      const markerHtml = `
        <div class="custom-marker-luxe ${activeHotel?.id === hotel.id ? 'active-zenith-marker' : ''}" id="marker-${hotel.id}">
          <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-black rounded-full border border-zinc-200 dark:border-gold/30 shadow-xl">
            ${isPartner ? '<span class="text-[8px] font-black text-gold">LV</span>' : ''}
            <span class="text-[10px] font-black text-zinc-900 dark:text-zinc-100">$${hotel.pricePerNight}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: markerHtml,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
      });

      const marker = L.marker(pos, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveHotel(hotel);
        map.flyTo(pos, Math.max(map.getZoom(), 12), {
          duration: 1.2,
          easeLinearity: 0.25
        });
      });

      markersRef.current[hotel.id] = marker;
    });

    if (hotels.length > 0) {
      if (hotels.length === 1) {
        map.setView([hotels[0].coords.lat, hotels[0].coords.lng], 12);
      } else {
        map.fitBounds(bounds, { padding: [80, 80] });
      }
    }
  }, [hotels, isDarkMode, activeHotel]);

  return (
    <div className="relative w-full h-full animate-in fade-in duration-1000 bg-zinc-100 dark:bg-black">
      {/* Removida a opacidade 80 para garantir 100% de nitidez das tiles */}
      <div ref={mapContainerRef} className="w-full h-full z-0 outline-none" />

      {/* Estilos injetados para os marcadores customizados */}
      <style>{`
        .custom-marker-luxe {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .custom-marker-luxe:hover {
          transform: scale(1.1);
          z-index: 1000;
        }
        .active-zenith-marker {
          transform: scale(1.15);
          z-index: 2000;
        }
        .active-zenith-marker > div {
          border-color: #d4af37 !important;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4) !important;
        }
        .leaflet-container {
          background: transparent !important;
        }
      `}</style>

      {activeHotel && (
        <div className="absolute bottom-10 left-6 right-6 animate-in slide-in-from-bottom-12 duration-500 z-[1000]">
          <div
            onClick={() => onSelectHotel(activeHotel)}
            className="bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-zinc-200 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-all"
          >
            {!activeHotel.isExternal && (
              <div className="bg-gold text-onyx px-4 py-2 text-[8px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                Ativo Validado LuxVago Privé
              </div>
            )}

            <div className="p-5 flex gap-5 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                <img src={activeHotel.image} alt={activeHotel.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg serif truncate pr-2 text-zinc-900 dark:text-zinc-100">{activeHotel.name}</h3>
                  <button onClick={(e) => { e.stopPropagation(); setActiveHotel(null); }} className="text-zinc-400 p-1">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                  <MapPin size={10} className="text-gold" />
                  <span className="truncate">{activeHotel.location}</span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">$${activeHotel.pricePerNight}</span>
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">/ noite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 flex flex-col gap-2 z-[1000]">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-xl text-[10px] font-black text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 uppercase tracking-[0.2em] flex items-center gap-2">
          <Shield size={12} className="text-gold" />
          Terminal de Localização Soberano
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
