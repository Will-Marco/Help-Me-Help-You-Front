import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PageLoading from "@/components/PageLoading";
import { UpdateDialog } from "@/components/UpdateDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { DetailsDialog } from "@/components/DetailsDialog";
import { Calendar, MessageSquare } from "lucide-react";
import type { Lesson } from "@/@types/Lessons";
import type { LessonHistory } from "@/@types/LessonHistory";
import { EnhancedLessonCard } from "@/components/LessonsCard";
import { EnhancedLessonHistoryCard } from "@/components/LessonsHIstoryCard";

const API = "http://localhost:3000";

type DialogType = "update" | "delete" | "delete-history" | "details" | null;
type ActiveTab = "booked" | "available" | "cancelled" | "history";

const updateLessonFields = [
  { label: "Teacher ID", key: "teacherId", copyable: true },
  { label: "Student ID", key: "studentId", copyable: true },
  { label: "Start Time", key: "startTime", type: "datetime-local" },
  { label: "End Time", key: "endTime", type: "datetime-local" },
  { label: "Status", key: "status" },
  { label: "Price", key: "price", type: "number" },
  { label: "Meeting URL", key: "meetingUrl", copyable: true },
] as const;

const detailsLessonFields = [
  { label: "Lesson ID", key: "id", copyable: true },
  { label: "Teacher Name", key: "teacherName" },
  { label: "Teacher Email", key: "teacherEmail", copyable: true },
  { label: "Teacher Phone", key: "teacherPhone", copyable: true },
  { label: "Student Name", key: "studentName" },
  { label: "Student Email", key: "studentEmail", copyable: true },
  { label: "Student Phone", key: "studentPhone", copyable: true },
  { label: "Start Time", key: "startTime" },
  { label: "End Time", key: "endTime" },
  { label: "Status", key: "status" },
  { label: "Price", key: "price" },
  { label: "Meeting URL", key: "meetingUrl", copyable: true },
] as const;

const detailsHistoryFields = [
  { label: "History ID", key: "id", copyable: true },
  { label: "Lesson ID", key: "lessonId", copyable: true },
  { label: "Teacher Name", key: "teacherName" },
  { label: "Teacher Email", key: "teacherEmail", copyable: true },
  { label: "Teacher Phone", key: "teacherPhone", copyable: true },
  { label: "Student Name", key: "studentName" },
  { label: "Student Email", key: "studentEmail", copyable: true },
  { label: "Student Phone", key: "studentPhone", copyable: true },
  { label: "Started", key: "startTime" },
  { label: "Ended", key: "endTime" },
  { label: "Rating", key: "star", isRating: true },
  { label: "Feedback", key: "feedback" },
] as const;

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonHistory, setLessonHistory] = useState<LessonHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("booked");

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<LessonHistory | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/lessons?_expand=teacher&_expand=student`);
      if (!res.ok) throw new Error("fetch lessons failed");
      const data: Lesson[] = await res.json();
      setLessons(data);
    } catch {
      toast.error("Error loading lessons");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonHistory = async () => {
    try {
      const res = await fetch(`${API}/lessonHistory?_expand=teacher&_expand=student`);
      if (!res.ok) throw new Error("fetch history failed");
      const data: LessonHistory[] = await res.json();
      setLessonHistory(data);
    } catch {
      toast.error("Error loading lesson history");
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchLessonHistory();
  }, []);

  const normalize = (v: unknown) => (v == null ? "" : String(v)).toLowerCase();
  const matchesQuery = (haystack: Array<unknown>, query: string) =>
    haystack.filter(Boolean).some((v) => normalize(v).includes(query));

  const lessonMatches = (l: Lesson, query: string) => {
    const t: any = (l as any).teacher || {};
    const s: any = (l as any).student || {};
    return matchesQuery(
      [l.id,l.teacherId,l.studentId,t.name,t.email,t.phone,s.name,s.email,s.phone,],
      query
    );
  };

  const historyMatches = (h: LessonHistory, query: string) => {
    const t: any = (h as any).teacher || {};
    const s: any = (h as any).student || {};
    return matchesQuery(
      [h.id,h.lessonId,h.teacherId,h.studentId,(h as any).feedback,t.name,t.email,t.phone,s.name,s.email,s.phone,],
      query
    );
  };

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (activeTab === "history") {
      return q ? lessonHistory.filter((h) => historyMatches(h, q)) : lessonHistory;
    }
    const byTab = lessons.filter((l) => l.status === activeTab);
    return q ? byTab.filter((l) => lessonMatches(l, q)) : byTab;
  }, [lessons, lessonHistory, search, activeTab]);

  const tabCounts = useMemo(() => {
    return {
      booked: lessons.filter((l) => l.status === "booked").length,
      available: lessons.filter((l) => l.status === "available").length,
      cancelled: lessons.filter((l) => l.status === "cancelled").length,
      history: lessonHistory.length,
    };
  }, [lessons, lessonHistory]);

  const handleUpdate = async (updatedLesson: Lesson) => {
    try {
      const payload: any = {
        id: updatedLesson.id,
        teacherId: (updatedLesson as any).teacherId || (updatedLesson as any).teacher?.id,
        studentId:
          (updatedLesson as any).studentId ||
          (updatedLesson as any).student?.id ||
          null,
        startTime: (updatedLesson as any).startTime,
        endTime: (updatedLesson as any).endTime,
        status: (updatedLesson as any).status,
        googleEventId: (updatedLesson as any).googleEventId,
        meetingUrl: (updatedLesson as any).meetingUrl,
        price: (updatedLesson as any).price,
        isPaid: (updatedLesson as any).isPaid,
        createdAt: (updatedLesson as any).createdAt,
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch(`${API}/lessons/${updatedLesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("update failed");

      setLessons((prev) =>
        prev.map((l) => (l.id === updatedLesson.id ? { ...l, ...payload } : l))
      );
      toast.success("Lesson updated successfully");
    } catch {
      toast.error("Error updating lesson");
    } finally {
      setDialogType(null);
      setSelectedLesson(null);
    }
  };

  const handleDelete = async (lesson: Lesson) => {
    try {
      const res = await fetch(`${API}/lessons/${lesson.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
      toast.success("Lesson deleted");
    } catch {
      toast.error("Error deleting lesson");
    } finally {
      setDialogType(null);
      setSelectedLesson(null);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      const res = await fetch(`${API}/lessonHistory/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete history failed");

      setLessonHistory((prev) => prev.filter((h) => h.id !== id));
      toast.success("History record deleted");
    } catch {
      toast.error("Error deleting history record");
    } finally {
      setDialogType(null);
      setSelectedHistory(null);
    }
  };

  const buildLessonDetails = (l: Lesson) => {
    const t: any = (l as any).teacher || {};
    const s: any = (l as any).student || {};
    return {
      ...l,
      teacherName: t.name ?? "",
      teacherEmail: t.email ?? "",
      teacherPhone: t.phone ?? "",
      studentName: s.firstname ?? "",
      studentEmail: s.email ?? "",
      studentPhone: s.phone ?? "",
    };
  };

  const buildHistoryDetails = (h: LessonHistory) => {
    const t: any = (h as any).teacher || {};
    const s: any = (h as any).student || {};
    return {
      ...h,
      teacherName: t.name ?? "",
      teacherEmail: t.email ?? "",
      teacherPhone: t.phone ?? "",
      studentName: s.firstname ?? "",
      studentEmail: s.email ?? "",
      studentPhone: s.phone ?? "",
    };
  };

  if (loading) return <PageLoading />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Lessons</h1>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(
              [
                { key: "booked", label: "Booked", count: tabCounts.booked },
                { key: "available", label: "Available", count: tabCounts.available },
                { key: "cancelled", label: "Cancelled", count: tabCounts.cancelled },
                { key: "history", label: "History", count: tabCounts.history },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                activeTab === "history"
                  ? "Search by student/teacher name, email, phone, ID or feedback"
                  : "Search by student/teacher name, email, phone or ID"
              }
              className="w-full bg-white border border-gray-200"
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="mb-4">
              {activeTab === "history" ? (
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto" />
              ) : (
                <Calendar className="h-16 w-16 text-gray-300 mx-auto" />
              )}
            </div>
            <p className="text-lg font-medium">
              {activeTab === "history"
                ? "No lesson history found."
                : `“${tabCounts[activeTab]}” — no matching lessons found.`}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {search ? "Try changing your search keywords." : "Data will appear here when available."}
            </p>
          </div>
        ) : (
          <>
            {activeTab === "history"
              ? (filteredData as LessonHistory[]).map((history) => (
                  <EnhancedLessonHistoryCard
                    key={history.id}
                    history={history}
                    onMore={(h: LessonHistory) => {
                      setSelectedHistory(h);
                      setDialogType("details");
                    }}
                    onEdit={(h: LessonHistory) => {
                      setSelectedHistory(h);
                      toast.info("History editing is not implemented yet");
                    }}
                    onDelete={() => {
                      setSelectedHistory(history);
                      setDialogType("delete-history");
                    }}
                  />
                ))
              : (filteredData as Lesson[]).map((lesson) => (
                  <EnhancedLessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onMore={(l) => {
                      setSelectedLesson(l);
                      setDialogType("details");
                    }}
                    onEdit={(l) => {
                      setSelectedLesson(l);
                      setDialogType("update");
                    }}
                    onDelete={(id) => {
                      const l = lessons.find((ls) => ls.id === id);
                      if (l) {
                        setSelectedLesson(l);
                        setDialogType("delete");
                      }
                    }}
                  />
                ))}
          </>
        )}
      </div>

      <UpdateDialog
        item={dialogType === "update" ? selectedLesson : null}
        fields={updateLessonFields as any}
        onClose={() => {
          setDialogType(null);
          setSelectedLesson(null);
        }}
        onSave={handleUpdate}
        title="Edit Lesson"
      />

      <ConfirmDeleteDialog
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedLesson(null);
          }
        }}
        itemName={selectedLesson ? `Lesson ${selectedLesson.id}` : ""}
        onConfirm={() => selectedLesson && handleDelete(selectedLesson)}
      />

      <ConfirmDeleteDialog
        open={dialogType === "delete-history"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedHistory(null);
          }
        }}
        itemName={selectedHistory ? `History record ${selectedHistory.id}` : ""}
        onConfirm={() => selectedHistory && handleDeleteHistory(selectedHistory.id)}
      />

      <DetailsDialog
        item={
          dialogType === "details" && selectedLesson
            ? buildLessonDetails(selectedLesson)
            : null
        }
        fields={detailsLessonFields as any}
        onClose={() => {
          setDialogType(null);
          setSelectedLesson(null);
        }}
      />

      <DetailsDialog
        item={
          dialogType === "details" && selectedHistory
            ? buildHistoryDetails(selectedHistory)
            : null
        }
        fields={detailsHistoryFields as any}
        onClose={() => {
          setDialogType(null);
          setSelectedHistory(null);
        }}
      />
    </div>
  );
};

export default Lessons;
