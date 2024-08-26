import React, { useEffect, useMemo, useState } from "react";
import { SideBar } from "../../components/organisms/SideBar";
import { Navbar } from "../../components/molecules/NavBar";
import { InputSearch } from "../../components/molecules/InputSearch";
import { Button } from "../../components/atoms/Button";
import { Pagination } from "../../components/molecules/Pagination";
import { Table } from "../../components/organisms/Table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetStylistApi } from "../../API/StylistAPI";
import { IoPersonRemoveSharp } from "react-icons/io5";

const Stylist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getStylist, stylists } = useGetStylistApi();

  useEffect(() => {
    getStylist();
  }, []);

  const StylistHeading = [
    {
      id: "stylist_id",
      label: "Stylist ID",
    },
    {
      id: "brand_name",
      label: "Brand Name",
    },
    {
      id: "full_name",
      label: "Full Name",
    },
    { id: "type", label: "Type" },
    {
      id: "price",
      label: "Price",
    },
    {
      id: "online_status",
      label: "Status",
      width: "10%",
    },
  ];

  const renderTableData = useMemo(() => {
    return stylists?.map((data) => {
      return {
        ...data,
        brand_name: data?.brand_name || "N/A",
        type: data?.type || "N/A",
        full_name: data?.user?.first_name + " " + data?.user?.last_name,
        price:
          "Rp " +
          (data?.price
            ? parseFloat(data?.price).toLocaleString("id-ID")
            : "N/A"),
        online_status: (
          <div className="flex items-center justify-center">
            <div
              className={`flex items-center gap-[5px] p-[5px]  rounded-md w-fit  justify-center ${
                data?.online_status === "online" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <p className="text-[14px] text-white ">
                {data?.online_status === "online" ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        ),
        actions: (
          <div className="flex items-center gap-[15px] justify-center">
            {/* <PencilSquareIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => {
                navigate("/products/edit/" + data.product_id);
              }}
            /> */}
            <IoPersonRemoveSharp
              className="bg-primary p-[5px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => setModalType("delete_product")}
            />
          </div>
        ),
      };
    });
  }, [stylists, dispatch, navigate]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(renderTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = renderTableData?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen flex-1 w-full ">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="h-screen overflow-hidden w-full flex-1">
        <Navbar title={"Manage Stylist"} />
        <div className="flex flex-col p-[20px] overflow-y-auto h-full">
          <div className="flex flex-col gap-y-[10px] border-b-[1px] border-slate-500 pb-[30px]">
            <p className="text-[15px] font-semibold">Search Stylist</p>
            <InputSearch
              placeholder={"Stylist Name"}
              // onSearch={handleSearch}
              inputClassName={
                "rounded-[3px] border-[1px] border-gray-300 px-[15px] outline-none w-[400px] py-[3px]"
              }
            />
          </div>
          <div className="flex justify-between">
            <Button
              text={"Add New Stylist"}
              classname={
                "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit"
              }
              icon
              iconSrc={"plus_icon.svg"}
              type={"button"}
              onClick={() => navigate("/create-stylist")}
            >
              <a className={`text-white`}>Add New Stylist</a>
            </Button>
            <Pagination
              classname={"mt-[20px]"}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <Table
            headings={StylistHeading}
            data={currentItems}
            classname={"mt-[20px] rounded-[5px]"}
          />
        </div>
      </div>
      {/* <Modal
      type="delete_product"
      isOpen={modalType === "delete_product"}
      onClose={() => setModalType(null)}
    >
      <div className="flex flex-col items-center justify-center w-full gap-y-[15px]">
        <p className="text-[20px] font-bold">Confirmation</p>
        <p className="text-[20px] text-center">
          Do you want to delete this product?
        </p>
        <div className="flex gap-[30px]">
          <Button
            text={"Yes"}
            classname={
              "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-white"
            }
          />
          <Button
            text={"No"}
            classname={
              "bg-white border-2 border-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-primary"
            }
            onClick={() => setModalType(null)}
          />
        </div>
      </div>
    </Modal> */}
    </div>
  );
};

export default Stylist;
