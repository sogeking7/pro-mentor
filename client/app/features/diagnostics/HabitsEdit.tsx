import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitApi } from "@/lib/services";
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
import { useAuth } from "@/contexts/AuthContext";
import type { HabitCreate } from "@/lib/open-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const schema = z.object({
  title: z.string().min(6).max(255),
  habit_type_id: z.number().nonnegative(),
});

type Form = z.infer<typeof schema>;

export const HabitsEdit = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: habit_types = [], isLoading: isHabitTypesLoading } = useQuery({
    queryKey: ["habit_types"],
    queryFn: async () => (await habitApi.readHabitTypes()).data,
    enabled: !!user,
  });

  const { mutateAsync: createHabit, isPending: isCreateHabitPending } =
    useMutation({
      mutationFn: async (data: HabitCreate) =>
        (await habitApi.createUserHabit(data)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["habits"],
        });
      },
    });

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: Form) {
    await createHabit(data);
    toast.success("Сәтті сақталды!");
    form.reset({
      title: "",
    });
  }

  if (!user) {
    return null;
  }

  return (
    <div className="md:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Әдет</FormLabel>
                <FormControl>
                  <Input placeholder="Мысалы: 30 минут кітап оқу" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="habit_type_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Әдет түрі</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value !== undefined ? String(field.value) : ""}
                  disabled={isHabitTypesLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Рөлді таңдаңыз" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {habit_types?.map((type) => (
                      <SelectItem key={type.id} value={String(type.id)}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid || isCreateHabitPending}
          >
            {isCreateHabitPending ? "Жүктелуде..." : "Сақтау"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
