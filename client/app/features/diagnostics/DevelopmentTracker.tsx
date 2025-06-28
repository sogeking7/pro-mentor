import React, { useState } from "react";

export const DevelopmentTracker = () => {
  const [streak, setStreak] = useState(() => {
    const saved = window.localStorage?.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [todayCompleted, setTodayCompleted] = useState(() => {
    const today = new Date().toDateString();
    const lastCompleted = window.localStorage?.getItem("lastCompleted");
    return lastCompleted === today;
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "10 минут ағылшын тілін үйрену",
      completed: false,
      type: "language",
    },
    {
      id: 2,
      text: "Жаңа педагогикалық әдіс оқу",
      completed: false,
      type: "professional",
    },
    {
      id: 3,
      text: "Медитация немесе рефлексия",
      completed: false,
      type: "spiritual",
    },
    { id: 4, text: "Физикалық жаттығу", completed: false, type: "physical" },
  ]);

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);

    const allCompleted = updatedTasks.every((task) => task.completed);
    if (allCompleted && !todayCompleted) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTodayCompleted(true);
      if (window.localStorage) {
        window.localStorage.setItem("streak", JSON.stringify(newStreak));
        window.localStorage.setItem("lastCompleted", new Date().toDateString());
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">🔥 Күнделікті даму трекері</h2>
        <div className="text-3xl font-bold">{streak} күн серия</div>
        <p className="opacity-90">Duolingo стилінде үздіксіз даму!</p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-lg border-2 p-4 transition-all ${
              task.completed
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-white hover:border-purple-300"
            }`}
          >
            <label className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
                className="h-5 w-5 rounded text-purple-600 focus:ring-purple-500"
              />
              <span
                className={`flex-1 ${task.completed ? "text-gray-500 line-through" : ""}`}
              >
                {task.text}
              </span>
              <span className="text-2xl">
                {task.type === "language" && "🗣️"}
                {task.type === "professional" && "📚"}
                {task.type === "spiritual" && "🧘"}
                {task.type === "physical" && "💪"}
              </span>
            </label>
          </div>
        ))}
      </div>

      {todayCompleted && (
        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="font-semibold text-yellow-800">
            🎉 Бүгінгі тапсырмалар орындалды!
          </p>
        </div>
      )}
    </div>
  );
};
