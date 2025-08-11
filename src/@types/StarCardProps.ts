import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
  link?: string;
}
