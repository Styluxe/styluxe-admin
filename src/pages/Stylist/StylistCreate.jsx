import React from "react";
import { SideBar } from "../../components/organisms/SideBar";
import { Navbar } from "../../components/molecules/NavBar";
import { InputLabel } from "../../components/molecules/InputLabel";

const StylistCreate = () => {
  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar title={"Add New Stylist"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[18px] font-semibold">{"Assing New Stylist"}</p>
          <InputLabel
            inputClassName={
              "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[20%]"
            }
            label={"Category Name"}
            name={"category_name"}
            placeholder={"Enter Category Name"}
            labelPosition="top"
            // onChange={(e) => setCategoryName(e.target.value)}
            // value={categoryName}
          />
        </div>
      </div>
    </div>
  );
};

export default StylistCreate;
