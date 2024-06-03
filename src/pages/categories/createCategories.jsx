import { InputLabel } from "../../components/molecules/InputLabel";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { useMemo, useState } from "react";
import { Table } from "../../components/organisms/Table";
import { dummySubCategoryHeading } from "../../mocks/dummyCategories";
import { useSelector } from "react-redux";
import { selectedCategoryState } from "../../redux-toolkit/product/productSlice";

const CreateCategoriesPage = () => {
  const selectedCategoryData = useSelector(selectedCategoryState);

  const [categoryName, setCategoryName] = useState(
    selectedCategoryData.category_name ?? null,
  );
  const [categoryIcon, setCategoryIcon] = useState(
    selectedCategoryData.category_icon ?? null,
  );
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [subCategoryImg, setSubCategoryImg] = useState(null);
  const [subCategoryTable, setSubCategoryTable] = useState(
    selectedCategoryData.sub_categories ?? [],
  );
  const [subCategoryTableObject, setSubCategoryTableObject] = useState(
    selectedCategoryData.sub_categories ?? [],
  );

  const renderTableData = useMemo(() => {
    return subCategoryTable.map((data) => {
      return {
        ...data,
        action: (
          <img
            src="trash_icon.svg"
            className="bg-primary p-[3px] rounded-md cursor-pointer"
            onClick={() =>
              setSubCategoryTable(
                subCategoryTable.filter((item) => item.id !== data.id),
              )
            }
          ></img>
        ),
      };
    });
  }, [subCategoryTable]);
  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar title={"Create Category"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[18px] font-semibold">Create a New Category</p>
          <InputLabel
            inputClassName={
              "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[20%]"
            }
            label={"Category Name"}
            name={"category_name"}
            placeholder={"Enter Category Name"}
            labelPosition="top"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
          <InputLabel
            inputClassName={"w-[20%]"}
            label={"Category icon"}
            name={"category_icon"}
            placeholder={"Enter Category Icon"}
            labelPosition="top"
            type={"file"}
            onChange={(e) => setCategoryIcon(e.target.files[0])}
            accept="image/*"
          />
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">
            Input Sub Category For The New Category
          </p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Sub Category Name"}
              name={"sub_category_name"}
              placeholder={"Enter Sub Category Name"}
              labelPosition="top"
              classname={"w-[20%]"}
              disabled={!categoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
            <InputLabel
              label={"Sub Category Image"}
              name={"sub_category_image"}
              placeholder={"Enter Sub Category Image"}
              labelPosition="top"
              type={"file"}
              disabled={!categoryName}
              classname={"w-[15%]"}
              onChange={(e) => setSubCategoryImg(e.target.files[0])}
              accept="image/*"
            />
            <Button
              text={"Add"}
              classname={`${
                subCategoryName && subCategoryImg
                  ? "bg-primary"
                  : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit`}
              icon
              iconSrc={"plus_icon.svg"}
              onClick={() => {
                setSubCategoryTable([
                  ...subCategoryTable,
                  {
                    id: subCategoryTable.length + 1,
                    sub_category_name: subCategoryName,
                    sub_category_image: subCategoryImg.name,
                  },
                ]);
                setSubCategoryTableObject([
                  ...subCategoryTable,
                  {
                    id: subCategoryTable.length + 1,
                    sub_category_name: subCategoryName,
                    sub_category_image: subCategoryImg,
                  },
                ]);
              }}
            />
          </div>
          {subCategoryTable.length > 0 && (
            <>
              <Table
                headings={dummySubCategoryHeading}
                data={renderTableData}
              />
              <Button
                text={"Save"}
                classname={
                  "bg-primary py-[5px] px-[10px] rounded-[5px] text-white mt-[15px] w-fit ml-auto"
                }
                onClick={() => {
                  const Category = {
                    category_name: categoryName,
                    category_icon: categoryIcon,
                    sub_categories: subCategoryTableObject,
                  };
                  console.log("final: ", Category);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategoriesPage;
