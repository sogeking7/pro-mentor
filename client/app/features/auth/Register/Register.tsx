"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { authApi, userApi } from "@/lib/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegisterProps {
  onSuccessAction: () => void;
}

const registerSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  user_role_id: z.number().nonnegative(),
});
type Register = z.infer<typeof registerSchema>;

export default function Register({ onSuccessAction }: RegisterProps) {
  const { login } = useAuth();

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const { data: user_roles, isLoading } = useQuery({
    queryFn: async () => (await userApi.readUserRoles()).data,
    queryKey: ["user_roles"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Register) => authApi.register(data),
    onSuccess: () => {
      toast.success("Қош келдіңіз 🎉");
      onSuccessAction();
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message, {
        style: {
          color: "var(--destructive)",
        },
      });
    },
  });

  const onSubmit = async (data: Register) => {
    await mutateAsync(data);
    await userApi.readCurrentUser().then(({ data }) => {
      login(data);
    });
  };

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аты</FormLabel>
                <FormControl>
                  <Input placeholder="Аты" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тегі</FormLabel>
                <FormControl>
                  <Input placeholder="Тегі" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Пароль" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_role_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Рөл</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value !== undefined ? String(field.value) : ""}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Рөлді таңдаңыз" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user_roles?.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Жүктелуде..." : "Тіркелу"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
