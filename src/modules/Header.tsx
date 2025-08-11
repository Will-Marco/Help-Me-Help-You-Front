import { useContext } from "react";
import { Context } from "../context/Context";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelRightOpen } from "lucide-react";

const Header = () => {
  const { showNavbar, setShowNavbar } = useContext(Context);

  return (
    <div className="bg-gray-900 h-[60px] px-4 flex items-center justify-between border-b border-gray-700">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-300 hover:text-black"
        onClick={() => setShowNavbar(!showNavbar)}
      >
        {showNavbar ? <PanelRightOpen size={20} /> : <PanelLeftClose size={20} />}
      </Button>

      <h1 className="text-gray-100 text-lg font-semibold tracking-wide">
        ADMIN PANEL
      </h1>
    </div>
  );
};

export default Header;
