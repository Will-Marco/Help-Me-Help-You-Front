import type { Student } from "@/@types/Student";
import { Button } from "@/components/ui/button";
import { Book, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

interface StudentCardProps {
  student: Student;
  onMore: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export const StudentCard = ({ student, onMore, onEdit, onDelete }: StudentCardProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(() => {
      toast.error("Copy failed");
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white select-none flex-shrink-0">
          {student.firstname.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {student.firstname} {student.lastname}
            </h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
              {student.age} age
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-ms text-gray-600">
            <div 
              onClick={() => copyToClipboard(student.email)} 
              className="flex items-center space-x-1 truncate cursor-pointer select-text" 
              title="Click to copy email"
            >
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{student.email}</span>
            </div>
            <div 
              onClick={() => copyToClipboard(student.phone)} 
              className="flex items-center space-x-1 truncate cursor-pointer select-text" 
              title="Click to copy phone number"
            >
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Book className="w-4 h-4 text-gray-400" />
              <span>{student.lessons?.length || 0} lessons</span>
              {student.tg_username && (
                <div
                  onClick={() => copyToClipboard(`@${student.tg_username}`)}
                  className="flex items-center space-x-1 text-black/70 text-[15px] ml-6 cursor-pointer select-text"
                  title="Click to copy Telegram username"
                >
                  <Send color="gray" className="w-4 h-4" />
                  <span><b><i>@{student.tg_username}</i></b></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-9 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={() => onMore(student)} className="h-8 px-2">
          More
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(student)} className="h-8 px-3">
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(student.id)} className="h-8 px-3">
          Delete
        </Button>
      </div>
    </div>
  );
};
