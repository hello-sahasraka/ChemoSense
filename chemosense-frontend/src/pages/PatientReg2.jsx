import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { p } from "framer-motion/client";

function PatientReg2() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousFormData = location.state || {}; // fallback if no state passed

  const [formData, setFormData] = useState({
    cancerType: location.state?.cancerType || "",
    diagnosisDate: location.state?.diagnosisDate || "",
    admissionNo: location.state?.admissionNo || "",
    wardNo: location.state?.wardNo || "",
  });

  const [errors, setErrors] = useState({});

  const handlePrevious = () => {
    navigate("/admin/patientreg1", {
      state: { ...previousFormData, ...formData },
    });
  };

  function generatePassword(length = 10) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }



  const checkIfEmailExists = async (email) => {
    const q = query(
      collection(db, "patients"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // true if email exists
  };

  const checkIfNicExists = async (nic) => {
    const q = query(
      collection(db, "patients"),
      where("nic", "==", nic)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // true if nic exists
  };
  const checkIfContactExists = async (contactNumber) => {
    const q = query(
      collection(db, "patients"),
      where("contactNumber", "==", contactNumber)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // true if nic exists
  };
  const checkIfAdmissionNoExists = async (admissionNo) => {
    const q = query(
      collection(db, "patients"),
      where("admissionNo", "==", admissionNo)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // true if nic exists
  };

  const handleSubmit = async () => {
    toast.loading("Submitting...");

    const password = generatePassword();

    if (validateForm()) {
      const finalData = {
        ...previousFormData,
        ...formData,
        role: "patient",
        password: password,

      };



      console.log("Patient Combined Form Data: ", finalData);

      try {
        const email = finalData.email;
        const contactNumber = finalData.contactNumber;
        const admissionNo = finalData.admissionNo;
        const nic = finalData.nic;

        // Check if pat already exists
        // const patSnap = await getDoc(patRef);

        // if (patSnap.exists()) {
        //   toast.dismiss();
        //   toast.error(`Patient ${nic} already exists! Can't register again.`);
        //   console.warn(`Patient with NIC ${nic} already exists.`);
        //   return;
        // }

        if (await checkIfEmailExists(email)) {
          toast.dismiss();
          toast.error(`Patient with E-mail ${email} already exists! Choose another E-mail.`);
          console.warn(`Patient with E-mail ${email} already exists.`);
          return;
        }
        if (await checkIfContactExists(contactNumber)) {
          toast.dismiss();
          toast.error(`Patient with contact Number ${contactNumber} already exists!`);
          console.warn(`Patient with contact Number ${contactNumber} already exists.`);
          return;
        }
        if (await checkIfNicExists(nic)) {
          toast.dismiss();
          toast.error(`Patient with NIC ${nic} already exists!`);
          console.warn(`Patient with NIC ${nic} already exists.`);
          return;
        }
        if (await checkIfAdmissionNoExists(admissionNo)) {
          toast.dismiss();
          toast.error(`Patient with Admission Number ${admissionNo} already exists!`);
          console.warn(`Patient with Admission Number ${admissionNo} already exists.`);
          return;
        }

        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user.uid);

        const patRef = doc(db, "patients", user.uid);

        //Add new document if doesn;t exist
        await setDoc(patRef, finalData);
        toast.dismiss();
        toast.success("Patient registered successfully!");

        await navigate("/admin/PatientReg1");
      } catch (error) {
        console.error("Error adding document:", error);
        toast.dismiss();
        toast.error("Something went wrong while submitting. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const missingFields = [];

    if (!formData.cancerType.trim()) {
      newErrors.cancerType = "Type of cancer is required.";
      missingFields.push("Type of Cancer");
    }

    if (!formData.diagnosisDate.trim()) {
      newErrors.diagnosisDate = "Diagnosis date is required.";
      missingFields.push("Diagnosis Date");
    }

    if (!formData.admissionNo.trim()) {
      newErrors.admissionNo = "Admission number is required.";
      missingFields.push("Admission Number");
    }

    if (!formData.wardNo.trim()) {
      newErrors.wardNo = "Ward number is required.";
      missingFields.push("Ward Number");
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following fields:\n- ${missingFields.join("\n- ")}`
      );
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="h-full w-full">
        <div className="flex-1 relative h-full">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold">Register</h2>
            <p className="text-[12px] text-gray-700">
              We're thrilled to have you here!
            </p>
          </div>

          <h3 className="text-[20px] font-bold">Patient Registration</h3>

          {/* Emergency Contact Information */}

          <div className="w-full h-[400px]">
            {/* Medical Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-8">
              <h3 className="text-[18px] font-bold mb-4">
                Medical Information
              </h3>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-xs">Type of Cancer:</label> */}
                  <input
                    type="text"
                    name="cancerType"
                    value={formData.cancerType}
                    onChange={handleChange}
                    placeholder="Cancer type"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-xs">Diagnosis Date:</label> */}
                  <input
                    type="date"
                    name="diagnosisDate"
                    value={formData.diagnosisDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex items-center w-1/2">
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height (e.g., 170 cm)"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight (e.g., 65 kg)"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>


            </div>

            {/* Administrative Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full mt-8">
              <h3 className="text-[18px] font-bold mb-4">
                Administrative Information
              </h3>

              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-xs">Hospital Admission No:</label> */}
                  <input
                    type="text"
                    name="admissionNo"
                    value={formData.admissionNo}
                    onChange={handleChange}
                    placeholder="Registration number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-40 text-xs">Ward No:</label> */}
                  <input
                    type="text"
                    name="wardNo"
                    value={formData.wardNo}
                    onChange={handleChange}
                    placeholder="Ward number"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full absolute right-0 bottom-6">
            <div className="flex justify-between">
              <button
                className="w-[125px] h-[35px] bg-gray-600 hover:bg-gray-700 transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientReg2;
