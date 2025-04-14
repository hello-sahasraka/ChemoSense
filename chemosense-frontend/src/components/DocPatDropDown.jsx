import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const DocPatDropDown = () => {
    const [formType, setFormType] = useState("doctor");
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        const value = e.target.value;
        setFormType(value);
        if (value === "patient") {
            navigate("/admin/edit/patientlist");
        } else {
            navigate("/admin/edit/doctorlist");
        }
  };




  return (
    <div className="flex items-center gap-8">
        <div className="relative w-[125px]">
                <select
                className="py-2 px-3 w-full rounded-md text-sm bg-red-600 text-white border-none focus:outline-none 
                           focus:ring-1 focus:ring-red-400 transition-all duration-200 appearance-none 
                           cursor-pointer hover:bg-red-700 shadow-red-500 shadow-[0_0_3px_rgba(251,44,54,0.20)]"
                value={formType}
                onChange={handleFormChange}
                            >
                    <option value="doctor" className="text-black bg-white hover:bg-blue-600 transition-all duration-200 cursor-pointer font-semibold">Doctor</option>
                    <option value="patient" className="text-black bg-white hover:bg-blue-600 transition-all duration-200 cursor-pointer font-semibold">Patient</option>
                </select>
                <span className="absolute inset-y-3 right-6 flex items-center pointer-events-none text-white">▼</span>
        </div>

    </div>
  )
}

export default DocPatDropDown