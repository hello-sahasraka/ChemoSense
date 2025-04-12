import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientReg1() {
    const [formType, setFormType] = useState("patient"); // Default to Patient Registration
    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/admin/patientreg2");
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
                        <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <h3 className="text-[20px] font-bold">
                            {formType === "doctor" ? "Doctor Registration" : "Patient Registration"}
                        </h3>
                        <div className="relative w-[200px]">
                            <select
                                className="py-2 px-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none 
                                            focus:ring-2 focus:ring-red-400 transition-all duration-200 appearance-none 
                                            cursor-pointer hover:bg-red-700"
                                value={formType}
                                onChange={handleDropdownChange} // Call the function here
                            >
                                <option value="doctor" className="text-black bg-white" >Doctor Registration</option>
                                <option value="patient" className="text-black bg-white" >Patient Registration</option>
                            </select>
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white pr-3">▼</span>
                        </div>
                    </div>
                    {/* Patient Registration Form */}
                    {formType === "patient" && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[400px] mt-8">
                            <h3 className="text-[18px] font-bold mb-4">Personal Information</h3>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Full Name:</label> */}
                                    <input type="text" placeholder="Enter full name" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">NIC Number:</label> */}
                                    <input type="text" placeholder="Enter NIC number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Date of Birth:</label> */}
                                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Age:</label> */}
                                    <input type="number" placeholder="Enter age" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Blood Type:</label> */}
                                    <input type="text" placeholder="Enter blood type" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Gender:</label> */}
                                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Contact Number:</label> */}
                                    <input type="tel" placeholder="Enter contact number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-sm whitespace-nowrap">Email:</label> */}
                                    <input type="email" placeholder="Enter email" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                {/* <label className="w-40 text-sm whitespace-nowrap">Permanent Address:</label> */}
                                <textarea
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
