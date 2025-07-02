import { useState } from "react";
import { EnhancedPomodoroTimer } from "@/features/diagnostics/EnhancedPomodoroTimer";
import { TeacherCalendar } from "@/features/diagnostics/TeacherCalendar";
import { SmartGoalTemplate } from "@/features/diagnostics/SmartGoalTemplate";

export const DevelopmentSuite = () => {
  const [activeTab, setActiveTab] = useState("pomodoro");

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-gray-100 p-2">
        <button
          onClick={() => setActiveTab("pomodoro")}
          className={`rounded-md px-4 py-2 transition-colors ${
            activeTab === "pomodoro"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ⏳ Pomodoro
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`rounded-md px-4 py-2 transition-colors ${
            activeTab === "calendar"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📋 Жоспар
        </button>

        <button
          onClick={() => setActiveTab("goals")}
          className={`rounded-md px-4 py-2 transition-colors ${
            activeTab === "goals"
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🎯 SMART мақсат
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "pomodoro" && <EnhancedPomodoroTimer />}
        {activeTab === "calendar" && <TeacherCalendar />}
        {activeTab === "goals" && <SmartGoalTemplate />}
      </div>
    </div>
  );
};
