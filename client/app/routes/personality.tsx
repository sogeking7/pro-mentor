import React from "react";

import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { DevelopmentTracker } from "@/features/diagnostics/DevelopmentTracker";
import { SideBar, type SideBarSections } from "@/components/custom/SideBar";
import { HabitsSave } from "@/features/diagnostics/HabitsSave";
import { HabitsList } from "@/features/diagnostics/HabitsList";
import { DevelopmentSuite } from "@/features/diagnostics/DevelopmentSuit";
import { HabitsMonthly } from "@/features/diagnostics/HabitsMonthly";

const sections: SideBarSections = [
  {
    title: "🧮 IQ - Зияткерлік интеллект",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">
            Зияткерлік интеллект дегеніміз не?
          </h4>
          <p className="text-gray-700">
            Логикалық ойлау, талдау, жинақтау, есептеу және проблемаларды шешу
            қабілеті.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Дамыту жолдары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Күнделікті кітап оқу (кемінде 30 минут)</li>
            <li>Шахмат ойнау немесе логикалық ойындар</li>
            <li>Жаңа тілдер үйрену</li>
            <li>Ғылыми мақалалар оқу</li>
            <li>Математикалық есептер шығару</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Бағалау тесттері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Равен матрицалары</li>
            <li>Векслер шкаласы</li>
            <li>Амтхауэр тесті</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "❤️ EQ - Эмоционалдық интеллект",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-red-50 p-4">
          <h4 className="mb-2 font-semibold">
            Эмоционалдық интеллект дегеніміз не?
          </h4>
          <p className="text-gray-700">
            Өз эмоцияларыңызды және басқалардың эмоцияларын түсіну, басқару және
            пайдалану қабілеті.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Негізгі компоненттер:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Өзін-өзі тану (self-awareness)</li>
            <li>Өзін-өзі басқару (self-regulation)</li>
            <li>Мотивация (motivation)</li>
            <li>Эмпатия (empathy)</li>
            <li>Әлеуметтік дағдылар (social skills)</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Дамыту жаттығулары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Эмоция күнделігін жүргізу</li>
            <li>Медитация мен рефлексия</li>
            <li>Белсенді тыңдау дағдыларын дамыту</li>
            <li>Конфликттерді шешу тәжірибесі</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "💪 PQ - Физикалық интеллект",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-green-50 p-4">
          <h4 className="mb-2 font-semibold">
            Физикалық интеллект дегеніміз не?
          </h4>
          <p className="text-gray-700">
            Денені басқару, координация, күш, төзімділік және дене қозғалысын
            үйлестіру қабілеті.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Дамыту бағыттары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Күнделікті физикалық жаттығулар</li>
            <li>Спорт түрлерімен айналысу</li>
            <li>Йога немесе пилатес</li>
            <li>Дұрыс тамақтану</li>
            <li>Ұйқы режимін сақтау</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Мұғалімдерге арналған:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Дұрыс отыру позасы</li>
            <li>Тыныс алу техникалары</li>
            <li>Көз жаттығулары</li>
            <li>Серпіну минуттары</li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">🏃 Күнделікті жаттығулар:</h4>
          <div className="grid gap-3">
            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3">
              <span className="text-2xl">🫁</span>
              <div>
                <h5 className="font-medium text-blue-800">
                  Тыныс алу жаттығуы
                </h5>
                <p className="text-sm text-gray-600">
                  4-7-8 әдісі: 4 санап дем алу, 7 санап ұстау, 8 санап шығару
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3">
              <span className="text-2xl">👁️</span>
              <div>
                <h5 className="font-medium text-blue-800">Көз жаттығулары</h5>
                <p className="text-sm text-gray-600">
                  20-20-20 ережесі: 20 минут сайын, 20 секунд, 20 фут қашықтыққа
                  қарау
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3">
              <span className="text-2xl">💆</span>
              <div>
                <h5 className="font-medium text-blue-800">
                  Мойын және иық массажы
                </h5>
                <p className="text-sm text-gray-600">
                  Дөңгелек қозғалыстармен мойын мен иықты босаңсыту
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3">
              <span className="text-2xl">🪑</span>
              <div>
                <h5 className="font-medium text-blue-800">
                  Дұрыс отыру позасы
                </h5>
                <p className="text-sm text-gray-600">
                  Арқа тік, аяқ жерде, экран көз деңгейінде
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-4">
          <h4 className="mb-2 font-semibold">
            ⚠️ Мұғалімдерге арналған денсаулық кеңестері:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              Дауыстың саулығын сақтау (жылы сусын ішу, дауысты дем алдыру)
            </li>
            <li>Аяқтағы ауыртпалықты азайту (ыңғайлы аяқ киім)</li>
            <li>Стресс деңгейін төмендету (демалыс пен жұмыс тепе-теңдігі)</li>
            <li>Көзді экраннан қорғау (жиі үзіліс жасау)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "🙏 SQ - Рухани интеллект",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-purple-50 p-4">
          <h4 className="mb-2 font-semibold">Рухани интеллект дегеніміз не?</h4>
          <p className="text-gray-700">
            Өмірдің мағынасын түсіну, құндылықтарды анықтау және рухани дамуға
            ұмтылу қабілеті.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Дамыту жолдары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Медитация мен рефлексия</li>
            <li>Философиялық кітаптар оқу</li>
            <li>Табиғатпен уақыт өткізу</li>
            <li>Қайырымдылық жасау</li>
            <li>Өзіндік дамуға бағытталған семинарлар</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Мұғалім үшін маңыздылығы:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Кәсіби мақсаттарды анықтау</li>
            <li>Оқушылармен рухани байланыс орнату</li>
            <li>Стресспен күресу</li>
            <li>Өмірлік тепе-теңдік сақтау</li>
          </ul>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4">
          <h4 className="mb-2 font-semibold">🌟 Практикалық жаттығулар:</h4>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 p-3">
              <h5 className="font-medium text-purple-800">
                🧘 Күнделікті медитация
              </h5>
              <p className="text-sm text-gray-600">
                5-10 минут тыныш отырып, тыныс алуға назар аудару
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <h5 className="font-medium text-purple-800">
                💎 Құндылықтарды анықтау
              </h5>
              <p className="text-sm text-gray-600">
                Өзіңіз үшін маңызды 5 құндылықты жазып, неліктен маңызды екенін
                түсіндіру
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "🧰 Өнімділік құралдары",
    content: <DevelopmentSuite />,
  },
  {
    title: "📊 Даму трекері",
    content: (
      <div className="space-y-6">
        <DevelopmentTracker />
        <HabitsMonthly />
      </div>
    ),
  },
  {
    title: "⚙️ Әдеттер бөлімі",
    content: (
      <div>
        <HabitsList />
        <HabitsSave />
      </div>
    ),
  },
];

export default function PersonalityPage() {
  return (
    <div>
      <GoBackButton />
      <PageTitle title={"🧠 Тұлғалық даму бөлімі"} />
      <SideBar sections={sections} />
    </div>
  );
}
