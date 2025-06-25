import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "@/features/auth/Login/Login";
import { useState } from "react";

export function LoginBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Кіру</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="space-y-4 sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Кіру</DialogTitle>
        </DialogHeader>
        <Login onSuccessAction={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
