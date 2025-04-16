import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminHeader from "../components/AdminHeader";
import DocPatDropDown from "../components/DocPatDropDown";

function DoAdmin1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formType, setFormType] = useState("doctor"); // "doctor" or "patient"
  const [newWard, setNewWard] = useState("");
  const [wards, setWards] = useState(location.state?.wards || []);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    if (nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const missingFields = [];

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      missingFields.push("First Name");
    }
    if (!formData.secondName.trim()) {
      newErrors.secondName = "Second name is required.";
      missingFields.push("Second Name");
    }
    if (!formData.mbbsNo.trim()) {
      newErrors.mbbsNo = "MBBS No is required.";
      missingFields.push("MBBS No");
    }
    if (!formData.doctorId.trim()) {
      newErrors.doctorId = "Doctor ID is required.";
      missingFields.push("Doctor ID");
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      missingFields.push("Email");
    }
    if (wards.length === 0) {
      newErrors.wards = "At least one ward is required.";
      missingFields.push("Ward");
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
      navigate("/admin/DoAdmin2", { state: { ...formData, wards } });
    }
  };

  const handleFormChange = (e) => {
    const selectedForm = e.target.value;
    setFormType(selectedForm);

    if (selectedForm === "patient") {
      navigate("/admin/patientreg1"); // Navigate to PatientReg1 immediately
    }
  };

  const removeWard = (wardToRemove) => {
    setWards(wards.filter((ward) => ward !== wardToRemove));
  };

  const addWard = (e) => {
    if (
      e.key === "Enter" &&
      newWard.trim() !== "" &&
      !wards.includes(newWard)
    ) {
      setWards([...wards, newWard]);
      setNewWard(""); // Clear input after adding
    }
  };

  const [formData, setFormData] = useState({
    firstName: location.state?.firstName || "",
    secondName: location.state?.secondName || "",
    mbbsNo: location.state?.mbbsNo || "",
    doctorId: location.state?.doctorId || "",
    email: location.state?.email || "",
  });

  const [errors, setErrors] = useState({});

  return (
    <>
      <div className="w-full flex h-full">
        <div className="flex-1 relative">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold">Register</h2>
            <p className="text-[12px] text-gray-700">
              We're thrilled to have you here!
            </p>
          </div>

          <div className="flex items-center gap-8">
            <h3 className="text-[20px] font-bold">Doctor Registration</h3>
            <div className="relative w-[200px]">
              <select
                className="py-2 px-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none 
                                            focus:ring-2 focus:ring-red-400 transition-all duration-200 appearance-none 
                                            cursor-pointer hover:bg-red-700"
                value={formType}
                onChange={handleFormChange}
              >
                <option
                  value="doctor"
                  className="text-black bg-white hover:bg-blue-500 transition-all duration-200 cursor-pointer font-semibold"
                >
                  Doctor Registration
                </option>
                <option
                  value="patient"
                  className="text-black bg-white hover:bg-blue-500 transition-all duration-200 cursor-pointer font-semibold"
                >
                  Patient Registration
                </option>
              </select>
              <span className="absolute inset-y-3 right-6 flex items-center pointer-events-none text-white">
                ▼
              </span>
            </div>
          </div>

          {formType === "doctor" && (
            <div className="bg-white p-6 rounded-2xl shadow-lg w-ful h-[400px] mt-8">
              <div className="flex flex-col p-2 w-full h-full gap-2 justify-center">
                <div className="flex gap-5 mb-4">
                  <div className="flex items-center w-1/2">
                    {/* <label className="w-32 text-sm">First Name:</label> */}
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="flex items-center w-1/2">
                    {/* <label className="w-32 text-sm">Second Name:</label> */}
                    <input
                      name="secondName"
                      type="text"
                      placeholder="Second Name"
                      value={formData.secondName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {/* <label className="w-32 text-sm">MBBS No:</label> */}
                  <input
                    name="mbbsNo"
                    type="text"
                    value={formData.mbbsNo}
                    onChange={handleChange}
                    placeholder="MBBS No"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center mb-4">
                  {/* <label className="w-32 text-sm">Doctor ID:</label> */}
                  <input
                    name="doctorId"
                    type="text"
                    value={formData.doctorId}
                    onChange={handleChange}
                    placeholder="Doctor ID"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center mb-4">
                  {/* <label className="w-32 text-sm">E-Mail:</label> */}
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div className="flex items-center mb-4">
                  {/* <label className="w-32 text-sm">Ward:</label> */}
                  <div className="relative w-full border border-gray-300 rounded-md p-2 flex flex-wrap items-center gap-2 min-h-[40px]">
                    {/* Display Selected Wards */}
                    {wards.map((ward, index) => (
                      <span
                        key={index}
                        className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                        onClick={() => removeWard(ward)}
                      >
                        {ward} ✖
                      </span>
                    ))}

                    {/* Input Field for Entering Wards */}
                    <input
                      type="text"
                      placeholder="Enter Ward Number"
                      value={newWard}
                      onChange={(e) => setNewWard(e.target.value)}
                      onKeyDown={addWard}
                      className="flex-1 min-w-[120px] outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6 absolute right-0 bottom-6">
            <button
              ref={nextButtonRef}
              className=" w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
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

export default DoAdmin1;
