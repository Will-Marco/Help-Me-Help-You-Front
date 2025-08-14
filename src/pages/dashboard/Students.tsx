import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PageLoading from "@/components/PageLoading";

import { UpdateDialog } from "@/components/UpdateDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { DetailsDialog } from "@/components/DetailsDialog";
import { StudentCard } from "@/components/StudentCard"; 
import type { Student } from "@/@types/Student";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddStudentDialog } from "@/components/AddStudent";

const API = "http://localhost:3000";

type DialogType = "add"|"update" | "delete" | "details" | null;

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

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/students`);
      if (!res.ok) throw new Error("Fetch failed");
      const data: Student[] = await res.json();
      setStudents(data);
    } catch (error) {
      toast.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) =>
    [s.firstname, s.lastname, s.email, s.phone]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (student: Student) => {
    try {
      const res = await fetch(`${API}/students/${student.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStudents(students.filter((s) => s.id !== student.id));
      toast.success("Delete successful");
    } catch {
      toast.error("Error deleting student");
    }
    setDialogType(null);
    setSelectedStudent(null);
  };

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
      toast.success("Student updated successfully");
    } catch {
      toast.error("Error updating student");
    }
    setDialogType(null);
    setSelectedStudent(null);
  };

  if (loading) return <PageLoading />;

  const handleAdd = async (
    newStundetData: Omit<
      Student,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "lessons"
    >
  ) => {
    try {
      const now = new Date().toISOString();
      const payload = {
        ...newStundetData,
        id: `t${Date.now()}`,
        lessons: [],
        createdAt: now,
        updatedAt: now,
      };

      const res = await fetch(`${API}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdStudent: Student = await res.json();
        setStudents([...students, createdStudent]);
        toast.success("Teacher added successfully");
      } else {
        toast.error("Error adding teacher");
      }
    } catch {
      toast.error("Error adding teacher");
    }
    setDialogType(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Students</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by first name, last name, email or phone"
            className="flex-1 bg-white border border-gray-200"
            type="search"
          />
          <Button
            onClick={() => setDialogType("add")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </div>
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

      <AddStudentDialog
        open={dialogType === "add"}
        onClose={() => setDialogType(null)}
        onAdd={handleAdd}
      />

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
