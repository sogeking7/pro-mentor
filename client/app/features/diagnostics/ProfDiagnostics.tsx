import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ExternalLink,
  Lightbulb,
  Monitor,
  Target,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  type ComprehensiveRecommendation,
  geminiApi,
} from "@/lib/services/gemini";

interface DiagnosticQuestion {
  id: string;
  title: string;
  type: "single" | "multiple";
  options: string[];
}

export interface DiagnosticAnswers {
  [key: string]: string | string[];
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "Қызмет ету бағыты (лауазым)",
    title: "Қызмет ету бағыты (лауазым)",
    type: "single",
    options: [
      "Бастауыш сынып мұғалімі",
      "Қазақ тілі пәні мұғалімі",
      "Математика пәні мұғалімі",
      "Ағылшын пәні мұғалімі",
      "Орыс тілі пәні мұғалімі",
      "Тарих пәні мұғалімі",
      "Физика пәні мұғалімі",
      "Химия пәні мұғалімі",
      "Биология пәні мұғалімі",
      "География пәні мұғалімі",
    ],
  },
  {
    id: "Жұмыс өтілі",
    title: "Жұмыс өтілі",
    type: "single",
    options: [
      "3 ай – 6 ай",
      "6 – 12 ай",
      "1 – 3 жыл",
      "3 – 5 жыл",
      "5 – 8 жыл",
      "8 – 10 жыл",
    ],
  },
  {
    id: "Біліктілік санаты",
    title: "Біліктілік санаты",
    type: "single",
    options: [
      "Педагог",
      "Педагог-модератор",
      "Педагог-сарапшы",
      "Педагог-зерттеуші",
      "Педагог-шебер",
    ],
  },
  {
    id: "Өз пәніңіз бойынша білім деңгейіңізді қаншалықты жоғары деп бағалайсыз?",
    title:
      "Өз пәніңіз бойынша білім деңгейіңізді қаншалықты жоғары деп бағалайсыз?",
    type: "single",
    options: ["Өте жоғары", "Жоғары", "Орташа", "Төмен"],
  },
  {
    id: "Оқу үдерісін ұйымдастыруда қандай педагогикалық әдіс-тәсілдерді қолданасыз?",
    title:
      "Оқу үдерісін ұйымдастыруда қандай педагогикалық әдіс-тәсілдерді қолданасыз?",
    type: "multiple",
    options: [
      "Құндылыққа бағытталған ұстаным",
      "Саралап оқыту ұстанымы",
      "Ойын іс-әрекеті арқылы оқыту",
      "Коммуникативтік ұстаным",
      "АКТ қолдану",
      "Жобалық ұстаным",
      "Тұлғаға бағытталған ұстаным",
      "Іс-әрекеттік ұстаным",
      "Ортақ тақырыптар арқылы оқыту",
    ],
  },
  {
    id: "Қазіргі жұмысыңыз сізді қаншалықты шабыттандырады?",
    title: "Қазіргі жұмысыңыз сізді қаншалықты шабыттандырады?",
    type: "single",
    options: [
      "Өте шабыттандырады",
      "Жай ғана жұмыс ретінде қабылдаймын",
      "Шаршаймын",
    ],
  },
  {
    id: "Қызметіңізде жиі кездесетін мәселе қандай?",
    title: "Қызметіңізде жиі кездесетін мәселе қандай?",
    type: "multiple",
    options: [
      "Ата-аналармен жұмыс",
      "Инклюзивті білім беру",
      "Дарынды баламен жұмыс",
      "Құжаттармен жұмыс",
      "Пәндік біліміме сенімсіздік",
      "Тұлғалық даму",
      "Уақытты тиімді жоспарламау",
    ],
  },
  {
    id: "Қазіргі таңда қандай бағытта дамуды қалайсыз?",
    title: "Қазіргі таңда қандай бағытта дамуды қалайсыз?",
    type: "multiple",
    options: [
      "Цифрлық сауаттылық",
      "Сабақ жоспарын жетілдіру",
      "Жаңа әдістерді меңгеру",
      "Эмоциялық интеллект",
      "Уақытты басқару",
      "Оқушылармен қарым-қатынас",
    ],
  },
  {
    id: "Сабақта қандай цифрлық платформаларды жиі қолданасыз?",
    title: "Сабақта қандай цифрлық платформаларды жиі қолданасыз?",
    type: "multiple",
    options: [
      "Google Forms / Docs / Classroom",
      "BilimLand / Kundelik",
      "Canva / Wordwall / Quizizz",
      "Zoom / Meet / Teams",
      "Жасанды интеллект құралдары (мысалы: ChatGPT, MagicSchool т.б.)",
      "Қолдана алмаймын",
    ],
  },
];

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => (
  <div className="mb-6">
    <div className="mb-2 flex justify-between text-sm">
      <span>Прогресс</span>
      <span>
        {current} / {total}
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const OptionButton = ({
  option,
  isSelected,
  isMultiple,
  onClick,
}: {
  option: string;
  isSelected: boolean;
  isMultiple: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
      isSelected
        ? "border-blue-500 bg-blue-50 text-blue-700"
        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
    }`}
  >
    <div className="flex items-center">
      <div
        className={`mr-3 h-4 w-4 flex-shrink-0 border-2 transition-all duration-200 ${
          isMultiple ? "rounded-xs" : "rounded-full"
        } ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
      >
        {isSelected &&
          (isMultiple ? (
            <Check color="white" size={12} strokeWidth={3} />
          ) : (
            <div className="m-0.5 h-2 w-2 rounded-full bg-white" />
          ))}
      </div>
      {option}
    </div>
  </button>
);

const ComprehensiveResults = ({
  recommendation,
}: {
  recommendation: ComprehensiveRecommendation;
}) => {
  return (
    <div className="space-y-8">
      {/* General Advice Section */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 shadow-md">
        <div className="mb-4 flex items-center">
          <div className="mr-4 text-4xl">
            {recommendation.general_advice.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Кеңес: {recommendation.general_advice.title}
          </h3>
        </div>
        <p className="leading-relaxed text-gray-700">
          {recommendation.general_advice.content}
        </p>
      </div>

      {/* Book Recommendations Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center">
          <BookOpen className="mr-3 h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800">
            Ұсынылатын кітаптар:
          </h3>
        </div>
        <div className="space-y-4">
          {recommendation.book_recommendations.map((book, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    «{book.title}»
                  </h4>
                  <p className="text-sm text-gray-600">– {book.author}</p>
                </div>
                {book.pdf_link && (
                  <a
                    href={book.pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-700">{book.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Tools Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center">
          <Monitor className="mr-3 h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">
            Цифрлық құрал ұсынысы:
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendation.digital_tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {tool.category}
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-700">{tool.description}</p>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                Сілтеме <ExternalLink className="ml-1" size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SMART Goal Section */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 p-6 shadow-md">
        <div className="mb-4 flex items-center">
          <Target className="mr-3 h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800">
            Жеке даму мақсаты (SMART):
          </h3>
        </div>
        <div className="grid gap-3 space-y-3 md:grid-cols-1">
          <div className="rounded-lg bg-white p-4">
            <p className="font-semibold text-gray-800">Specific:</p>
            <p className="text-gray-700">
              {recommendation.smart_goal.specific}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-sm font-semibold text-gray-800">Measurable:</p>
            <p className="text-sm text-gray-700">
              {recommendation.smart_goal.measurable}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-sm font-semibold text-gray-800">Achievable</p>
            <p className="text-sm text-gray-700">
              {recommendation.smart_goal.achievable}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-sm font-semibold text-gray-800">Relevant</p>
            <p className="text-sm text-gray-700">
              {recommendation.smart_goal.relevant}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-sm font-semibold text-gray-800">Time bound</p>
            <p className="text-sm text-gray-700">
              {recommendation.smart_goal.timebound}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Tips Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center">
          <Lightbulb className="mr-3 h-6 w-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-800">Қосымша кеңестер:</h3>
        </div>
        <div className="space-y-3">
          {recommendation.additional_tips.map((tip, index) => (
            <div key={index} className="flex items-start">
              <div className="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProfDiagnostics = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [geminiResponse, setGeminiResponse] =
    useState<ComprehensiveRecommendation | null>(null);

  const handleAnswer = useCallback(
    (questionId: string, answer: string, isMultiple = false) => {
      setAnswers((prev) => {
        if (isMultiple) {
          const current = (prev[questionId] as string[]) || [];
          const updated = current.includes(answer)
            ? current.filter((a) => a !== answer)
            : [...current, answer];
          return { ...prev, [questionId]: updated };
        }
        return { ...prev, [questionId]: answer };
      });
    },
    [],
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex === 0) {
      setCurrentIndex(1);
    } else if (currentIndex >= DIAGNOSTIC_QUESTIONS.length) {
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const resetDiagnostic = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setGeminiResponse(null);
  }, []);

  const currentQuestion = useMemo(() => {
    if (currentIndex === 0) return null;
    return DIAGNOSTIC_QUESTIONS[currentIndex - 1] || null;
  }, [currentIndex]);

  const hasAnswer = useMemo(() => {
    if (!currentQuestion) return true;
    const answer = answers[currentQuestion.id];
    return currentQuestion.type === "multiple"
      ? Array.isArray(answer) && answer.length > 0
      : Boolean(answer);
  }, [currentQuestion, answers]);

  const { mutateAsync: sendPrompt, isPending } = useMutation({
    mutationFn: async (data: DiagnosticAnswers) =>
      geminiApi.getComprehensiveRecommendations(data),
    onSuccess: (data) => {
      setGeminiResponse(data);
    },
    onError: (error) => {
      console.error("Error getting recommendations:", error);
      setGeminiResponse(null);
    },
  });

  useEffect(() => {
    if (showResults) {
      const sendResults = async () => {
        await sendPrompt(answers);
      };

      sendResults();
    }
  }, [showResults, answers, sendPrompt]);

  if (showResults) {
    if (isPending) {
      return (
        <div className="my-6 flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl">🤖</div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              ЖИ талдау жүргізуде...
            </h3>
            <p className="text-gray-500">
              Сіздің жауаптарыңыз негізінде жеке ұсыныстар дайындалуда
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            🤖 ЖИ-дің талдауы мен ұсынысы
          </h2>
          <p className="text-gray-600">
            Сіздің жауаптарыңыз негізінде құрастырылған жеке даму жоспары
          </p>
        </div>

        {geminiResponse ? (
          <ComprehensiveResults recommendation={geminiResponse} />
        ) : (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <div className="mb-2 text-4xl">⚠️</div>
            <h3 className="mb-2 text-xl font-semibold text-red-800">
              Ұсыныстарды алу кезінде қате орын алды
            </h3>
            <p className="text-red-600">
              Қайтадан көруге болады немесе жүйе әкімшісіне хабарласыңыз
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={resetDiagnostic}
            className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Қайтадан өту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {currentIndex === 0 ? (
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center">
          <div className="mb-4 text-4xl">🔬</div>
          <h3 className="mb-4 text-2xl font-bold">
            AI-негізделген кәсіби диагностика
          </h3>
          <p className="mb-6 text-gray-600">
            Жеке дамыту жоспарын алу үшін 9 сұраққа жауап беріңіз. Барлық
            деректер құпия сақталады.
          </p>
          <button
            onClick={nextQuestion}
            className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Диагностиканы бастау
          </button>
        </div>
      ) : (
        <div>
          <ProgressBar
            current={currentIndex}
            total={DIAGNOSTIC_QUESTIONS.length}
          />

          {currentQuestion && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {currentQuestion.title}
              </h3>
              <p className="mb-6 text-gray-600">
                {currentQuestion.type === "single"
                  ? "Бір жауапты сұрақ"
                  : "Көп жауапты сұрақ"}
              </p>

              <div className="mb-6 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isMultiple = currentQuestion.type === "multiple";
                  const currentAnswers = answers[currentQuestion.id];
                  const isSelected = isMultiple
                    ? Array.isArray(currentAnswers) &&
                      currentAnswers.includes(option)
                    : currentAnswers === option;

                  return (
                    <OptionButton
                      key={index}
                      option={option}
                      isSelected={isSelected}
                      isMultiple={isMultiple}
                      onClick={() =>
                        handleAnswer(currentQuestion.id, option, isMultiple)
                      }
                    />
                  );
                })}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  className="rounded-full border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50"
                >
                  Артқа
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!hasAnswer}
                  className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {currentIndex >= DIAGNOSTIC_QUESTIONS.length
                    ? "Аяқтау"
                    : "Келесі"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
