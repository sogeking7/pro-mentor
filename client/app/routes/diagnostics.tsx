import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import React, { useState } from "react";
import { SideBar, type SideBarSections } from "@/components/custom/SideBar";

export default function DiagnosticsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
  const [showDiagnosticResults, setShowDiagnosticResults] = useState(false);

  const diagnosticQuestions = [
    {
      id: "position",
      title: "Қызмет ету бағыты (лауазым)",
      type: "single",
      options: [
        "Студент/Болашақ мұғалім",
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
      id: "experience",
      title: "Жұмыс өтілі / Оқу кезеңі",
      type: "single",
      options: [
        "Студент (1-2 курс)",
        "Студент (3-4 курс)",
        "Тәжірибе жоқ (жаңа бітірген)",
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
      id: "digital_skills",
      title: "Цифрлы технологиялармен жұмыс дағдылары",
      type: "single",
      options: [
        "Базалық деңгей (Word, PowerPoint)",
        "Орташа деңгей (Excel, онлайн платформалар)",
        "Жақсы деңгей (интерактивті тақталар, білім беру қосымшалары)",
        "Жоғары деңгей (AI құралдар, кодтау негіздері)",
        "Эксперт деңгей (жаңа технологияларды енгізу, басқаларды үйрету)",
      ],
    },
    {
      id: "challenges",
      title: "Кәсіби қызметтегі негізгі қиындықтар",
      type: "multiple",
      options: [
        "Оқушыларды мотивациялау",
        "Дисциплинаны сақтау",
        "Ата-аналармен қарым-қатынас",
        "Жаңа технологияларды меңгеру",
        "Уақытты басқару",
        "Сабақты жоспарлау",
        "Бағалау жүйесі",
        "Кәсіби құжаттама",
        "Стресс және эмоционалды жүктеме",
        "Кәсіби дамуға уақыт тапу",
      ],
    },
    {
      id: "goals",
      title: "Кәсіби дамудағы басым бағыттар",
      type: "multiple",
      options: [
        "Пәндік білімді тереңдету",
        "Жаңа оқыту әдістерін меңгеру",
        "AI технологияларын қолдану",
        "Дарынды балалармен жұмыс",
        "Инклюзивті білім беру",
        "Лидерлік дағдыларды дамыту",
        "Зерттеушілік қызмет",
        "Халықаралық тәжірибе алу",
        "Санат көтеру",
        "Өз бизнесін бастау",
      ],
    },
    {
      id: "learning_style",
      title: "Сіз үшін тиімді оқыту форматы",
      type: "single",
      options: [
        "Онлайн курстар (өз қарқынымен)",
        "Тікелей семинарлар мен тренингтер",
        "Менторлықпен жеке жұмыс",
        "Топтық жобалар мен тәжірибе алмасу",
        "Өзіндік зерттеу және кітап оқу",
        "Практикалық тапсырмалар мен кейстер",
        "Видео материалдар мен подкастер",
        "Конференциялар мен форумдар",
      ],
    },
  ];

  const handleDiagnosticAnswer = (
    questionId: string,
    answer: string,
    isMultiple = false,
  ) => {
    if (isMultiple) {
      const currentAnswers = diagnosticAnswers[questionId] || [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];
      setDiagnosticAnswers({ ...diagnosticAnswers, [questionId]: newAnswers });
    } else {
      setDiagnosticAnswers({ ...diagnosticAnswers, [questionId]: answer });
    }
  };

  const nextDiagnosticQuestion = () => {
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowDiagnosticResults(true);
    }
  };

  const prevDiagnosticQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setDiagnosticAnswers({});
    setShowDiagnosticResults(false);
  };

  const generateRecommendations = () => {
    const experience = diagnosticAnswers.experience;
    const position = diagnosticAnswers.position;
    const digitalSkills = diagnosticAnswers.digital_skills;
    const challenges = diagnosticAnswers.challenges || [];
    const goals = diagnosticAnswers.goals || [];

    let recommendations = [];

    // Experience-based recommendations
    if (
      experience &&
      (experience.includes("Студент") || experience.includes("Тәжірибе жоқ"))
    ) {
      recommendations.push({
        title: "Базалық педагогикалық дағдылар",
        description: "Сабақ жоспарлау, сынып басқару және бағалау негіздері",
        priority: "Жоғары",
        icon: "📚",
      });
    }

    // Digital skills recommendations
    if (digitalSkills && digitalSkills.includes("Базалық деңгей")) {
      recommendations.push({
        title: "Цифрлы сауаттылық",
        description:
          "Заманауи білім беру технологиялары мен платформаларды меңгеру",
        priority: "Орташа",
        icon: "💻",
      });
    }

    // Challenge-based recommendations
    if (challenges.includes("Оқушыларды мотивациялау")) {
      recommendations.push({
        title: "Мотивация техникалары",
        description: "Оқушылардың қызығушылығын арттыру әдістері",
        priority: "Жоғары",
        icon: "🎯",
      });
    }

    if (challenges.includes("Стресс және эмоционалды жүктеме")) {
      recommendations.push({
        title: "Эмоционалдық интеллект",
        description: "Стресс менеджменті және эмоционалдық тепе-теңдік",
        priority: "Жоғары",
        icon: "🧘",
      });
    }

    // Goals-based recommendations
    if (goals.includes("AI технологияларын қолдану")) {
      recommendations.push({
        title: "AI білім беруде",
        description: "Жасанды интеллект құралдарын педагогикада қолдану",
        priority: "Жаңашыл",
        icon: "🤖",
      });
    }

    if (goals.includes("Дарынды балалармен жұмыс")) {
      recommendations.push({
        title: "Дарынды балалар педагогикасы",
        description: "Ерекше қабілетті оқушылармен жұмыс жасау әдістемесі",
        priority: "Арнайы",
        icon: "⭐",
      });
    }

    return recommendations.length > 0
      ? recommendations
      : [
          {
            title: "Жалпы кәсіби даму",
            description: "Педагогикалық шеберлікті жетілдіру",
            priority: "Базалық",
            icon: "📈",
          },
        ];
  };

  const sections: SideBarSections = [
    {
      title: "📈 Кәсіби диагностика",
      content: (
        <div className="space-y-6">
          {!showDiagnosticResults ? (
            <div>
              {currentQuestionIndex === 0 ? (
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center">
                  <div className="mb-4 text-4xl">🔬</div>
                  <h3 className="mb-4 text-2xl font-bold">
                    AI-негізделген кәсіби диагностика
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Жеке дамыту жоспарын алу үшін 6 сұраққа жауап беріңіз.
                    Барлық деректер құпия сақталады.
                  </p>
                  <button
                    onClick={nextDiagnosticQuestion}
                    className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Диагностиканы бастау
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Прогресс</span>
                      <span>
                        {currentQuestionIndex} / {diagnosticQuestions.length}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                        style={{
                          width: `${(currentQuestionIndex / diagnosticQuestions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-6 text-xl font-bold text-gray-800">
                      {diagnosticQuestions[currentQuestionIndex - 1]?.title}
                    </h3>

                    <div className="mb-6 space-y-3">
                      {diagnosticQuestions[
                        currentQuestionIndex - 1
                      ]?.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleDiagnosticAnswer(
                              diagnosticQuestions[currentQuestionIndex - 1].id,
                              option,
                              diagnosticQuestions[currentQuestionIndex - 1]
                                .type === "multiple",
                            )
                          }
                          className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                            diagnosticQuestions[currentQuestionIndex - 1]
                              .type === "multiple"
                              ? diagnosticAnswers[
                                  diagnosticQuestions[currentQuestionIndex - 1]
                                    .id
                                ]?.includes(option)
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                              : diagnosticAnswers[
                                    diagnosticQuestions[
                                      currentQuestionIndex - 1
                                    ].id
                                  ] === option
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`mr-3 h-4 w-4 rounded-full border-2 ${
                                diagnosticQuestions[currentQuestionIndex - 1]
                                  .type === "multiple"
                                  ? diagnosticAnswers[
                                      diagnosticQuestions[
                                        currentQuestionIndex - 1
                                      ].id
                                    ]?.includes(option)
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                  : diagnosticAnswers[
                                        diagnosticQuestions[
                                          currentQuestionIndex - 1
                                        ].id
                                      ] === option
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                              }`}
                            >
                              {((diagnosticQuestions[currentQuestionIndex - 1]
                                .type === "multiple" &&
                                diagnosticAnswers[
                                  diagnosticQuestions[currentQuestionIndex - 1]
                                    .id
                                ]?.includes(option)) ||
                                (diagnosticQuestions[currentQuestionIndex - 1]
                                  .type === "single" &&
                                  diagnosticAnswers[
                                    diagnosticQuestions[
                                      currentQuestionIndex - 1
                                    ].id
                                  ] === option)) && (
                                <div className="m-0.5 h-2 w-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={prevDiagnosticQuestion}
                        className="rounded-full border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50"
                      >
                        Артқа
                      </button>

                      <button
                        onClick={nextDiagnosticQuestion}
                        disabled={
                          !diagnosticAnswers[
                            diagnosticQuestions[currentQuestionIndex - 1]?.id
                          ]
                        }
                        className="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {currentQuestionIndex === diagnosticQuestions.length
                          ? "Аяқтау"
                          : "Келесі"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-8 text-center">
                <div className="mb-4 text-6xl">🎉</div>
                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                  Диагностика нәтижелері
                </h2>
                <p className="text-gray-600">
                  Сіздің жауаптарыңыз негізінде құрастырылған жеке даму жоспары
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-800">
                    📋 Сіздің профиліңіз
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Лауазым:
                      </span>
                      <span className="text-gray-800">
                        {diagnosticAnswers.position}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Тәжірибе:
                      </span>
                      <span className="text-gray-800">
                        {diagnosticAnswers.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Цифрлы дағдылар:
                      </span>
                      <span className="text-gray-800">
                        {diagnosticAnswers.digital_skills}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-green-800">
                    🎯 Жеке ұсыныстар
                  </h3>
                  <div className="space-y-3">
                    {generateRecommendations()
                      .slice(0, 3)
                      .map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-xl">{rec.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">
                              {rec.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {rec.description}
                            </div>
                            <span
                              className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                rec.priority === "Жоғары"
                                  ? "bg-red-100 text-red-700"
                                  : rec.priority === "Орташа"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {rec.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                <h3 className="mb-4 text-xl font-semibold text-purple-800">
                  📚 Ұсынылатын курстар
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {generateRecommendations().map((rec, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-purple-100 bg-white p-4"
                    >
                      <div className="mb-2 flex items-center space-x-3">
                        <span className="text-2xl">{rec.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {rec.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {rec.description}
                          </div>
                        </div>
                      </div>
                      <button className="mt-3 w-full rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition-all hover:bg-purple-700">
                        Курсқа жазылу
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetDiagnostic}
                  className="mr-4 transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Қайтадан өту
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "📝 Психологиялық тестілер",
      content: (
        <div className="space-y-6">
          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-2 font-semibold">
              Психологиялық тестілер не үшін керек?
            </h4>
            <p className="text-gray-700">
              Жеке тұлғалық ерекшеліктерді, қабілеттерді және даму потенциалын
              анықтау үшін.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "16 Personalities (MBTI негізінде)",
                description:
                  "Сіздің ойлау, қарым-қатынас, шешім қабылдау стиліңізге қарай 16 типтің біріне жатқызады.",
                result:
                  "Сипаттама, күшті және әлсіз тұстарыңыз, қарым-қатынастағы мінезіңіз, жұмыс стиліңіз.",
                time: "10–12 минут",
                icon: "🧬", // Represents personality & individuality
                color: "blue",
                link: "https://www.16personalities.com",
              },
              {
                title: "Big Five Personality Test (OCEAN моделі)",
                description:
                  "5 негізгі қасиет бойынша (ашықтық, жауапкершілік, экстраверсия, ынтымақтастық, эмоциялық тұрақтылық) өлшейді.",
                result:
                  "Сіз қандай тұлғасыз, қай қасиетіңіз басым, даму аймақтарыңыз.",
                time: "10–15 минут",
                icon: "📊", // Reflects data-driven traits and analysis
                color: "red",
                link: "https://bigfive-test.com",
              },
              {
                title: "HIGH5 Test",
                description: "Gallup стилінде күшті жақтарыңызды анықтайды.",
                result:
                  "Жұмыста, өмірде және командада неге бейім екеніңіз туралы кеңес береді.",
                time: "15–20 минут",
                icon: "💪", // Strengths and power
                color: "yellow",
                link: "https://high5test.com",
              },
              {
                title: "Truity (MBTI, DISC, Enneagram, Career test және т.б.)",
                description:
                  "Түрлі психотиптік тесттер ұсынады (тұлғалық, кәсіби, эмоционалдық интеллект, махаббат стилі т.б.)",
                result: "Қысқаша есеп тегін, толық есепке ақылы нұсқа бар.",
                time: "10–25 минут",
                icon: "🧠", // Variety of mental/personality tools
                color: "green",
                link: "https://www.truity.com",
              },
              {
                title: "Enneagram Personality Test",
                description: "Сіздің тұлғаңызды 9 архетиптің біріне жатқызады.",
                result:
                  "Ішкі мотивацияларыңыз, қорқыныштарыңыз және даму бағытыңыз ашылады.",
                time: "10–12 минут",
                icon: "🌀", // Symbol of introspection, cycles, and inner work
                color: "purple",
                link: "https://www.eclecticenergies.com/enneagram/test",
              },
              {
                title: "CareerExplorer Personality Test",
                description:
                  "Тұлғалық қасиеттеріңізге негізделіп, мамандық бағытын ұсынады.",
                result:
                  "Мінез-құлқыңызға сай келетін нақты кәсіп түрлері мен салалар.",
                time: "25–30 минут",
                icon: "🎯", // Represents career goals and direction
                color: "indigo",
                link: "https://www.careerexplorer.com",
              },
            ].map((test, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 text-3xl">{test.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {test.title}
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  <p className="font-bold"> Сипаттамасы: </p>
                  {test.description}
                </p>
                <p className="mb-4 text-sm text-gray-600">
                  <p className="font-bold"> Нәтижесінде: </p>
                  {test.result}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">⏱️ {test.time}</span>
                  <a
                    href={test.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-all hover:bg-blue-700">
                      Тест өту
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-100 bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
            <h4 className="mb-2 font-semibold">💡 Тестілер туралы ескерту</h4>
            <p className="text-sm text-gray-700">
              Психологиялық тестілер нәтижелері кеңес беру мақсатында ғана
              қолданылады. Нақты диагноз қою үшін маманға жүгініңіз.
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <GoBackButton />
      <PageTitle title={"🔍 Диагностика бөлімі"} />
      <SideBar sections={sections} />
    </div>
  );
}
