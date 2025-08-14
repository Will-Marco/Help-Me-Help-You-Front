import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageLoading from "@/components/PageLoading";

import { UpdateDialog } from "@/components/UpdateDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { DetailsDialog } from "@/components/DetailsDialog";
import { AdminCard } from "@/components/AdminCard";
import { AddAdminDialog } from "@/components/AddAdmin";
import type { Admin } from "@/@types/AdminType";

const API = "http://localhost:3000";

type DialogType = "add" | "update" | "delete" | "details" | null;

const adminFields = [
  { label: "Username", key: "username" },
  { label: "Role", key: "role" },
  { label: "Phone", key: "phone", copyable: true },
  { label: "Password", key: "password", type: "password" },
];

const Admin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  // Malumotlarni olish
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admins`);
      if (!res.ok) throw new Error("Fetch failed");
      const data: Admin[] = await res.json();
      setAdmins(data);
    } catch (error) {
      toast.error("Error fetching admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Search filter
  const filteredAdmins = admins.filter((admin) =>
    [admin.username, admin.phone, admin.role]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  // Add handler
  const handleAdd = async (newAdminData: Omit<Admin, "id" | "createdAt" | "updatedAt">) => {
    try {
      const now = new Date().toISOString();
      const payload = {
        ...newAdminData,
        id: `a${Date.now()}`, // Generate simple ID
        createdAt: now,
        updatedAt: now,
      };

      const res = await fetch(`${API}/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Add failed");
      const createdAdmin: Admin = await res.json();
      setAdmins([...admins, createdAdmin]);
      toast.success("Admin added successfully");
    } catch {
      toast.error("Error adding admin");
    }
    setDialogType(null);
  };

  // Delete handler
  const handleDelete = async (admin: Admin) => {
    try {
      const res = await fetch(`${API}/admins/${admin.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setAdmins(admins.filter((a) => a.id !== admin.id));
      toast.success("Admin deleted successfully");
    } catch {
      toast.error("Error deleting admin");
    }
    setDialogType(null);
    setSelectedAdmin(null);
  };

  // Update handler
  const handleUpdate = async (updatedAdmin: Admin) => {
    try {
      const payload = { ...updatedAdmin, updatedAt: new Date().toISOString() };
      const res = await fetch(`${API}/admins/${updatedAdmin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      setAdmins(admins.map((a) => (a.id === updatedAdmin.id ? payload : a)));
      toast.success("Admin updated successfully");
    } catch {
      toast.error("Error updating admin");
    }
    setDialogType(null);
    setSelectedAdmin(null);
  };

  if (loading) return <PageLoading />;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Admins</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by username, phone or role"
            className="flex-1 bg-white border border-gray-200"
            type="search"
          />
          <Button
            onClick={() => setDialogType("add")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAdmins.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No admins found.</div>
        ) : (
          filteredAdmins.map((admin) => (
            <AdminCard
              key={admin.id}
              admin={admin}
              onMore={(a) => {
                setSelectedAdmin(a);
                setDialogType("details");
              }}
              onEdit={(a) => {
                setSelectedAdmin(a);
                setDialogType("update");
              }}
              onDelete={(id) => {
                const a = admins.find((admin) => admin.id === id);
                if (a) {
                  setSelectedAdmin(a);
                  setDialogType("delete");
                }
              }}
            />
          ))
        )}
      </div>

      <AddAdminDialog
        open={dialogType === "add"}
        onClose={() => setDialogType(null)}
        onAdd={handleAdd}
      />

      <UpdateDialog
        item={dialogType === "update" ? selectedAdmin : null}
        fields={adminFields}
        onClose={() => setDialogType(null)}
        onSave={handleUpdate}
      />

      <ConfirmDeleteDialog
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedAdmin(null);
          }
        }}
        itemName={selectedAdmin ? selectedAdmin.username : ""}
        onConfirm={() => selectedAdmin && handleDelete(selectedAdmin)}
      />

      <DetailsDialog
        item={dialogType === "details" ? selectedAdmin : null}
        fields={adminFields}
        onClose={() => setDialogType(null)}
      />
    </div>
  );
};

export default Admin;