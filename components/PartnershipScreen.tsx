
// @google/genai coding guidelines followed
import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Award, Crown, Loader2, ScrollText, Landmark, Scale, Landmark as PousoAlegreIcon, AlertTriangle, EyeOff, ShieldCheck, Info, FileText, BookOpen } from 'lucide-react';
import { convertCurrency } from '../services/geminiService';
import GlossarySheet from './GlossarySheet';

interface PartnershipScreenProps {
  isDarkMode: boolean;
}

const PartnershipScreen: React.FC<PartnershipScreenProps> = ({ isDarkMode }) => {
  const [step, setStep] = useState<'manifesto' | 'tier' | 'payment' | 'success'>('manifesto');
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [btcValue, setBtcValue] = useState<string | null>(null);
  const [signature, setSignature] = useState('');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const dynamicPrices = useMemo(() => {
    return {
      tier1: Number(localStorage.getItem('zenith_tier1_price')) || 300,
      tier2: Number(localStorage.getItem('zenith_tier2_price')) || 650,
      tier3: Number(localStorage.getItem('zenith_tier3_price')) || 950
    };
  }, [step]);

  const finalPrice = useMemo(() => {
    if (selectedTier === 1) return dynamicPrices.tier1;
    if (selectedTier === 2) return dynamicPrices.tier2;
    return dynamicPrices.tier3;
  }, [selectedTier, dynamicPrices]);

  useEffect(() => {
    const updateBtcValue = async () => {
      setBtcValue(null);
      try {
        const res = await convertCurrency(finalPrice, 'USD', 'BTC');
        const match = res.text.match(/(\d+\.\d+|\d+)\s*BTC/i);
        if (match) setBtcValue(match[0]);
      } catch (e) {
        setBtcValue("---");
      }
    };
    if (step === 'payment') updateBtcValue();
  }, [finalPrice, step]);

  const handleFinalize = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setStep('success');
    }, 5000);
  };

  if (step === 'success') {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center space-y-12 animate-in zoom-in-95 min-h-[80vh] bg-[#08090b]">
        <div className="relative w-full max-w-[380px] aspect-[3/4.5] bg-[#0c0d0f] border-4 border-gold rounded-[4rem] p-12 flex flex-col items-center justify-between shadow-2xl overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5"><Scale size={200} className="text-gold" /></div>
          <Crown size={72} className="text-gold mt-6 animate-bounce" />
          <div className="space-y-6">
            <h3 className="text-[12px] font-black uppercase tracking-[0.8em] text-gold">Credencial de Aderência</h3>
            <p className="text-4xl serif italic text-white leading-tight">Zenith Associate<br /><span className="text-gold">Nível {selectedTier === 3 ? 'III Citadel' : selectedTier === 2 ? 'II Sovereign' : 'I Fundamental'}</span></p>
          </div>
          <div className="space-y-4 w-full border-t border-gold/20 pt-10">
            <div className="text-[10px] text-pearl/40 uppercase tracking-widest font-black">Auditado pelo Arquiteto:</div>
            <div className="text-2xl serif italic text-gold leading-none mb-1">Marcos Carvalho</div>
            <div className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest">Founder & Protocol Architect</div>
            <div className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest mt-4">Pouso Alegre, MG</div>
          </div>
        </div>
        <button
          onClick={() => setStep('manifesto')}
          className="w-full bg-gold text-onyx py-8 rounded-full font-black text-[12px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
        >
          Retornar ao Protocolo Zenith
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-16 animate-in fade-in bg-[#08090b] min-h-screen pb-48 scroll-smooth">
      <GlossarySheet isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />

      <header className="space-y-6 text-center pt-20">
        <div className="w-24 h-24 bg-gold/10 text-gold rounded-[3rem] flex items-center justify-center mx-auto border border-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
          <Shield size={44} />
        </div>
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-gold serif italic uppercase tracking-tighter leading-none">
            {step === 'manifesto' ? 'O Manifesto' : step === 'tier' ? 'Adesão Qualificada' : 'Liquidação'}
          </h2>
          <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em]">luxvagoprive.com | Protocol Registry</p>
        </div>
      </header>

      {step === 'manifesto' && (
        <div className="space-y-12 animate-in fade-in duration-700">
          <button onClick={() => setIsGlossaryOpen(true)} className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:border-gold/30 transition-all">
            <div className="flex items-center gap-4">
              <BookOpen size={20} className="text-gold" />
              <div className="text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Glossário Obrigatório</p>
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Definições Institucionais</p>
              </div>
            </div>
            <Info size={16} className="text-gold opacity-40" />
          </button>

          <div className="bg-[#0c0d0f] p-10 rounded-[3.5rem] border border-white/5 space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5"><ScrollText size={100} className="text-gold" /></div>

            <div className="space-y-8 relative z-10 text-left overflow-y-auto max-h-[55vh] pr-4 hide-scrollbar">
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
                  <FileText size={18} className="text-gold" />
                  <h3 className="text-[12px] font-black text-gold uppercase tracking-[0.4em]">DISSOLUTION PROTOCOL</h3>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Art 1. Natureza do Vínculo</h4>
                  <p className="text-[11px] text-pearl/70 leading-relaxed font-medium serif italic">
                    "A condição de Zenith Associate constitui vínculo baseado em confiança qualificada, não configurando direito adquirido, societário ou deliberativo."
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Art 3. Isolamento Neural</h4>
                  <p className="text-[11px] text-pearl/70 leading-relaxed font-medium serif italic">
                    "Constatada quebra de aderência ética ou técnica, a rede poderá suspender credenciais e APIs de forma imediata como medida de proteção da integridade sistêmica."
                  </p>
                </div>

                <div className="space-y-4 bg-gold/5 p-6 rounded-3xl border border-gold/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale size={14} className="text-gold" />
                    <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Art 5. Reversão Nominal</h4>
                  </div>
                  <p className="text-[11px] text-gold/60 leading-relaxed font-medium italic">
                    "Em caso de dissolução de confiança, o Arquiteto reserva o direito de recompra da participação pelo VALOR NOMINAL de ingresso, sem reconhecimento de valorização."
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl flex items-start gap-3">
                  <Info size={16} className="text-zinc-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                    NOTA: No LuxVago Privé, a soberania da rede prevalece sobre interesses individuais. Os participantes não possuem poder deliberativo.
                  </p>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10">
                <input
                  type="text" value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="ASSINATURA DIGITAL DO ADERENTE"
                  className="w-full bg-black/40 border-2 border-white/10 rounded-[1.5rem] py-6 px-8 text-xl text-white outline-none focus:border-gold transition-all font-serif italic"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-4 opacity-40">
            <PousoAlegreIcon size={20} className="text-gold" />
            <p className="text-[10px] text-zinc-500 font-bold italic serif">Protocolo assegurado por Marcos Carvalho, Arquiteto. Pouso Alegre, MG.</p>
          </div>

          <button
            disabled={signature.length < 5}
            onClick={() => setStep('tier')}
            className="w-full bg-gold text-onyx py-8 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_30px_60px_-15px_rgba(212,175,55,0.3)] disabled:opacity-20 active:scale-95 transition-all"
          >
            Aceitar Protocolo de Confiança
          </button>
        </div>
      )}

      {step === 'tier' && (
        <div className="space-y-10 animate-in slide-in-from-right duration-500">
          <div className="grid grid-cols-1 gap-8">
            {[
              { id: 1, label: 'Nível I Fundamental', price: dynamicPrices.tier1, icon: Shield, desc: 'Acesso Técnico: Camada 01' },
              { id: 2, label: 'Nível II Sovereign', price: dynamicPrices.tier2, icon: Award, desc: 'Acesso Técnico: Camada 02' },
              { id: 3, label: 'Nível III Citadel', icon: Crown, price: dynamicPrices.tier3, desc: 'Nível Máximo de Curadoria Zenith' }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-10 rounded-[3.5rem] border transition-all flex items-center justify-between group ${selectedTier === tier.id ? 'bg-gold border-gold text-onyx shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/10 text-pearl/40 hover:border-gold/30'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${selectedTier === tier.id ? 'bg-onyx text-gold' : 'bg-white/5 text-gold/50'}`}><tier.icon size={32} /></div>
                  <div className="text-left space-y-1">
                    <p className="text-2xl font-black tracking-tight">{tier.label}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${selectedTier === tier.id ? 'text-onyx opacity-60' : 'text-zinc-600'}`}>{tier.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black tracking-tighter">${tier.price}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-600 text-center font-bold uppercase tracking-widest px-10 italic">"Os Tiers indicam níveis de integração técnica, sem implicar status político, poder de voto ou deliberativo."</p>
          <button onClick={() => setStep('payment')} className="w-full bg-white text-onyx py-8 rounded-full font-black text-[12px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Sincronizar Protocolo de Acesso</button>
        </div>
      )}

      {step === 'payment' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="bg-[#0c0d0f] border border-gold/20 p-12 rounded-[4.5rem] text-center space-y-8 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
            <div className="space-y-2">
              <p className="text-[10px] text-gold font-black uppercase tracking-[0.4em]">Liquidação do Protocolo de Aderência</p>
              <h3 className="text-7xl font-black text-white tracking-tighter">${finalPrice}</h3>
            </div>
            <div className="flex justify-center">
              <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-gold rounded-full animate-ping" />
                <span className="text-[14px] font-black text-gold uppercase tracking-[0.2em]">{btcValue || "..."} BTC</span>
              </div>
            </div>
          </div>
          <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 text-center">
            <p className="text-[11px] text-zinc-500 leading-relaxed italic serif italic px-4">
              "Este aporte constitui adesão ao protocolo de facilitação privada LuxVago, condicionado à conformidade técnica e ética permanente."
            </p>
          </div>
          <button onClick={handleFinalize} disabled={isRegistering} className="w-full bg-gold text-onyx py-8 rounded-full font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
            {isRegistering ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span className="animate-pulse">SINCRONIZANDO COM A REDE...</span>
              </>
            ) : 'Finalizar Adesão Qualificada'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PartnershipScreen;
