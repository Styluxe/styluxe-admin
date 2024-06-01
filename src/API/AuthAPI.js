import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { PATH_URL } from "./constan";

const useAuthApi = () => {
  const signIn = useSignIn();
  const [code, setCode] = useState(null);

  const login = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(`${PATH_URL}/auth/login`, {
        email,
        password,
      });
      const { token, data, code } = response.data;

      const user = await axios.get(`${PATH_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: userData } = user.data;

      if (code === 200 && data?.userRole === "admin") {
        signIn({
          auth: {
            token,
            type: "Bearer",
          },
          userState: { ...userData },
        });
        setCode(code);
        console.log("Login successful");
      } else {
        console.log("Unauthorized");
        setCode(401);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { login, code, setCode };
};

export { useAuthApi };
