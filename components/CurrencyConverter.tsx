import React, { useState } from 'react';
import { RefreshCw, ArrowRightLeft, TrendingUp, Sparkles, Loader2, Coins } from 'lucide-react';
import { convertCurrency } from '../services/geminiService';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BTC');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await convertCurrency(Number(amount), from, to);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#121418] to-[#08090b] border border-gold/20 rounded-[3rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl text-gold border border-gold/20">
            <Coins size={20} />
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gold">Câmbio Zenith & Crypto</h3>
            <p className="text-[8px] text-steel font-bold uppercase tracking-widest opacity-50">Sincronização em Tempo Real</p>
          </div>
        </div>
        <Sparkles size={16} className="text-gold/30" />
      </div>

      <div className="space-y-5 relative z-10">
        <div className="relative group">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/60 border border-white/5 rounded-3xl p-6 pt-12 text-4xl font-black outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/10"
          />
          <span className="absolute top-5 left-7 text-[9px] font-black text-gold uppercase tracking-[0.2em]">Montante</span>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <select 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              className="bg-black border border-gold/40 text-gold font-black text-[11px] px-5 py-3 rounded-2xl outline-none appearance-none cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BRL">BRL</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center -my-4 relative z-20">
          <button 
            onClick={() => {setFrom(to); setTo(from);}}
            className="bg-gold text-onyx p-4 rounded-full shadow-2xl border-4 border-[#0c0d0f] active:rotate-180 transition-transform duration-500"
          >
            <ArrowRightLeft size={20} />
          </button>
        </div>

        <div className="relative">
          <div className="w-full bg-black/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-gold uppercase tracking-widest block opacity-50">Conversão Para</span>
              <span className="text-3xl font-black text-pearl tracking-tight uppercase">{to}</span>
            </div>
            <select 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              className="bg-black border border-gold/40 text-gold font-black text-[11px] px-5 py-3 rounded-2xl outline-none appearance-none cursor-pointer"
            >
              <option value="BTC">BTC</option>
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-gold text-onyx font-black py-7 rounded-full uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-2"><Loader2 size={24} className="animate-spin" /> ACESSANDO BLOCKCHAIN...</div>
          ) : (
            <span className="flex items-center gap-2">OBTER COTAÇÃO ZENITH <RefreshCw size={14} /></span>
          )}
        </button>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 pt-4">
          <div className="p-7 bg-gold/5 border border-gold/20 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
            <p className="text-[14px] serif italic leading-relaxed text-pearl pr-2">{result.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;