import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function DoAdmin2() {
    const nextButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (nextButtonRef.current) {
            nextButtonRef.current.focus();
        }
    }, []);

    const handlePrevious = () => {
        navigate("/DoAdmin1");
    };

    const handleNext = () => {
        navigate("/DoAdmin3"); // Ensure DoAdmin3 exists
    };

    return (
        <>
            <Navbar />
            <AdminHeader />
            <div className="flex h-screen bg-gray-100 pl-[220px]">
                {/* Main Content */}
                <div className="flex-1 p-10">
                    {/* Register Title */}
                    <h2 className="text-[30px] font-bold mb-2">Register</h2>

                    {/* Doctor Registration Form */}
                    <h3 className="text-[24px] font-bold">Doctor Registration</h3>
                    <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>

                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] mt-5">
                        {/* First Name & Second Name in one row */}
                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                <label className="w-32 text-sm">Contact No:</label>
                                <input
                                    type="tel"
                                    placeholder="077-#######"
                                    className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div className="flex items-center w-1/2">
                                <label className="w-32 text-sm">Date of Birth:</label>
                                <input
                                    type="date"
                                    className="w-full p-2 h-14 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>

                        {/* Other Fields */}
                        <div className="flex items-center mb-4">
                            <label className="w-32 text-sm">Specification</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="w-full p-4 h-20 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                    </div>

                    {/* Button Container (Left and Right-Aligned) */}
                    <div className="flex justify-between mt-30 px-6">
                        <button
                            className="w-[200px] h-[46px] bg-gray-600 text-white rounded-full text-lg outline-none focus:outline-none cursor-pointer hover:bg-gray-700"
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>

                        <button
                            ref={nextButtonRef}
                            className="w-[200px] h-[46px] bg-blue-900 text-white rounded-full text-lg outline-none focus:outline-none cursor-pointer"
                            onClick={handleNext}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoAdmin2;
