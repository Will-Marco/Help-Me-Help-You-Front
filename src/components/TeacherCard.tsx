import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import type { Teacher } from "@/@types/Teachers";
import { toast } from "sonner";

type TeacherCardProps = {
  teacher: Teacher;
  onMore: (t: Teacher) => void;
  onEdit: (t: Teacher) => void;
  onDelete: (id: string) => void;
};

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onMore,
  onEdit,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={`star-${i}`}
        className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.54 1.118l-3.385-2.454a1 1 0 00-1.175 0l-3.385 2.454c-.784.57-1.838-.196-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.975z" />
      </svg>
    );
  }
  return stars;
};


  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 space-y-2 sm:space-y-0">
      {/* Profile section - fixed width */}
      <div className="flex items-center space-x-4 w-full sm:w-64 flex-shrink-0">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h2 className="font-semibold text-lg truncate">{teacher.name}</h2>
          <p
            className="text-sm text-gray-600 cursor-pointer select-text truncate"
            onClick={() => copyToClipboard(teacher.email)}
            title="Click to copy email"
          >
            {teacher.email}
          </p>
          <p
            className="text-sm text-gray-600 cursor-pointer select-text"
            onClick={() => copyToClipboard(teacher.phone)}
            title="Click to copy phone"
          >
            {teacher.phone}
          </p>
        </div>
      </div>

      {/* Details section - fixed widths for each column */}
      <div className="flex flex-wrap sm:flex-nowrap items-center text-sm text-gray-700 w-full sm:w-auto justify-center gap-x-6">
        <div className="min-w-[90px] text-center">
          <span className="font-medium">Level: </span>
          {teacher.level}
        </div>
        <div className="min-w-[110px] text-center">
          <span className="font-medium">Experience: </span>
          {teacher.experience}
        </div>
        <div className="min-w-[90px] text-center">
          <span className="font-medium">Price/hr: </span>${teacher.hourPrice}
        </div>
        <div className="min-w-[100px] text-center flex items-center justify-center gap-1">
          <span className="font-medium">Rating: </span>
          <div className="flex">{renderStars(teacher.rating)}</div>
        </div>
      </div>

      {/* Actions section */}
      <div className="flex space-x-2 mt-2 sm:mt-0 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={() => onMore(teacher)}>
          More
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onEdit(teacher)}>
          Edit
        </Button>
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          trigger={
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          }
          itemName={teacher.name}
          onConfirm={() => onDelete(teacher.id)}
        />
      </div>
    </div>
  );
};
