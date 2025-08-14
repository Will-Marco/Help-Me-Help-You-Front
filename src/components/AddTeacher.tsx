import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { useState } from "react";
  import type { Teacher } from "@/@types/Teachers";
  
  interface AddTeacherDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (newTeacher: Omit<Teacher, "id" | "createdAt" | "updatedAt" | "lessons" | "rating" | "googleId" | "googleRefreshToken" | "googleAccessToken" | "password">) => void;
  }
  
  export function AddTeacherDialog({ open, onClose, onAdd }: AddTeacherDialogProps) {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      level: "",
      hourPrice: "",
      experience: "",
      bio: "",
      image: "",
      portfolioVideoLink: "",
    });
  
    const handleChange = (key: keyof typeof formData, value: string) => {
      setFormData({ ...formData, [key]: value });
    };
  
    const handleAdd = () => {
      if (!formData.name || !formData.email || !formData.phone || !formData.level || !formData.hourPrice) {
        return;
      }
      
      onAdd({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        level: formData.level,
        hourPrice: Number(formData.hourPrice),
        experience: formData.experience,
        bio: formData.bio,
        image: formData.image || "https://randomuser.me/api/portraits/men/1.jpg", // Default image
        portfolioVideoLink: formData.portfolioVideoLink || null,
        role: "TEACHER",
        isActive: true,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        level: "",
        hourPrice: "",
        experience: "",
        bio: "",
        image: "",
        portfolioVideoLink: "",
      });
    };
  
    const handleClose = () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        level: "",
        hourPrice: "",
        experience: "",
        bio: "",
        image: "",
        portfolioVideoLink: "",
      });
      onClose();
    };
  
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="text"
              value={formData.name}
              placeholder="Full Name"
              onChange={(e) => handleChange("name", e.target.value)}
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
            <Input
              type="text"
              value={formData.level}
              placeholder="Level (A1, A2, B1, B2, C1, C2)"
              onChange={(e) => handleChange("level", e.target.value)}
            />
            <Input
              type="number"
              value={formData.hourPrice}
              placeholder="Price per hour"
              onChange={(e) => handleChange("hourPrice", e.target.value)}
            />
            <Input
              type="text"
              value={formData.experience}
              placeholder="Experience (e.g., 5 Years)"
              onChange={(e) => handleChange("experience", e.target.value)}
            />
            <Input
              type="url"
              value={formData.image}
              placeholder="Profile Image URL (optional)"
              onChange={(e) => handleChange("image", e.target.value)}
            />
            <Input
              type="url"
              value={formData.portfolioVideoLink}
              placeholder="Portfolio Video Link (optional)"
              onChange={(e) => handleChange("portfolioVideoLink", e.target.value)}
            />
            <Textarea
              value={formData.bio}
              placeholder="Bio / Description"
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleAdd}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.level || !formData.hourPrice}
            >
              Add Teacher
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }