
import React, { useState, useEffect } from 'react';
import { 
  Building2, ArrowRight, Shield, Sun, Moon, Zap, Award, Crown, Gem, Share2, Info, 
  Settings, Coffee, Moon as MoonIcon, Sliders, BookOpen, CheckCircle2,
  Activity, BarChart3, ChevronRight, Eye, Server, UserCheck, Globe, Wifi, Book
} from 'lucide-react';
import { UserStats, ZenithCardTier, PlaybookGuideline } from '../types';
import { SOVEREIGN_PLAYBOOK } from '../constants';
import CurrencyConverter from './CurrencyConverter';
import GlossarySheet from './GlossarySheet';

interface AccountScreenProps {
  stats: UserStats;
  swStatus: any;
  isInstallReady: boolean;
  onOpenAdmin: () => void;
  onOpenBusiness: () => void;
  onInstallApp: () => Promise<boolean>;
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const ZenithCard = ({ stats }: { stats: UserStats }) => {
  const isZenith = stats.tier === 'Zenith';
  const isSovereign = stats.tier === 'Sovereign';

  return (
    <div className={`relative w-full aspect-[1.58/1] rounded-[2.5rem] p-8 overflow-hidden shadow-2xl transition-all duration-700 group perspective-1000 ${
      isZenith ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#000] border border-white/20' :
      isSovereign ? 'bg-gradient-to-br from-gold/40 via-gold/10 to-zinc-900 border border-gold/30' :
      'bg-gradient-to-br from-zinc-200 via-zinc-50 to-zinc-300 border border-white dark:from-zinc-800 dark:to-zinc-900'
    }`}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      <div className="absolute -inset-x-full inset-y-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${isZenith || isSovereign ? 'text-gold' : 'text-zinc-500'}`}>
              Identity Protocol
            </h4>
            <p className={`text-2xl serif italic ${isZenith ? 'Citadel Level' : isSovereign ? 'Sovereign Level' : 'Access Level'}`}>
              {isZenith ? 'Camada III' : isSovereign ? 'Camada II' : 'Camada I'}
            </p>
          </div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
            isZenith ? 'bg-gold/10 border-gold/30 text-gold' : 
            isSovereign ? 'bg-black/20 border-gold/20 text-gold' : 
            'bg-black/5 border-black/10 text-zinc-400'
          }`}>
            {isZenith ? <Crown size={28} /> : isSovereign ? <Award size={28} /> : <Gem size={28} />}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className={`text-[8px] font-black uppercase tracking-widest opacity-50 ${isZenith || isSovereign ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                Aderência de Confiança
              </p>
              <p className={`text-xl font-mono ${isZenith || isSovereign ? 'text-gold' : 'text-zinc-900 dark:text-zinc-200'}`}>
                {stats.zenithPoints.toLocaleString()} <span className="text-[10px]">HP</span>
              </p>
            </div>
            <div className="text-right">
              <p className={`text-[8px] font-black uppercase tracking-widest opacity-50 ${isZenith || isSovereign ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                Status
              </p>
              <p className={`text-xs font-bold uppercase tracking-tighter ${isZenith || isSovereign ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                VERIFICAÇÃO ATIVA
              </p>
            </div>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${stats.honorProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountScreen: React.FC<AccountScreenProps> = ({ 
  stats, onOpenAdmin, onOpenBusiness, currentTheme, onToggleTheme 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rituals' | 'playbook'>('overview');
  const [domainStatus, setDomainStatus] = useState<'propagating' | 'sovereign'>('propagating');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.includes('luxvagoprive.com')) {
      setDomainStatus('sovereign');
    } else {
      setDomainStatus('propagating');
    }
  }, []);

  const mockStats: UserStats = {
    ...stats,
    tier: 'Zenith',
    honorProgress: 92,
    isPartner: true
  };

  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto hide-scrollbar pb-40 bg-zinc-50 dark:bg-[#050505] transition-colors">
      <GlossarySheet isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      
      <header className="p-8 pt-12 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-1 leading-none">
            Founder & Protocol Architect
          </h2>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white serif italic leading-tight">Marcos Carvalho</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setIsGlossaryOpen(true)} className="p-3 bg-white dark:bg-zinc-900 rounded-full text-zinc-500 border border-zinc-200 dark:border-white/10 shadow-sm transition-all">
             <Book size={18} />
           </button>
           <button onClick={onToggleTheme} className="p-3 bg-white dark:bg-zinc-900 rounded-full text-gold border border-zinc-200 dark:border-white/10 shadow-sm transition-all">
             {currentTheme === 'dark' ? <Sun size={18} /> : <MoonIcon size={18} />}
           </button>
           <button onClick={onOpenAdmin} className="p-3 bg-zinc-900 rounded-full text-gold border border-gold/20 shadow-sm relative group">
             <Shield size={20} />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050505] animate-pulse" />
           </button>
        </div>
      </header>

      {/* Monitor de Domínio */}
      <div className="px-6 mb-8">
        <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-1000 ${domainStatus === 'sovereign' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-gold/10 border-gold/20'}`}>
          <div className="flex items-center gap-3">
            <Globe size={16} className={domainStatus === 'sovereign' ? 'text-emerald-500' : 'text-gold animate-pulse'} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${domainStatus === 'sovereign' ? 'text-emerald-500' : 'text-gold'}`}>
              {domainStatus === 'sovereign' ? 'Nó Soberano Ativo' : 'Propagação de Protocolo LuxVago'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={12} className={domainStatus === 'sovereign' ? 'text-emerald-500' : 'text-zinc-500'} />
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Vercel Edge</span>
          </div>
        </div>
      </div>

      <div className="px-6 flex gap-4 mb-8 overflow-x-auto hide-scrollbar shrink-0">
        {[
          {id: 'overview', label: 'Aderente Dashboard', icon: Sliders},
          {id: 'rituals', label: 'Protocolos', icon: Coffee},
          {id: 'playbook', label: 'The Playbook', icon: BookOpen}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-gold border-gold text-onyx shadow-xl' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'
            }`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-10">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <ZenithCard stats={mockStats} />
            
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-[3rem] space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Server size={18} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Governança Técnica Zenith</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Sincronizado</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Ativos Sob Protocolo</p>
                    <p className="text-2xl font-black text-white">08</p>
                 </div>
                 <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Aderência Média</p>
                    <p className="text-2xl font-black text-gold">98%</p>
                 </div>
              </div>
              <button onClick={onOpenBusiness} className="w-full bg-white/5 py-4 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 <UserCheck size={14} className="text-gold" /> Auditoria de Aderentes Qualificados
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'playbook' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
             <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <h3 className="text-3xl serif italic text-gold">Bússola de Conduta</h3>
                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.4em]">Padronização LuxVago de Exclusividade</p>
             </div>
             <div className="space-y-6">
                {SOVEREIGN_PLAYBOOK.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-8 rounded-[3rem] space-y-4 relative overflow-hidden group transition-all">
                     <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen size={60} className="text-gold" />
                     </div>
                     <span className="text-[9px] font-black text-gold uppercase tracking-widest">{item.pilar}</span>
                     <h4 className="text-xl font-bold text-zinc-900 dark:text-white serif italic">"{item.directive}"</h4>
                     <div className="flex items-start gap-4 bg-gold/5 p-4 rounded-2xl border border-gold/10">
                        <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                        <p className="text-[11px] text-zinc-800 dark:text-zinc-400 leading-relaxed font-medium">Protocolo: {item.action}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="pt-4"><CurrencyConverter /></div>
      </div>
    </div>
  );
};

export default AccountScreen;
