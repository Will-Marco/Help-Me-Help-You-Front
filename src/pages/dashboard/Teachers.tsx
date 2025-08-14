import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { TeacherCard } from "@/components/TeacherCard";
import { DetailsDialog } from "@/components/DetailsDialog";
import { UpdateDialog } from "@/components/UpdateDialog";
import { AddTeacherDialog } from "@/components/AddTeacher";

import type { Teacher } from "@/@types/Teachers";
import PageLoading from "@/components/PageLoading";

const API = "http://localhost:3000";

type DialogType = "add" | "update" | "details" | null;

const teacherDetailsFields = [
  { label: "Email", key: "email", copyable: true },
  { label: "Phone", key: "phone", copyable: true },
  { label: "Level", key: "level" },
  { label: "Experience", key: "experience" },
  { label: "Price/hr", key: "hourPrice" },
  { label: "Rating", key: "rating", isRating: true },
  { label: "Bio", key: "bio" },
];

const teacherUpdateFields = [
  { label: "Name", key: "name", placeholder: "Name" },
  { label: "Email", key: "email", placeholder: "Email", type: "email" },
  { label: "Level", key: "level", placeholder: "Level" },
  {
    label: "Price/hr",
    key: "hourPrice",
    placeholder: "Price/hr",
    type: "number",
  },
  { label: "Phone", key: "phone", placeholder: "Phone" },
  { label: "Experience", key: "experience", placeholder: "Experience" },
  { label: "Bio", key: "bio", placeholder: "Bio" },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [search, setSearch] = useState("");

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/teachers`);
      const data = await res.json();
      setTeachers(data);
    } catch {
      toast.error("Error fetching teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Add handler
  const handleAdd = async (
    newTeacherData: Omit<
      Teacher,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "lessons"
      | "rating"
      | "googleId"
      | "googleRefreshToken"
      | "googleAccessToken"
      | "password"
    >
  ) => {
    try {
      const now = new Date().toISOString();
      const payload = {
        ...newTeacherData,
        id: `t${Date.now()}`,
        googleId: null,
        password: null,
        googleRefreshToken: null,
        googleAccessToken: null,
        rating: 0,
        lessons: [],
        createdAt: now,
        updatedAt: now,
      };

      const res = await fetch(`${API}/teachers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdTeacher: Teacher = await res.json();
        setTeachers([...teachers, createdTeacher]);
        toast.success("Teacher added successfully");
      } else {
        toast.error("Error adding teacher");
      }
    } catch {
      toast.error("Error adding teacher");
    }
    setDialogType(null);
  };

  const deleteTeacher = async (id: string) => {
    try {
      const res = await fetch(`${API}/teachers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeachers((prev) => prev.filter((t) => t.id !== id));
        toast.success("Teacher deleted");
      } else {
        toast.error("Error deleting teacher");
      }
    } catch {
      toast.error("Error deleting teacher");
    }
  };

  const updateTeacher = async (updatedTeacher: Teacher) => {
    try {
      const payload = {
        ...updatedTeacher,
        updatedAt: new Date().toISOString(),
      };
      const res = await fetch(`${API}/teachers/${updatedTeacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setTeachers((prev) =>
          prev.map((t) => (t.id === updatedTeacher.id ? payload : t))
        );
        toast.success("Teacher updated");
        setDialogType(null);
        setSelectedTeacher(null);
      } else {
        toast.error("Error updating teacher");
      }
    } catch {
      toast.error("Error updating teacher");
    }
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        <PageLoading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Teachers</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone"
            className="flex-1 bg-white border border-gray-200"
            type="search"
          />
          <Button
            onClick={() => setDialogType("add")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No teachers found.
          </div>
        ) : (
          filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onMore={(t) => {
                setSelectedTeacher(t);
                setDialogType("details");
              }}
              onEdit={(t) => {
                setSelectedTeacher(t);
                setDialogType("update");
              }}
              onDelete={deleteTeacher}
            />
          ))
        )}
      </div>

      <AddTeacherDialog
        open={dialogType === "add"}
        onClose={() => setDialogType(null)}
        onAdd={handleAdd}
      />

      <DetailsDialog
        item={dialogType === "details" ? selectedTeacher : null}
        fields={teacherDetailsFields}
        onClose={() => setDialogType(null)}
      />

      <UpdateDialog
        item={dialogType === "update" ? selectedTeacher : null}
        fields={teacherUpdateFields}
        onClose={() => setDialogType(null)}
        onSave={updateTeacher}
      />
    </div>
  );
};

export default Teachers;
