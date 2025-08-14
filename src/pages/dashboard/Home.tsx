// pages/Dashboard/Home.tsx
import { useEffect, useState } from "react";
import { Users, GraduationCap, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import StatCard from "@/components/StatCard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    lessons: 0,
    booked: 0,
    finished: 0,
    canceled: 0,
    available: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const [teachersRes, studentsRes, lessonsRes, historyRes] = await Promise.all([
        fetch("http://localhost:3000/teachers").then(r => r.json()),
        fetch("http://localhost:3000/students").then(r => r.json()),
        fetch("http://localhost:3000/lessons").then(r => r.json()),
        fetch("http://localhost:3000/lessonHistory").then(r => r.json())
      ]);
  
      const booked = lessonsRes.filter((l: any) => l.status === "booked").length;
      const available = lessonsRes.filter((l: any) => l.status === "available").length;
      const canceled = lessonsRes.filter((l: any) => l.status === "cancelled").length;
      const finished = historyRes.length; // ✅ lessonHistory uzunligi
  
      setStats({
        teachers: teachersRes.length,
        students: studentsRes.length,
        lessons: lessonsRes.length,
        booked,
        finished,
        canceled,
        available
      });
  
      setLoading(false);
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  const pieData = [
    { name: "Booked", value: stats.booked },
    { name: "Finished", value: stats.finished },
    { name: "Canceled", value: stats.canceled},
    { name: "Available", value: stats.available}
  ];

  const barData = [
    { month: "Jan", lessons: 1000 },
    { month: "Feb", lessons: 800 },
    { month: "Mar", lessons: 2000 },
    { month: "Apr", lessons: 3000 },
    { month: "May", lessons: 450 },
    {month: "Jun", lessons: 1200 },
    { month: "Jul", lessons: 1500 },
    { month: "Aug", lessons: 1800 },
  ];

  const COLORS = ["#FACC15", "#14B8A6", "#EF4444", "#3B82F6"];


  return (
    <div className="p-6 grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Teachers"
          value={stats.teachers}
          icon={Users}
          iconColor="text-blue-500"
          link="/admin/teachers"
        />
        <StatCard
          title="Students"
          value={stats.students}
          icon={GraduationCap}
          iconColor="text-green-500"
          link="/admin/students"
        />
        <StatCard
          title="All Lessons"
          value={stats.lessons}
          icon={BookOpen}
          iconColor="text-purple-500"
          link="/admin/lessons"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lessons per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lessons" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
