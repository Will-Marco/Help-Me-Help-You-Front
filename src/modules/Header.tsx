import { useContext } from "react";
import { Context } from "../context/Context";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelRightOpen } from "lucide-react";

const Header = () => {
  const { showNavbar, setShowNavbar } = useContext(Context);

  return (
    <div className="bg-[#18181b] text-white py-3 px-4 flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowNavbar(!showNavbar)}
        className="cursor-pointer durarion-300 hover:bg-gray-700 hover:text-white"
      >
        {showNavbar ? <PanelRightOpen size={20} /> : <PanelLeftClose size={20} />}
      </Button>

      <h1 className="text-white text-lg font-semibold">ADMIN</h1>
    </div>
  );
};

export default Header;
