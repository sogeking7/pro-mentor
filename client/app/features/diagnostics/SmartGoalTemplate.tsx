import { useState } from "react";

export const SmartGoalTemplate = () => {
  const [goal, setGoal] = useState({
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timebound: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const hasAllFields = Object.values(goal).every((value) => value.trim());
    if (hasAllFields) {
      setSubmitted(true);
    } else {
      alert("Барлық өрістерді толтырыңыз!");
    }
  };

  const resetForm = () => {
    setGoal({
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timebound: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-green-600">
        🎯 SMART мақсат құрастыру
      </h2>

      <div className="mb-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            S - Specific (Нақты)
          </label>
          <input
            name="specific"
            placeholder="Мысалы: Ағылшын тілін үйрену"
            value={goal.specific}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            M - Measurable (Өлшенетін)
          </label>
          <input
            name="measurable"
            placeholder="Мысалы: B2 деңгейіне жету"
            value={goal.measurable}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            A - Achievable (Қолжетімді)
          </label>
          <input
            name="achievable"
            placeholder="Мысалы: Күнде 30 минут оқу"
            value={goal.achievable}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            R - Relevant (Маңызды)
          </label>
          <input
            name="relevant"
            placeholder="Мысалы: Кәсіби дамуым үшін керек"
            value={goal.relevant}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            T - Time-bound (Уақытпен шектелген)
          </label>
          <input
            name="timebound"
            placeholder="Мысалы: 6 ай ішінде"
            value={goal.timebound}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            🎯 Мақсат құрастыру
          </button>
          <button
            onClick={resetForm}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            🔄 Тазалау
          </button>
        </div>
      </div>

      {submitted && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
          <h3 className="mb-4 font-semibold text-green-800">
            📌 Сіздің SMART мақсатыңыз:
          </h3>
          <div className="space-y-3">
            <div>
              <span className="font-bold text-green-600">S:</span>{" "}
              {goal.specific}
            </div>
            <div>
              <span className="font-bold text-green-600">M:</span>{" "}
              {goal.measurable}
            </div>
            <div>
              <span className="font-bold text-green-600">A:</span>{" "}
              {goal.achievable}
            </div>
            <div>
              <span className="font-bold text-green-600">R:</span>{" "}
              {goal.relevant}
            </div>
            <div>
              <span className="font-bold text-green-600">T:</span>{" "}
              {goal.timebound}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
