import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const DATA_LIST = [
    {
        name: "Dr. John Doe",
        doctor_id: "0001",
        mbbs_no: "MBBS/SL/2021/001",
        contact_no: "+94 711167153",
    },
];

const DocEdit = () => {
    const [formData, setFormData] = useState({
        name: "",
        nic: "",
        email: "",
        mbbsNo: "",
        contactNo: "",
        doctorId: "",
        dateOfJoining: "",
        ward1: "",
        ward2: "",
        specification: "",
    });

    // Preload form data from mock doctor info
    useEffect(() => {
        if (DATA_LIST.length > 0) {
            const doc = DATA_LIST[0];

            setFormData({
                name: doc.name || "",
                nic: doc.nic || "",
                email: doc.email || "",
                mbbsNo: doc.mbbs_no || "",
                contactNo: doc.contact_no || "",
                doctorId: doc.doctor_id || "",
                dateOfJoining: doc.date_of_joining || "",
                ward1: doc.ward1 || "",
                ward2: doc.ward2 || "",
                specification: doc.specification || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log("Updated Form Data: ", formData);
        alert("Changes saved!");
    };

    return (
        <>


            <div className=" overflow-y-auto max-h-[50vh] ">
                <div className="flex items-center gap-6 p-4 ">
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full ml-15 mb-3 mt-3">
                        <FaUserCircle className="text-gray-700 text-6xl justify-center items-center" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-semibold text-gray-700">
                            {formData.name}
                        </h1>
                        <p className="text-sm text-gray-400">{formData.email}</p>
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ml-10 ">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border  border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Full Name"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number</label>
                        <div className="relative">
                            <input
                                name="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                className="border  border-gray-300 rounded-lg p-3 w-full"
                                placeholder="NIC Number"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>


                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border   border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Email"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>


                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">MBBS No</label>
                        <div className="relative">
                            <input
                                name="mbbsNo"
                                value={formData.mbbsNo}
                                onChange={handleChange}
                                className="border  border-gray-300 rounded-lg p-3 w-full"
                                placeholder="MBBS No"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>


                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact No</label>
                        <div className="relative">
                            <input
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                className="border  border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Contact No"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>



                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                        <div className="relative">
                            <input
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                className="border  border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Doctor ID"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="gap-4 ml-10">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                    <input
                        name="dateOfJoining"
                        type="date"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        className="border  border-gray-300 rounded-lg p-3 w-115"
                    />
                </div>

                <div className="mb-2 mt-6 ml-10">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wards</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Ward 01 */}
                        <div className="relative">
                            <input
                                name="ward1"
                                value={formData.ward1}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Ward 01"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>

                        {/* Ward 02 */}
                        <div className="relative">
                            <input
                                name="ward2"
                                value={formData.ward2}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                placeholder="Ward 02"
                            />
                            <FaEdit className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-8 gap-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specification</label>
                    <textarea
                        name="specification"
                        value={formData.specification}
                        onChange={handleChange}
                        className="border  border-gray-300 rounded-lg p-3 w-full"
                        rows={3}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-10 w-full">
                <button className=" w-[189px] h-[50px] border px-4 py-2 rounded-full text-gray-700 cursor-pointer">
                    Back
                </button>

                <div className="flex justify-center flex-1">
                    <button
                        onClick={handleSave}
                        className="w-[189px] h-[50px] bg-green-700 text-white px-6 py-2 rounded-full cursor-pointer shadow-lg"
                    >
                        Save changes
                    </button>
                </div>

                <button className=" w-[189px] h-[50px] bg-blue-700 text-white px-6 py-2 rounded-full cursor-pointer shadow-lg">
                    Next
                </button>
            </div>

        </>
    );
};

export default DocEdit;
