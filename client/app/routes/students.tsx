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

        <div className="rounded-lg bg-green-50 p-4">
          <h4 className="mb-2 font-semibold">
            Ерекше білім беру қажеттіліктері:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Физикалық дамудағы ерекшеліктер</li>
            <li>Интеллектуалды дамудағы ерекшеліктер</li>
            <li>Аутизм спектрі бұзылыстары</li>
            <li>Есту және көру қабілетінің бұзылуы</li>
            <li>Тілдік дамудағы кешігулер</li>
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

        <div className="rounded-lg bg-yellow-50 p-4">
          <h4 className="mb-2 font-semibold">Қауіпсіздік ережелері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Оқушылардың жеке деректерін қорғау</li>
            <li>Интернет қауіпсіздігі туралы дәрістер</li>
            <li>Ата-аналармен ашық қарым-қатынас</li>
            <li>Цифрлы этика мен мәдениет</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "🚀 Мотивация әдістері",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-orange-50 p-4">
          <h4 className="mb-2 font-semibold">Мотивацияның түрлері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>Ішкі мотивация:</strong> Қызығушылық, қанағаттану
            </li>
            <li>
              <strong>Сыртқы мотивация:</strong> Марапаттар, бағалар
            </li>
            <li>
              <strong>Әлеуметтік мотивация:</strong> Танылу, мойындау
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Практикалық әдістер:</h4>
          <div className="grid gap-4">
            <div className="rounded-lg bg-green-50 p-4">
              <h5 className="mb-2 font-medium">🎯 Мақсат қою</h5>
              <p className="text-sm text-gray-700">
                Оқушылармен бірге нақты, қолжетімді мақсаттар қою
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <h5 className="mb-2 font-medium">🏆 Жетістікті мойындау</h5>
              <p className="text-sm text-gray-700">
                Кішігірім жетістіктерді де бағалау және мадақтау
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <h5 className="mb-2 font-medium">🎮 Ойындандыру</h5>
              <p className="text-sm text-gray-700">
                Сабаққа ойын элементтерін енгізу
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4">
              <h5 className="mb-2 font-medium">💬 Кері байланыс</h5>
              <p className="text-sm text-gray-700">
                Тұрақты және сапалы кері байланыс беру
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Мотивацияны арттыру құралдары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Рөлдік ойындар мен симуляциялар</li>
            <li>Топтық жобалар мен бәсекелестік</li>
            <li>Оқушылардың таңдау еркіндігі</li>
            <li>Нақты өмірмен байланыстыру</li>
            <li>Технологияларды пайдалану</li>
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
