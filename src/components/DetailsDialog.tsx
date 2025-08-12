import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
  type Field = {
    label: string;
    key: string;
  };
  
  interface DetailsDialogProps<T> {
    item: T | null;
    fields: Field[];
    onClose: () => void;
  }
  
  export function DetailsDialog<T>({ item, fields, onClose }: DetailsDialogProps<T>) {
    return (
      <Dialog open={!!item} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          {item && (
            <>
              <DialogHeader>
                <DialogTitle>{(item as any).name || "Details"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                {fields.map(({ label, key }) => (
                  <p key={key}>
                    <strong>{label}:</strong> {(item as any)[key] ?? "-"}
                  </p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  