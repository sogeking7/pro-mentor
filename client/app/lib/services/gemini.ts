import type { DiagnosticAnswers } from "@/features/diagnostics/ProfDiagnostics";
import axios from "axios";

export interface GeminiResponse {
  recommendation_title: string;
  recommendation_description: string;
  priority: string;
  icon: string;
}

export const geminiApi = {
  sendPrompt: async function (
    data: DiagnosticAnswers,
  ): Promise<Array<GeminiResponse>> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = `
You are an expert in professional diagnostics for teachers in Kazakhstan. Based on the user's answers to 6 diagnostic questions, generate culturally appropriate, personalized recommendations in Kazakh language.

Respond with an array of 3–5 JSON objects. Each object should include:
- "recommendation_title": 3–6 words, clear and concise
- "recommendation_description": 3–5 sentences of practical advice
- "priority": one of "Жоғары", "Орташа", or "Төмен"
- "icon": a relevant emoji

Use professional, yet friendly tone. Do NOT include explanations outside of the JSON.

User answers:
${JSON.stringify(data, null, 2)}

Example output:
[
  {
    "recommendation_title": "Оқыту стилін бейімдеу",
    "recommendation_description": "Сіздің сұрақтарға берген жауаптарыңыз оқушылардың әртүрлі оқу стильдеріне назар аудару қажеттігін көрсетеді. Сабақ барысында визуалды және аудио материалдарды көбірек қолдануға тырысыңыз. Бұл әдіс оқушылардың белсенділігін арттырады және үлгерімін жақсартады.",
    "priority": "Жоғары",
    "icon": "📚"
  },
  ...
]
    `.trim();

    try {
      const { data } = await axios.post(
        endpoint,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      let txt = data.candidates[0].content.parts[0].text;
      txt = txt.replace(/^```|```$/g, "");
      txt = txt.replace("json", "");
      const obj = JSON.parse(txt) as GeminiResponse[];
      return obj;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  },
};
