import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Register from "@/features/auth/Register/Register";
import { useState } from "react";

export function RegisterBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Тіркелу</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="space-y-4 sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Тіркелу</DialogTitle>
        </DialogHeader>
        <Register onSuccessAction={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
