export interface Teacher {
  id: string;
  name: string;
  googleId: string | null;
  email: string;
  password: string | null;
  googleRefreshToken: string | null;
  googleAccessToken: string | null;
  image: string;
  hourPrice: number;
  role: "TEACHER";
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