import {Home, Teachers, Students} from '../pages/Dashboard'
import { GraduationCap, HomeIcon, Users } from 'lucide-react';

export const Path = {
    main: '/',
    home: '/home',
    loginAdmin: '/login/admin',
    loginTeacher: '/login/teacher',
    teachers: '/admin/teachers',
    students: '/admin/students',
    admin: '/admin/home'
}

export const DashboardRouteList = [
    {
        id:1,
        path: Path.admin,
        element: <Home/>
    },
    {
        id:2,
        path: Path.teachers,
        element: <Teachers/>
    },
    {
        id:3,
        path: Path.students,
        element: <Students/>
    }
]


export const DashboardNavList = [
    {
      id: 1,
      label: "Home",
      path: Path.admin,
      icon: HomeIcon,
    },
    {
      id: 2,
      label: "Teachers",
      path: Path.teachers,
      icon: Users,
    },
    {
      id: 3,
      label: "Students",
      path: Path.students,
      icon: GraduationCap,
    },
  ];