
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Chave Zenith Ausente");
  return new GoogleGenAI({ apiKey });
};

export async function askConcierge(message: string, context: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Você é o Concierge Zenith da LuxVago Privé. Contexto: ${context}. Mensagem: ${message}`,
    config: {
      systemInstruction: "Seja extremamente sofisticado, breve e use Português de elite.",
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text || "Erro ao processar solicitação.";
}

export async function processHQCommand(command: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Comando Arquiteto: ${command}`,
    config: { thinkingConfig: { thinkingBudget: 4000 } }
  });
  return response.text || "Comando processado com sucesso.";
}
