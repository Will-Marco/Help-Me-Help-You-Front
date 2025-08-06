import {Home, Teachers, Students} from '../pages/Dashboard'
import { GraduationCap, HomeIcon, Users } from 'lucide-react';

export const Path = {
    main: '/',
    loginAdmin: '/login/admin',
    loginTeacher: '/login/teacher',
    teachers: '/teachers',
    students: '/students'
}

export const DashboardRouteList = [
    {
        id:1,
        path: Path.main,
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
      path: Path.main,
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