import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientReg1() {
    const [formType, setFormType] = useState("patient"); // Default to Patient Registration
    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/PatientReg2");
    };

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setFormType(selectedValue);

        // Navigate to DoAdmin1 if "doctor" is selected
        if (selectedValue === "doctor") {
            navigate("/DoAdmin1");
        }
    };

    return (
        <>
            <AdminHeader />
            <Navbar />
            <div className="min-h-screen bg-gray-100 pl-[220px]">
                <div className="flex-1 p-10">
                    <h2 className="text-[30px] font-bold mb-2">Register</h2>

                    <div className="flex items-center gap-4">
                        <h3 className="text-[24px] font-bold">
                            {formType === "doctor" ? "Doctor Registration" : "Patient Registration"}
                        </h3>
                        <div className="relative w-[250px]">
                            <select
                                className="p-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 appearance-none cursor-pointer hover:red-700"
                                value={formType}
                                onChange={handleDropdownChange} // Call the function here
                            >
                                <option value="doctor" className="text-black bg-white" >Doctor Registration</option>
                                <option value="patient" className="text-black bg-white" >Patient Registration</option>
                            </select>
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white pr-3">▼</span>
                        </div>
                    </div>

                    <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>

                    {/* Patient Registration Form */}
                    {formType === "patient" && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[1000px] mt-5">
                            <h3 className="text-[22px] font-bold mb-4">Personal Information</h3>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Full Name:</label>
                                    <input type="text" placeholder="Enter full name" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">NIC Number:</label>
                                    <input type="text" placeholder="Enter NIC number" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Date of Birth:</label>
                                    <input type="date" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Age:</label>
                                    <input type="number" placeholder="Enter age" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Blood Type:</label>
                                    <input type="text" placeholder="Enter blood type" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Gender:</label>
                                    <select className="w-full p-3 h-14 border border-gray-300 rounded-md text-sm">
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Contact Number:</label>
                                    <input type="tel" placeholder="Enter contact number" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <label className="w-40 text-sm whitespace-nowrap">Email:</label>
                                    <input type="email" placeholder="Enter email" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="w-40 text-sm whitespace-nowrap">Permanent Address:</label>
                                <textarea
                                    placeholder="Enter your address"
                                    className="w-full p-4 border border-gray-300 rounded-md text-sm resize-none"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {/* Next Button - Placed outside the form box */}
                    <div className="flex justify-end mt-6 pr-6 pb-9">
                        <button
                            className="w-[200px] h-[46px] bg-blue-900 text-white rounded-full text-lg cursor-pointer"
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
