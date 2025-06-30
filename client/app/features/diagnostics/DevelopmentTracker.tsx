import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitApi } from "@/lib/services";
import type { HabitCompletionSave } from "@/lib/open-api";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const habitCompletionSchema = z.object({
  completions: z.array(z.number()),
});

type HabitCompletionForm = z.infer<typeof habitCompletionSchema>;

export const DevelopmentTracker = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: todayCompletions = [] } = useQuery({
    queryKey: ["today_habits_completions"],
    queryFn: async () => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return (await habitApi.todayHabitCompletions(userTimezone)).data;
    },
  });

  const { data: habits = [], isLoading: isHabitsLoading } = useQuery({
    queryKey: ["habits"],
    queryFn: async () => (await habitApi.readUserHabits()).data,
    enabled: !!user,
  });

  const form = useForm<HabitCompletionForm>({
    resolver: zodResolver(habitCompletionSchema),
    defaultValues: { completions: [] },
  });

  useEffect(() => {
    if (todayCompletions.length === 0) return;

    const existing = form.getValues("completions");
    if (!existing || existing.length === 0) {
      const completedHabitIds = todayCompletions
        .filter((c) => c.completed)
        .map((c) => c.habit_id);

      form.setValue("completions", completedHabitIds);
    }
  }, [todayCompletions]);

  const { mutateAsync: saveHabitCompletion, isPending } = useMutation({
    mutationFn: async (data: {
      habit_id: number;
      habit_completion: HabitCompletionSave;
    }) => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return (
        await habitApi.saveHabitCompletion(
          data.habit_id,
          data.habit_completion,
          userTimezone,
        )
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today_habits_completions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-habitCompletions"] });
    },
  });

  async function onSubmit(data: HabitCompletionForm) {
    await Promise.all(
      habits.map((habit) => {
        const completed = data.completions.includes(habit.id);
        return saveHabitCompletion({
          habit_id: habit.id,
          habit_completion: { completed },
        });
      }),
    );
    toast.success("Сәтті сақталды!");
    form.reset(data);
  }

  const current = form.watch("completions");

  const initial = todayCompletions
    .filter((c) => c.completed)
    .map((c) => c.habit_id);

  const hasChanged =
    current.length !== initial.length ||
    current.some((id) => !initial.includes(id));

  if (!user) {
    return <div className="my-4 text-center text-xl">Сізге тіркелу қажет!</div>;
  }

  if (isHabitsLoading) {
    return <div className="my-4 text-center text-xl">Жүктелуде...</div>;
  }

  if (habits.length === 0) {
    return <div className="my-4 text-center text-xl">Сізде әдеттер жоқ</div>;
  }

  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-6 text-center text-2xl font-medium">{formattedDate}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="completions"
            render={() => (
              <FormItem className="space-y-2">
                {habits.map((habit) => (
                  <FormField
                    key={habit.id}
                    control={form.control}
                    name="completions"
                    render={({ field }) => {
                      const isChecked = field.value?.includes(habit.id);
                      return (
                        <FormItem
                          className={cn(
                            "relative flex flex-row items-center gap-3 rounded-lg border-2 p-4 pr-14 transition-all",
                            isChecked
                              ? "border-green-200 bg-green-50"
                              : "border-gray-200 bg-white hover:border-purple-300",
                          )}
                          onClick={() => {
                            const value = field.value || [];
                            if (isChecked) {
                              field.onChange(
                                value.filter((id) => id !== habit.id),
                              );
                            } else {
                              field.onChange([...value, habit.id]);
                            }
                          }}
                        >
                          <FormControl>
                            <span
                              className="inline-flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, habit.id]);
                                  } else {
                                    field.onChange(
                                      value.filter((id) => id !== habit.id),
                                    );
                                  }
                                }}
                              />
                            </span>
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "text-base font-normal",
                              isChecked && "text-gray-500 line-through",
                            )}
                          >
                            {habit.title}
                          </FormLabel>
                          <span className="absolute right-4 font-medium">
                            {habit.type.name}
                          </span>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={!hasChanged || isPending}
          >
            {isPending ? "Жүктелуде..." : "Сақтау"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
