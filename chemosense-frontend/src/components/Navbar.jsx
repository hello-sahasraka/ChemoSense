import React from "react";
import { FaThLarge, FaRegEdit, FaCog, FaEdit } from "react-icons/fa"; // Import Edit icon
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = () => {
    return (
        <nav className="w-[190px] h-screen bg-[#003366] text-white flex flex-col p-5 fixed left-0 top-0 shadow-lg">
            {/* Logo */}
            <div className="text-xl font-bold text-center mb-8">CHEMOSENSE</div>

            {/* Navigation Links */}
            <ul className="space-y-3">
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#0055a5]">
                    <FaThLarge className="mr-3 text-lg" />
                    Dashboard
                </li>
                <br></br>
                <li className="pb=0  mb=0">User</li>
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#0055a5]">
                    <FaRegEdit className="mr-3 text-lg" />
                    Register
                </li>
                {/* Edit Link */}
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#0055a5]">
                    <FaEdit className="mr-3 text-lg" />
                    Edit
                </li>
            </ul>

            {/* Settings (Pushes to bottom) */}
            <div className="mt-auto p-3 text-sm cursor-pointer flex items-center rounded-lg transition duration-300 hover:bg-[#0055a5]">
                <FaCog className="mr-3 text-lg" />
                Settings
            </div>
        </nav>
    );
};

export default Navbar;
