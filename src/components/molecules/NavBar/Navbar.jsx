import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Navbar = ({ title }) => {
  const user = useAuthUser();

  return (
    <div
      className={`flex w-full p-[10px] !pl-[20px] shadow-md items-center justify-between`}
    >
      <p className="text-[20px] font-semibold">{title}</p>
      <div className="flex gap-[10px] w-fit h-fit">
        <img src="profile_icon.svg" alt="" />
        <p>{user?.first_name + " " + user?.last_name}</p>
      </div>
    </div>
  );
};

export default Navbar;
