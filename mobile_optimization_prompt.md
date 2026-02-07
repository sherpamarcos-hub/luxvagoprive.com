# Prompt de Otimização Zenith Mobile

Este prompt foi desenhado para garantir que qualquer IA ou desenvolvedor mantenha as prioridades de usabilidade e estética do **LuxVago Privé** em dispositivos móveis.

---

## 🎯 Objetivo

Transformar a interface web mobile em uma experiência dinâmica e premium, eliminando o aspecto "fosco" e garantindo fluidez total.

---

## 🛠️ Diretrizes de Engenharia de Prompt

> "Atue como um Especialista em Mobile UX de Ultra-Luxo. Otimize o repositório LuxVago Privé focando em:"

### 1. Dinamismo de Scroll & Gestos

- **Remover Bloqueios:** Elimine qualquer `overflow-hidden` que não seja estritamente necessário em containers pais. Use `touch-action: pan-y` para permitir gestos naturais.
- **Rolagem Elástica:** Certifique-se de que listas de ativos (hotéis) usem `overflow-y-auto` com `hide-scrollbar` para uma navegação infinita e fluida.

### 2. Visibilidade e Contraste (Cores Onyx & Gold)

- **Eliminar o Cinza:** Substitua cores intermediárias (zinc-500, zinc-700) por pretos profundos (#050505) ou brancos puros (#ffffff) com opacidades baixas.
- **Nitidez de Mapas:** Aplique filtros CSS `contrast(1.2)` e `brightness(0.8)` em tiles de mapa escuro para destacar as ruas e marcadores.
- **Destaque de Preços:** Garanta que valores monetários estajam sempre em `font-black` e cor `gold` (#d4af37) com alto contraste contra o fundo.

### 3. Persistência e Resiliência

- **Zero Atrito no Admin:** Implemente `Auto-Save` via `useEffect` em todas as configurações de tesouraria. O Arquiteto nunca deve clicar em "Salvar" duas vezes.
- **Sincronia Global:** Garanta que mudanças no `localStorage` disparem atualizações imediatas em todas as telas sem reload manual.

### 4. Visual "App Like"

- **Barra de Navegação:** Deve ser `fixed` e `backdrop-blur-3xl`, simulando a transparência de sistemas nativos (iOS/Android).
- **Safe Areas:** Respeite o espaço da "Notch" e da barra de navegação do sistema para evitar botões inacessíveis.

---

**Comando de Execução:**
"Aplique estas diretrizes agora nos componentes `HotelCard`, `HotelMap` e `PartnershipScreen` para garantir que o acesso via `luxvagoprive.com` no mobile seja indistinguível de um app nativo."
