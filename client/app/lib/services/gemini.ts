import type { DiagnosticAnswers } from "@/features/diagnostics/ProfDiagnostics";
import axios from "axios";

export interface GeminiResponse {
  recommendation_title: string;
  recommendation_description: string;
  priority: string;
  icon: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  pdf_link?: string;
}

export interface DigitalTool {
  name: string;
  description: string;
  link: string;
  category: string;
}

export interface SMARTGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: string;
}

export interface ComprehensiveRecommendation {
  general_advice: {
    title: string;
    content: string;
    icon: string;
  };
  book_recommendations: BookRecommendation[];
  digital_tools: DigitalTool[];
  smart_goal: SMARTGoal;
  additional_tips: string[];
}

export const geminiApi = {
  sendPrompt: async function (
    data: DiagnosticAnswers,
  ): Promise<Array<GeminiResponse>> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = `
Сіз Қазақстандағы мұғалімдерге арналған кәсіби диагностика саласының сарапшысысыз. Пайдаланушының 9 диагностикалық сұраққа берген жауаптары негізінде мәдени тұрғыдан сәйкес, жеке тұлғаға бағытталған ұсыныстарды қазақ тілінде жасаңыз.

3-5 JSON объектісінен тұратын массивпен жауап беріңіз. Әр объектіде мыналар болуы керек:
- "recommendation_title": 3-6 сөз, нақты және қысқа
- "recommendation_description": 4-6 сөйлем, практикалық кеңес
- "priority": "Жоғары", "Орташа", немесе "Төмен" біреуі
- "icon": сәйкес эмодзи

Кәсіби, бірақ достық үнмен жазыңыз. JSON сыртында түсініктеме қоспаңыз.

Диагностикалық деректер:
${JSON.stringify(data, null, 2)}

Келесі аспектілерді ескеріңіз:
1. Мұғалімнің өтілі мен біліктілік санатына сәйкес ұсыныстар беріңіз
2. Таңдалған педагогикалық әдістерге негізделген кеңестер беріңіз
3. Цифрлық сауаттылық деңгейін ескеріңіз
4. Қазақстандық білім беру жүйесінің ерекшеліктерін назарда ұстаңыз
5. Практикалық, орындауға болатын ұсыныстар беріңіз

Мысал шығыс:
[
  {
    "recommendation_title": "Саралап оқыту дағдыларын дамыту",
    "recommendation_description": "Сіздің жауаптарыңыз оқушылардың әртүрлі қабілеттері мен қажеттіліктерін ескере отырып сабақ жүргізу дағдыларын дамыту қажеттігін көрсетеді. Сыныптағы оқушыларды 3-4 топқа бөліп, әр топ үшін дәрежелі тапсырмалар дайындаңыз. Күнделікті сабақта кемінде бір саралап оқыту элементін қолданыңыз. Бұл әдіс әр оқушының жеке қабілетін ашуға және сабаққа деген қызығушылығын арттыруға көмектеседі.",
    "priority": "Жоғары",
    "icon": "🎯"
  }
]
    `.trim();

    try {
      const { data: response } = await axios.post(
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

      let txt = response.candidates[0].content.parts[0].text;
      txt = txt.replace(/^```json|^```|```$/g, "");
      txt = txt.trim();
      const obj = JSON.parse(txt) as GeminiResponse[];
      return obj;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  },

  // New method for comprehensive recommendations
  getComprehensiveRecommendations: async function (
    data: DiagnosticAnswers,
  ): Promise<ComprehensiveRecommendation> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = `
Сіз Қазақстандағы мұғалімдерге арналған кәсіби даму консультантысыз. Диагностика нәтижелері бойынша толық ұсыныстар пакетін дайындаңыз.

Келесі JSON құрылымымен жауап беріңіз:

{
  "general_advice": {
    "title": "Негізгі кеңес тақырыбы",
    "content": "4-5 сөйлемдік толық кеңес",
    "icon": "сәйкес эмодзи"
  },
  "book_recommendations": [
    {
      "title": "Кітап атауы",
      "author": "Автор аты",
      "description": "2-3 сөйлем неге оқу керектігі туралы",
      "pdf_link": "сілтеме (болса)"
    }
  ],
  "digital_tools": [
    {
      "name": "Құрал атауы",
      "description": "қысқа сипаттама және қолдану жолы",
      "link": "веб-сайт мекенжайы",
      "category": "санат"
    }
  ],
  "smart_goal": {
    "specific": "нақты, дәл"
    "measurable": "өлшенетін, саналатын",
    "achievable": "қолжетімді, шынайы",
    "relevant": "құнды, келісілген"
    "timebound": "уақытпен шектелген"
  },
  "additional_tips": [
    "Қосымша практикалық кеңес 1",
    "Қосымша практикалық кеңес 2",
    "Қосымша практикалық кеңес 3"
  ]
}

Диагностикалық деректер:
${JSON.stringify(data, null, 2)}

Қазақ тілінде, мұғалімнің деңгейі мен қажеттіліктеріне сәйкес жауап беріңіз. Практикалық, орындауға болатын ұсыныстар беріңіз.
    `.trim();

    try {
      const { data: response } = await axios.post(
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

      let txt = response.candidates[0].content.parts[0].text;
      txt = txt.replace(/^```json|^```|```$/g, "");
      txt = txt.trim();
      const obj = JSON.parse(txt) as ComprehensiveRecommendation;
      return obj;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  },
};
