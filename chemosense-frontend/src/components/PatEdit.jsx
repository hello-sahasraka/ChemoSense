import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const DATA_LIST = [
  {
    name: "Anushka Perera",
    nic: "951234567V",
    cancer_type: "Breast Cancer",
    contact_no: "+94 771234567",
    email: "anushka9555@gmail.com",
    dateOfJoining: "2022-05-20",
    ward1: "ward 01",
    ward2: "ward 02",
    specification: "Anushka is a breast cancer patient...",
  },
];

const PatEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    cancerType: "",
    contactNo: "",
    email: "",
    dateOfJoining: "",
    ward1: "",
    ward2: "",
    specification: "",
  });

  const [displayData, setDisplayData] = useState({
    name: "",
    email: "",
  });

  const [isEditable, setIsEditable] = useState({
    name: false,
    nic: false,
    cancerType: false,
    contactNo: false,
    email: false,
    dateOfJoining: false,
    ward1: false,
    ward2: false,
    specification: false,
  });

  useEffect(() => {
    if (DATA_LIST.length > 0) {
      const patient = DATA_LIST[0];
      const initialData = {
        name: patient.name || "",
        nic: patient.nic || "",
        cancerType: patient.cancer_type || "",
        contactNo: patient.contact_no || "",
        email: patient.email || "",
        dateOfJoining: patient.dateOfJoining || "",
        ward1: patient.ward1 || "",
        ward2: patient.ward2 || "",
        specification: patient.specification || "",
      };
      setFormData(initialData);
      setDisplayData({
        name: patient.name || "",
        email: patient.email || "",
      });
    }
  }, []);

  const handleEditClick = (field) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Patient Data:", formData);
    alert("Changes saved!");
    setDisplayData({
      name: formData.name,
      email: formData.email,
    });
  };

 return (
         <>
             <div className="overflow-y-auto max-h-[50vh]">
                 <div className="flex items-center gap-6 p-4">
                     <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full ml-18 mb-5 mt-3">
                         <FaUserCircle className="text-gray-700 text-6xl" />
                     </div>
 
                     <div className="flex flex-col justify-center">
                         <h1 className="text-2xl font-semibold text-gray-700">
                             {displayData.name}
                         </h1>
                         <p className="text-sm text-gray-400">{displayData.email}</p>
                     </div>
                 </div>
 

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ml-10">
          <InputField name="name" value={formData.name} editable={isEditable.name} onEdit={() => handleEditClick("name")} onChange={handleChange} placeholder="Full Name" />
          <InputField name="nic" value={formData.nic} editable={isEditable.nic} onEdit={() => handleEditClick("nic")} onChange={handleChange} placeholder="NIC Number" />
          <InputField name="email" value={formData.email} editable={isEditable.email} onEdit={() => handleEditClick("email")} onChange={handleChange} placeholder="Email" />
          <InputField name="cancerType" value={formData.cancerType} editable={isEditable.cancerType} onEdit={() => handleEditClick("cancerType")} onChange={handleChange} placeholder="Cancer Type" />
          <InputField name="contactNo" value={formData.contactNo} editable={isEditable.contactNo} onEdit={() => handleEditClick("contactNo")} onChange={handleChange} placeholder="Contact No" />
        </div>

        <div className="gap-4 ml-10 mt-4">
          <input
            name="dateOfJoining"
            type="date"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="mb-2 mt-6 ml-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="ward1" value={formData.ward1} editable={isEditable.ward1} onEdit={() => handleEditClick("ward1")} onChange={handleChange} placeholder="Ward 01" />
            <InputField name="ward2" value={formData.ward2} editable={isEditable.ward2} onEdit={() => handleEditClick("ward2")} onChange={handleChange} placeholder="Ward 02" />
          </div>
        </div>

        <div className="ml-10 mt-4 gap-4 relative">
          <textarea
            name="specification"
            placeholder="Description"
            value={formData.specification}
            onChange={handleChange}
            className={`w-full p-2 h-[175px] border rounded-md text-sm pr-6 transition duration-200 
              ${isEditable.specification ? "border-black-400" : "bg-white border-gray-300"}`}
            disabled={!isEditable.specification}
          />
          <FaEdit
            onClick={() => handleEditClick("specification")}
            className="absolute top-5 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          />
        </div>
      </div>

        <div className="flex justify-between items-center mt-10 w-full">

                <button className="w-[125px] h-[35px] border px-4 py-2 rounded-full text-gray-700 cursor-pointer flex justify-center items-center">
                    Back
                </button>

                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        className="w-[150px] h-[35px] bg-green-700 text-white px-6 py-2 rounded-full cursor-pointer shadow-lg flex justify-center items-center">
                        Save changes
                    </button>
                </div>
            </div>
        </>
    );
};

const InputField = ({ name, value, editable, onEdit, onChange, placeholder }) => (
  <div className="mb-2 relative">
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-md text-sm transition duration-200 
        ${editable ? "border-black-400" : "bg-white border-gray-300"}`}
      placeholder={placeholder}
      disabled={!editable}
    />
    <FaEdit
      onClick={onEdit}
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
    />
  </div>
);

export default PatEdit;
