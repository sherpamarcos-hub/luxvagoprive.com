
import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, payload } = req.body;
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Configuração de rede Zenith incompleta (API_KEY ausente)' });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    switch (action) {
      case 'insight': {
        const { hotel } = payload;
        const insightResult = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analise o hotel ${hotel.name} em ${hotel.location}. Gere um insight de luxo (máximo 7 palavras).`,
        });
        return res.status(200).json({ text: insightResult.text || "Excelência Zenith." });
      }

      case 'chat': {
        const { message, hotel: chatHotel, history } = payload;
        const chatContents = [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ];

        const chatResult = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: chatContents,
          config: { 
            systemInstruction: `Você é o Concierge Zenith Elite da LuxVago. Responda sobre o hotel ${chatHotel.name} em ${chatHotel.location} em Português.`,
            tools: [{ googleSearch: {} }],
            temperature: 0.7
          }
        });

        const chatText = chatResult.text || "Desculpe, não consegui processar sua mensagem.";
        const chatChunks = chatResult.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const chatSources = chatChunks?.map((chunk: any) => ({
          uri: chunk.web?.uri,
          title: chunk.web?.title
        })).filter((s: any) => s.uri) || [];

        return res.status(200).json({ text: chatText, sources: chatSources });
      }

      case 'admin': {
        const { command } = payload;
        const adminResult = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `COMANDO HQ: "${command}".`,
          config: { thinkingConfig: { thinkingBudget: 4000 } }
        });
        return res.status(200).json({ message: adminResult.text || "Protocolo concluído." });
      }

      case 'convert': {
        const { amount, from, to } = payload;
        const convResult = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Converta ${amount} ${from} para ${to} usando busca Google Search.`,
          config: { tools: [{ googleSearch: {} }], temperature: 0.1 }
        });

        const convText = convResult.text || "Erro na conversão.";
        const convChunks = convResult.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const convSources = convChunks?.map((chunk: any) => ({
          web: { uri: chunk.web?.uri, title: chunk.web?.title }
        })).filter((s: any) => s.web?.uri) || [];

        return res.status(200).json({ text: convText, sources: convSources });
      }

      default:
        return res.status(400).json({ error: 'Ação não reconhecida' });
    }
  } catch (error: any) {
    console.error('GenAI Serverless Error:', error);
    return res.status(500).json({ error: 'Erro interno no link neural.' });
  }
}
