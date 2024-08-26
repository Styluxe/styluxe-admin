import axios from "axios";
import { useState } from "react";
import { PATH_URL } from "./constan";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useGetOrderApi = () => {
  const [orders, setOrders] = useState([]);
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const getOrder = async () => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/orders`, {
        headers: {
          Authorization: header,
        },
      });
      const { data: orders, code } = response.data;
      setOrders(orders);
      setCode(code);
      console.log("fetching order");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getOrder,
    orders,
    code,
    setCode,
  };
};

const useChangeOrderStatus = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const changeOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${PATH_URL}/admin/order-status/${id}`,
        {
          order_status: status,
        },
        {
          headers: {
            Authorization: header,
          },
        },
      );
      const { code } = response.data;
      setCode(code);
      console.log("status changed");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    changeOrderStatus,
    code,
    setCode,
  };
};

export { useGetOrderApi, useChangeOrderStatus };
