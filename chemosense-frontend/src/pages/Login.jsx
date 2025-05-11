import React, { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/Auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  

    const handleLogin = async () => {  
      const role = await auth.login(email, password) 

      if (role === "admin") navigate("/admin");
      else if (role === "doctor") navigate("/doctor");
      else {
        console.warn("Login failed or user role not recognized.");
        return null;
      }
    }

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen bg-[#ECECEC] p-4 border-2">
      <div className="w-full max-w-5xl h-auto lg:h-[80vh] bg-[#FFFEF9] drop-shadow-[0_0_10px_rgba(0,0,0,0.40)] rounded-4xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 p-20 flex flex-col relative lg:left-4.5 justify-top">
          <h2 className="text-3xl font-bold mb-4 text-center">Log In</h2>
          <div className="flex justify-center mb-6">
            <img src="./logo.png" alt="Logo" className="h-8" />
          </div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-7 rounded-lg bg-[#D6D6D6]"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-[#D6D6D6]"
            />
            <span
              className="absolute right-3 top-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 cursor-pointer"
              />
              <span>Remember me?</span>
            </div>
            <a href="#" className="text-blue-600">
              Forgot Password?
            </a>
          </div>
          <button className="w-40 mx-auto bg-[#1330BE] text-white items-center mt-3 p-3 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition duration-200"
            onClick={handleLogin}
          >
            Log In
          </button>
          <p className="text-center text-sm mt-4">
            Wanna visit our website?<br></br>
            <a href="#" className="text-blue-600">
              <u>here you are</u>
            </a>
          </p>
        </div>
        {/* Right Side - Welcome Section */}
        <div className="w-full lg:w-1/2 bg-[#1330BE] text-white flex flex-col relative lg:left-8 justify-center items-start p-17 rounded-t-xl lg:rounded-l-[160px] lg:rounded-t-none">
          <h2 className="text-4xl font-bold">Welcome!</h2>
          <h3 className="text-4xl font-bold">to CHEMOSENSE</h3>
          <p className="text-left mt-1 font-light">
            To keep connected with us, log in with your <br />
            personal info
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
