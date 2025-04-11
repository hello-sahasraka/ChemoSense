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
        navigate("/admin/DoAdmin1");
    };

    const handleNext = () => {
        navigate("/DoAdmin3"); // Ensure DoAdmin3 exists
    };

    return (
        <>
            <div className="flex w-full h-full">
                {/* Main Content */}
                <div className="flex-1 relative">
                    {/* Register Title */}
                    <div className="mb-9">
                        <h2 className="text-[30px] font-bold">Register</h2>
                        <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
                    </div>

                    {/* Doctor Registration Form */}
                    <h3 className="text-[20px] font-bold">Doctor Registration</h3>
                    
                    <div className="w-full h-[400px] bg-white p-6 rounded-2xl shadow-lg mt-8">
                        <div className="flex flex-col justify-center gap-5 p-2 w-full h-full">
                                {/* First Name & Second Name in one row */}
                        <div className="flex gap-5 mb-4">
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-32 text-sm">Contact No:</label> */}
                                <input
                                    type="tel"
                                    placeholder="077-#######"
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div className="flex items-center w-1/2">
                                {/* <label className="w-32 text-sm">Date of Birth:</label> */}
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>

                        {/* Other Fields */}
                        <div className="flex items-center mb-4">
                            {/* <label className="w-32 text-sm">Specification</label> */}
                            <textarea
                                type="text"
                                placeholder="Type here..."
                                className="w-full p-2 h-[175px] border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                        </div>
                    </div>

                    {/* Button Container (Left and Right-Aligned) */}
                    <div className="flex justify-between w-full absolute right-0 bottom-6">
                        <button
                            className="w-[125px] h-[35px] bg-gray-600 text-white rounded-full text-md outline-none focus:outline-none cursor-pointer hover:bg-gray-700"
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>

                        <button
                            ref={nextButtonRef}
                            className=" w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
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
