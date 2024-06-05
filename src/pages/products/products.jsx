import { useEffect, useMemo, useState } from "react";
import { InputSearch } from "../../components/molecules/InputSearch";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { Pagination } from "../../components/molecules/Pagination";
import { Table } from "../../components/organisms/Table";
import { bodyData, heading } from "../../mocks/dummyProducts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../redux-toolkit/product/productSlice";
import { Modal } from "../../components/molecules/Modal";

import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useGetProductApi } from "../../API/ProductAPI";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(bodyData);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getProduct, products } = useGetProductApi();

  console.log(products);

  useEffect(() => {
    getProduct();
  }, []);

  const renderTableData = useMemo(() => {
    return products?.map((data) => {
      return {
        ...data,
        sizes: data.sizes
          ?.map((size) => `${size.size}(${size.stock})`)
          .join(", "),
        product_images: (
          <div style={{ display: "flex", gap: "10px" }}>
            {data.images?.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                className="w-[50px] h-[50px] object-cover"
              />
            ))}
          </div>
        ),
        product_sub_category: data.sub_category?.sub_category_name,
        price: "Rp " + parseFloat(data?.product_price).toLocaleString("id-ID"),
        actions: (
          <div className="flex items-center gap-[15px] justify-center">
            <PencilSquareIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => {
                navigate("/products/edit/" + data.product_id);
              }}
            />
            <TrashIcon
              className="bg-primary p-[3px] rounded-md  cursor-pointer w-[32px] h-[32px]  text-white"
              onClick={() => setModalType("delete_product")}
            />
          </div>
        ),
      };
    });
  }, [products, dispatch, navigate]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setTableData(
      bodyData.filter((item) =>
        item.product_name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(renderTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = renderTableData?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="flex h-screen flex-1 w-full ">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="h-screen overflow-hidden w-full flex-1">
        <Navbar title={"Manage Product"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px] overflow-y-auto h-full">
          <div className="flex flex-col gap-y-[10px] border-b-[1px] border-slate-500 pb-[30px]">
            <p className="text-[15px] font-semibold">Search Product</p>
            <InputSearch
              placeholder={"Product Name"}
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
              onClick={() => navigate("/create-products")}
            >
              <a className={`text-white`}>Add New Product</a>
            </Button>
            <Pagination
              classname={"mt-[20px]"}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <Table
            headings={heading}
            data={currentItems}
            classname={"mt-[20px] rounded-[5px]"}
          />
        </div>
      </div>
      <Modal
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
      </Modal>
    </div>
  );
};

export default ProductsPage;
