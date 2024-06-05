import axios from "axios";
import { useState } from "react";
import { PATH_URL } from "./constan";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useGetStylistApi = () => {
  const [stylists, setStylists] = useState([]);
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const getStylist = async () => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/stylist`, {
        headers: {
          Authorization: header,
        },
      });
      const { data, code } = response.data;
      setStylists(data);
      setCode(code);
      console.log("fetching stylist");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getStylist,
    stylists,
    code,
    setCode,
  };
};

export { useGetStylistApi };
