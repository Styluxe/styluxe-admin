import { useEffect, useMemo, useState } from "react";
import { InputSearch } from "../../components/molecules/InputSearch";
import { Navbar } from "../../components/molecules/NavBar";
import { SideBar } from "../../components/organisms/SideBar";
import { Button } from "../../components/atoms/Button";
import { Pagination } from "../../components/molecules/Pagination";
import { Table } from "../../components/organisms/Table";
import { Modal } from "../../components/molecules/Modal";
import { ordersHeading } from "../../mocks/dummyOrders";
import { Badge } from "../../components/atoms/Badge";
import { useChangeOrderStatus, useGetOrderApi } from "../../API/OrderAPI";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusChange, setStatusChange] = useState(null);

  const { getOrder, orders } = useGetOrderApi();
  const { changeOrderStatus, code, setCode } = useChangeOrderStatus();

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    if (code === 200) {
      getOrder();
      setCode(null);
      setModalType(null);
      alert("Status Updated");
      setStatusChange(null);
      setSelectedOrder(null);
    }
  }, [code]);

  useEffect(() => {
    if (orders.length > 0) {
      setTableData(orders);
    }
  }, [orders]);

  const renderButtonLabel = (status) => {
    if (status === "waiting for confirmation") {
      return {
        label: "Move into Processing",
        status: "processing",
        color: "bg-yellow-600",
      };
    } else if (status === "processing") {
      return {
        label: "Move into Shipped",
        status: "shipped",
        color: "bg-primary",
      };
    } else if (status === "shipped") {
      return {
        label: "Move into Delivered",
        status: "delivered",
        color: "bg-primary",
      };
    } else if (status === "delivered") {
      return {
        color: "bg-blue-500",
      };
    } else if (status === "cancelled") {
      return {
        color: "bg-red-500",
      };
    } else if (status === "accepted") {
      return {
        color: "bg-green-500",
      };
    } else if (status === "done") {
      return {
        color: "bg-green-500",
      };
    }
  };

  const renderTableData = useMemo(() => {
    return tableData?.map((data) => {
      return {
        ...data,
        payment_receipt: data.payment_details?.payment_receipt_url ? (
          <img
            src={data.payment_details?.payment_receipt_url}
            alt="Payment Receipt"
            className="w-[100px] h-[100px] object-cover"
          />
        ) : (
          <p className="text-[13px]">No Receipt</p>
        ),
        provider: (
          <p className="text-[13px]">{data.payment_details?.provider}</p>
        ),
        payment_status: (
          <p className="text-[13px]">{data.payment_details?.payment_status}</p>
        ),
        products: (
          <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
            {data.order_items?.map((data, index) => (
              <li className="text-[13px]" key={index}>
                {data?.product.product_name + " (" + data?.quantity + ")"}
              </li>
            ))}
          </ul>
        ),

        customer_name: data?.user?.first_name + " " + data?.user?.last_name,
        order_status: (
          <div className="flex">
            <Badge
              label={data.order_status.toUpperCase()}
              classname={`${
                renderButtonLabel(data?.order_status)?.color
              } !text-[11px]`}
            />
            {data.order_status != "pending" &&
              data.order_status != "delivered" &&
              data.order_status != "cancelled" &&
              data.order_status != "accepted" &&
              data.order_status != "done" && (
                <Button
                  text={renderButtonLabel(data?.order_status)?.label}
                  classname={
                    "bg-primary py-[3px] px-[10px] rounded-[5px] text-white w-fit ml-auto text-[13px]"
                  }
                  onClick={() => {
                    setModalType("change_status");
                    setSelectedOrder(data.order_id);
                    setStatusChange(
                      renderButtonLabel(data?.order_status).status,
                    );
                  }}
                />
              )}
          </div>
        ),
        total: (
          <p className="text-[13px]">
            Rp{" "}
            {parseFloat(data?.payment_details?.transfer_amount).toLocaleString(
              "id-ID",
            )}
          </p>
        ),
      };
    });
  }, [tableData]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setTableData(
      orders.filter((item) =>
        item.order_number.toLowerCase().includes(query.toLowerCase()),
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
        <Navbar title={"Manage Orders"} userLoginName={"Bryan Hanuga"} />
        <div className="flex flex-col p-[20px]">
          <div className="flex flex-col gap-y-[10px] border-b-[1px] border-slate-500 pb-[30px]">
            <p className="text-[15px] font-semibold">Search Order</p>
            <InputSearch
              placeholder={"Order ID"}
              onSearch={handleSearch}
              inputClassName={
                "rounded-[3px] border-[1px] border-gray-300 px-[15px] outline-none w-[400px] py-[3px]"
              }
            />
          </div>
          <div className="flex justify-between">
            <Pagination
              classname={"mt-[20px]"}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <Table
            headings={ordersHeading}
            data={currentItems}
            classname={"mt-[20px] rounded-[5px]"}
          />
        </div>
      </div>
      <Modal
        type="change_status"
        isOpen={modalType === "change_status"}
        onClose={() => setModalType(null)}
      >
        <div className="flex flex-col items-center justify-center w-full gap-y-[15px]">
          <p className="text-[20px] font-bold">Confirmation</p>
          <p className="text-[20px] text-center">
            Are You Sure You Want to Change The Status?
          </p>
          <div className="flex gap-[30px] w-full">
            <Button
              text={"Yes"}
              classname={
                "bg-primary py-[5px] px-[10px] rounded-[5px] mt-[15px] w-full text-white"
              }
              onClick={() => {
                changeOrderStatus(selectedOrder, statusChange);
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

export default OrdersPage;
