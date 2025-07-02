import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { planApi } from "@/lib/services";
import type { PlanOut, PlanSave } from "@/lib/open-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TeacherCalendar = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanOut | null>(null);
  const [eventCategory, setEventCategory] = useState("personal");

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => (await planApi.readUserPlans()).data,
    enabled: !!user,
  });

  const { mutateAsync: createPlan, isPending: isCreatePlanPending } =
    useMutation({
      mutationFn: async (data: PlanSave) =>
        (await planApi.createUserPlan(data)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["plans"],
        });
      },
    });

  const { mutateAsync: deletePlan, isPending: isDeletePlanPending } =
    useMutation({
      mutationFn: async (data: { plan_id: number }) =>
        (await planApi.deleteUserPlan(data.plan_id)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["plans"],
        });
      },
    });

  const handleAddEvent = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim();
    const date = formData.get("date")?.toString();

    if (title && date) {
      const newPlan: PlanSave = {
        title: title.trim(),
        date,
        category_name: eventCategory,
        category_icon: getCategoryIcon(eventCategory),
      };
      console.log(newPlan);
      await createPlan(newPlan);

      e.target.reset();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "admin":
        return "📋";
      case "meeting":
        return "🤝";
      case "exam":
        return "📝";
      case "parents":
        return "👨‍👩‍👧‍👦";
      case "personal":
        return "🌟";
      default:
        return "📅";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "admin":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "meeting":
        return "bg-green-50 border-green-200 text-green-800";
      case "exam":
        return "bg-red-50 border-red-200 text-red-800";
      case "parents":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "personal":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-indigo-600">
        📋 Мұғалімнің жоспар тізімі
      </h2>

      <form
        onSubmit={handleAddEvent}
        className="mb-6 space-y-4 rounded-lg bg-gray-50 p-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Іс-шара атауы
          </label>
          <input
            name="title"
            type="text"
            placeholder="Мысалы: Сабақ жоспарын дайындау"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Күні
            </label>
            <input
              name="date"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Санат
            </label>
            <select
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="personal">🌟 Жеке</option>
              <option value="admin">📋 Әкімшілік</option>
              <option value="meeting">🤝 Жиналыс</option>
              <option value="exam">📝 Емтихан/Тест</option>
              <option value="parents">👨‍👩‍👧‍👦 Ата-аналармен</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          ➕ Іс-шараны қосу
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="mb-3 font-semibold text-gray-800">
          📅 Келесі іс-шаралар:
        </h3>
        {isLoading && <div className="my-4 text-center">Жүктелуде...</div>}
        {plans.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>📭 Әзірше іс-шаралар жоқ</p>
            <p className="text-sm">Жоғарыда жаңа іс-шара қосыңыз</p>
          </div>
        ) : (
          plans.map((event) => {
            const isToday = event.date.split("T")[0] === today;
            const isPast = new Date(event.date.split("T")[0]) < new Date(today);

            return (
              <div
                key={event.id}
                className={`rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  isToday
                    ? "border-orange-300 bg-orange-50 ring-2 ring-orange-200"
                    : isPast
                      ? "border-gray-200 bg-gray-100 opacity-75"
                      : getCategoryColor(event.category_name)
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">
                      {getCategoryIcon(event.category_name)}
                    </span>
                    <div>
                      <h4
                        className={`font-medium ${isPast ? "text-gray-500 line-through" : ""}`}
                      >
                        {event.title}
                      </h4>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {new Date(event.date).toLocaleDateString("kk-KZ")}
                        </span>
                        {isToday && (
                          <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                            БҮГІН
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlan(event);
                      setOpenAlert(true);
                    }}
                    className="text-red-500 transition-colors hover:text-red-700"
                    title="Өшіру"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {plans.length > 0 && (
        <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex justify-between text-sm text-indigo-800">
            <span>Жалпы іс-шаралар: {plans.length}</span>
            <span>
              Бүгінгі:{" "}
              {plans.filter((e) => e.date.split("T")[0] === today).length}
            </span>
          </div>
        </div>
      )}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Жоспар жою 🗑️️</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPlan?.title}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Болдырмау</AlertDialogCancel>
            <AlertDialogAction
              className={"bg-destructive hover:bg-destructive/90"}
              disabled={isDeletePlanPending}
              onClick={async () => {
                if (!selectedPlan) return;
                return await deletePlan({
                  plan_id: selectedPlan.id,
                });
              }}
            >
              {isDeletePlanPending ? <>Жүктелуде...</> : <>Жою</>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
