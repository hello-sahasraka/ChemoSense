import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminHeader from "../components/AdminHeader";

function DoAdmin1() {
    const [formType, setFormType] = useState("doctor"); // "doctor" or "patient"
    const [newWard, setNewWard] = useState("");
    const [wards, setWards] = useState([]);
    const navigate = useNavigate();
    const nextButtonRef = useRef(null);

    useEffect(() => {
        if (nextButtonRef.current) {
            nextButtonRef.current.focus();
        }
    }, []);

    const handleNext = () => {
        navigate("/DoAdmin2");
    };

    const handleFormChange = (e) => {
        const selectedForm = e.target.value;
        setFormType(selectedForm);

        if (selectedForm === "patient") {
            navigate("/PatientReg1"); // Navigate to PatientReg1 immediately
        }
    };

    const removeWard = (wardToRemove) => {
        setWards(wards.filter((ward) => ward !== wardToRemove));
    };

    const addWard = (e) => {
        if (e.key === "Enter" && newWard.trim() !== "" && !wards.includes(newWard)) {
            setWards([...wards, newWard]);
            setNewWard(""); // Clear input after adding
        }
    };

    return (
        <>
            <Navbar />
            <AdminHeader />
            <div className="flex h-screen bg-gray-100 pl-[220px]">
                <div className="flex-1 p-10">
                    <h2 className="text-[30px] font-bold mb-2">Register</h2>

                    <div className="flex items-center gap-4">
                        <h3 className="text-[24px] font-bold">Doctor Registration</h3>
                        <div className="relative w-[250px]">
                            <select
                                className="p-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none 
                   focus:ring-2 focus:ring-red-400 transition-all duration-200 appearance-none 
                   cursor-pointer hover:bg-red-700"
                                value={formType}
                                onChange={handleFormChange}
                            >
                                <option value="doctor" className="text-black bg-white hover:bg-blue-500 cursor-pointer">Doctor Registration</option>
                                <option value="patient" className="text-black bg-white hover:bg-blue-500 cursor-pointer">Patient Registration</option>
                            </select>
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white pr-3">▼</span>
                        </div>

                    </div>

                    <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>

                    {formType === "doctor" && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] mt-5">
                            <div className="flex gap-5 mb-4">
                                <div className="flex items-center w-1/2">
                                    <label className="w-32 text-sm">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <label className="w-32 text-sm">Second Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Second Name"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="w-32 text-sm">MBBS No:</label>
                                <input type="text" placeholder="MBBS No" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-32 text-sm">Doctor ID:</label>
                                <input type="text" placeholder="Doctor ID" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-32 text-sm">E-Mail:</label>
                                <input type="email" placeholder="E-mail" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>



                            <div className="flex items-center mb-4">
                                <label className="w-32 text-sm">Ward:</label>
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
                    )}

                    <div className="flex justify-end mt-6 pr-6">
                        <button
                            ref={nextButtonRef}
                            className="w-[200px] h-[46px] bg-blue-900 text-white rounded-full text-lg outline-none focus:outline-none cursor-pointer mr-20"
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
