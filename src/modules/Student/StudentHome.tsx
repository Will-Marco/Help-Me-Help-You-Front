import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Teacher {
  id: string;
  name: string;
  googleId: string;
  email: string;
  password: string | null;
  googleRefreshToken: string | null;
  googleAccessToken: string | null;
  image: string;
  hourPrice: number;
  role: string;
  phone: string;
  level: string;
  rating: number;
  experience: string;
  bio: string;
  portfolioVideoLink: string | null;
  lessons: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: string;
  teacherId: string;
  startTime: string;
  endTime: string;
}

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`w-4 h-4 lg:w-5 lg:h-5 ${
          rating >= n ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

const StudentHomeModule = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; 

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

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeachers = teachers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Teacher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <img
              className="w-full h-[200px] lg:h-[300px] object-cover rounded-t-lg"
              src={teacher.image}
              alt={teacher.name}
            />

            <div className="p-4 space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg lg:text-xl">{teacher.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-gray-200 text-gray-800 text-xs lg:text-sm"
                >
                  {teacher.level}
                </Badge>
              </div>

              <RatingStars rating={teacher.rating} />

              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs lg:text-sm">
                    {teacher.experience}
                  </Badge>
                  <Badge variant="outline" className="text-xs lg:text-sm">
                    {teacher.phone}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs lg:text-sm">
                  1h - {teacher.hourPrice}$
                </Badge>
              </div>

              <p className="text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-1">
                {teacher.bio}
              </p>
            </div>

            <div className="px-4 pb-4 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar">
              {(() => {
                const teacherLessons = lessons.filter(
                  (lesson) => lesson.teacherId === teacher.id
                );

                if (teacherLessons.length === 0) {
                  return (
                    <Badge
                      variant="outline"
                      className="text-gray-500 text-xs lg:text-sm"
                    >
                      There are no class times available yet.
                    </Badge>
                  );
                }

                return teacherLessons.map((lesson) => {
                  const start = new Date(lesson.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const end = new Date(lesson.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <Badge
                      key={lesson.id}
                      variant="outline"
                      className="text-xs lg:text-sm inline-block"
                    >
                      {start} - {end}
                    </Badge>
                  );
                });
              })()}
            </div>

            <div className="p-4 border-t">
              <Button
                className="w-full text-sm lg:text-base py-2 lg:py-3 cursor-pointer"
                variant="default"
              >
                Booking
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default StudentHomeModule;