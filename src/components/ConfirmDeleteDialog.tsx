// components/confirm-delete-dialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName?: string;
  onConfirm: () => void;
  trigger?: React.ReactNode; // trigger bo'lmasa ham bo'ladi
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  itemName,
  onConfirm,
  trigger,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogTitle>O‘chirishni tasdiqlang</DialogTitle>
        <DialogDescription>
          {itemName
            ? `"${itemName}" elementini o‘chirishga ishonchingiz komilmi?`
            : "Bu elementni o‘chirishga ishonchingiz komilmi?"}
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Bekor qilish
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Ha, o‘chirish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
