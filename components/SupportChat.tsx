
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, ExternalLink, Loader2, MessageSquare, Mic, MicOff, Volume2 } from 'lucide-react';
import { Hotel } from '../types';
import { getChatResponse } from '../services/geminiService';

const SupportChat: React.FC<{ hotel: Hotel; isDarkMode: boolean; isOpenExternal?: boolean; onCloseExternal?: () => void; }> = ({ hotel, isOpenExternal, onCloseExternal }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 'init', text: `Concierge Zenith ativo. Como posso auxiliar seu desejo de luxo no ${hotel.name}?`, sender: 'bot', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;

  const handleSendMessage = async (textOverride?: string) => {
    const userText = textOverride || input.trim();
    if (!userText || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user', timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);
    try {
      const result = await getChatResponse(userText, hotel, []);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: result.text, sender: 'bot', timestamp: new Date(), sources: result.sources || [] }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, text: "Oscilação na rede Zenith.", sender: 'bot', timestamp: new Date(), isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setInternalOpen(true)} className="fixed bottom-28 right-6 w-16 h-16 bg-gold text-onyx rounded-full shadow-2xl flex items-center justify-center z-[500] active:scale-90 border-4 border-onyx group">
        <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[3000] bg-[#050505] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
      <header className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isVoiceMode ? 'bg-gold text-onyx shadow-[0_0_20px_#d4af37]' : 'bg-white/5 text-gold'}`}>
            {isVoiceMode ? <Mic size={24} /> : <Sparkles size={24} />}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Zenith Live Interface</p>
            <p className="text-xs text-white serif italic">Protocolo de Voz Ativo</p>
          </div>
        </div>
        <button onClick={() => onCloseExternal ? onCloseExternal() : setInternalOpen(false)} className="p-3 text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
      </header>

      {isVoiceMode ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-12">
           <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse" />
              <div className="w-40 h-40 rounded-full border-2 border-gold/30 flex items-center justify-center relative z-10">
                 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/40 to-transparent flex items-center justify-center">
                    <div className="flex gap-1 items-end h-8">
                       {[1,2,3,4,3,2,1].map((h, i) => (
                         <div key={i} className="w-1 bg-gold rounded-full animate-bounce" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
           <div className="text-center space-y-4">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Ouvindo Desejos...</h3>
              <p className="text-[10px] text-gold font-bold uppercase tracking-[0.4em]">Fale naturalmente com seu Concierge</p>
           </div>
           <button onClick={() => setIsVoiceMode(false)} className="bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">Encerrar Sessão de Voz</button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-[14px] leading-relaxed shadow-xl ${msg.sender === 'user' ? 'bg-gold text-onyx font-bold rounded-tr-none' : 'bg-zinc-900 border border-white/5 text-zinc-100 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-[8px] text-gold font-black uppercase animate-pulse">Sincronizando Resposta Zenith...</div>}
          <div ref={scrollRef} />
        </div>
      )}

      <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="flex gap-4">
          {!isVoiceMode && (
            <div className="flex-1 relative">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Solicitar protocolo..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white outline-none focus:border-gold/50"
              />
              <button onClick={() => handleSendMessage()} className="absolute right-2 top-2 p-3.5 bg-gold text-onyx rounded-xl"><Send size={18} /></button>
            </div>
          )}
          <button 
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`p-5 rounded-2xl border transition-all ${isVoiceMode ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-gold/10 border-gold/20 text-gold hover:bg-gold/20'}`}
          >
            {isVoiceMode ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
