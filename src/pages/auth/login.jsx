import { useEffect, useState } from "react";
import { Button } from "../../components/atoms/Button";
import "./login.css";
import { useAuthApi } from "../../API/AuthAPI";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, code, setCode } = useAuthApi();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (code === 200) {
      navigate("/products");
      setCode(null);
    }
  }, [code]);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="w-[350px] h-fit bg-white rounded-[10px] drop-shadow-lg flex flex-col gap-y-[25px] items-center pb-[40px]">
        <div className="loginHeader text-white text-center text-[25px] py-[10px] rounded-t-[10px] font-semibold w-full">
          Login Form
        </div>
        <input
          className="border-[2px] border-gray-300 p-[8px] rounded-[20px] w-[80%]"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          className="border-[2px] border-gray-300 p-[8px] rounded-[20px] w-[80%]"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <Button
          type={"button"}
          text={"Login"}
          classname={
            "loginHeader p-[8px] text-white w-[80%] rounded-[20px] font-semibold"
          }
          onClick={() => login(email, password)}
        />
      </div>
    </div>
  );
};

export default LoginPage;
