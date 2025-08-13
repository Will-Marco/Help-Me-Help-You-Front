import { useEffect, useState } from "react";
import type { Teacher } from "@/@types/Teachers";
import type { LessonType } from "@/@types/LessonType";
import TeacherCardForStudent from "@/components/TeacherCardForStudent";
import Paginate from "@/components/Paginate";
import { useNavigate } from "react-router-dom";
import { StudentPaths } from "@/hooks/Path";

const StudentHomeModule = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 6; 
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeachers = teachers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/teachers").then((res) => res.json()),
      fetch("http://localhost:3000/lessons").then((res) => res.json()),
    ])
      .then(([teacherData, lessonData]) => {
        setTeachers(teacherData);
        setLessons(lessonData);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleOnClick(teacherId: string) {
    // Handle the click event, e.g., navigate to a booking page or show more details
    console.log(`Booking for teacher with ID: ${teacherId}`);
    navigate(StudentPaths.studentTeachers.replace(":id", teacherId));
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Teacher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentTeachers.map((teacher) => <TeacherCardForStudent key={teacher.id} teacher={teacher} lessons={lessons} oneTeacher={false} handleOnClick={() => handleOnClick(teacher.id)}/>)}
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default StudentHomeModule;