
import React from 'react';
import { X, Book, ShieldAlert, Scale, Info } from 'lucide-react';

interface GlossarySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlossarySheet: React.FC<GlossarySheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const terms = [
    { t: "LuxVago Privé", d: "Plataforma tecnológica de facilitação privada, operando como vitrine digital e protocolo de conexão, sem intermediação comercial, financeira ou decisória. Não é agência, associação ou sociedade." },
    { t: "Aderente Qualificado", d: "Pessoa física ou jurídica que aderiu formalmente ao protocolo e foi considerada elegível segundo critérios técnicos e éticos. Não possui direitos políticos ou societários." },
    { t: "Zenith Associate", d: "Denominação institucional para aderentes qualificados em posição fundacional ou estratégica. Não equivale a sócio societário ou acionista." },
    { t: "Tier / Nível Zenith", d: "Camadas técnicas e de curadoria que indicam o grau de integração e acesso. Não conferem poder decisório ou governança política." },
    { t: "Arquiteto do Protocolo", d: "Responsável pela concepção e evolução técnica da infraestrutura. Não exerce função política ou diretiva associativa." },
    { t: "Dissolution Protocol", d: "Mecanismo institucional de encerramento de vínculo em caso de quebra de aderência. Não é punição, mas medida de preservação sistêmica." },
    { t: "Isolamento Neural", d: "Revogação imediata de acessos técnicos e credenciais como medida de proteção da rede." },
    { t: "Não-Associação", d: "Nenhum termo do sistema deve ser interpretado como criação de associação civil, sociedade ou clube jurídico." }
  ];

  return (
    <div className="fixed inset-0 z-[6000] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in" onClick={onClose} />
      <div className="relative bg-[#0c0d0f] rounded-t-[3rem] p-10 space-y-8 animate-in slide-in-from-bottom-full duration-500 max-h-[85vh] overflow-y-auto hide-scrollbar border-t border-gold/30">
        <div className="flex items-center justify-between sticky top-0 bg-[#0c0d0f] pb-4 z-10 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Book className="text-gold" size={24} />
            <div>
              <h2 className="text-2xl font-black text-white serif italic">Glossário Institucional</h2>
              <p className="text-[8px] text-gold font-black uppercase tracking-[0.4em]">Referência Interpretativa Oficial</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-gold"><X size={24} /></button>
        </div>

        <div className="space-y-8 py-4">
          <div className="p-6 bg-gold/5 rounded-2xl border border-gold/20 flex items-start gap-4">
            <ShieldAlert size={20} className="text-gold shrink-0 mt-1" />
            <p className="text-[10px] text-gold/70 font-bold uppercase tracking-widest leading-relaxed">
              ESTE GLOSSÁRIO PREVALECE COMO REFERÊNCIA OFICIAL EM CASO DE AMBIGUIDADES TERMINOLÓGICAS NO ECOSSISTEMA LUXVAGO PRIVÉ.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {terms.map((term, i) => (
              <div key={i} className="space-y-2 group">
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-gold transition-colors">{term.t}</h4>
                <p className="text-[12px] text-pearl/50 leading-relaxed italic serif">{term.d}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Scale size={16} className="text-zinc-500" />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nota de Soberania</span>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
              O LuxVago Privé é juridicamente descrito como Protocolo de Facilitação Privada, operado sob uma rede fechada de aderentes qualificados, sem natureza associativa ou representativa.
            </p>
          </div>
        </div>

        <button onClick={onClose} className="w-full bg-gold text-onyx py-6 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">Ciente do Protocolo</button>
      </div>
    </div>
  );
};

export default GlossarySheet;
