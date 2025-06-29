import { useCallback, useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { geminiApi, type GeminiResponse } from "@/lib/services/gemini";

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
      "3 ай мен 6 ай аралығы",
      "6-12 ай аралығы",
      "1 жыл-3 жыл аралығы",
      "3 жыл - 5 жыл аралығы",
      "5 жыл-8 жыл аралығы",
      "8 жыл-10 жыл аралығы",
      "10 жылдан астам",
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
    id: "Сабақта қандай оқыту әдістерін жиі қолданасыз?",
    title: "Сабақта қандай оқыту әдістерін жиі қолданасыз? ",
    type: "multiple",
    options: [
      "Топтық жұмыс",
      "Жеке жұмыс",
      "Дискуссия / пікірталас",
      "Жобалық жұмыс",
      "АКТ қолдану",
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

export const ProfDiagnostics = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [geminiResponse, setGeminiResponse] =
    useState<Array<GeminiResponse> | null>(null);

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
    mutationFn: async (data: DiagnosticAnswers) => geminiApi.sendPrompt(data),
    onSuccess: (data) => {
      setGeminiResponse(data);
    },
    onError: (error) => {
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
  }, [showResults, answers]);

  if (showResults) {
    if (isPending) {
      return (
        <div className="my-6 flex h-[50vh] flex-col items-center justify-center gap-2 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-5 border-blue-200 border-t-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="size-[38px] rounded-full bg-white"></div>
          </div>
          <p className="text-gray-500">Жүктелуде...</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Диагностика нәтижелері
          </h2>
          <p className="text-gray-600">
            Сіздің жауаптарыңыз негізінде құрастырылған жеке даму жоспары
          </p>
        </div>

        {geminiResponse && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-1">
              {geminiResponse.map((rec, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
                >
                  <div className="mb-2 text-3xl">{rec.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {rec.recommendation_title}
                  </h3>
                  <p className="mb-3 text-gray-700">
                    {rec.recommendation_description}
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      rec.priority === "Жоғары"
                        ? "bg-red-100 text-red-800"
                        : rec.priority === "Орташа"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    Басымдық: {rec.priority}
                  </span>
                </div>
              ))}
            </div>
          </>
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
            Жеке дамыту жоспарын алу үшін 6 сұраққа жауап беріңіз. Барлық
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
