import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi, userApi } from "@/lib/services";
import React from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginProps {
  onSuccessAction: () => void;
}

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function Login({ onSuccessAction }: LoginProps) {
  const { login } = useAuth();
  let navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginForm) =>
      authApi.login(data.username, data.password),
    onSuccess: () => {
      toast.success("Қайтадан қош келдіңіз 🎉");
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

  const onSubmit = async (data: LoginForm) => {
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
            name="username"
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
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Жүктелуде..." : "Кіру"}
          </Button>
          <div className="grid grid-cols-1">
            <Button
              onClick={() => navigate("#")}
              type="button"
              variant={"link"}
            >
              Құпия сөзіңізді ұмыттыңыз ба?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
