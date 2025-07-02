import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { habitApi } from "@/lib/services";
import type {
  DailyHabitCompletion,
  DailyHabitsReport,
  MonthlyHabitsReport,
} from "@/lib/open-api";

export const HabitsMonthly = () => {
  const currentDate = new Date();
  const [year] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const { data: monthlyReport, isLoading } = useQuery<MonthlyHabitsReport>({
    queryKey: ["monthly-habitCompletions", year, month],
    queryFn: async () => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return (await habitApi.monthlyHabitCompletions(year, month, userTimezone))
        .data;
    },
  });

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const reportsByDay = React.useMemo(() => {
    if (!monthlyReport?.daily_reports) return {};

    return monthlyReport.daily_reports.reduce(
      (acc, dailyReport) => {
        const date = new Date(dailyReport.date);
        const day = date.getDate();
        acc[day] = dailyReport;
        return acc;
      },
      {} as Record<number, DailyHabitsReport>,
    );
  }, [monthlyReport]);

  const monthName = new Date(year, month - 1).toLocaleString("kk", {
    month: "long",
  });
  const weekDays = ["Жс", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб"];

  const renderDayHabits = (day: number) => {
    const dayReport = reportsByDay[day];

    if (!dayReport || !dayReport.habit_completions.length) {
      return <div className="text-xs text-gray-400">Дағдылар жоқ</div>;
    }

    return dayReport.habit_completions.map(
      (habitCompletion: DailyHabitCompletion) => {
        return (
          <div
            key={`${habitCompletion.habit.id}-${day}`}
            className="flex items-center gap-1 text-xs"
          >
            <span>{habitCompletion.completed ? "✅" : "❌"}</span>
            <span
              className="truncate"
              title={`${habitCompletion.habit.title} (${habitCompletion.habit.type.name})`}
            >
              {habitCompletion.habit.title}
            </span>
          </div>
        );
      },
    );
  };

  const stats = React.useMemo(() => {
    if (!monthlyReport) return null;

    let totalCompletions = 0;
    let totalPossibleCompletions = 0;

    monthlyReport.daily_reports.forEach((dailyReport) => {
      dailyReport.habit_completions.forEach((habitCompletion) => {
        totalPossibleCompletions++;
        if (habitCompletion.completed) {
          totalCompletions++;
        }
      });
    });

    const completionRate =
      totalPossibleCompletions > 0
        ? Math.round((totalCompletions / totalPossibleCompletions) * 100)
        : 0;

    const calculateStreak = () => {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      if (year !== currentYear || month !== currentMonth) {
        return 0;
      }

      let streak = 0;

      for (let day = currentDay; day >= 1; day--) {
        const dayReport = monthlyReport.daily_reports.find((report) => {
          const reportDate = new Date(report.date);
          return reportDate.getDate() === day;
        });

        if (!dayReport || dayReport.habit_completions.length === 0) {
          continue;
        }

        const allCompleted = dayReport.habit_completions.every(
          (habitCompletion) => habitCompletion.completed,
        );

        if (allCompleted) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    };

    return {
      totalCompletions,
      totalPossibleCompletions,
      completionRate,
      totalHabits: monthlyReport.total_habits,
      totalDays: monthlyReport.total_days,
      currentStreak: calculateStreak(),
    };
  }, [monthlyReport, year, month]);

  if (isLoading) {
    return <div className="my-4 text-center text-xl">Жүктелуде...</div>;
  }

  return (
    <div className="my-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🗓️ Айлық кесте</h1>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm font-medium">Ай:</label>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="rounded border px-3 py-1"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("kk", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">
          {monthName} {year}
        </h2>
      </div>
      {stats && (
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalHabits}
            </div>
            <div className="text-sm text-blue-800">Барлық дағдылар</div>
          </div>
          <div className="rounded-lg bg-green-50 p-3 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalCompletions}
            </div>
            <div className="text-sm text-green-800">Орындалған</div>
          </div>
          <div className="rounded-lg bg-orange-50 p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.totalPossibleCompletions}
            </div>
            <div className="text-sm text-orange-800">Барлық мүмкіндіктер</div>
          </div>
          <div className="rounded-lg bg-purple-50 p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-purple-800">Орындау пайызы</div>
          </div>
          <div className="rounded-lg bg-indigo-50 p-3 text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.currentStreak}
            </div>
            <div className="text-sm text-indigo-800">Ағымдағы серия</div>
            <div className="mt-1 text-xs text-indigo-600">
              {stats.currentStreak > 0 ? "🔥" : "💤"} күн
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 overflow-x-auto">
        <div className="grid min-w-[50rem] grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="rounded-lg bg-gray-100 p-2 text-center text-sm font-semibold"
            >
              {day}
            </div>
          ))}
          {emptyCells.map((i) => (
            <div
              key={`empty-${i}`}
              className="h-32 rounded-lg border border-gray-200"
            ></div>
          ))}
          {days.map((day) => {
            const isFuture =
              year === new Date().getFullYear() &&
              month === new Date().getMonth() + 1 &&
              day > new Date().getDate();

            if (isFuture) {
              return (
                <div className="h-32 rounded-lg border border-gray-200 bg-gray-50"></div>
              );
            }

            const dayReport = reportsByDay[day];
            const hasHabits =
              dayReport && dayReport.habit_completions.length > 0;
            const allCompleted =
              hasHabits &&
              dayReport.habit_completions.every((h) => h.completed);
            const someCompleted =
              hasHabits && dayReport.habit_completions.some((h) => h.completed);

            return (
              <div
                key={day}
                className={`h-32 overflow-auto rounded-lg border p-1 ${
                  hasHabits
                    ? allCompleted
                      ? "border-green-300 bg-green-50"
                      : someCompleted
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="mb-1 text-sm font-semibold">{day}</div>
                <div className="space-y-1">{renderDayHabits(day)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-green-300 bg-green-50"></div>
          <span>Бәрі орындалған</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-yellow-300 bg-yellow-50"></div>
          <span>Жартылай орындалған</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-red-300 bg-red-50"></div>
          <span>Орындалмаған</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-gray-200 bg-gray-50"></div>
          <span>Дағдылар жоқ</span>
        </div>
      </div>
    </div>
  );
};
