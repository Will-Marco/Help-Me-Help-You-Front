// components/EnhancedLessonCard.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Calendar, Clock, DollarSign, User, Edit, Trash2, Eye } from "lucide-react";
import type { Lesson, LessonStatus } from "@/@types/Lessons";

type EnhancedLessonCardProps = {
  lesson: Lesson;
  onMore: (l: Lesson) => void;
  onEdit: (l: Lesson) => void;
  onDelete: (id: string) => void;
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: LessonStatus) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'booked':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const EnhancedLessonCard: React.FC<EnhancedLessonCardProps> = ({
  lesson,
  onMore,
  onEdit,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header with Status */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              Lesson ID: {lesson.id.slice(0, 8)}...
            </span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lesson.status)}`}>
            {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Time Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Start Time</p>
                <p className="text-sm font-medium text-gray-900">{formatDateTime(lesson.startTime)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">End Time</p>
                <p className="text-sm font-medium text-gray-900">{formatDateTime(lesson.endTime)}</p>
              </div>
            </div>
          </div>

          {/* Price & Payment Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                <p className="text-sm font-semibold text-gray-900">${lesson.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`h-4 w-4 rounded-full ${lesson.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payment Status</p>
                <p className={`text-sm font-medium ${lesson.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {lesson.isPaid ? 'Paid' : 'Unpaid'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Info */}
        {lesson.status === 'cancelled' && lesson.cancellationReason && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800 mb-1">Cancellation Reason</p>
            <p className="text-sm text-red-700">{lesson.cancellationReason}</p>
            {lesson.cancelledBy && (
              <p className="text-xs text-red-600 mt-1">Cancelled by: {lesson.cancelledBy}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onMore(lesson)}
            className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
          >
            <Eye className="h-4 w-4" />
            <span>View More</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(lesson)}
            className="flex items-center space-x-2 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>

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
            itemName={`Lesson on ${formatDateTime(lesson.startTime)}`}
            onConfirm={() => onDelete(lesson.id)}
          />
        </div>
      </div>
    </div>
  );
};