export interface LessonType {
  id: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  price?: number;
  status?: "available" | "booked" | "canceled";
  isPaid?: boolean; // ✅ qo'shildi
  studentId?: string | null;
}
