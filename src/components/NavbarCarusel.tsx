import { useContext } from "react";
import { Context } from "../context/Context";
import { DashboardNavList } from "@/hooks/Path";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavbarCarusel = () => {
    const { showNavbar } = useContext(Context);
  
    return (
      <aside
        className={cn(
          "h-screen  text-white transition-all duration-300 p-4 flex flex-col",
          "overflow-y-auto",
          showNavbar ? "w-20" : "w-64"
        )}
      >
        {/* Toggle button removed from here */}
  
        <nav className="flex flex-col gap-2 flex-grow duration-300">
          {DashboardNavList.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.path}>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-3 hover:bg-muted"
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
