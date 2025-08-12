import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useState, useEffect } from "react";
  
  type Field = {
    label: string;
    key: string;
    type?: string;
    placeholder?: string;
  };
  
  interface UpdateDialogProps<T> {
    item: T | null;
    fields: Field[];
    onClose: () => void;
    onSave: (updatedItem: T) => void;
    title?: string;
  }
  
  export function UpdateDialog<T extends { id: string }>({
    item,
    fields,
    onClose,
    onSave,
    title,
  }: UpdateDialogProps<T>) {
    const [formData, setFormData] = useState<T | null>(item);
  
    useEffect(() => {
      setFormData(item);
    }, [item]);
  
    if (!formData) return null;
  
    const handleChange = (key: keyof T, value: any) => {
      setFormData({ ...formData, [key]: value });
    };
  
    const handleSave = () => {
      onSave(formData);
    };
  
    return (
      <Dialog open={!!item} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{title ?? "Update Item"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {fields.map(({ label, key, type = "text", placeholder }) => (
              <Input
                key={key}
                type={type}
                value={(formData as any)[key] ?? ""}
                placeholder={placeholder ?? label}
                onChange={(e) => handleChange(key as keyof T, e.target.value)}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  