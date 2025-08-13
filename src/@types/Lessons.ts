export type LessonStatus = "available" | "booked" | "cancelled"

export interface Lesson {
  id: string;
  teacherId: string;
  studentId: string | null;
  startTime: string;
  endTime: string;
  status: LessonStatus;
  googleEventId: string | null;
  meetingUrl: string | null;
  price: number;
  isPaid: boolean;
  cancellationReason?: string;
  cancelledBy?: "student" | "teacher" | "admin";
  createdAt: string;
  updatedAt: string;
}
