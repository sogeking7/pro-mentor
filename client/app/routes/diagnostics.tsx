import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { SideBar, type SideBarSections } from "@/components/custom/SideBar";
import { ProfDiagnostics } from "@/features/diagnostics/ProfDiagnostics";

export default function DiagnosticsPage() {
  const sections: SideBarSections = [
    {
      title: "📈 Кәсіби диагностика",
      content: <ProfDiagnostics />,
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
                icon: "🧬",
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
                icon: "📊",
                color: "red",
                link: "https://bigfive-test.com",
              },
              {
                title: "HIGH5 Test",
                description: "Gallup стилінде күшті жақтарыңызды анықтайды.",
                result:
                  "Жұмыста, өмірде және командада неге бейім екеніңіз туралы кеңес береді.",
                time: "15–20 минут",
                icon: "💪",
                color: "yellow",
                link: "https://high5test.com",
              },
              {
                title: "Truity (MBTI, DISC, Enneagram, Career test және т.б.)",
                description:
                  "Түрлі психотиптік тесттер ұсынады (тұлғалық, кәсіби, эмоционалдық интеллект, махаббат стилі т.б.)",
                result: "Қысқаша есеп тегін, толық есепке ақылы нұсқа бар.",
                time: "10–25 минут",
                icon: "🧠",
                color: "green",
                link: "https://www.truity.com",
              },
              {
                title: "Enneagram Personality Test",
                description: "Сіздің тұлғаңызды 9 архетиптің біріне жатқызады.",
                result:
                  "Ішкі мотивацияларыңыз, қорқыныштарыңыз және даму бағытыңыз ашылады.",
                time: "10–12 минут",
                icon: "🌀",
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
                icon: "🎯",
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
