import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { g } from "framer-motion/client";

function PatientReg1() {
  const [formType, setFormType] = useState("patient"); // Default to Patient Registration
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    dob: "",
    age: "",
    bloodType: "",
    gender: "",
    contactNumber: "",
    email: "",
    permanentAddress: "",
    cancerType: "",
    diagnosisDate: "",
    admissionNo: "",
    wardNo: "",
    ...(location.state || {}), // This Merges any previously passed data
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const missingFields = [];

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      missingFields.push("Full Name");
    }
    if (!formData.nic.trim()) {
      newErrors.nic = "NIC number is required.";
      missingFields.push("NIC");
    }
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required.";
      missingFields.push("Date of Birth");
    }
    if (!formData.age.trim()) {
      newErrors.age = "Age is required.";
      missingFields.push("Age");
    }
    if (!formData.bloodType.trim()) {
      newErrors.bloodType = "Blood type is required.";
      missingFields.push("Blood Type");
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required.";
      missingFields.push("Gender");
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
      missingFields.push("Contact Number");
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      missingFields.push("Email");
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required.";
      missingFields.push("Permanent Address");
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following fields:\n- ${missingFields.join("\n- ")}`
      );
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/admin/patientreg2", { state: formData });
    }
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setFormType(selectedValue);

    // Navigate to DoAdmin1 if "doctor" is selected
    if (selectedValue === "doctor") {
      navigate("/admin");
    }
  };

  return (
    <>
      <div className="h-full w-full">
        <div className="flex-1 h-full w-full relative">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold">Register</h2>
            <p className="text-[12px] text-gray-700">
              We're thrilled to have you here!
            </p>
          </div>

          <div className="flex items-center gap-8">
            <h3 className="text-[20px] font-bold">
              {formType === "doctor"
                ? "Doctor Registration"
                : "Patient Registration"}
            </h3>
            <div className="relative w-[125px]">
              <select
                className="py-2 px-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none 
                           focus:ring-1 focus:ring-red-400 transition-all duration-200 appearance-none 
                           cursor-pointer hover:bg-red-700 shadow-red-500 shadow-[0_0_3px_rgba(251,44,54,0.20)]"
                value={formType}
                onChange={handleDropdownChange} // Call the function here
              >
                <option value="doctor" className="text-black bg-white">
                  Doctor
                </option>
                <option value="patient" className="text-black bg-white">
                  Patient
                </option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white pr-3">
                ▼
              </span>
            </div>
          </div>
          {/* Patient Registration Form */}
          {formType === "patient" && (
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[400px] mt-8">
              <h3 className="text-[18px] font-bold mb-4">
                Personal Information
              </h3>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Full Name:</label> */}
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">NIC Number:</label> */}
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    placeholder="Enter NIC number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Date of Birth:</label> */}
                  <input
                    type="date"
                    name="dob"
                    placeholder="Enter date of birth"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Age:</label> */}
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Blood Type:</label> */}
                  <input
                    type="text"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    placeholder="Enter blood type"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Gender:</label> */}
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Contact Number:</label> */}
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-sm whitespace-nowrap">Email:</label> */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center mb-4">
                {/* <label className="w-40 text-sm whitespace-nowrap">Permanent Address:</label> */}
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full h-[75px] p-2 border border-gray-300 rounded-md text-sm"
                  rows="3"
                ></textarea>
              </div>
            </div>
          )}

          {/* Next Button - Placed outside the form box */}
          <div className="flex justify-end mt-6 absolute right-0 bottom-6">
            <button
              className="w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientReg1;
