import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Otp = () => {
  const [enteredOtp, setEnteredOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSentOtp, setCurrentSentOtp] = useState(
    location.state?.otp || ""
  );
  const { email: userEmail } = location.state || {}; // Get OTP and email from navigation state

  useEffect(() => {
    emailjs.init("VEGtfij-yBJ1JMw_d"); // Initialize EmailJS with your Public Key
  }, []);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const handleVerify = () => {
    if (enteredOtp === currentSentOtp) {
      alert("OTP Verified Successfully!");
      // Optionally navigate to another page after successful verification
      // navigate("/admin/dashboard");
    } else {
      alert("Invalid OTP. Please try again.");
    }
    console.log("Verifying OTP:", enteredOtp);
  };

  const handleResendOtp = async () => {
    if (!userEmail) {
      alert("User email not available for resending OTP.");
      return;
    }

    const newOtp = generateOtp();
    const templateParams = {
      email: userEmail,
      passcode: newOtp,
    };

    try {
      await emailjs.send(
        "service_92mvamb", // Your EmailJS Service ID
        "template_zuj62ee", // Your EmailJS Template ID
        templateParams
      );
      setCurrentSentOtp(newOtp); // Update the state with the new OTP
      alert("New OTP sent successfully!");
      console.log("New OTP sent:", newOtp);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
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
        <span className="font-medium text-gray-700">
          {userEmail || "your email"}
        </span>
      </p>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter Here.."
        value={enteredOtp}
        onChange={(e) => setEnteredOtp(e.target.value)}
        className="w-[400px] px-4 py-2 mb-3 border text-center border-gray-300 bg-[#F1F4F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Resend */}
      <p className="text-sm text-gray-500 mb-6">
        Didn’t get a code?{" "}
        <span
          className="text-blue-600 font-medium cursor-pointer"
          onClick={handleResendOtp}
        >
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
