import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface StatusModalProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  show: boolean;
  duration?: number;
}

export default function StatusModal({
  message,
  type = "info",
  onClose,
  show,
  duration = 2000,
}: StatusModalProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div
        className={`border px-5 py-4 rounded-lg shadow transition-all ${typeStyles[type]}`}
      >
        <p className="mb-3">{message}</p>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
