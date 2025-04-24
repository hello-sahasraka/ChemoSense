import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminSettingsDetails = () => {
  const initial = {
    firstName: "Kane",
    lastName: "Williamson",
    email: "Kane7788@Gmail.Com",
    nic: "200014883749",
    currentPassword: "password123",
    newPassword: "",
  };

  const [form, setForm] = useState(initial);
  const [editable, setEditable] = useState({
    firstName: false,
    lastName: false,
    email: false,
    nic: false,
  });
  const [showPwd, setShowPwd] = useState({ current: false, new: false });

  const toggleEdit = (field) =>
    setEditable((e) => ({ ...e, [field]: !e[field] }));
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const toggleShow = (which) =>
    setShowPwd((s) => ({ ...s, [which]: !s[which] }));
  const handleSave = () => {
    console.log("Saved:", form);
    alert("Profile updated!");
    setEditable({
      firstName: false,
      lastName: false,
      email: false,
      nic: false,
    });
  };

  return (
    <>
      {/* Header inside the white box from AdminSettings */}
      <div className="flex items-center mb-8">
        <FaUserCircle className="text-6xl text-gray-400" />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {form.firstName} {form.lastName}
          </h2>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField
          label="First Name"
          name="firstName"
          value={form.firstName}
          editable={editable.firstName}
          onEdit={() => toggleEdit("firstName")}
          onChange={handleChange}
        />
        <FormField
          label="Second Name"
          name="lastName"
          value={form.lastName}
          editable={editable.lastName}
          onEdit={() => toggleEdit("lastName")}
          onChange={handleChange}
        />
        <FormField
          label="E‑mail"
          name="email"
          value={form.email}
          editable={editable.email}
          onEdit={() => toggleEdit("email")}
          onChange={handleChange}
        />
        <FormField
          label="NIC"
          name="nic"
          value={form.nic}
          editable={editable.nic}
          onEdit={() => toggleEdit("nic")}
          onChange={handleChange}
        />
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          show={showPwd.current}
          onToggle={() => toggleShow("current")}
          onChange={handleChange}
        />
        <PasswordField
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          show={showPwd.new}
          onToggle={() => toggleShow("new")}
          onChange={handleChange}
        />
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#1330BE] text-white px-6 py-2 rounded-full  hover:bg-[#1330BE] transition font-semibold text-lg shadow-[0_10px_20px_rgba(0,0,139,0.3)] hover:shadow-[0_10px_25px_rgba(0,0,139,0.4)]"
        >
          Save changes
        </button>
      </div>
    </>
  );
};

const FormField = ({ label, name, value, editable, onEdit, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      disabled={!editable}
      onChange={onChange}
      className={`w-full p-3 rounded-lg text-gray-900 placeholder-gray-400 ${
        editable ? "border border-gray-400" : "bg-gray-100 border-none"
      }`}
    />
    <FaEdit
      onClick={onEdit}
      className="absolute top-9 right-3 text-gray-500 cursor-pointer"
    />
  </div>
);

const PasswordField = ({ label, name, value, show, onToggle, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg bg-gray-100 placeholder-gray-400 border-none"
    />
    {show ? (
      <FaEyeSlash
        onClick={onToggle}
        className="absolute top-9 right-3 text-gray-500 cursor-pointer"
      />
    ) : (
      <FaEye
        onClick={onToggle}
        className="absolute top-9 right-3 text-gray-500 cursor-pointer"
      />
    )}
  </div>
);

export default AdminSettingsDetails;
