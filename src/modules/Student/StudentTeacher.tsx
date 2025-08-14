import { useEffect, useState } from "react";
import type { LessonType } from "@/@types/LessonType";
import type { Teacher } from "@/@types/Teachers";
import TeacherCardForStudent from "@/components/TeacherCardForStudent";
import { useNavigate } from "react-router-dom";
import { StudentPaths } from "@/hooks/Path";

const StudentTeacherModule = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const navigate = useNavigate();

  const teacherId = location.pathname.split("/").pop() || "";

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/teachers?id=${teacherId}`).then(res => res.json()),
      fetch(`http://localhost:3000/lessons?teacherId=${teacherId}`).then(res => res.json())
    ])
      .then(([teacherData, lessonData]) => {
        if (teacherData.length > 0) {
          setTeacher(teacherData[0]);
        }
        setLessons(lessonData);
      })
      .catch(err => console.error(err));
  }, [teacherId]);

  function badgeOnClick(teacherId: string, studentId: string) {

  }

  return (
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <button
      onClick={() => navigate(StudentPaths.studentHome)}
      className="flex items-center gap-1 mb-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      ← Back
    </button>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {teacher && (
        <TeacherCardForStudent
          teacher={teacher}
          lessons={lessons}
          oneTeacher={true}
          badgeOnClick={() => badgeOnClick(teacherId, "as")}
        />
      )}
    </div>
  </div>
);

};

export default StudentTeacherModule;