import React from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientReg2() {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate("/PatientReg1");
    };

    const handleNext = () => {
        navigate("/PatientReg3"); // Ensure PatientReg3 exists
    };

    return (
        <>
            <AdminHeader />
            <Navbar />
            <div className="min-h-screen bg-gray-100 pl-[220px]">
                <div className="flex-1 p-10">
                    <h2 className="text-[30px] font-bold mb-2">Register</h2>

                    <h3 className="text-[24px] font-bold">Patient Registration</h3>
                    <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>

                    {/* Emergency Contact Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] mt-5">
                        <h3 className="text-[22px] font-bold mb-4">Emergency Contact Information</h3>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Guardian Name:</label>
                                <input type="text" placeholder="Enter full name" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Relationship:</label>
                                <input type="text" placeholder="Enter relationship" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Contact Number:</label>
                                <input type="tel" placeholder="Enter phone number" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Address:</label>
                                <input type="text" placeholder="Enter address" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Medical Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] mt-5">
                        <h3 className="text-[22px] font-bold mb-4">Medical Information</h3>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Type of Cancer:</label>
                                <input type="text" placeholder="Enter type" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Diagnosis Date:</label>
                                <input type="date" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Administrative Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] mt-5">
                        <h3 className="text-[22px] font-bold mb-4">Administrative Information</h3>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Hospital Admission No:</label>
                                <input type="text" placeholder="Enter number" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                <label className="w-40 text-xs">Ward No:</label>
                                <input type="text" placeholder="Enter ward number" className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button className="w-50 h-12 bg-gray-600 text-white rounded-full hover:bg-gray-700" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button className="w-50 h-12 bg-blue-900 text-white rounded-full hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientReg2;
