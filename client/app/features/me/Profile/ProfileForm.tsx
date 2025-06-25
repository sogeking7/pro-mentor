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
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userApi } from "@/lib/services";
import React from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UserOut, UserUpdate } from "@/lib/open-api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileFormProps {
  user: UserOut;
}

const profileSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
});
type Profile = z.infer<typeof profileSchema>;

export default function ProfileForm({ user }: ProfileFormProps) {
  const { login } = useAuth();

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UserUpdate) => userApi.updateUser(user.id, data),
    onSuccess: () => {
      toast.success("Ақпараттар өзгертілді 🎉");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message, {
        style: {
          color: "var(--destructive)",
        },
      });
    },
  });

  const onSubmit = async (data: Profile) => {
    await mutateAsync(data);
    await userApi.readCurrentUser().then(({ data }) => {
      login(data);
    });
  };

  const title = user
    ? (user.last_name[0] + user.first_name[0]).toUpperCase()
    : "";

  return (
    <div className="w-full max-w-md space-y-10">
      <Avatar className="mx-auto size-20 text-3xl">
        <AvatarFallback>{title}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6"
        >
          <div className="grid grid-cols-1  w-full items-start gap-4 md:grid-cols-2">
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
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Почта" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="">
            {isPending ? "Жүктелуде..." : "Сақтау"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
