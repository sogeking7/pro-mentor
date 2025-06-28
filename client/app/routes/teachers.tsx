import React from "react";
import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { SideBar } from "@/components/custom/SideBar";

const sections = [
  {
    title: "📜 Білім туралы заң",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-bold">
            Қазақстан Республикасының "Білім туралы" заңы
          </h3>
          <p className="text-gray-700">2007 жылғы 27 шілдедегі № 319 заңы</p>
          <a
            href="https://adilet.zan.kz/kaz/docs/Z070000319_"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Толық мәтінін оқу →
          </a>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Заңның негізгі ережелері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Білім беру жүйесінің құрылымы мен басқарылуы</li>
            <li>Педагог қызметкерлердің құқықтары мен міндеттері</li>
            <li>Білім беру стандарттары мен бағдарламалары</li>
            <li>Білім алушылардың құқықтары мен міндеттері</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            Педагогтерге қатысты негізгі ережелер:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Педагогикалық еркіндік пен академиялық дербестік</li>
            <li>Кәсіби даму және біліктілікті арттыру</li>
            <li>Еңбек ақы төлеуге және әлеуметтік кепілдіктерге құқық</li>
            <li>Үздіксіз кәсіби білім алу</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "📋 НКТ туралы ақпарат",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-bold">
            Ұлттық Құзыретті Тестілеу (НКТ)
          </h3>
          <p className="text-gray-700">
            Педагог қызметкерлердің кәсіби құзыреттілігін тексеру үшін арналған
            тестілеу
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Тестілеу құрылымы:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>1-блок:</strong> "Оқыту пәнінің мазмұны" - 70 тапсырма
            </li>
            <li>
              <strong>2-блок:</strong> "Педагогика, оқыту әдістемесі" - 30
              тапсырма
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Уақыт шектеулері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Жалпы уақыт: 230 минут (3 сағат 50 минут)</li>
            <li>Математика, физика, химия, информатика: 230 минут</li>
            <li>Басқа пәндер: 200 минут (3 сағат 20 минут)</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Тапсыру шарттары:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Әр блок бойынша 50% дұрыс жауап алу қажет</li>
            <li>Сәтсіздік жағдайында 2 айдан кейін қайта тапсыруға болады</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "💡 Лайфхактар",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 font-semibold">
            🎯 Сабақты қызықты өткізу әдістері:
          </h4>

          <div className="grid gap-4">
            <div className="rounded-lg bg-green-50 p-4">
              <h5 className="mb-2 font-medium">"Ыстық орындық" әдісі</h5>
              <p className="text-sm text-gray-700">
                Берілген тапсырмаға байланысты сұрақтарға жылдам жауап беру.
                Орындық "ыстық" болған соң тез жауап беру керек.
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <h5 className="mb-2 font-medium">"Миға шабуыл" стратегиясы</h5>
              <p className="text-sm text-gray-700">
                Тақырыпқа байланысты идеяларды көп жазу. Уақыт аяқталғанда
                кезектесіп оқу, идеялар қайталанбау керек.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <h5 className="mb-2 font-medium">"Лездеме" әдісі</h5>
              <p className="text-sm text-gray-700">
                Бір минутта негізгі сөздерді түсіндіру және қысқа мерзімде көп
                ақпарат беру.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">📚 Интерактивті әдістер:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>"9-ромб":</strong> Маңызды тақырыптарды ромб пішінде
              орналастыру
            </li>
            <li>
              <strong>"Атомдар мен молекулалар":</strong> Физикалық
              белсенділікпен білім беру
            </li>
            <li>
              <strong>"Алтын балық":</strong> Топтық жұмыс пен пікірталас
            </li>
            <li>
              <strong>"Өзіңізді тексеріңіз":</strong> Шындық немесе жалған әдісі
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            🎭 Дәстүрлі емес сабақ түрлері:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Сабақ-ойын, сабақ-зерттеу, сабақ-саяхат</li>
            <li>Сабақ-кездесу, сабақ-конференция</li>
            <li>Сабақ-дәріс, сабақ-семинар</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "🎭 Ұстаздық имидж",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium">1. Сыртқы келбет</h4>
            <ul className="list-inside list-disc text-sm text-gray-700">
              <li>Таза, ұқыпты киініс</li>
              <li>Кәсіби стиль</li>
              <li>Дұрыс денесалт</li>
              <li>Жымиындылық</li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-2 font-medium">2. Коммуникативтік дағдылар</h4>
            <ul className="list-inside list-disc text-sm text-gray-700">
              <li>Анық, түсінікті сөйлеу</li>
              <li>Тыңдай білу</li>
              <li>Эмпатия танытуы</li>
              <li>Конфликттерді шешу</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-2 font-medium">3. Кәсіби сапалар</h4>
            <ul className="list-inside list-disc text-sm text-gray-700">
              <li>Пәндік білім</li>
              <li>Педагогикалық шеберлік</li>
              <li>Инновациялық тәсілдер</li>
              <li>Үздіксіз даму</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            💡 Имиджді қалыптастыру кеңестері:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Өзіңізге сенімді болыңыз</li>
            <li>Оқушылармен ашық қарым-қатынас орнатыңыз</li>
            <li>Әділетті және объективті болыңыз</li>
            <li>Үнемі өзіңізді дамытыңыз</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function TeachersPage() {
  return (
    <div>
      <GoBackButton />
      <PageTitle title={"👨‍🏫 Мұғалімдер бөлімі"} />
      <SideBar sections={sections} />
    </div>
  );
}
