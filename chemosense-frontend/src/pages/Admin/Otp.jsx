import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
    alert("OTP Verified!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Logo from public folder */}
      <div className="mb-4">
        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Enter Verification code
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        we've sent code to{" "}
        <span className="font-medium text-gray-700">karen778@gmail.com</span>
      </p>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter Here.."
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-[400px] px-4 py-2 mb-3 border text-center border-gray-300 bg-[#F1F4F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Resend */}
      <p className="text-sm text-gray-500 mb-6">
        Didn’t get a code?{" "}
        <span className="text-blue-600 font-medium cursor-pointer">
          Click to resend.
        </span>
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <button className="w-[180px] py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition duration-200">
          Cancel
        </button>
        <button
          onClick={handleVerify}
          className="w-[180px] py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Otp;
