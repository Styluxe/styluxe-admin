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
      const response = await axios.get(`${PATH_URL}/orders`, {
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

export { useGetOrderApi };
