import { InputLabel } from "../../components/molecules/InputLabel";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { useMemo, useState } from "react";
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

const CreateProductsPage = () => {
  const selectedProductData = useSelector(selectedProductState);

  const [product, setProduct] = useState({
    product_name: selectedProductData.product_name ?? "",
    product_description: selectedProductData.product_description ?? "",
    product_sub_category: selectedProductData.product_sub_category ?? "",
    product_sizes: selectedProductData.sizes ?? [],
    product_images: selectedProductData.product_images ?? [],
    product_care: selectedProductData.cares ?? {
      washing: "",
      bleaching: "",
      drying: "",
      ironing: "",
      dry_clean: "",
    },
    product_materials: selectedProductData.materials ?? {
      fabric: "",
      transparency: "",
      thickness: "",
      stretchiness: "",
    },
    product_price: selectedProductData.price ?? "",
  });
  const [size, setSize] = useState(null);
  const [stock, setStock] = useState(null);
  const [image, setImage] = useState(null);
  const [sizeTable, setSizeTable] = useState(selectedProductData.sizes ?? []);
  const [imageTable, setImageTable] = useState(
    selectedProductData.product_images ?? [],
  );
  const [imageTableObject, setImageTableObject] = useState(
    selectedProductData.product_images ?? [],
  );

  const isValidToCreate = (product) => {
    if (
      !product.product_name ||
      !product.product_description ||
      !product.product_sub_category ||
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
      if (
        product.product_materials[prop] === null ||
        product.product_materials[prop] === ""
      ) {
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
      if (
        product.product_materials[prop] === null ||
        product.product_materials[prop] === ""
      ) {
        return false;
      }
    }
    return true;
  };

  const renderImageData = useMemo(() => {
    return imageTable.map((data) => {
      return {
        ...data,
        action: (
          <img
            src="trash_icon.svg"
            className="bg-[#d9c075] p-[3px] rounded-md cursor-pointer"
            onClick={() =>
              setImageTable(imageTable.filter((item) => item.id !== data.id))
            }
          ></img>
        ),
      };
    });
  }, [imageTable]);

  const renderSizeTable = useMemo(() => {
    return sizeTable.map((data) => {
      return {
        ...data,
        action: (
          <img
            src="trash_icon.svg"
            className="bg-[#d9c075] p-[3px] rounded-md cursor-pointer"
            onClick={() =>
              setSizeTable(sizeTable.filter((item) => item.id !== data.id))
            }
          ></img>
        ),
      };
    });
  }, [sizeTable]);

  isValidToCreate(product);
  console.log("data: ", product);
  console.log("valid ", isValidToCreate(product));

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-1 h-screen">
        <Navbar title={"Create Product"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px] m-[40px] border-[1px] border-slate-300 h-[85%] gap-y-[15px] overflow-y-auto">
          <p className="text-[18px] font-semibold">Create a New Product</p>
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
              "border-[1px] border-gray-400 p-[3px] rounded-[5px] w-[20%]"
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
            menu={dummySubCategoryDropdown}
            classname={"w-[20%]"}
            onClickMenu={(e) =>
              setProduct({ ...product, product_sub_category: e })
            }
            selectedOption={product.product_sub_category}
          />
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <p className="text-[18px] font-semibold">Input Sizes and Stock</p>
          <div className="flex gap-[30px] w-full items-center">
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Size"}
              name={"size"}
              placeholder={"Input Size"}
              labelPosition="top"
              classname={"w-[10%]"}
              onChange={(e) => setSize(e.target.value)}
            />
            <InputLabel
              inputClassName={
                "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
              }
              label={"Stock"}
              name={"stock"}
              placeholder={"Input Stock"}
              labelPosition="top"
              type={"number"}
              classname={"w-[10%]"}
              onChange={(e) => setStock(e.target.value)}
            />
            <Button
              text={"Add"}
              classname={`${
                size && stock
                  ? "bg-[#91680f]"
                  : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit`}
              icon
              iconSrc={"plus_icon.svg"}
              onClick={() => {
                setSizeTable([
                  ...sizeTable,
                  {
                    id: sizeTable.length + 1,
                    size: size,
                    stock: stock,
                  },
                ]);
              }}
            />
          </div>
          {sizeTable.length > 0 && (
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
              text={"Add"}
              classname={`${
                image ? "bg-[#91680f]" : "bg-gray-400 pointer-events-none"
              } px-[15px] py-[5px] rounded-[5px] text-white mt-[15px] w-fit`}
              icon
              iconSrc={"plus_icon.svg"}
              onClick={() => {
                setImageTable([
                  ...imageTable,
                  {
                    id: imageTable.length + 1,
                    image_url: image.name,
                  },
                ]);
                setImageTableObject([
                  ...imageTableObject,
                  {
                    id: imageTable.length + 1,
                    image_url: image,
                  },
                ]);
              }}
            />
          </div>
          {imageTable.length > 0 && (
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
                  product_care: {
                    ...product.product_care,
                    washing: e.target.value,
                  },
                })
              }
              value={product.product_care?.washing}
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
                  product_care: {
                    ...product.product_care,
                    bleaching: e.target.value,
                  },
                })
              }
              value={product.product_care?.bleaching}
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
                  product_care: {
                    ...product.product_care,
                    drying: e.target.value,
                  },
                })
              }
              value={product.product_care?.drying}
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
                  product_care: {
                    ...product.product_care,
                    ironing: e.target.value,
                  },
                })
              }
              value={product.product_care?.ironing}
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
                  product_care: {
                    ...product.product_care,
                    dry_clean: e.target.value,
                  },
                })
              }
              value={product.product_care?.dry_clean}
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
                  product_materials: {
                    ...product.product_materials,
                    fabric: e.target.value,
                  },
                })
              }
              value={product.product_materials?.fabric}
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
                  product_materials: {
                    ...product.product_materials,
                    transparency: e,
                  },
                })
              }
              selectedOption={product.product_materials.transparency}
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
                  product_materials: {
                    ...product.product_materials,
                    thickness: e,
                  },
                })
              }
              selectedOption={product.product_materials.thickness}
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
                  product_materials: {
                    ...product.product_materials,
                    stretchiness: e,
                  },
                })
              }
              selectedOption={product.product_materials.stretchiness}
            />
          </div>
          <div className="h-[1px] border-b-[1px] border-gray-400 " />
          <InputLabel
            inputClassName={
              "border-[1px] border-gray-400 p-[3px] rounded-[5px]"
            }
            label={"Price"}
            name={"price"}
            placeholder={"Input Product Price"}
            labelPosition="top"
            classname={"w-[15%]"}
            onChange={(e) =>
              setProduct({ ...product, product_price: e.target.value })
            }
            value={product.product_price}
          />
          <Button
            text={"Save"}
            classname={`${
              isValidToCreate(product) &&
              sizeTable.length > 0 &&
              imageTable.length > 0
                ? "bg-[#91680f]"
                : "bg-gray-400 pointer-events-none"
            } py-[5px] px-[10px] rounded-[5px] text-white text-[18px] mt-[15px] w-fit ml-auto`}
            onClick={() => {
              setProduct({
                ...product,
                product_sizes: [...sizeTable],
                product_images: [...imageTableObject],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductsPage;
