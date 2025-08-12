// components/dashboard/StatCard.tsx
import type { StatCardProps } from "@/@types/StarCardProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, iconColor, link }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => link && navigate(link)}
      className="cursor-pointer transition hover:shadow-lg"
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Icon className={iconColor || "text-gray-500"} />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
