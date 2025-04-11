import React from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientReg2() {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate("/admin/patientreg1");
    };

    const handleNext = () => {
        navigate("/PatientReg3"); // Ensure PatientReg3 exists
    };

    return (
        <>
            <div className="h-full w-full">
                <div className="flex-1 relative h-full">
                    <div className="mb-8">
                        <h2 className="text-[30px] font-bold">Register</h2>
                        <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
                    </div>

                    <h3 className="text-[20px] font-bold">Patient Registration</h3>

                    {/* Emergency Contact Information */}
                    
                    <div className="w-full h-[400px]">
                        {/* Medical Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-8">
                        <h3 className="text-[18px] font-bold mb-4">Medical Information</h3>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-40 text-xs">Type of Cancer:</label> */}
                                <input type="text" placeholder="Cancer type" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-40 text-xs">Diagnosis Date:</label> */}
                                <input type="date" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Administrative Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-8">
                        <h3 className="text-[18px] font-bold mb-4">Administrative Information</h3>

                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-40 text-xs">Hospital Admission No:</label> */}
                                <input type="text" placeholder="Registration number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-40 text-xs">Ward No:</label> */}
                                <input type="text" placeholder="Ward number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="w-full absolute right-0 bottom-6">
                        <div className="flex justify-between">
                            <button className="w-[125px] h-[35px] bg-gray-600 hover:bg-gray-700 transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0" onClick={handlePrevious}>
                                Previous
                            </button>
                            <button type="submit" className="w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0" onClick={handleNext}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientReg2;
