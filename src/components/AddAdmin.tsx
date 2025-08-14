import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { useState } from "react";
  import type { Admin } from "@/@types/AdminType";
  
  interface AddAdminDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (newAdmin: Omit<Admin, "id" | "createdAt" | "updatedAt">) => void;
  }
  
  export function AddAdminDialog({ open, onClose, onAdd }: AddAdminDialogProps) {
    const [formData, setFormData] = useState({
      username: "",
      role: "" as "SUPERADMIN" | "ADMIN" | "",
      phone: "",
      password: "",
    });
  
    const handleChange = (key: keyof typeof formData, value: string) => {
      setFormData({ ...formData, [key]: value });
    };
  
    const handleAdd = () => {
      if (!formData.username || !formData.role || !formData.phone || !formData.password) {
        return;
      }
      
      onAdd({
        username: formData.username,
        role: formData.role as "SUPERADMIN" | "ADMIN",
        phone: formData.phone,
        password: formData.password,
      });
      
      // Reset form
      setFormData({
        username: "",
        role: "",
        phone: "",
        password: "",
      });
    };
  
    const handleClose = () => {
      setFormData({
        username: "",
        role: "",
        phone: "",
        password: "",
      });
      onClose();
    };
  
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="text"
              value={formData.username}
              placeholder="Username"
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <Select value={formData.role} onValueChange={(value: "SUPERADMIN" | "ADMIN") => handleChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="tel"
              value={formData.phone}
              placeholder="Phone (+998901234567)"
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              type="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleAdd}
              disabled={!formData.username || !formData.role || !formData.phone || !formData.password}
            >
              Add Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }