import React, { useState, useEffect } from "react";
import SubHeader from "../../components/Doctor/SubHeader";
import { FaEdit, FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../utils/Auth";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";

const DocSettings = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mbbsNo: "",
    currentPassword: "",
    newPassword: "",
    contactNo: "",
    joiningDate: "",
    ward1: "",
    ward2: "",
    specification: "",
  });
  const [editable, setEditable] = useState({});
  const [showPwd, setShowPwd] = useState({ current: false, new: false });
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchDoctorData = async () => {
      console.log("Current user:", user);
      if (user && user.uid) {
        try {
          const docRef = doc(db, "doctors", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData(data);
            const name = data.fullName?.replace("Dr. ", "");
            setForm((prev) => ({
              ...prev,
              ...data,
              firstName: name?.split(" ")[0] || "",
              lastName: name?.split(" ")[1] || "",
              ward1: data.wards?.[0] || "",
              ward2: data.wards?.[1] || "",
            }));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          toast.error("Failed to fetch doctor data.");
        }
      }
    };

    fetchDoctorData();
  }, [user]);

  const toggleEdit = (field) =>
    setEditable((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (which) =>
    setShowPwd((prev) => ({ ...prev, [which]: !prev[which] }));

  const handleSave = async () => {
    if (!user?.uid) return;

    const { newPassword, currentPassword, ...profileData } = form;
    const docRef = doc(db, "doctors", user.uid);

    try {
      const { ward1, ward2, ...restOfProfileData } = profileData;
      await updateDoc(docRef, {
        ...restOfProfileData,
        fullName: `Dr. ${form.firstName} ${form.lastName}`,
        wards: [form.ward1, form.ward2],
      });

      if (newPassword && currentPassword) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        toast.success("Password updated successfully!");
      }

      toast.success("Profile updated successfully!");
      setEditable({});
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <SubHeader stype="Settings" />

      {/* White panel container */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg w-full max-h-[450px] overflow-y-auto">
        {/* Avatar & Title (Profile Settings) */}
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-6xl text-gray-400" />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-gray-700 capitalize">
              Dr. {profileData.fullName}
            </h2>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FormField
            label="First Name"
            name="firstName"
            value={form.firstName}
            editable={editable.firstName}
            onEdit={() => toggleEdit("firstName")}
            onChange={handleChange}
          />
          <FormField
            label="Last Name"
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
            label="MBBS No"
            name="mbbsNo"
            value={form.mbbsNo}
            editable={editable.mbbsNo}
            onEdit={() => toggleEdit("mbbsNo")}
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

          <FormField
            label="Contact No"
            name="contactNo"
            value={form.contactNo}
            editable={editable.contactNo}
            onEdit={() => toggleEdit("contactNo")}
            onChange={handleChange}
          />
          <FormField
            label="Date of Joining"
            name="joiningDate"
            value={form.joiningDate}
            editable={editable.joiningDate}
            onEdit={() => toggleEdit("joiningDate")}
            onChange={handleChange}
          />
          <FormField
            label="Ward"
            name="ward1"
            value={form.ward1}
            editable={editable.ward1}
            onEdit={() => toggleEdit("ward1")}
            onChange={handleChange}
          />
          <FormField
            label="Ward"
            name="ward2"
            value={form.ward2}
            editable={editable.ward2}
            onEdit={() => toggleEdit("ward2")}
            onChange={handleChange}
          />
          <TextAreaField
            label="Specification"
            name="specification"
            value={form.specification}
            editable={editable.specification}
            onEdit={() => toggleEdit("specification")}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Save button outside panel */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 transition font-semibold text-sm shadow-[0_10px_20px_rgba(0,0,139,0.3)] hover:shadow-[0_10px_25px_rgba(0,0,139,0.4)]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, editable, onEdit, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        className={`w-full p-3 pr-10 rounded-lg text-gray-900 placeholder-gray-400 ${
          editable ? "border border-gray-400" : "bg-gray-100 border-none"
        }`}
      />
      <FaEdit
        onClick={onEdit}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      />
    </div>
  </div>
);

const PasswordField = ({ label, name, value, show, onToggle, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        disabled={!show && name === "currentPassword"}
        onChange={onChange}
        className="w-full p-3 pr-10 rounded-lg bg-gray-100 placeholder-gray-400 border-none"
      />
      <span
        onClick={onToggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>
);

const TextAreaField = ({ label, name, value, editable, onEdit, onChange }) => (
  <div className="relative md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <textarea
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        rows={4}
        className={`w-full p-3 pr-10 rounded-lg text-gray-900 placeholder-gray-400 ${
          editable ? "border border-gray-400" : "bg-gray-100 border-none"
        }`}
      />
      <FaEdit
        onClick={onEdit}
        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
      />
    </div>
  </div>
);

export default DocSettings;
