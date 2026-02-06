
import React, { useState } from 'react';
import {
  Lock, X, Shield, Award, Crown, Activity, Users, Terminal, BarChart3, TrendingUp, Save, Briefcase, Eye, ShieldCheck
} from 'lucide-react';
import { MOCK_HOTELS } from '../constants';

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [activeTab, setActiveTab] = useState<'curadoria' | 'tesouraria' | 'aderentes'>('curadoria');
  const [removedAdherents, setRemovedAdherents] = useState<string[]>(() => {
    const saved = localStorage.getItem('dissolved_adherents');
    return saved ? JSON.parse(saved) : [];
  });

  const [prices, setPrices] = useState({
    t1: Number(localStorage.getItem('zenith_tier1_price')) || 300,
    t2: Number(localStorage.getItem('zenith_tier2_price')) || 650,
    t3: Number(localStorage.getItem('zenith_tier3_price')) || 950
  });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '123456') setIsLocked(false);
    else { setPin(''); alert("Credenciais Inválidas"); }
  };

  const saveTreasury = () => {
    localStorage.setItem('zenith_tier1_price', prices.t1.toString());
    localStorage.setItem('zenith_tier2_price', prices.t2.toString());
    localStorage.setItem('zenith_tier3_price', prices.t3.toString());
    alert("Protocolo Financeiro Sincronizado com a Rede.");
  };

  const handleDissolution = (adherentName: string) => {
    if (window.confirm(`ATENÇÃO: Confirma o isolamento de ${adherentName} da rede Zenith?`)) {
      const updated = [...removedAdherents, adherentName];
      setRemovedAdherents(updated);
      localStorage.setItem('dissolved_adherents', JSON.stringify(updated));
    }
  };

  if (isLocked) {
    return (
      <div className="absolute inset-0 z-[9999] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8">
        <div className="bg-[#0c0d0f] w-full max-w-[360px] rounded-[3rem] p-12 border border-gold/20 text-center space-y-10">
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/20 shadow-xl"><Lock size={32} /></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white serif italic">Gabinete HQ</h2>
            <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.4em]">Autenticação do Arquiteto</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-8">
            <input
              type="password" maxLength={6} value={pin} autoFocus
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-5xl font-black bg-white/5 border border-white/10 rounded-2xl py-6 text-gold outline-none focus:border-gold"
            />
            <button className="w-full bg-gold text-onyx py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Acessar HQ</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[9000] bg-[#050608] flex flex-col animate-in slide-in-from-bottom duration-500">
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0c0d0f]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center font-black text-onyx shadow-lg">Z</div>
          <div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Sovereign Command</h1>
            <p className="text-[7px] text-gold font-bold uppercase tracking-widest">Protocol Architect: Marcos Carvalho</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 text-zinc-500 hover:text-white transition-all"><X size={24} /></button>
      </header>

      <nav className="flex px-8 border-b border-white/5 bg-[#0c0d0f]/50">
        {[
          { id: 'curadoria', icon: Briefcase, label: 'Curadoria' },
          { id: 'tesouraria', icon: BarChart3, label: 'Tesouraria' },
          { id: 'aderentes', icon: Users, label: 'Aderentes' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-6 flex-1 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === t.id ? 'border-gold text-gold bg-gold/5' : 'border-transparent text-zinc-600'}`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto p-10 space-y-12 pb-40">
        {activeTab === 'tesouraria' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white serif italic">Aportes de Aderência</h3>
                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Configure os valores nominais de entrada</p>
              </div>
              <button onClick={saveTreasury} className="px-6 py-4 bg-gold text-onyx rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"><Save size={14} /> Salvar Alterações</button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { id: 't1', label: 'Tier I Fundamental', icon: Shield, key: 't1' },
                { id: 't2', label: 'Tier II Sovereign', icon: Award, key: 't2' },
                { id: 't3', label: 'Tier III Citadel', icon: Crown, key: 't3' }
              ].map(tier => (
                <div key={tier.id} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-between group hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-black/40 rounded-2xl text-gold/50 group-hover:text-gold transition-colors"><tier.icon size={24} /></div>
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{tier.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gold font-bold text-lg">$</span>
                    <input
                      type="number"
                      value={prices[tier.key as keyof typeof prices]}
                      onChange={(e) => setPrices({ ...prices, [tier.key]: Number(e.target.value) })}
                      className="w-32 bg-black border border-white/10 rounded-2xl py-4 px-6 text-xl font-black text-white outline-none focus:border-gold shadow-inner"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gold/5 p-12 rounded-[3.5rem] border border-gold/20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5"><TrendingUp size={120} /></div>
              <p className="text-[11px] text-gold font-black uppercase tracking-[0.4em] mb-4">Volume Total de Aportes (TVL)</p>
              <p className="text-6xl font-black text-white tracking-tighter relative z-10">$142,500.00</p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                <Activity size={12} /> Rede em Conformidade
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curadoria' && (
          <div className="space-y-10 animate-in fade-in">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3"><Eye size={16} className="text-gold" /> Ativos Sob Custódia Zenith</h3>
            <div className="space-y-6">
              {MOCK_HOTELS.map(hotel => (
                <div key={hotel.id} className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-6">
                    <img src={hotel.image} className="w-16 h-16 rounded-2xl object-cover shadow-2xl border border-white/10" alt="" />
                    <div>
                      <p className="text-lg font-bold text-white serif italic">{hotel.name}</p>
                      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Sovereignty Score: {hotel.sovereigntyAudit?.securityScore}%</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[8px] px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full font-black uppercase tracking-widest">Ativo Sincronizado</span>
                    <p className="text-[6px] text-zinc-700 font-mono tracking-widest">ZX-{hotel.id}998-MARCOS</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-3"><Terminal size={16} className="text-gold" /> Protocol Event Log</h3>
              <div className="bg-black/80 p-8 rounded-[2rem] font-mono text-[9px] space-y-3 border border-white/5 h-64 overflow-y-auto hide-scrollbar shadow-inner leading-relaxed">
                <p className="text-emerald-500/70"><span className="text-zinc-700">[SYSTEM]</span> Kernel Vercel Edge 7.3.1 - Conectado via Shibuya Cluster.</p>
                <p className="text-gold/70"><span className="text-zinc-700">[TREASURY]</span> Sincronia de Preços detectada. Novo Delta de Aporte aplicado.</p>
                <p className="text-zinc-500"><span className="text-zinc-700">[AUDIT]</span> Auditoria regional Grand Azure Maldivas: 100% Autonomia.</p>
                <p className="text-emerald-500/70"><span className="text-zinc-700">[CURADORIA]</span> Hotel Asset ID:1 marcado como "Zenith Award Level 3".</p>
                <p className="text-white/30"><span className="text-zinc-700">[HQ]</span> Sessão do Arquiteto Marcos Carvalho iniciada.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aderentes' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white serif italic">Painel de Aderência</h3>
              <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-[9px] font-black uppercase tracking-widest border border-gold/20">03 ATIVOS NA REDE</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "Marcos Carvalho", role: "Arquiteto", score: 100, status: "Soberano", tier: "HQ" },
                { name: "Aderente #042", role: "Associate", score: 98, status: "Conforme", tier: "III" },
                { name: "Aderente #061", role: "Associate", score: 54, status: "Alerta", tier: "II" }
              ].filter(a => !removedAdherents.includes(a.name)).map((a, i) => (
                <div key={i} className="p-8 bg-[#0c0d0f] rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${a.score > 60 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{a.name}</p>
                      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Tier {a.tier} | HP Compliance: {a.score}%</p>
                    </div>
                  </div>
                  {a.score < 60 ? (
                    <button
                      onClick={() => handleDissolution(a.name)}
                      className="px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      Isolar da Rede
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-emerald-500 font-black uppercase">Online</span>
                      <ShieldCheck size={24} className="text-emerald-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
