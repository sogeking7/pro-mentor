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
import type { HabitCreate, HabitOut, HabitUpdate } from "@/lib/open-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(6).max(255),
  habit_type_id: z.number().nonnegative(),
});

type Form = z.infer<typeof schema>;

interface EditProps {
  edit: true;
  habit: HabitOut;
  onSaveAction?: () => void;
  className?: string;
}

interface CreateProps {
  edit?: false;
  habit?: undefined;
  onSaveAction?: () => void;
  className?: string;
}

type HabitsSaveProps = EditProps | CreateProps;

export const HabitsSave = (props: HabitsSaveProps) => {
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

  const { mutateAsync: editHabit, isPending: isEditHabitPending } = useMutation(
    {
      mutationFn: async (data: { id: number; habit: HabitUpdate }) =>
        (await habitApi.updateUserHabit(data.id, data.habit)).data,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["habits"],
        });
      },
    },
  );

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: props.edit ? props.habit.title : "",
      habit_type_id: props.edit ? props.habit.habit_type_id : undefined,
    },
  });

  async function onSubmit(data: Form) {
    if (!props.edit) {
      await createHabit(data);
      form.reset({
        title: "",
        habit_type_id: undefined,
      });
    } else {
      if (!props.habit) return;
      await editHabit({
        id: props.habit.id,
        habit: data,
      });
    }
    toast.success("Сәтті сақталды!");
    if (props.onSaveAction) {
      props.onSaveAction();
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className={cn(props.className, "md:p-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Әдет атауы</FormLabel>
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
                      <SelectValue placeholder="Әдет түрін таңдаңыз" />
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
            disabled={
              !form.formState.isValid ||
              isCreateHabitPending ||
              isEditHabitPending
            }
          >
            {isCreateHabitPending ? "Жүктелуде..." : "Сақтау"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
