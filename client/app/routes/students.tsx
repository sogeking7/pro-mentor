import React from "react";

import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { SideBar, type SideBarSections } from "@/components/custom/SideBar";

const sections: SideBarSections = [
  {
    title: "🌟 Дарынды балалармен жұмыс",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 font-semibold">Дарындылықтың түрлері:</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4">
              <h5 className="mb-2 font-medium">🧠 Интеллектуалды дарындылық</h5>
              <p className="text-sm text-gray-700">
                Логикалық ойлау, проблемаларды шешу қабілеті
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <h5 className="mb-2 font-medium">🎨 Шығармашылық дарындылық</h5>
              <p className="text-sm text-gray-700">
                Жаңалық жасау, креативтілік
              </p>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <h5 className="mb-2 font-medium">👑 Лидерлік дарындылық</h5>
              <p className="text-sm text-gray-700">
                Басқару, ұйымдастыру қабілеті
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <h5 className="mb-2 font-medium">🏃 Спорттық дарындылық</h5>
              <p className="text-sm text-gray-700">
                Физикалық қабілеттер мен дағдылар
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            Дарынды балалармен жұмыс әдістері:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>Дифференциалды оқыту:</strong> Жеке деңгейге қарай
              тапсырмалар
            </li>
            <li>
              <strong>Проблемалық оқыту:</strong> Күрделі міндеттер қою
            </li>
            <li>
              <strong>Ізденіс жұмыстары:</strong> Жобалар мен зерттеулер
            </li>
            <li>
              <strong>Ментордық қолдау:</strong> Жеке жетекшілік
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Мұғалімге қойылатын талаптар:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Кең пейілді, нақты болу</li>
            <li>Интеллектуалды дамудың жоғары деңгейі</li>
            <li>Белсенді, икемді мінез</li>
            <li>Әзілдесе білу қабілеті</li>
            <li>Үздіксіз өзін-өзі дамыту</li>
          </ul>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">Пайдалы ресурстар:</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="http://daryn.kz"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Дарын РҒПО сайты
              </a>
            </li>
            <li>
              <span className="text-blue-600">Оқушы портфолио шаблоны</span>
            </li>
            <li>
              <span className="text-blue-600">
                Қабілет диагностикасы әдістемелері
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "🤝 Инклюзивті білім беру",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-purple-50 p-4">
          <h4 className="mb-2 font-semibold">
            Инклюзивті білім беру дегеніміз не?
          </h4>
          <p className="text-gray-700">
            Барлық балаларға, соның ішінде ерекше білім беру қажеттіліктері бар
            балаларға тең мүмкіндіктер беру жүйесі.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Негізгі принциптер:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Барлық балалар білім алу құқығына ие</li>
            <li>Әртүрлілікті құрметтеу</li>
            <li>Жеке қажеттіліктерге бейімдеу</li>
            <li>Қолдау көрсету жүйесі</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Практикалық кеңестер:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Сабақты әртүрлі деңгейде өткізу</li>
            <li>Көрнекі құралдарды қолдану</li>
            <li>Жеке көмек көрсету</li>
            <li>Позитивті орта құру</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "💻 Цифрлы ресурстар",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">Онлайн платформалар:</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://bilimland.kz"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                BilimLand.kz - Білім беру портал
              </a>
            </li>
            <li>
              <a
                href="https://kundelik.kz"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Kundelik.kz - Электронды күнделік
              </a>
            </li>
            <li>
              <a
                href="https://arta.edu.kz"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Arta.edu.kz - Сабақ материалдары
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Интерактивті құралдар:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Kahoot - Викториналар жасау</li>
            <li>Padlet - Виртуалды тақта</li>
            <li>Mentimeter - Сауалнамалар</li>
            <li>Quizizz - Интерактивті тесттер</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Мультимедиа ресурстар:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>YouTube Education каналдары</li>
            <li>Canva - Көрнекі материалдар</li>
            <li>Genially - Интерактивті презентациялар</li>
            <li>Flipgrid - Видео пікірталас</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function StudentsPage() {
  return (
    <div>
      <GoBackButton />
      <PageTitle title={"👥 Оқушылар бөлімі"} />
      <SideBar sections={sections} />
    </div>
  );
}
