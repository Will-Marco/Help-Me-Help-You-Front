import { useContext } from "react";
import { Context } from "../context/Context";
import { DashboardNavList } from "@/hooks/Path";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const NavbarCarusel = () => {
  const { showNavbar } = useContext(Context);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen text-white transition-all duration-300 p-4 flex flex-col",
        "overflow-y-auto",
        showNavbar ? "w-20" : "w-64"
      )}
    >
      <nav className="flex flex-col gap-1 flex-grow">
        {DashboardNavList.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.id} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center justify-start gap-3 hover:bg-white/100 duration-150",
                  isActive && "bg-white/10 border-l-4 border-teal-500"
                )}
              >
                <Icon size={20} />
                {!showNavbar && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default NavbarCarusel;
