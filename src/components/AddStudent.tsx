import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Student } from "@/@types/Student";

interface AddTeacherDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (
    newTeacher: Omit<Student, "id" | "createdAt" | "updatedAt" | "lessons">
  ) => void;
}

export function AddStudentDialog({
  open,
  onClose,
  onAdd,
}: AddTeacherDialogProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    age: "",
    tg_id: "",
    tg_username: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAdd = () => {
    if (
      !formData.firstname ||
      !formData.email ||
      !formData.phone ||
      !formData.lastname ||
      !formData.tg_id ||
      !formData.tg_username
    ) {
      return;
    }

    onAdd({
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age) || 0,
      tg_id: formData.tg_id,
      tg_username: formData.tg_username,
    });

    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      tg_id: "",
      tg_username: "",
      email: "",
      phone: "",
      age: "",
    });
  };

  const handleClose = () => {
    setFormData({
      firstname: "",
      lastname: "",
      tg_id: "",
      tg_username: "",
      age: "",
      email: "",
      phone: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="text"
            value={formData.firstname}
            placeholder="Full Name"
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
          <Input
            type="text"
            value={formData.lastname}
            placeholder="Last Name"
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
          <Input
            type="text"
            value={formData.tg_id}
            placeholder="Telegram ID"
            onChange={(e) => handleChange("tg_id", e.target.value)}
          />
          <Input
            type="text"
            value={formData.tg_username}
            placeholder="Telegram Username"
            onChange={(e) => handleChange("tg_username", e.target.value)}
          />
          <Input
            type="age"
            value={formData.age}
            placeholder="Age"
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <Input
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            type="tel"
            value={formData.phone}
            placeholder="Phone (+998901234567)"
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={
              !formData.firstname ||
              !formData.tg_id ||
              !formData.tg_username ||
              !formData.email ||
              !formData.phone
            }
          >
            Add Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
