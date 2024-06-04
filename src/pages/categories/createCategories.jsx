import { InputLabel } from "../../components/molecules/InputLabel";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/organisms/Table";
import { dummySubCategoryHeading } from "../../mocks/dummyCategories";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCategory, useGetCategoryById } from "../../API/CategoryAPi";
import { Modal } from "../../components/molecules/Modal";
import { useSelector } from "react-redux";

const CreateCategoriesPage = () => {
  const [categoryName, setCategoryName] = useState(null);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newSubCategory, setNewSubCategory] = useState([]);
  const [subCategoryTable, setSubCategoryTable] = useState([]);
  const [deletedSubCategory, setDeletedSubCategory] = useState([]);
  const { addCategory, code, setCode } = useAddCategory();
  const [modalType, setModalType] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const param = location.pathname.split("/")[3];
  const { category, getCategoryById } = useGetCategoryById();

  useEffect(() => {
    if (param) {
      getCategoryById(param);
    }
  }, [param]);

  useMemo(() => {
    if (category) {
      setSubCategoryTable(category?.sub_categories ?? []);
      setCategoryName(category?.category_name ?? "");
      setCategoryIcon(category?.category_icon ?? "");
    }
  }, [category]);

  const imagePreview = (file) => {
    return URL.createObjectURL(file);
  };

  const renderTableData = useMemo(() => {
    return subCategoryTable.concat(newSubCategory).map((data) => {
      const imageUrl =
        data.sub_category_image instanceof File
          ? imagePreview(data.sub_category_image)
          : data.sub_category_image;

      return {
        ...data,
        sub_category_images: (
          <img
            src={imageUrl}
            alt="sub_category_image"
            width={"100px"}
            height={"100px"}
          />
        ),
        action: (
          <div className="flex justify-center">
            <TrashIcon
              width={"32px"}
              height={"32px"}
              className="bg-primary p-[3px] rounded-md cursor-pointer text-white "
              onClick={() => {
                if (data.sub_category_image instanceof File) {
                  setNewSubCategory(
                    newSubCategory.filter(
                      (item) =>
                        item.sub_category_name !== data.sub_category_name,
                    ),
                  );
                } else {
                  setSubCategoryTable(
                    subCategoryTable.filter(
                      (item) =>
                        item.product_sub_category_id !==
                        data.product_sub_category_id,
                    ),
                  );
                  setDeletedSubCategory([
                    ...deletedSubCategory,
                    data.product_sub_category_id,
                  ]);
                  alert("delete sub category");
                }
              }}
            />
          </div>
        ),
      };
    });
  }, [subCategoryTable, newSubCategory]);

  const onSelectImages = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const onAddSubCategory = () => {
    setNewSubCategory([
      ...newSubCategory,
      {
        id: subCategoryTable.length + newSubCategory.length + 1,
        sub_category_name: subCategoryName,
        sub_category_image: newImage,
      },
    ]);

    setSubCategoryName("");
    setNewImage(null);
  };

  const onSaveData = () => {
    if (param) {
      const edit_category = {
        category_name: categoryName,
        category_icon: categoryIcon,
        sub_categories: newSubCategory,
        deleted_items: deletedSubCategory,
      };
      console.log("edit: ", edit_category);
    } else {
      const new_category = {
        category_name: categoryName,
        category_icon: categoryIcon,
        sub_categories: newSubCategory,
      };
      console.log("create: ", new_category);

      addCategory(new_category);
    }
  };

  useEffect(() => {
    if (code === 200) {
      alert("Success Create Category");
      navigate("/categories");
      setCode(null);
    }
  }, [code]);

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar
          title={param ? "Edit Category" : "Create Category"}
          userLoginName={"Bryan Hanuga"}
        />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[18px] font-semibold">
            {param ? "Edit Category" : "Create a New Category"}
          </p>
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
          <div className="flex flex-row gap-[30px] items-end">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[20%] w-full"
              }
              label={"Category icon's Name"}
              name={"category_icon"}
              placeholder={"Enter Icon's Name"}
              value={categoryIcon}
              labelPosition="top"
              onChange={(e) => setCategoryIcon(e.target.value)}
            />
            <p
              className="text-blue-600 underline cursor-pointer"
              onClick={() => {
                setModalType("icons_guide");
              }}
            >
              Icons Guide
            </p>
          </div>
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">
            Input Sub Category For The Category
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
              value={subCategoryName}
            />
            <InputLabel
              label={"Sub Category Image"}
              name={"sub_category_image"}
              placeholder={"Enter Sub Category Image"}
              labelPosition="top"
              type={"file"}
              disabled={!categoryName}
              classname={"w-[15%]"}
              onChange={(e) => onSelectImages(e)}
              accept="image/*"
            />
            <Button
              classname={`${
                subCategoryName && newImage
                  ? "bg-primary"
                  : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit gap-1`}
              onClick={onAddSubCategory}
            >
              <PlusIcon style={{ width: "20px", height: "20px" }} />
              <p>Add</p>
            </Button>
          </div>
          {renderTableData.length > 0 && (
            <>
              <Table
                headings={dummySubCategoryHeading}
                data={renderTableData}
              />
              <Button
                text={param ? "Update" : "Create"}
                classname={
                  "bg-primary py-[5px] px-[10px] rounded-[5px] text-white mt-[15px] w-fit ml-auto"
                }
                onClick={onSaveData}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        type="icon_guide"
        isOpen={modalType === "icons_guide"}
        onClose={() => setModalType(null)}
      >
        <div className="h-[600px] !w-[600px]">
          <iframe
            className="w-full h-full"
            src="https://ionic.io/ionicons"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default CreateCategoriesPage;
