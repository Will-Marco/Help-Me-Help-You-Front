import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Star } from "lucide-react";
import { toast } from "sonner"; // Toast kutubxonasi

type Field = {
  label: string;
  key: string;
  copyable?: boolean; // ustiga bosilganda nusxalash
  isRating?: boolean; // rating bo‘lsa
};

interface DetailsDialogProps<T> {
  item: T | null;
  fields: Field[];
  onClose: () => void;
}

export function DetailsDialog<T>({
  item,
  fields,
  onClose,
}: DetailsDialogProps<T>) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        {item && (
          <>
            <DialogHeader>
              <DialogTitle>
                {(item as any).name ||
                  `${(item as any).firstname || ""} ${(item as any).lastname || ""}` ||
                  "Details"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              {fields.map(({ label, key, copyable, isRating }) => {
                const value = (item as any)[key];
                if (isRating && typeof value === "number") {
                  return (
                    <p key={key} className="flex items-center gap-2">
                      <strong>{label}:</strong> {renderStars(value)}
                    </p>
                  );
                }
                if (copyable && value) {
                  return (
                    <p
                      key={key}
                      className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline"
                      onClick={() => copyToClipboard(String(value))}
                    >
                      <strong className="text-black">{label}:</strong> {value}
                      <Copy size={14} />
                    </p>
                  );
                }
                return (
                  <p key={key}>
                    <strong>{label}:</strong> {value ?? "-"}
                  </p>
                );
              })}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
