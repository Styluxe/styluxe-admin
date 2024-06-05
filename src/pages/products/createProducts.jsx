import { InputLabel } from "../../components/molecules/InputLabel";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { useEffect, useMemo, useState } from "react";
import { Table } from "../../components/organisms/Table";
import { dummySubCategoryDropdown } from "../../mocks/dummyCategories";
import { Dropdown } from "../../components/molecules/Dropdown";
import {
  dummyImageHeading,
  dummyMaterialDropdown,
  dummySizeHeading,
} from "../../mocks/dummyProducts";
import { useSelector } from "react-redux";
import { selectedProductState } from "../../redux-toolkit/product/productSlice";
import { useGetAllSubCategory } from "../../API/CategoryAPi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateProductApi,
  useEditProductApi,
  useGetProductByIdApi,
} from "../../API/ProductAPI";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

const CreateProductsPage = () => {
  const selectedProductData = useSelector(selectedProductState);
  const location = useLocation();
  const navigate = useNavigate();
  const param = location.pathname.split("/")[3];

  const { getAllSubCategory, subCategories } = useGetAllSubCategory();
  const { getProductById, product: productData } = useGetProductByIdApi();

  useEffect(() => {
    getAllSubCategory();

    if (param) {
      getProductById(param);
    }
  }, [param]);

  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    sub_category_id: "",
    sizes: [],
    images: [],
    cares: {
      washing: "",
      bleaching: "",
      drying: "",
      ironing: "",
      dry_clean: "",
    },
    materials: {
      fabric: "",
      transparency: "",
      thickness: "",
      stretchiness: "",
    },
    product_price: "",
  });
  const [size, setSize] = useState(null);
  const [stock, setStock] = useState(null);
  const [sizeTable, setSizeTable] = useState([]);
  const [imageTable, setImageTable] = useState([]);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [deletedImage, setDeletedImage] = useState([]);
  const [deletedSize, setDeletedSize] = useState([]);

  const { createProduct, loading, code, setCode } = useCreateProductApi();
  const {
    editProduct,
    code: updateCode,
    setCode: setUpdateCode,
    loading: updateLoading,
  } = useEditProductApi();

  const dropdownData = useMemo(() => {
    return subCategories.map((data) => {
      return {
        id: data.product_sub_category_id,
        label: data.sub_category_name,
        value: data.product_sub_category_id,
      };
    });
  }, [subCategories]);

  useMemo(() => {
    if (productData) {
      setProduct({
        product_name: productData.product_name,
        product_description: productData.product_description,
        sub_category_id: productData.sub_category?.product_sub_category_id,
        sizes: productData.sizes,
        images: productData.images,
        cares: productData.cares,
        materials: productData.materials,
        product_price: productData.product_price,
      });

      setSizeTable(productData.sizes);
      setImageTable(productData.images);
    }
  }, [productData]);

  useEffect(() => {
    if (code === 201) {
      setCode(null);
      navigate("/products");
      alert("Product has been created");
    }

    if (updateCode === 200) {
      setUpdateCode(null);
      navigate("/products");
      alert("Product has been updated");
    }
  }, [code, updateCode]);

  const isValidToCreate = (product) => {
    if (
      !product.product_name ||
      !product.product_description ||
      !product.sub_category_id ||
      !product.product_price
    ) {
      return false;
    }
    const careProperties = [
      "washing",
      "bleaching",
      "drying",
      "ironing",
      "dry_clean",
    ];
    for (let prop of careProperties) {
      if (product.materials[prop] === null || product.materials[prop] === "") {
        return false;
      }
    }

    const materialProperties = [
      "fabric",
      "transparency",
      "thickness",
      "stretchiness",
    ];
    for (let prop of materialProperties) {
      if (product.materials[prop] === null || product.materials[prop] === "") {
        return false;
      }
    }
    return true;
  };

  const imagePreview = (file) => {
    return URL.createObjectURL(file);
  };

  const renderImageData = useMemo(() => {
    return imageTable?.concat(newImage).map((data) => {
      return {
        ...data,
        image_url: (
          <img
            src={
              data?.image_url instanceof File
                ? imagePreview(data.image_url)
                : data?.image_url
            }
            className="w-[50px] h-[50px] object-cover"
          />
        ),
        action: (
          <div className="flex justify-center">
            <TrashIcon
              width={"24px"}
              height={"24px"}
              className="bg-primary p-[3px] rounded-md cursor-pointer text-white"
              onClick={() => {
                if (data?.image_url instanceof File) {
                  setNewImage(
                    newImage.filter(
                      (item) => item.image_url !== data.image_url,
                    ),
                  );
                } else {
                  setImageTable(
                    imageTable.filter(
                      (item) => item.image_url !== data.image_url,
                    ),
                  );
                  setDeletedImage([...deletedImage, data.product_image_id]);
                }
              }}
            />
          </div>
        ),
      };
    });
  }, [imageTable, newImage, deletedImage]);

  const renderSizeTable = useMemo(() => {
    return sizeTable?.concat(newSize).map((data) => {
      return {
        ...data,
        action: (
          <div className="flex justify-center">
            <TrashIcon
              width={"24px"}
              height={"24px"}
              className="bg-primary p-[3px] rounded-md cursor-pointer text-white"
              onClick={() => {
                if (data.product_size_id) {
                  setSizeTable(
                    sizeTable?.filter(
                      (item) => item.product_size_id !== data.product_size_id,
                    ),
                  );
                  setDeletedSize([...deletedSize, data.product_size_id]);
                } else {
                  setNewSize(newSize.filter((item) => item.size !== data.size));
                }
              }}
            />
          </div>
        ),
      };
    });
  }, [sizeTable, newSize, deletedSize]);

  // console.log("newsize", isValidToCreate(product));

  isValidToCreate(product);

  const onSubmitProduct = () => {
    if (param) {
      const edit_product = {
        ...product,
        images: newImage,
        sizes: newSize,
        deleted_images: deletedImage,
        deleted_sizes: deletedSize,
      };
      console.log("edit", edit_product);

      editProduct(param, edit_product);
    } else {
      const submit_product = {
        ...product,
        images: newImage,
        sizes: newSize,
      };

      console.log("create", submit_product);

      createProduct(submit_product);
    }
  };

  console.log("editdata", {
    ...product,
    images: newImage,
    sizes: newSize,
    deleted_images: deletedImage,
    deleted_sizes: deletedSize,
  });

  console.log("update", updateCode);

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar
          title={param ? "Edit Product" : "Create Product"}
          userLoginName={"Bryan Hanuga"}
        />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[18px] font-semibold">
            {param ? "Edit Existing Product" : "Create a New Product"}
          </p>
          <InputLabel
            inputClassName={
              "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[20%]"
            }
            label={"Product Name"}
            name={"product_name"}
            placeholder={"Enter Product Name"}
            labelPosition="top"
            onChange={(e) =>
              setProduct({ ...product, product_name: e.target.value })
            }
            value={product.product_name}
          />
          <InputLabel
            inputClassName={
              "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[50%] h-[150px]"
            }
            label={"Product Description"}
            name={"product_description"}
            placeholder={"Enter Product Description"}
            labelPosition="top"
            onChange={(e) =>
              setProduct({ ...product, product_description: e.target.value })
            }
            type={"textarea"}
            value={product.product_description}
          />
          <Dropdown
            labelText={"Product Sub Category"}
            withLabel={true}
            placeholder={"Choose Sub Category"}
            menu={dropdownData}
            classname={"w-[20%]"}
            onClickMenu={(e) => setProduct({ ...product, sub_category_id: e })}
            selectedOption={product.sub_category_id}
          />
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">Input Sizes and Stock</p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Size"}
              placeholder={"Input Size"}
              labelPosition="top"
              classname={"w-[10%]"}
              onChange={(e) => setSize(e.target.value)}
              value={size}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Stock"}
              placeholder={"Input Stock"}
              labelPosition="top"
              type={"number"}
              classname={"w-[10%]"}
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            />
            <Button
              classname={`${
                size && stock ? "bg-primary" : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit`}
              type={"button"}
              onClick={() => {
                if (size && stock) {
                  setNewSize((prev) => [...prev, { size, stock }]);
                  setSize(null);
                  setStock(null);
                }
              }}
            >
              <div className="flex items-center gap-1">
                <PlusIcon width={20} height={20} />
                <p>Add</p>
              </div>
            </Button>
          </div>
          {renderSizeTable?.length > 0 && (
            <Table headings={dummySizeHeading} data={renderSizeTable} />
          )}
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">
            Input Images For The New Product
          </p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              label={"Product Image"}
              name={"product_image"}
              labelPosition="top"
              type={"file"}
              classname={"w-[15%]"}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
            <Button
              classname={`${
                image ? "bg-primary" : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit`}
              onClick={() => {
                setNewImage([
                  ...newImage,
                  {
                    image_url: image,
                  },
                ]);

                setImage(null);
              }}
            >
              <div className="flex items-center gap-1">
                <PlusIcon width={20} height={20} />
                <p>Add</p>
              </div>
            </Button>
          </div>
          {renderImageData?.length > 0 && (
            <Table headings={dummyImageHeading} data={renderImageData} />
          )}
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">
            Input Product Care Information
          </p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Washing"}
              name={"washing"}
              placeholder={"Input Washing Info"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cares: {
                    ...product.cares,
                    washing: e.target.value,
                  },
                })
              }
              value={product.cares?.washing}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Bleaching"}
              name={"bleaching"}
              placeholder={"Input Bleaching Info"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cares: {
                    ...product.cares,
                    bleaching: e.target.value,
                  },
                })
              }
              value={product.cares?.bleaching}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Drying"}
              name={"drying"}
              placeholder={"Input Drying Info"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cares: {
                    ...product.cares,
                    drying: e.target.value,
                  },
                })
              }
              value={product.cares?.drying}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Ironing"}
              name={"ironing"}
              placeholder={"Input Ironing Info"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cares: {
                    ...product.cares,
                    ironing: e.target.value,
                  },
                })
              }
              value={product.cares?.ironing}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Dry Clean"}
              name={"dry_clean"}
              placeholder={"Input Dry Clean Info"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  cares: {
                    ...product.cares,
                    dry_clean: e.target.value,
                  },
                })
              }
              value={product.cares?.dry_clean}
            />
          </div>

          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">
            Input Product Materials Information
          </p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Fabric"}
              name={"fabric"}
              placeholder={"Input Product Fabric"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) =>
                setProduct({
                  ...product,
                  materials: {
                    ...product.materials,
                    fabric: e.target.value,
                  },
                })
              }
              value={product.materials?.fabric}
            />
            <Dropdown
              labelText={"Product Transparency"}
              withLabel={true}
              placeholder={"Choose Transparency"}
              menu={dummyMaterialDropdown}
              classname={"w-[15%]"}
              onClickMenu={(e) =>
                setProduct({
                  ...product,
                  materials: {
                    ...product.materials,
                    transparency: e,
                  },
                })
              }
              selectedOption={product.materials?.transparency}
            />
            <Dropdown
              labelText={"Product Thickness"}
              withLabel={true}
              placeholder={"Choose Thickness"}
              menu={dummyMaterialDropdown}
              classname={"w-[15%]"}
              onClickMenu={(e) =>
                setProduct({
                  ...product,
                  materials: {
                    ...product.materials,
                    thickness: e,
                  },
                })
              }
              selectedOption={product.materials?.thickness}
            />
            <Dropdown
              labelText={"Product Stretchiness"}
              withLabel={true}
              placeholder={"Choose Stretchiness"}
              menu={dummyMaterialDropdown}
              classname={"w-[15%]"}
              onClickMenu={(e) =>
                setProduct({
                  ...product,
                  materials: {
                    ...product.materials,
                    stretchiness: e,
                  },
                })
              }
              selectedOption={product.materials?.stretchiness}
            />
          </div>
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <div className="flex flex-row items-end gap-1">
            <p className="font-bold">Rp. </p>
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Price"}
              name={"price"}
              type={"text"}
              placeholder={"Input Product Price"}
              labelPosition="top"
              classname={"w-[15%]"}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setProduct({ ...product, product_price: value });
              }}
              value={product.product_price}
            />
          </div>
          {loading || updateLoading ? (
            <Button
              text={"Saving..."}
              classname={
                "bg-gray-400 pointer-events-none py-[5px] px-[10px] rounded-[5px] text-white text-[18px] mt-[15px] w-fit ml-auto"
              }
            />
          ) : (
            <Button
              text={"Save"}
              classname={`${
                isValidToCreate(product) &&
                sizeTable.length > 0 &&
                imageTable.length > 0
                  ? "bg-primary"
                  : "bg-gray-400 pointer-events-none"
              } py-[5px] px-[10px] rounded-[5px] text-white text-[18px] mt-[15px] w-fit ml-auto`}
              onClick={onSubmitProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProductsPage;
