import { useState } from "react";
import { Button } from "./components/atoms/Button";

function App() {
  const [open, setOpen] = useState(false);
  const menus = [
    {
      label: "Products",
      src: "profile_icon.svg",
    },
    {
      label: "Categories",
      src: "profile_icon.svg",
    },
    {
      label: "Users",
      src: "profile_icon.svg",
    },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-[200px]" : "w-[45px]"
        } h-screen bg-blue-800 relative duration-300 pt-[15px] p-[8px]`}
      >
        <div className="flex absolute cursor-pointer right-[-10px] top-10 border-2 border-black rounded-full bg-white justify-center items-center p-[2px]">
          <img
            src="left_arrow.svg"
            alt=""
            className={`w-[18px] h-[18px] ${open ? "rotate-0" : "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex gap-[10px]">
          <img src="profile_icon.svg" alt="" className={"w-[25px] h-[25px]"} />
          <p className={`text-white duration-200 ${!open && "scale-0"}`}>
            Bryan
          </p>
        </div>
        <div className="pt-[15px]">
          {menus.map((menu, index) => (
            <div
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-[7px] cursor-pointer ${
                open ? "p-[10px] !pl-[2px]" : "pl-[2px]"
              } py-[10px] hover:bg-blue-200 rounded-sm`}
            >
              <img src={menu.src} alt="" className="!w-[18px] !h-[18px]" />
              <p className={`text-white duration-200 ${!open && "scale-0"}`}>
                {menu.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Homepage</h1>
        <h1>Homepage</h1>
        <h1>Homepage</h1>
        <Button classname={"bg-red-500"} text={"Button"} />
      </div>
    </div>
  );
}

export default App;
