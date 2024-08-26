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

const useGetnonStylistApi = () => {
  const [nonStylists, setNonStylists] = useState([]);
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const getNonStylist = async (search) => {
    try {
      const response = await axios.get(
        `${PATH_URL}/admin/non-stylist?search=${search}`,
        {
          headers: {
            Authorization: header,
          },
        },
      );
      const { data, code } = response.data;
      setNonStylists(data);
      setCode(code);
      console.log("fetching stylist");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getNonStylist,
    nonStylists,
    code,
    setCode,
  };
};

const useAssignStylistApi = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const assignStylist = async (data) => {
    try {
      const response = await axios.post(`${PATH_URL}/admin/assign`, data, {
        headers: {
          Authorization: header,
        },
      });
      const { code } = response.data;
      setCode(code);
      console.log("Assign stylist");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    assignStylist,
    code,
    setCode,
  };
};

export { useGetStylistApi, useGetnonStylistApi, useAssignStylistApi };
