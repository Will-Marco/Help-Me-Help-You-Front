import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonLoadingProps {
  text?: string;
  size?: "sm"  | "lg" | "default" | "icon";
  className?: string;
}

export function ButtonLoading({
  text = "Iltimos, kuting...",
  size = "sm",
  className,
}: ButtonLoadingProps) {
  return (
    <Button disabled size={size} className={className}>
      <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
      {text}
    </Button>
  );
}
