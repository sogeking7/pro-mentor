import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { smartApi } from "@/lib/services";
import type { SmartOut, SmartSave } from "@/lib/open-api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
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

export const SmartGoalTemplate = () => {
  const [goal, setGoal] = useState({
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timebound: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [selectedSmart, setSelectedSmart] = React.useState<SmartOut | null>(
    null,
  );
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: smarts = [], isLoading } = useQuery({
    queryKey: ["smarts"],
    queryFn: async () => (await smartApi.readUserSmarts()).data,
    enabled: !!user,
  });

  const { mutateAsync: createSmart, isPending: isCreateSmartPending } =
    useMutation({
      mutationFn: async (data: SmartSave) =>
        (await smartApi.createUserSmart(data)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["smarts"],
        });
      },
    });

  const { mutateAsync: deleteSmart, isPending: isDeleteSmartPending } =
    useMutation({
      mutationFn: async (data: { smart_id: number }) =>
        (await smartApi.deleteUserSmart(data.smart_id)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["smarts"],
        });
      },
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const hasAllFields = Object.values(goal).every((value) => value.trim());
    if (hasAllFields) {
      await createSmart({
        s: goal.specific,
        m: goal.measurable,
        a: goal.achievable,
        r: goal.relevant,
        t: goal.timebound,
      });
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
            disabled={isCreateSmartPending}
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

      <h3 className="mb-4 font-semibold text-green-800">
        📌 Сіздің SMART мақсаттарыңыз:
      </h3>
      {isLoading && <div className="my-4 text-center">Жүктелуде...</div>}
      {smarts.map((smart) => (
        <div className="mt-6 flex items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 p-6">
          <div className="space-y-3">
            <div>
              <span className="font-bold text-green-600">S:</span> {smart.s}
            </div>
            <div>
              <span className="font-bold text-green-600">M:</span> {smart.m}
            </div>
            <div>
              <span className="font-bold text-green-600">A:</span> {smart.a}
            </div>
            <div>
              <span className="font-bold text-green-600">R:</span> {smart.r}
            </div>
            <div>
              <span className="font-bold text-green-600">T:</span> {smart.t}
            </div>
          </div>
          <Button
            size={"icon"}
            variant="ghost"
            onClick={() => {
              setSelectedSmart(smart);
              setOpenAlert(true);
            }}
          >
            🗑️
          </Button>
        </div>
      ))}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>SMART жою 🗑️️</AlertDialogTitle>
            <AlertDialogDescription>{selectedSmart?.s}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Болдырмау</AlertDialogCancel>
            <AlertDialogAction
              className={"bg-destructive hover:bg-destructive/90"}
              disabled={isDeleteSmartPending}
              onClick={async () => {
                if (!selectedSmart) return;
                return await deleteSmart({
                  smart_id: selectedSmart.id,
                });
              }}
            >
              {isDeleteSmartPending ? <>Жүктелуде...</> : <>Жою</>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
