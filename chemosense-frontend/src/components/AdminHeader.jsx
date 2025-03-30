import React from "react";


const AdminHeader = () => {
    return (
        <header className="ml-[177px] flex justify-between items-center pl-[5%] px-5 py-3 bg-white border-b-2 border-gray-200 shadow-md">
            {/* Admin Info */}
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-black text-white flex justify-center items-center font-bold rounded-full text-sm">
                    AN
                </div>
                {/* Admin Name & ID */}
                <div>
                    <h2 className="m-0 text-sm font-bold">Admin Name</h2>
                    <p className="m-0 text-xs text-gray-500">#Admin-ID</p>
                </div>
            </div>

            {/* Logout Button */}
            <button className="bg-[#003366] text-white border-none px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition duration-300 hover:bg-[#0033cc]">
                LogOut
            </button>
        </header>
    );
};

export default AdminHeader;