import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const useAuthApi = () => {
  const signIn = useSignIn();
  const [code, setCode] = useState(0);

  const login = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const { token, data, code } = response.data;

      if (code === 200) {
        signIn({
          auth: {
            token,
            type: "Bearer",
          },
          userState: { ...data },
        });
        setCode(code);
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { login, code, setCode };
};

export { useAuthApi };
