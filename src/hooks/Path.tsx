// src/routes/dashboardRoutes.js

import {
  Home,
  Teachers,
  Students,
  Rating,
  Lessons,
  LessonHistory,
  Admins,
  Payments,
  Settings
} from '../pages/Dashboard';

import {
  GraduationCap,
  HomeIcon,
  Users,
  BookOpen,
  History,
  Shield,
  CreditCard,
  Settings as SettingsIcon,
  Star
} from 'lucide-react';
import { StudentHome } from '@/pages/Student';
import StudentTeacher from '@/pages/Student/StudentTeacher';

// 📌 Barcha Path'lar
export const Path = {
  main: '/',
  home: '/home',
  loginAdmin: '/login/admin',
  loginTeacher: '/login/teacher',
  teachers: '/admin/teachers',
  students: '/admin/students',
  rating: '/admin/rating',
  admin: '/admin/home',
  lessons: '/admin/lessons',
  lessonHistory: '/admin/lesson-history',
  admins: '/admin/admins',
  payments: '/admin/payments',
  settings: '/admin/settings',
};

export const StudentPaths = {
  studentHome: '/student/home',
  studentProfile: '/student/profile',
  studentTeachers: '/student/teacher/:id',
}

export const StudentDashboardRouteList = [
  { id: 1, path: StudentPaths.studentHome, element: <StudentHome />},
  { id: 2, path: StudentPaths.studentTeachers, element: <StudentTeacher />},
]

// 📌 Route ro‘yxati (Router uchun)
export const DashboardRouteList = [
  { id: 1, path: Path.admin, element: <Home /> },
  { id: 2, path: Path.teachers, element: <Teachers /> },
  { id: 3, path: Path.students, element: <Students /> },
  { id: 4, path: Path.rating, element: <Rating /> },
  { id: 5, path: Path.lessons, element: <Lessons /> },
  { id: 6, path: Path.lessonHistory, element: <LessonHistory /> },
  { id: 7, path: Path.admins, element: <Admins /> },
  { id: 8, path: Path.payments, element: <Payments /> },
  { id: 9, path: Path.settings, element: <Settings /> },
];

// 📌 Navbar menyu ro‘yxati
export const DashboardNavList = [
  { id: 1, label: "Home", path: Path.admin, icon: HomeIcon },
  { id: 2, label: "Teachers", path: Path.teachers, icon: Users },
  { id: 3, label: "Students", path: Path.students, icon: GraduationCap },
  { id: 4, label: "Rating", path: Path.rating, icon: Star },
  { id: 5, label: "Lessons", path: Path.lessons, icon: BookOpen },
  { id: 6, label: "Lesson History", path: Path.lessonHistory, icon: History },
  { id: 7, label: "Admins", path: Path.admins, icon: Shield },
  { id: 8, label: "Payments", path: Path.payments, icon: CreditCard },
  { id: 9, label: "Settings", path: Path.settings, icon: SettingsIcon },
];
