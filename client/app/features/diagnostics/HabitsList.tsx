import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitApi } from "@/lib/services";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
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
import type { HabitOut } from "@/lib/open-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitsSave } from "@/features/diagnostics/HabitsSave";

export const HabitsList = () => {
  const { user } = useAuth();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedHabit, setSelectedHabit] = React.useState<HabitOut | null>(
    null,
  );
  const queryClient = useQueryClient();

  const { data: habits = [], isLoading: isHabitsLoading } = useQuery({
    queryKey: ["habits"],
    queryFn: async () => (await habitApi.readUserHabits()).data,
    enabled: !!user,
  });

  const { mutateAsync: deleteHabit, isPending: isDeleteHabitPending } =
    useMutation({
      mutationFn: async (data: { habitId: number }) => {
        return (await habitApi.deleteUserHabit(data.habitId)).data;
      },
      onSuccess: () => {
        setOpenAlert(false);
        queryClient.invalidateQueries({
          queryKey: ["habits"],
        });
      },
    });

  if (!user) {
    return <div className="my-4 text-center text-xl">Сізге тіркелу қажет!</div>;
  }

  if (isHabitsLoading) {
    return <div className="my-4 text-center text-xl">Жүктелуде...</div>;
  }

  return (
    <div>
      <h1 className="my-6 text-xl font-medium">📋 Әдеттер тізімі</h1>

      <div className="mx-auto md:p-6">
        <div className="space-y-4">
          {habits.length === 0 && (
            <p className="text-center text-xl">Сізде әдеттер жоқ</p>
          )}
          {habits.map((habit, id) => (
            <div
              className={cn(
                "relative flex flex-row items-center gap-3 rounded-lg border-2 p-2 transition-all md:p-4",
                "border-gray-200 bg-white hover:border-purple-300",
              )}
              key={habit.id}
            >
              <label>{id + 1 + ". " + habit.title}</label>
              <div className="absolute right-4 flex items-center gap-2">
                <Button
                  onClick={() => {
                    setSelectedHabit(habit);
                    setOpenEdit(true);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  ✏️
                </Button>
                <Button
                  onClick={() => {
                    setSelectedHabit(habit);
                    setOpenAlert(true);
                  }}
                  variant="ghost"
                  size="icon"
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Әдетті жою 🗑️️</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedHabit?.title}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Болдырмау</AlertDialogCancel>
              <AlertDialogAction
                className={"bg-destructive hover:bg-destructive/90"}
                disabled={isDeleteHabitPending}
                onClick={async () => {
                  if (!selectedHabit) return;
                  return await deleteHabit({
                    habitId: selectedHabit.id,
                  });
                }}
              >
                {isDeleteHabitPending ? <>Жүктелуде...</> : <>Жою</>}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Әдетті өңдеу ✏️</DialogTitle>
                <DialogDescription>{selectedHabit?.title}</DialogDescription>
              </DialogHeader>
              <HabitsSave
                className="!p-0"
                edit
                habit={selectedHabit!}
                onSaveAction={() => {
                  setOpenEdit(false);
                  // setSelectedHabit(null);
                }}
              />
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
};
