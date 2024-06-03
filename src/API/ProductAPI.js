import axios from "axios";
import { useState } from "react";
import { PATH_URL } from "./constan";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useGetProductApi = () => {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const getProduct = async () => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/products`, {
        headers: {
          Authorization: header,
        },
      });
      const { data, code } = response.data;
      setProducts(data);
      setCode(code);
      console.log("fetching product");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getProduct,
    products,
    code,
    setCode,
  };
};

export { useGetProductApi };
