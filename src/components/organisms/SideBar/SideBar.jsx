import {
  ArrowLeftStartOnRectangleIcon,
  BuildingStorefrontIcon,
  ChevronDoubleLeftIcon,
  ClipboardDocumentListIcon,
  ListBulletIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const menus = [
    {
      label: "Products",
      src: "white_hanger.svg",
      icon: <BuildingStorefrontIcon className="w-[24px] h-[24px] text-white" />,
    },
    {
      label: "Categories",
      src: "white_categories.svg",
      icon: <ListBulletIcon className="w-[24px] h-[24px] text-white" />,
    },
    {
      label: "Orders",
      src: "white_bill.svg",
      icon: (
        <ClipboardDocumentListIcon className="w-[24px] h-[24px] text-white" />
      ),
    },
  ];

  const navigate = useNavigate();
  const logOut = useSignOut();
  return (
    <div
      className={`${
        open ? "w-[200px]" : "w-[45px]"
      } h-full bg-primary relative duration-300 pt-[15px] p-[8px]`}
    >
      <div className="flex absolute bg cursor-pointer right-[-10px] top-14 border border-gray-500 rounded-full bg-white justify-center items-center p-[2px]">
        <ChevronDoubleLeftIcon
          className={`w-[24px] h-[24px] ${open ? "rotate-0" : "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="flex flex-col gap-[30px] h-full">
        <div className="flex gap-[10px] items-center border-b border-secondary py-2">
          <img src="/ic_launcher.png" alt="" className={"w-[30px] h-[30px]"} />
          <p
            className={`text-white font-semibold duration-200 ${
              !open && "scale-0"
            }`}
          >
            Styluxe Admin
          </p>
        </div>
        <div className="  h-full">
          {menus.map((menu, index) => (
            <div
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-[7px] cursor-pointer ${
                open ? "p-[10px] !pl-[2px]" : "pl-[2px]"
              } py-[10px] hover:bg-secondary rounded-sm`}
              onClick={() => navigate(`/${menu.label.toLowerCase()}`)}
            >
              <div>{menu.icon}</div>
              <a className={`text-white duration-200 ${!open && "scale-0"}`}>
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
