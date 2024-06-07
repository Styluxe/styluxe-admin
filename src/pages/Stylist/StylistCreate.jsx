import React, { useEffect, useMemo, useState } from "react";
import { SideBar } from "../../components/organisms/SideBar";
import { Navbar } from "../../components/molecules/NavBar";
import { InputLabel } from "../../components/molecules/InputLabel";
import { Autocomplete, TextField } from "@mui/material";
import { useAssignStylistApi, useGetnonStylistApi } from "../../API/StylistAPI";
import { Button } from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const StylistCreate = () => {
  const { getNonStylist, nonStylists } = useGetnonStylistApi();
  const [selectedNonStylist, setSelectedNonStylist] = useState(null);
  const { assignStylist, code, setCode } = useAssignStylistApi();
  const [newData, setNewData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const isValid =
    newData?.first_name !== "" &&
    newData?.last_name !== "" &&
    newData?.email !== "" &&
    newData?.mobile !== "";

  const disabled_select =
    newData?.first_name !== "" ||
    newData?.last_name !== "" ||
    newData?.email !== "" ||
    newData?.mobile !== "";

  useEffect(() => {
    getNonStylist();
  }, []);

  useEffect(() => {
    if (code === 201) {
      navigate("/stylist");
      alert("Stylist has been created");
      setCode(null);
    }
  }, [code]);

  const remapNonStylist = useMemo(() => {
    return nonStylists?.map((data) => {
      return {
        label: `${data?.email} | ${data?.first_name} ${data?.last_name}`,
        id: data?.user_id,
      };
    });
  }, [nonStylists]);

  const onAssign = () => {
    const req_data = {
      user_id: selectedNonStylist?.id,
      first_name: newData?.first_name,
      last_name: newData?.last_name,
      email: newData?.email,
      mobile: newData?.mobile,
    };

    assignStylist(req_data);
  };

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar title={"Add New Stylist"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[20px] font-bold">{"Assign New Stylist"}</p>
          <div className="flex flex-col gap-5 h-full">
            <div className="flex flex-col gap-3">
              <p className="text-[18px] font-semibold">
                Assign Existing Account
              </p>
              <Autocomplete
                disablePortal
                disabled={disabled_select}
                id="combo-box-demo"
                options={remapNonStylist}
                sx={{ width: 350 }}
                renderInput={(params) => (
                  <TextField {...params} label="User Account" />
                )}
                onChange={(event, newValue) => {
                  setSelectedNonStylist(newValue);
                }}
              />
            </div>
            <p className="text-[18px] font-semibold border-t border-b p-2">
              Or
            </p>
            <div className="flex flex-col gap-5 ">
              <p className="text-[18px] font-semibold">Create new Account</p>
              <div className="flex flex-col h-full gap-5 w-[20%]">
                <InputLabel
                  inputClassName={
                    "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                  }
                  label={"First Name"}
                  name={"first_name"}
                  placeholder={"Enter First Name"}
                  labelPosition="top"
                  disabled={selectedNonStylist ? true : false}
                  onChange={(e) =>
                    setNewData({ ...newData, first_name: e.target.value })
                  }
                  value={newData.first_name}
                />
                <InputLabel
                  inputClassName={
                    "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                  }
                  label={"Last Name"}
                  name={"last_name"}
                  placeholder={"Enter Last Name"}
                  labelPosition="top"
                  disabled={selectedNonStylist ? true : false}
                  onChange={(e) =>
                    setNewData({ ...newData, last_name: e.target.value })
                  }
                  value={newData.last_name}
                />
                <InputLabel
                  inputClassName={
                    "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                  }
                  label={"Email Address"}
                  name={"email"}
                  placeholder={"Enter Email Address"}
                  labelPosition="top"
                  disabled={selectedNonStylist ? true : false}
                  onChange={(e) =>
                    setNewData({ ...newData, email: e.target.value })
                  }
                  value={newData.email}
                />
                <InputLabel
                  inputClassName={
                    "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                  }
                  label={"Mobile Number"}
                  name={"mobile"}
                  placeholder={"Enter Mobile Number"}
                  labelPosition="top"
                  disabled={selectedNonStylist ? true : false}
                  onChange={(e) =>
                    setNewData({ ...newData, mobile: e.target.value })
                  }
                  value={newData.mobile}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end align-bottom">
            <Button
              text={"Assign"}
              disabled={!isValid && !selectedNonStylist ? true : false}
              classname={`${
                !isValid && !selectedNonStylist ? "bg-gray-400" : "bg-primary"
              } py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-white `}
              onClick={onAssign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistCreate;
