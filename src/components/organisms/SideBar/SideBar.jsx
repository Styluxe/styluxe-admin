import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const menus = [
    {
      label: "Products",
      src: "white_hanger.svg",
    },
    {
      label: "Categories",
      src: "white_categories.svg",
    },
    {
      label: "Orders",
      src: "white_bill.svg",
    },
  ];

  const navigate = useNavigate();
  const logOut = useSignOut();
  return (
    <div
      className={`${
        open ? "w-[200px]" : "w-[45px]"
      } h-full bg-[#91680f] relative duration-300 pt-[15px] p-[8px]`}
    >
      <div className="flex absolute cursor-pointer right-[-10px] top-10 border-2 border-black rounded-full bg-white justify-center items-center p-[2px]">
        <img
          src="left_arrow.svg"
          alt=""
          className={`w-[18px] h-[18px] ${open ? "rotate-0" : "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="flex flex-col gap-[30px] h-full">
        <div className="flex gap-[10px]">
          <img src="/icon/icon.png" alt="" className={"w-[25px] h-[25px]"} />
          <p className={`text-white duration-200 ${!open && "scale-0"}`}>
            Styluxe
          </p>
        </div>
        <div className="  h-full">
          {menus.map((menu, index) => (
            <div
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-[7px] cursor-pointer ${
                open ? "p-[10px] !pl-[2px]" : "pl-[2px]"
              } py-[10px] hover:bg-[#efcc62] rounded-sm`}
            >
              <img src={menu.src} alt="" className="!w-[18px] !h-[18px]" />
              <a
                className={`text-white duration-200 ${!open && "scale-0"}`}
                href={`/${menu.label.toLowerCase()}`}
              >
                {menu.label}
              </a>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            logOut();
            navigate("/");
          }}
          className="p-[10px] bg-white rounded-md flex items-center gap-x-[7px] cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon
            className={`${
              open ? "w-[18px] h-[18px]" : "w-[12px] h-[12px]"
            } text-red-500`}
          />
          {open && <p className="text-red-500 font-semibold">Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
