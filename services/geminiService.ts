
import { GoogleGenAI } from "@google/genai";
import { Hotel } from '../types';

async function callWithRetry<T>(fn: () => Promise<T>, retries: number = 2, delay: number = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error?.status === 429 || error?.message?.includes('429'))) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Chave Zenith ausente.");
  return new GoogleGenAI({ apiKey });
};

export async function getHotelInsight(hotel: Hotel): Promise<string> {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o hotel ${hotel.name} em ${hotel.location}. Gere um insight de ultra-luxo (máximo 7 palavras) sobre o prestígio ou um diferencial único dele.`,
    });
    return response.text || "Excelência auditada pela rede Zenith.";
  });
}

export async function getChatResponse(message: string, hotel: Hotel, history: any[]) {
  return callWithRetry(async () => {
    const ai = getAI();
    const mappedHistory = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));
    const contents = [
      ...mappedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: { 
        systemInstruction: `Você é o Concierge Zenith Elite da LuxVago. Use um tom de extrema sofisticação e polidez. Contexto: Hotel ${hotel.name} em ${hotel.location}. Responda em Português.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.7
      }
    });

    const text = response.text || "Oscilação na rede neural detectada.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks?.map((chunk: any) => ({
      web: { uri: chunk.web?.uri, title: chunk.web?.title }
    })).filter((s: any) => s.web?.uri) || [];

    return { text, sources };
  });
}

export async function convertCurrency(amount: number, from: string, to: string) {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Converta ${amount} ${from} para ${to}. Forneça a cotação real obtida via busca Google Search.`,
      config: { tools: [{ googleSearch: {} }], temperature: 0.1 }
    });
    return { text: response.text || "Conversão indisponível.", sources: [] };
  });
}

export async function processAdminCommand(command: string) {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `COMANDO HQ: "${command}". Forneça um status executivo.`,
      config: { thinkingConfig: { thinkingBudget: 4000 } }
    });
    return { message: response.text || "Comando processado." };
  });
}
