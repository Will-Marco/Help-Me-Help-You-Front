import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Teacher } from "@/@types/Teachers";
import type { Student } from "@/@types/Student";
import PageLoading from "@/components/PageLoading";
import { Input } from "@/components/ui/input";
import { DetailsDialog } from "@/components/DetailsDialog";

export default function RatingPage() {
  const [selectedType, setSelectedType] = useState<"TEACHER" | "STUDENT">(
    "TEACHER"
  );
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const teacherFields = [
    { label: "Email", key: "email", copyable: true },
    { label: "Phone", key: "phone", copyable: true },
    { label: "Level", key: "level" },
    { label: "Experience", key: "experience" },
    { label: "Price/hr", key: "hourPrice" },
    { label: "Rating", key: "rating", isRating: true },
    { label: "Bio", key: "bio" },
  ];

  const studentFields = [
    { label: "Email", key: "email", copyable: true },
    { label: "Phone", key: "phone", copyable: true },
    { label: "Username", key: "tg_username", copyable: true },
    { label: "Age", key: "age" },
    { label: "Lessons", key: "lessonsCount" },
  ];

  useEffect(() => {
    setSelectedTeacher(null);
    setSelectedStudent(null);
  }, [selectedType]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:3000/teachers").then((res) => res.json()),
      fetch("http://localhost:3000/students").then((res) => res.json()),
    ])
      .then(([teacherData, studentData]) => {
        setTeachers(teacherData);
        setStudents(
          studentData.map((s: Student) => ({
            ...s,
            lessonsCount: s.lessons?.length || 0,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const getTeacherScore = (t: Teacher) => {
    const lessonCount = (t as any).lessons?.length || 0;
    return t.rating * 0.7 + lessonCount * 0.3;
  };

  const getStudentScore = (s: Student) => {
    return s.lessons?.length || 0;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const sortedData =
    selectedType === "TEACHER"
      ? [...teachers].sort((a, b) => getTeacherScore(b) - getTeacherScore(a))
      : [...students].sort((a, b) => getStudentScore(b) - getStudentScore(a));

  const filteredData = sortedData.filter((item) => {
    if (selectedType === "TEACHER") {
      const t = item as Teacher;
      return (
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase()) ||
        t.phone.includes(search)
      );
    } else {
      const s = item as Student;
      return (
        `${s.firstname} ${s.lastname}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search)
      );
    }
  });

  if (loading) return <PageLoading />;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">Rating</h1>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by first name, last name, email or phone"
          className="max-w-sm w-full bg-white border border-gray-200"
          type="search"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={selectedType === "TEACHER" ? "default" : "outline"}
          onClick={() => setSelectedType("TEACHER")}
        >
          Teachers
        </Button>
        <Button
          variant={selectedType === "STUDENT" ? "default" : "outline"}
          onClick={() => setSelectedType("STUDENT")}
        >
          Students
        </Button>
      </div>

      <div className="space-y-3">
        {filteredData.map((item: any, index) => (
          <div
            key={item.id}
            onClick={() =>
              selectedType === "TEACHER"
                ? setSelectedTeacher(item as Teacher)
                : setSelectedStudent(item as Student)
            }
            className="p-4 pr-20 border rounded-xl flex justify-between items-center bg-white shadow-sm hover:shadow-md transition cursor-pointer relative"
          >
            <div className="absolute -left-3 top-1 -translate-y-1/2 bg-yellow-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
              {index + 1}
            </div>

            {selectedType === "TEACHER" ? (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    src={(item as Teacher).image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{(item as Teacher).name}</div>
                    <div className="text-xs text-gray-500">
                      {(item as Teacher).email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars((item as Teacher).rating)}
                  <span className="text-sm text-gray-600">
                    {getTeacherScore(item as Teacher).toFixed(1)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white select-none flex-shrink-0">
                    {(item as Student).firstname.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">
                      {(item as Student).firstname} {(item as Student).lastname}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(item as Student).email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-green-400 rounded-2xl px-2 py-1">
                  <span className="text-xs text-white font-medium">
                    {getStudentScore(item as Student)} lessons
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <DetailsDialog
        item={selectedTeacher}
        fields={teacherFields}
        onClose={() => setSelectedTeacher(null)}
      />

      <DetailsDialog
        item={selectedStudent}
        fields={studentFields}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
