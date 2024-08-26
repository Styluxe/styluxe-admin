import React, { useEffect, useMemo, useState, useCallback } from "react";
import { SideBar } from "../../components/organisms/SideBar";
import { Navbar } from "../../components/molecules/NavBar";
import { InputLabel } from "../../components/molecules/InputLabel";
import { Autocomplete, TextField } from "@mui/material";
import { useAssignStylistApi, useGetnonStylistApi } from "../../API/StylistAPI";
import { Button } from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Modal } from "../../components/molecules/Modal";

const StylistCreate = () => {
  const { getNonStylist, nonStylists } = useGetnonStylistApi();
  const [selectedNonStylist, setSelectedNonStylist] = useState(null);
  const { assignStylist, code, setCode } = useAssignStylistApi();
  const [keyword, setKeyword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [modalType, setModalType] = useState(null);
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
    getNonStylist(keyword);
  }, [keyword]);

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

  const onClickAssign = () => {
    setModalType("assign_stylist");
  };

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

  // Debounce function for setting keyword
  const debounceSetKeyword = useCallback(debounce(setKeyword, 500), []);

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
                onInputChange={(event, newInputValue) => {
                  debounceSetKeyword(newInputValue);
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
                <div className="flex-col gap-1">
                  <InputLabel
                    inputClassName={
                      "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                    }
                    label={"Email Address"}
                    name={"email"}
                    placeholder={"Enter Email Address"}
                    labelPosition="top"
                    disabled={selectedNonStylist ? true : false}
                    onChange={(e) => {
                      const email = e.target.value;
                      setNewData({ ...newData, email });
                      setEmailInvalid(!email.includes("@"));
                    }}
                    value={newData.email}
                  />
                  {emailInvalid && (
                    <p className="text-red-500">Please input valid email</p>
                  )}
                </div>
                <InputLabel
                  inputClassName={
                    "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-full"
                  }
                  label={"Mobile Number"}
                  name={"mobile"}
                  placeholder={"Enter Mobile Number"}
                  labelPosition="top"
                  disabled={selectedNonStylist ? true : false}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");

                    setNewData({ ...newData, mobile: value });
                  }}
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
              onClick={onClickAssign}
            />
          </div>
        </div>
      </div>
      <Modal
        type="assign_stylist"
        isOpen={modalType === "assign_stylist"}
        onClose={() => setModalType(null)}
      >
        <div className="flex flex-col items-center justify-center w-full gap-y-[15px]">
          <p className="text-[20px] font-bold">Confirmation</p>
          <p className="text-[20px] text-center">
            Do you want to assign this person?
          </p>
          <div className="flex gap-[30px] w-full">
            <Button
              text={"Yes"}
              classname={
                "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-full text-white"
              }
              onClick={onAssign}
            />
            <Button
              text={"No"}
              classname={
                "bg-white border-2 border-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-full text-primary"
              }
              onClick={() => setModalType(null)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StylistCreate;
