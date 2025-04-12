import React from "react";
import { FaThLarge, FaRegEdit, FaCog, FaEdit } from "react-icons/fa"; // Import Edit icon
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = () => {
    return (
        <nav className="w-[250px] h-screen bg-[#1330BE] text-white flex flex-col p-5 fixed left-0 top-0 shadow-lg">
            {/* Logo */}
            <div className="text-xl font-bold text-center my-8">CHEMOSENSE</div>

            {/* Navigation Links */}
            <ul className="space-y-3">
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#003366]">
                    <FaThLarge className="mr-3 text-lg" />
                    Dashboard
                </li>
                <br></br>
                <li className="pb=0  mb=0">User</li>
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#003366]">
                    <FaRegEdit className="mr-3 text-lg" />
                    <Link to="/admin">Register</Link>
                </li>
                {/* Edit Link */}
                <li className="flex items-center p-3 text-sm cursor-pointer rounded-lg transition duration-300 hover:bg-[#003366]">
                    <FaEdit className="mr-3 text-lg" />
                    Edit
                </li>
            </ul>

            {/* Settings (Pushes to bottom) */}
            <div className="mt-auto p-3 text-sm cursor-pointer flex items-center rounded-lg transition duration-300 hover:bg-[#003366]">
                <FaCog className="mr-3 text-lg" />
                Settings
            </div>
        </nav>
    );
};

export default Navbar;
