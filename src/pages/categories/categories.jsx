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
import { Modal } from "../../components/molecules/Modal";
import { useCategoryApi, useRemoveCategory } from "../../API/CategoryAPi";
import {
  PencilSquareIcon,
  StopIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, getCategories } = useCategoryApi();
  const { removeCategory, code, setCode } = useRemoveCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (code === 200) {
      getCategories();
      setSelectedCategory(null);
      setCode(null);
      setModalType(null);
    }
  }, [code]);

  useEffect(() => {
    if (categories.length > 0) {
      setTableData(categories);
    }
  }, [categories]);

  const renderTableData = useMemo(() => {
    return tableData?.map((data) => {
      return {
        ...data,
        sub_categories: (
          <div className="grid grid-rows-3 grid-flow-col w-[70%]">
            {data.sub_categories.map((subCategory) => (
              <div
                key={subCategory.sub_category_id}
                className="flex items-center gap-1"
              >
                <StopIcon className="h-2 w-2 text-primary " />

                <p className="text-[13px]" key={subCategory.sub_category_id}>
                  {subCategory.sub_category_name}
                </p>
              </div>
            ))}
          </div>
        ),
        actions: (
          <div className="flex items-center gap-x-[20px] justify-center">
            <PencilSquareIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => {
                navigate("/categories/edit/" + data.product_category_id);
              }}
            />
            <TrashIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => {
                if (data.sub_categories.length > 1) {
                  alert(
                    "Category cannot be deleted because it has more than 1 sub-categories",
                  );
                } else {
                  setModalType("delete_category");
                  setSelectedCategory(data?.product_category_id);
                }
              }}
            />
          </div>
        ),
      };
    });
  }, [tableData, navigate]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setTableData(
      categories.filter((item) =>
        item.category_name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const itemsPerPage = 5;
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
                "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-fit"
              }
              icon
              iconSrc={"plus_icon.svg"}
              type={"button"}
              onClick={() => navigate("/create-categories")}
            >
              <a className={`text-white`}>Add New Category</a>
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
          <div className="flex gap-[30px] w-full">
            <Button
              text={"Yes"}
              classname={
                "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-full text-white"
              }
              onClick={() => {
                removeCategory(selectedCategory);
              }}
            />
            <Button
              text={"No"}
              classname={
                "bg-white border-2 border-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-full text-primary"
              }
              onClick={() => {
                setModalType(null);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
