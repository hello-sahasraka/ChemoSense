import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PatientReg2() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cancerType: "",
        diagnosisDate: "",
        admissionNo: "",
        wardNo: ""
    });

    const [errors, setErrors] = useState({});

    const handlePrevious = () => {
        navigate("/admin/patientreg1");
    };

    const handleNext = () => {
        if (validateForm()) {
            navigate("/PatientReg3"); // Ensure PatientReg3 exists
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const missingFields = [];

        if (!formData.cancerType.trim()) {
            newErrors.cancerType = "Type of cancer is required.";
            missingFields.push("Type of Cancer");
        }

        if (!formData.diagnosisDate.trim()) {
            newErrors.diagnosisDate = "Diagnosis date is required.";
            missingFields.push("Diagnosis Date");
        }

        if (!formData.admissionNo.trim()) {
            newErrors.admissionNo = "Admission number is required.";
            missingFields.push("Admission Number");
        }

        if (!formData.wardNo.trim()) {
            newErrors.wardNo = "Ward number is required.";
            missingFields.push("Ward Number");
        }

        setErrors(newErrors);

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields:\n- ${missingFields.join("\n- ")}`);
            return false;
        }

        return true;
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
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
                                    <input type="text" name="cancerType"
                                        value={formData.cancerType}
                                        onChange={handleChange} placeholder="Cancer type" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-xs">Diagnosis Date:</label> */}
                                    <input type="date" name="diagnosisDate"
                                        value={formData.diagnosisDate}
                                        onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Administrative Information */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-8">
                            <h3 className="text-[18px] font-bold mb-4">Administrative Information</h3>

                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-xs">Hospital Admission No:</label> */}
                                    <input type="text" name="hospitalAdmissionNo"
                                        value={formData.hospitalAdmissionNo}
                                        onChange={handleChange} placeholder="Registration number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div className="flex items-center w-1/2">
                                    {/* <label className="w-40 text-xs">Ward No:</label> */}
                                    <input type="text" name="wardNo"
                                        value={formData.wardNo}
                                        onChange={handleChange} placeholder="Ward number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
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
