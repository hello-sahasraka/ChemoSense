import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";



const DocHeader = () => {
    const [doctorName, setDoctorName] = useState("Doctor Name");
    const [doctorId, setDoctorId] = useState("Doctor ID");

    useEffect(() => {
        const doctor = JSON.parse(localStorage.getItem('user'));
        if (doctor) {
            setDoctorName(doctor.fullName);
            setDoctorId(doctor.id);
        }
    }, []);

    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await auth.logout(navigate);  
    };

    return (
        <header className="h-[65px] absolute right-0 top-0 flex justify-center border-b-2 border-gray-200 shadow-lx" style={{ width: "calc(100% - 250px)" }}>
            <div className="w-5/6 h-full flex justify-between items-center ">
                {/* Admin Info */}
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <IoPersonCircleOutline size={45} />
                {/* Admin Name & ID */}
                <div>
                    <h2 className="m-0 text-sm font-bold italic">Dr. {doctorName}</h2>
                    <p className="m-0 text-xs text-gray-500 italic">#{doctorId}</p>
                </div>
            </div>

            {/* Logout Button */}
            <button className="bg-[#1330BE] text-white border-none px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition duration-300 hover:bg-[#003366]"
            onClick={handleLogout}
            >
                LogOut
            </button>

            </div>
        </header>
    );
};

export default DocHeader;