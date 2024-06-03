import axios from "axios";
import { useState } from "react";
import { PATH_URL } from "./constan";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useCategoryApi = () => {
  const [code, setCode] = useState(null);
  const [categories, setCategories] = useState([]);
  const header = useAuthHeader();

  const getCategories = async () => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/categories`, {
        headers: {
          Authorization: header,
        },
      });
      const { data, code } = response.data;
      setCategories(data);
      setCode(code);
      console.log("fetching category");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getCategories,
    categories,
    code,
    setCode,
  };
};

export { useCategoryApi };
