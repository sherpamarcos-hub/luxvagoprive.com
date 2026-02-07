# PROMPT INTEGRAL: ARQUITETO DO PROTOCOLO ZENITH (LUXVAGO PRIVÉ)

**Objetivo**: Reconstruir ou expandir o ecossistema LuxVago Privé como um **Protocolo de Conexão Privada de Alto Luxo**, garantindo estabilidade técnica, fluidez de 60fps e alinhamento filosófico "Old Money".

---

## 1. NATUREZA DO PROJETO

- **Identidade**: Agent Facilitation Agency. Não é um app de viagens comum, é uma curadoria de ativos hoteleiros soberanos.
- **Posicionamento**: Vitrine Tecnológica Imutável. A plataforma é uma ponte B2B/P2P; negociações são diretas e privadas.
- **Jurisdição**: Comarca de Pouso Alegre, Minas Gerais.

---

## 2. STACK TÉCNICA E ESTABILIDADE

- **Core**: React 18.3.1 (Estável) + Vite + TypeScript + Tailwind CSS.
- **Correção Crítica (Black Screen)**:
  - Inserir polyfill `window.process = { env: {} };` no `<head>` do `index.html` para evitar quebra no acesso a variáveis de ambiente.
  - Injetar `GEMINI_API_KEY` via `vite.config.ts` usando o bloco `define`.
- **ImportMap**: Utilizar ESM puro via `esm.sh` para React, Lucide-React e @google/genai.
- **PWA**: Único `manifest.json` na raiz. Service Worker `sw.js` em modo network-first com cache `luxvago-zenith-v4`.

---

## 3. DESIGN SYSTEM (OLD MONEY DIGITAL)

- **Paleta**: Onyx (`#050505`), Gold (`#d4af37`), Pearl (`#fafafa`).
- **Tipografia**: Serifada (Playfair Display) para autoridade; Sans (Inter) para interface técnica.
- **UX**: Micro-interações de 60fps, rounded corners exagerados (`2.5rem` a `4.5rem`), animações `duration-500/700` com `ease-out`.
- **Mobile First**: Viewport travado em `430px` de largura máxima para simular app nativo.

---

## 4. LÓGICAS FUNCIONAIS E PROTOCOLOS

- **Camada de Inteligência (Zenith AI)**:
  - Centralizar tudo em `services/geminiService.ts`.
  - Usar `gemini-3-flash-preview` para insights rápidos e chat com `googleSearch` grounding (sem alucinações).
  - Usar `gemini-3-pro-preview` para comandos administrativos com `thinkingBudget: 4000`.
- **Sovereign Domain Monitor**:
  - Validar status "Nó Soberano Ativo" no front-end para domínios: `localhost`, `vercel.app` e `luxvagoprive.com`.
- **Admin HQ (Cofre de Dados)**:
  - PIN de acesso: `123456`.
  - **Dissolution Protocol**: Lógica funcional que isola aderentes, remove-os da lista e persiste o estado no `LocalStorage`.
- **Fluxo de Navegação Perfeito**:
  - Seleção de Card na Home -> Switch para Mapa -> `flyTo` automático com destaque no hotel.
  - Substituir reloads bruscos por resets de estado (`soft resets`) para fluidez SPA.

---

## 5. REGRAS JURÍDICAS E FINANCEIRAS

- **Manifesto de Aderência**: Cláusulas imutáveis de isenção unilateral e reversão nominal pelo valor de ingresso.
- **Câmbio Zenith**: Conversão dinâmica USD -> BTC via IA Concierge com dados reais de mercado.
- **Smart-Contract-like Flow**: Registro de adesão condicionado ao aceite expresso do manifesto jurídico e prova técnica.

---

## 6. ESTRUTURA DE ARQUIVOS (FONTE ÚNICA)

- `index.html`: Shell estável com polyfills.
- `constants.tsx`: Única fonte de verdade para Pilares P1-P5 e dados mock.
- `types.ts`: Tipagem rigorosa segregando Tiers de Acesso (1, 2, 3) de Tiers de Usuário.
- `geminiService.ts`: Gateway unificado de inteligência.

**DIRETRIZ FINAL**: O LuxVago Privé não aceita "gordura estrutural". Cada linha de código deve servir à soberania e à privacidade do aderente. Se o sistema não transmitir segurança e exclusividade em cada pixel, o protocolo falhou.

**CRITICAL SANITY CHECK**: Antes de propor qualquer código ou funcionalidade, o Arquiteto IA deve validar a proposta contra o `resumo.txt`. Alucinações técnicas (sugestões de libs desnecessárias ou mudanças de stack) serão tratadas como falha de integridade do protocolo. Em caso de dúvida, mantenha a estabilidade do React 18 e a estética "Old Money".
