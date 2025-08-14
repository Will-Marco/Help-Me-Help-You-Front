import type { Admin } from "@/@types/AdminType";
import { Button } from "@/components/ui/button";
import { Phone, Shield } from "lucide-react";
import { toast } from "sonner";

interface AdminCardProps {
  admin: Admin;
  onMore: (admin: Admin) => void;
  onEdit: (admin: Admin) => void;
  onDelete: (id: string) => void;
}

export const AdminCard = ({ admin, onMore, onEdit, onDelete }: AdminCardProps) => {
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
        
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-lg font-bold text-white select-none flex-shrink-0">
          {admin.username.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {admin.username}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
              admin.role === "SUPERADMIN" 
                ? "bg-red-100 text-red-800" 
                : "bg-blue-100 text-blue-800"
            }`}>
              {admin.role}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 text-sm text-gray-600">
            <div
              onClick={() => copyToClipboard(admin.phone)}
              className="flex items-center space-x-1 truncate cursor-pointer select-text"
              title="Click to copy phone number"
            >
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{admin.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-gray-400" />
              <span>ID: {admin.id}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={() => onMore(admin)} className="h-8 px-2">
          More
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(admin)} className="h-8 px-3">
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(admin.id)} className="h-8 px-3">
          Delete
        </Button>
      </div>
    </div>
  );
};