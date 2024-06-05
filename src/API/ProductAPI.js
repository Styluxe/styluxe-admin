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

const useGetProductByIdApi = () => {
  const [product, setProduct] = useState(null);
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${PATH_URL}/admin/product/${id}`, {
        headers: {
          Authorization: header,
        },
      });
      const { data, code } = response.data;
      setProduct(data);
      setCode(code);
      console.log("fetching product");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getProductById,
    product,
    code,
    setCode,
  };
};

const useCreateProductApi = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const [loading, setLoading] = useState(false);

  const createProduct = async (data) => {
    setLoading(true);
    try {
      if (data.images && data.images.length > 0) {
        const imageUrls = await Promise.all(
          data.images.map(async (image) => {
            const imageUrl = await uploadImageToCloudinary(image.image_url);
            return imageUrl;
          }),
        );

        data = { ...data, images: imageUrls };
      }

      const response = await axios.post(`${PATH_URL}/admin/product`, data, {
        headers: {
          Authorization: header,
        },
      });
      const { code } = response.data;
      setCode(code);
      console.log("fetching product");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    createProduct,
    code,
    setCode,
    loading,
  };
};

const useEditProductApi = () => {
  const [code, setCode] = useState(null);
  const header = useAuthHeader();
  const [loading, setLoading] = useState(false);

  const editProduct = async (id, data) => {
    setLoading(true);
    try {
      if (data.images && data.images.length > 0) {
        const imageUrls = await Promise.all(
          data.images.map(async (image) => {
            const imageUrl = await uploadImageToCloudinary(image.image_url);
            return imageUrl;
          }),
        );

        data = { ...data, images: imageUrls };
      }

      const response = await axios.put(
        `${PATH_URL}/admin/product/${id}`,
        data,
        {
          headers: {
            Authorization: header,
          },
        },
      );
      const { code } = response.data;
      setCode(code);
      console.log("fetching product");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    editProduct,
    code,
    setCode,
    loading,
  };
};

export {
  useGetProductApi,
  useGetProductByIdApi,
  useCreateProductApi,
  useEditProductApi,
};
