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

const useGetCategoryById = () => {
  const [code, setCode] = useState(null);
  const [category, setCategory] = useState(null);
  const header = useAuthHeader();
  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/category/${id}`, {
        headers: {
          Authorization: header,
        },
      });
      const { data, code } = response.data;
      setCategory(data);
      setCode(code);
      console.log("fetching category");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getCategoryById,
    category,
    code,
    setCode,
  };
};

const useAddCategory = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();

  const addCategory = async (data) => {
    try {
      if (data.sub_categories && data.sub_categories.length > 0) {
        // Use map to return a new array with updated subCategory objects
        const subCat = await Promise.all(
          data.sub_categories.map(async (subCategory) => {
            if (subCategory?.sub_category_image) {
              const image = await uploadImageToCloudinary(
                subCategory.sub_category_image,
              );
              return { ...subCategory, sub_category_image: image };
            }
            return subCategory;
          }),
        );

        data = { ...data, sub_categories: subCat };
      }

      console.log("testing", data);

      const response = await axios.post(
        `${PATH_URL}/admin/category/new`,
        data,
        {
          headers: {
            Authorization: header,
          },
        },
      );
      const { code } = response.data;
      setCode(code);

      console.log("adding category");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const uploadImageToCloudinary = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "user_preset");
      formData.append("api_key", "761147494786172");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkxeflvuu/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  return {
    addCategory,
    code,
    setCode,
  };
};

const useRemoveCategory = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();

  const removeCategory = async (id) => {
    try {
      const response = await axios.delete(`${PATH_URL}/admin/category/${id}`, {
        headers: {
          Authorization: header,
        },
      });

      const { code } = response.data;
      setCode(code);
      console.log("removing category");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    removeCategory,
    code,
    setCode,
  };
};

const useGetAllSubCategory = () => {
  const [code, setCode] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const getAllSubCategory = async () => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/subcategories`);
      const { data, code } = response.data;
      setSubCategories(data);
      setCode(code);
      console.log("fetching sub category");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllSubCategory,
    subCategories,
    code,
    setCode,
  };
};

export {
  useCategoryApi,
  useGetCategoryById,
  useAddCategory,
  useRemoveCategory,
  useGetAllSubCategory,
};
