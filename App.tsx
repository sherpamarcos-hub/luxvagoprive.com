
import React, { useState, useEffect } from 'react';
import { Home, Map, User, ShieldAlert } from 'lucide-react';
import { MOCK_HOTELS } from './constants';
import HotelCard from './components/HotelCard';
import AdminDashboard from './components/AdminDashboard';
import AccountScreen from './components/AccountScreen';
import PartnershipScreen from './components/PartnershipScreen';
import HotelMap from './components/HotelMap';

const App = () => {
  const [view, setView] = useState<'home' | 'map' | 'account' | 'business'>('home');
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center bg-[#050505] overflow-hidden font-sans select-none">
      <div className="w-full max-w-[430px] h-full relative flex flex-col bg-[#050505] text-white border-x border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
        
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
          {view === 'home' && (
            <div className="animate-in fade-in duration-700">
              <header className="p-12 pb-6">
                <div className="flex justify-between items-start">
                   <div>
                      <h1 className="text-4xl serif italic text-white leading-none tracking-tight">LuxVago <span className="text-gold">Privé</span></h1>
                      <p className="text-[9px] text-gold font-black uppercase tracking-[0.5em] mt-4 opacity-80">Soberania Hoteleira</p>
                   </div>
                   <button onClick={() => setShowAdmin(true)} className="p-3 bg-white/5 rounded-2xl text-gold/30 hover:text-gold transition-all">
                      <ShieldAlert size={20} />
                   </button>
                </div>
              </header>
              <main className="px-6 space-y-12">
                {MOCK_HOTELS.map(h => (
                  <HotelCard 
                    key={h.id} 
                    hotel={h} 
                    onClick={() => {}} 
                    isDarkMode={true} 
                    isWishlisted={false} 
                    onToggleWishlist={()=>{}} 
                  />
                ))}
              </main>
            </div>
          )}

          {view === 'map' && (
            <div className="h-full w-full animate-in zoom-in-95 duration-500">
              <HotelMap hotels={MOCK_HOTELS} onSelectHotel={()=>{}} isWishlisted={()=>false} onToggleWishlist={()=>{}} isDarkMode={true} />
            </div>
          )}

          {view === 'account' && (
            <AccountScreen 
              stats={{
                totalSaved: 4200, 
                tripsCompleted: 8, 
                zenithPoints: 12450, 
                memberSince: 'Out 2024', 
                tier: 'Zenith', 
                honorProgress: 92, 
                referralsCount: 3
              }} 
              onOpenAdmin={() => setShowAdmin(true)} 
              onOpenBusiness={() => setView('business')} 
              currentTheme="dark" 
              onToggleTheme={()=>{}} 
              swStatus="active" 
              isInstallReady={false} 
              onInstallApp={async ()=>true} 
            />
          )}

          {view === 'business' && (
            <PartnershipScreen isDarkMode={true} />
          )}
        </div>

        {/* HQ Dashboard - Camada Máxima */}
        {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}

        {/* Barra de Navegação Zenith - Fixed para garantir visual PWA */}
        <nav className="shrink-0 h-24 backdrop-blur-3xl border-t border-white/5 px-12 flex justify-between items-center bg-black/80 z-[1000] fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]">
          <button onClick={() => setView('home')} className={`p-4 transition-all duration-300 ${view === 'home' ? 'text-gold scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <Home size={22} />
          </button>
          <button onClick={() => setView('map')} className={`p-4 transition-all duration-300 ${view === 'map' ? 'text-gold scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <Map size={22} />
          </button>
          <button onClick={() => setView('account')} className={`p-4 transition-all duration-300 ${['account', 'business'].includes(view) ? 'text-gold scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <User size={22} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
