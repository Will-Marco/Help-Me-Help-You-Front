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
    trigger: React.ReactNode;
    itemName?: string;
    onConfirm: () => void;
  }
  
  export function ConfirmDeleteDialog({
    trigger,
    itemName,
    onConfirm,
  }: ConfirmDeleteDialogProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
  
        <DialogContent>
          <DialogTitle>O‘chirishni tasdiqlang</DialogTitle>
          <DialogDescription>
            {itemName
              ? `"${itemName}" elementini o‘chirishga ishonchingiz komilmi?`
              : "Bu elementni o‘chirishga ishonchingiz komilmi?"}
          </DialogDescription>
  
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Bekor qilish</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={onConfirm}>
                Ha, o‘chirish
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  