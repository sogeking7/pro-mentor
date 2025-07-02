import React from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navgate = useNavigate();

  return (
    <main>
      <div className="mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">PROmentor</h1>
          <p className="mb-8 text-xl text-gray-600">
            Мұғалімдердің кәсіби дамуы үшін бірыңғай платформа
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <button
            onClick={() => navgate("/teachers")}
            className="group rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2"
          >
            <div className="mb-4 text-4xl">👨‍🏫</div>
            <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600">
              Мұғалімдер
            </h3>
            <p className="text-gray-600">
              Заңдар, Ұлттық біліктілік тестілеу, лайфхактар, кітаптар
            </p>
          </button>

          <button
            onClick={() => navgate("/students")}
            className="group rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2"
          >
            <div className="mb-4 text-4xl">👥</div>
            <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600">
              Оқушылар
            </h3>
            <p className="text-gray-600">
              Дарынды балалармен жұмыс, инклюзивті білім
            </p>
          </button>

          <button
            onClick={() => navgate("/personality")}
            className="group rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2"
          >
            <div className="mb-4 text-4xl">🧠</div>
            <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600">
              Тұлғалық даму
            </h3>
            <p className="text-gray-600">IQ, EQ, PQ, SQ дамыту және трекер</p>
          </button>

          <button
            onClick={() => navgate("/diagnostics")}
            className="group rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2"
          >
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600">
              Диагностика
            </h3>
            <p className="text-gray-600">Кәсіби диагностика және бағалау</p>
          </button>
        </div>
      </div>
    </main>
  );
}
