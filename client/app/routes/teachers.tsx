import React from "react";
import GoBackButton from "@/components/custom/GoBackButton";
import { PageTitle } from "@/components/custom/PageTitle";
import { SideBar } from "@/components/custom/SideBar";

const sections = [
  {
    title: "📜 Заңдар",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-bold">
            Қазақстан Республикасының "Білім туралы" заңы
          </h3>
          <p className="text-gray-700">2007 жылғы 27 шілдедегі № 319 заңы</p>
        </div>

        <div className="space-y-3 rounded-lg bg-blue-50 p-4">
          <h3 className="text-lg font-bold">Заңнамалық сілтемелер:</h3>
          <ul className="list-inside list-disc space-y-1 text-blue-700">
            <li>
              <a
                href="https://adilet.zan.kz/kaz/docs/Z1100000487"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📘 Білім туралы заң
              </a>
            </li>
            <li>
              <a
                href="https://adilet.zan.kz/kaz/docs/Z1900000293"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                🧑‍🏫 Мұғалімнің құқықтары мен міндеттері
              </a>
            </li>
            <li>
              <a
                href="https://adilet.zan.kz/kaz/docs/V2200029031"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📏 Білім беру стандарты
              </a>
            </li>
            <li>
              <a
                href="https://uba.edu.kz/storage/app/media/2024%202024%202024%202024%20%20KZ%20%20%20KZ%20%20%20KZ%20%20%20KZ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📄 Әдістемелік нұсқау хат (2024)
              </a>
            </li>
            <li>
              <a
                href="https://adilet.zan.kz/kaz/docs/V2200029767"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📚 Оқу бағдарламасы (57-бұйрық)
              </a>
            </li>
            <li>
              <a
                href="https://adilet.zan.kz/kaz/docs/V1200007495"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                🧾 57-БҰЙРЫҚ (қосымша)
              </a>
            </li>
          </ul>
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
    title: "📋 Ұлттық біліктілік тестілеу",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-bold">Ұлттық біліктілік тестілеу</h3>
          <p className="text-gray-700">
            Ұлттық біліктілік тестілеу және педагог қызметкерлерді біліктілік
            тестілеуге дайындық үшін
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            Ұлттық біліктілік тестілеу екі блокқа бөлінеді және барлығы 100 тест
            тапсырмасынан тұрады:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>1-блок:</strong> «Оқыту пәнінің мазмұны» бойынша 70
              тапсырма
            </li>
            <li>
              <strong>2-блок:</strong> «Педагогика, оқыту әдістемесі» бойынша 30
              тапсырма
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Уақыт шектеулері:</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>Жалпы уақыт: 3 сағат 20 минут (200 минут)</li>
            <li>
              Математика, физика, химия, информатика пәндері үшін – 3 сағат 50
              минут (230 минут)
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            «Оқыту пәнінің мазмұны» бойынша тест тапсырмалары педагог
            қызметкерлердің терең академиялық білімін, практикалық икемділігі
            мен дағдыларын тексеруге бағытталған. Ол үшін 3 түрлі формадағы
            тапсырмалар қолданады:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>бір дұрыс жауабы бар 50 тапсырма</li>
            <li>бір немесе бірнеше дұрыс жауабы бар 10 тапсырма</li>
            <li>екі мәнмәтінге (бір дұрыс жауабы бар) 10 тапсырма</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Мәнмәтіндік тапсырмаларда бір мәнмәтінге 5 тапсырма беріледі.
            Мәнмәтін (ғылыми, көркем мәтін), таблица, схема, графика, суреттер
            түрінде немесе бірнеше ақпаратты бірден беруі мүмкін. Осы
            тапсырмаларды жақсылап орындау үшін мәнмәтінмен және берілген
            тапсырмаларымен мұқият танысу керек. Дұрыс жауап мәнмәтінде
            (контекст) немесе тапсырмаларда берілуі мүмкін.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "💡 Лайфхактар",
    content: (
      <div className="space-y-6">
        <div className="space-y-3 rounded-lg bg-blue-50 p-4">
          <h3 className="text-lg font-bold">
            Цифрлы ресурстар мен әдіс-тәсілдер:
          </h3>
          <ul className="list-inside list-disc space-y-1 text-blue-700">
            <li>
              <a
                href="https://drive.google.com/drive/folders/1Jl1-B8VHmrmweqFNtv7hnEfrEP_pGvgg?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📘 Цифрлы ресурстар мен әдіс-тәсілдер
              </a>
            </li>
            <li>
              <a
                href="/lifehacks"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📋 Цифрлы лайфхактар
              </a>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "📚 Кітаптар",
    content: (
      <div className="space-y-6">
        <div className="space-y-3 rounded-lg bg-blue-50 p-4">
          <h3 className="text-lg font-bold">Кітаптар:</h3>
          <ul className="list-inside list-disc space-y-1 text-blue-700">
            <li>
              <a
                href="https://drive.google.com/drive/folders/1E-7QrpBaVSX0MZG4NCz8xozd03QUk7y6?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📘 Кітаптар
              </a>
            </li>
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
