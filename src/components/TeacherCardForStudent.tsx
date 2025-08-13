import type { FC } from "react";
import { useState, useMemo } from "react";
import type { Teacher } from "@/@types/Teachers";
import type { LessonType } from "@/@types/LessonType";
import { Badge } from "./ui/badge";
import RatingStars from "./RatingStars";
import { Button } from "./ui/button";
import { format, isAfter, isSameDay, startOfToday, addDays } from "date-fns";

interface Props {
  teacher: Teacher;
  lessons: LessonType[];
  handleOnClick?: () => void;
  oneTeacher?: boolean;
}

const TeacherCardForStudent: FC<Props> = ({
  teacher,
  lessons,
  handleOnClick,
  oneTeacher = false,
}) => {
  const teacherLessons = lessons.filter((l) => l.teacherId === teacher.id);

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // Bugundan boshlab 7 kunlik massiv
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  }, [today]);

  // Tanlangan kunga tegishli darslar
  const filteredLessons = teacherLessons.filter((l) =>
    isSameDay(new Date(l.startTime), selectedDate)
  );

  const lessonBadges =
    filteredLessons.length > 0 ? (
      filteredLessons.map((lesson) => (
        <Badge
          key={lesson.id}
          variant="outline"
          className="text-xs lg:text-sm flex justify-between w-full"
        >
          {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
        </Badge>
      ))
    ) : (
      <Badge variant="outline" className="text-gray-500 text-xs lg:text-sm w-full">
        no class time
      </Badge>
    );

  return (
    <div className={`border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow `}>
      {/* Teacher Image */}
      <img
        className="w-full h-[200px] lg:h-[300px] object-cover rounded-t-lg"
        src={teacher.image}
        alt={teacher.name}
      />

      {/* Info */}
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

        {/* Experience / Phone / Price */}
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

        {/* Extra info if single teacher view */}
        {oneTeacher && (
          <div className="flex items-center gap-5">
            <Badge variant="outline" className="text-xs lg:text-sm">
              {teacher.email}
            </Badge>
            <Badge variant="destructive" className="text-xs lg:text-sm">
              <a
                className="cursor-pointer"
                href={teacher.portfolioVideoLink}
                target="_blank"
              >
                link-portfolio
              </a>
            </Badge>
          </div>
        )}

        {/* Bio */}
        <p
          className={`text-sm lg:text-base text-gray-600 leading-relaxed border-b pb-4 ${
            oneTeacher ? "" : "truncate"
          }`}
        >
          {teacher.bio}
        </p>
      </div>

      {/* Lessons list (for all teachers view) */}
      {!oneTeacher && (
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar">
          {teacherLessons.length > 0 ? (
            teacherLessons.map((lesson) => (
              <Badge
                key={lesson.id}
                variant="outline"
                className="text-xs lg:text-sm inline-block"
              >
                {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
              </Badge>
            ))
          ) : (
            <Badge variant="outline" className="text-gray-500 text-xs lg:text-sm">
              There are no class times available yet.
            </Badge>
          )}
        </div>
      )}

      {/* One teacher view: Day selector + lessons */}
      {oneTeacher && (
        <div className="px-4 space-y-4 pb-4">
          {/* Days selection */}
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar">
            {days.map((day) => {
              const isDisabled = !isAfter(day, today) && !isSameDay(day, today);
              return (
                <Button
                className="cursor-pointer"
                  key={day.toISOString()}
                  variant={isSameDay(day, selectedDate) ? "default" : "outline"}
                  size="sm"
                  disabled={isDisabled}
                  onClick={() => setSelectedDate(day)}
                >
                  {format(day, "EEE dd")} {/* Mon 11 */}
                </Button>
              );
            })}
          </div>

          {/* Lessons for selected date */}
          <div className="grid grid-cols-2 gap-2">{lessonBadges}</div>
        </div>
      )}

      {/* Booking button */}
      <div className="p-4">
        <Button
          onClick={handleOnClick}
          className="w-full text-sm lg:text-base py-2 lg:py-3"
          variant="default"
        >
          Booking
        </Button>
      </div>
    </div>
  );
};

export default TeacherCardForStudent;
