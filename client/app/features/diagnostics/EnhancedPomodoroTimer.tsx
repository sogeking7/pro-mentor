import { useEffect, useState } from "react";

export const EnhancedPomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "focus") {
        setCompletedPomodoros((prev) => prev + 1);
        alert("🎉 Pomodoro аяқталды! Үзіліс уақыты.");
        switchMode("break");
      } else {
        alert("☕ Үзіліс аяқталды! Жаңа pomodoro бастау уақыты.");
        switchMode("focus");
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: string) => {
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const progress =
    mode === "focus"
      ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
      : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold">
        ⏳ Pomodoro таймері
      </h2>

      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => switchMode("focus")}
          className={`rounded-lg px-4 py-2 transition-colors ${
            mode === "focus"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🎯 Фокус (25 мин)
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`rounded-lg px-4 py-2 transition-colors ${
            mode === "break"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          ☕ Үзіліс (5 мин)
        </button>
      </div>

      <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            mode === "focus" ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div
        className={`mb-4 text-center font-mono text-6xl transition-colors ${
          mode === "focus" ? "text-blue-600" : "text-green-600"
        }`}
      >
        {formatTime(timeLeft)}
      </div>

      <div className="mb-4 text-center">
        <p className="text-gray-600">
          {mode === "focus" ? "🎯 Фокус сессиясы" : "☕ Үзіліс уақыты"}
        </p>
        <p className="text-sm text-gray-500">
          Орындалған pomodoro: {completedPomodoros} 🍅
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="rounded-lg bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600"
          >
            ▶️ Бастау
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="rounded-lg bg-yellow-500 px-6 py-2 text-white transition-colors hover:bg-yellow-600"
          >
            ⏸️ Аялдату
          </button>
        )}
        <button
          onClick={resetTimer}
          className="rounded-lg bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
        >
          🔄 Қайта бастау
        </button>
      </div>
    </div>
  );
};
