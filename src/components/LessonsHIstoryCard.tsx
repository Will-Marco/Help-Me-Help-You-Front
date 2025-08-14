// components/EnhancedLessonHistoryCard.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Calendar, Clock, Star, MessageSquare, Eye, Trash2 } from "lucide-react";
import type { LessonHistory } from "@/@types/LessonHistory";

type EnhancedLessonHistoryCardProps = {
  history: LessonHistory;
  onMore: (h: LessonHistory) => void;
  onEdit: (h: LessonHistory) => void;
  onDelete: (id: string) => void;
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStarColor = (star: number) => {
  if (star >= 4) return "text-yellow-500";
  if (star >= 3) return "text-yellow-400";
  return "text-gray-400";
};

export const EnhancedLessonHistoryCard: React.FC<EnhancedLessonHistoryCardProps> = ({
  history,
  onMore,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Lesson History</h3>
          <div className="flex items-center space-x-1">
            <Star className={`h-5 w-5 ${getStarColor(history.star)} fill-current`} />
            <span className={`font-medium ${getStarColor(history.star)}`}>
              {history.star}/5
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Started</p>
              <p className="text-sm text-gray-600">{formatDateTime(history.startTime)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Finished</p>
              <p className="text-sm text-gray-600">{formatDateTime(history.endTime)}</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">Student Feedback</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {history.feedback || "No feedback provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMore(history)}
            className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Button>

          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(history)}
            className="flex items-center space-x-2 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button> */}

          <ConfirmDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            }
            itemName={`Lesson History on ${formatDateTime(history.startTime)}`}
            onConfirm={() => onDelete(history.id)}
          />
        </div>
      </div>
    </div>
  );
};