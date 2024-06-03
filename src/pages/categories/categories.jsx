import { useEffect, useMemo, useState } from "react";
import { InputSearch } from "../../components/molecules/InputSearch";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { Pagination } from "../../components/molecules/Pagination";
import { Table } from "../../components/organisms/Table";
import {
  CategoryBodyData,
  dummyCategoryHeading,
} from "../../mocks/dummyCategories";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../../redux-toolkit/product/productSlice";
import { Modal } from "../../components/molecules/Modal";
import { useCategoryApi } from "../../API/CategoryAPi";
import { PencilSquareIcon, TrashIcon  } from "@heroicons/react/16/solid";

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, getCategories } = useCategoryApi();

  useEffect(() => {
    getCategories();
  }, []);

  const renderTableData = useMemo(() => {
    return categories?.map((data) => {
      return {
        ...data,
        sub_categories: data.sub_categories
          .map((subCategory) => subCategory.sub_category_name)
          .join(", "),
        actions: (
          <div className="flex items-center gap-x-[20px] justify-center">
            <PencilSquareIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[24px] h-[24px]  text-white"
              onClick={() => {
                dispatch(setSelectedCategory(data));
                navigate("/create-categories");
              }}
            />
            <TrashIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[24px] h-[24px]  text-white"
              onClick={() => setModalType("delete_category")}
            />
          </div>
        ),
      };
    });
  }, [categories, dispatch, navigate]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setTableData(
      CategoryBodyData.filter((item) =>
        item.category_name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(renderTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = renderTableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar title={"Manage Categories"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px]">
          <div className="flex flex-col gap-y-[10px] border-b-[1px] border-slate-500 pb-[30px]">
            <p className="text-[15px] font-semibold">Search Category</p>
            <InputSearch
              placeholder={"Category Name"}
              onSearch={handleSearch}
              inputClassName={
                "rounded-[3px] border-[1px] border-gray-300 px-[15px] outline-none w-[400px] py-[3px]"
              }
            />
          </div>
          <div className="flex justify-between">
            <Button
              text={"Add New Product"}
              classname={
                "bg-[#91680f] py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit"
              }
              icon
              iconSrc={"plus_icon.svg"}
            >
              <a className={`text-white`} href={"/create-categories"}>
                Add New Category
              </a>
            </Button>
            <Pagination
              classname={"mt-[20px]"}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <Table
            headings={dummyCategoryHeading}
            data={currentItems}
            classname={"mt-[20px] rounded-[5px]"}
          />
        </div>
      </div>
      <Modal
        type="delete_category"
        isOpen={modalType === "delete_category"}
        onClose={() => setModalType(null)}
      >
        <div className="flex flex-col items-center justify-center w-full gap-y-[15px]">
          <p className="text-[20px] font-bold">Confirmation</p>
          <p className="text-[20px] text-center">
            Do you want to delete this category?
          </p>
          <div className="flex gap-[30px]">
            <Button
              text={"Yes"}
              classname={
                "bg-[#91680f] py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-white"
              }
            />
            <Button
              text={"No"}
              classname={
                "bg-white border-2 border-[#91680f] py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit text-[#91680f]"
              }
              onClick={() => setModalType(null)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
