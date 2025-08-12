import { useEffect, useState } from "react";
import { Star } from "lucide-react"; // lucide-react yulduzcha

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

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`w-5 h-5 ${rating >= n ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
      />
    ))}
  </div>
);

const StudentHomeModule = () => {
  const [_teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error(err))
  }, []);

  return <h1>asd</h1>
};

export default StudentHomeModule;
