import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PageLoading from "@/components/PageLoading";

import { UpdateDialog } from "@/components/UpdateDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { DetailsDialog } from "@/components/DetailsDialog";
import { StudentCard } from "@/components/StudentCard";  // StudentCard import qildik
import type { Student } from "@/@types/Student";

const API = "http://localhost:3000";

type DialogType = "update" | "delete" | "details" | null;

const studentFields = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  {label: "TG_Username", key: "tg_username", copyable: true },
  { label: "Email", key: "email", type: "email" , copyable: true },
  { label: "Phone", key: "phone" , copyable: true },
  { label: "Age", key: "age", type: "number" },
];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  // Malumotlarni olish
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/students`);
      if (!res.ok) throw new Error("Fetch failed");
      const data: Student[] = await res.json();
      setStudents(data);
    } catch (error) {
      toast.error("Studentlarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search filter
  const filteredStudents = students.filter((s) =>
    [s.firstname, s.lastname, s.email, s.phone]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  // Delete handler
  const handleDelete = async (student: Student) => {
    try {
      const res = await fetch(`${API}/students/${student.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStudents(students.filter((s) => s.id !== student.id));
      toast.success("Student o‘chirildi");
    } catch {
      toast.error("O‘chirishda xatolik");
    }
    setDialogType(null);
    setSelectedStudent(null);
  };

  // Update handler
  const handleUpdate = async (updatedStudent: Student) => {
    try {
      const payload = { ...updatedStudent, updatedAt: new Date().toISOString() };
      const res = await fetch(`${API}/students/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      setStudents(students.map((s) => (s.id === updatedStudent.id ? payload : s)));
      toast.success("Student yangilandi");
    } catch {
      toast.error("Yangilashda xatolik");
    }
    setDialogType(null);
    setSelectedStudent(null);
  };

  if (loading) return <PageLoading />;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Students</h1>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by first name, last name, email or phone"
          className="max-w-sm w-full bg-white border border-gray-200"
          type="search"
        />
      </div>

      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No students found.</div>
        ) : (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onMore={(s) => {
                setSelectedStudent(s);
                setDialogType("details");
              }}
              onEdit={(s) => {
                setSelectedStudent(s);
                setDialogType("update");
              }}
              onDelete={(id) => {
                const s = students.find((st) => st.id === id);
                if (s) {
                  setSelectedStudent(s);
                  setDialogType("delete");
                }
              }}
            />
          ))
        )}
      </div>

      <UpdateDialog
        item={dialogType === "update" ? selectedStudent : null}
        fields={studentFields}
        onClose={() => setDialogType(null)}
        onSave={handleUpdate}
      />

      <ConfirmDeleteDialog
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedStudent(null);
          }
        }}
        itemName={selectedStudent ? `${selectedStudent.firstname} ${selectedStudent.lastname}` : ""}
        onConfirm={() => selectedStudent && handleDelete(selectedStudent)}
      />

      <DetailsDialog
        item={dialogType === "details" ? selectedStudent : null}
        fields={studentFields}
        onClose={() => setDialogType(null)}
      />
    </div>
  );
};

export default Students;
