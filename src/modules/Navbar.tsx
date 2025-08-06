import { useContext } from "react";
import { Context } from "../context/Context";
import NavbarCarusel from "../components/NavbarCarusel";

const Navbar = () => {
  const { showNavbar } = useContext(Context);

  return (
    <div
      className={`${showNavbar ? "w-[87px]" : "w-[18%]"} duration-300 h-[100vh] overflow-hidden bg-[#031529]`}
    >
      <div className={`flex justify-center ${showNavbar ? "opacity-0 w-0" : ""} border-b-[1px] border-b-white`}>
        <div className="inline-flex items-center justify-center mb-4 ">
          <span className="text-4xl font-bold">
            <span className="text-white"><i>HM</i></span>
            <span className="text-teal-500"><i>H</i></span>
            <span className="text-gray-500"><i>Y</i></span>
          </span>
        </div>
      </div>
      <NavbarCarusel />
    </div>
  );
};

export default Navbar;
