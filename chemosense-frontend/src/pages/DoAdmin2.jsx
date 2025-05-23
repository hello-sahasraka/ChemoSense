import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs , doc , getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";
import toast from "react-hot-toast";

function DoAdmin2() {
  const nextButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousFormData = location.state;

  const [formData, setFormData] = useState({
    contactNo: location.state?.contactNo || "",
    dob: location.state?.dob || "",
    specification: location.state?.specification || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, []);

  const handlePrevious = () => {
    navigate("/admin/DoAdmin1", {
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
      collection(db, "doctors"),
      where("email", "==", email)
    );
  
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty; // true if email exists
  };
  const checkIfDocIdExists = async (docId) => {
    const q = query(
      collection(db, "doctors"),
      where("doctorId", "==", docId)
    );
  
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty; // true if email exists
  };

  const checkIfMbbsExists = async (mbbsNo) => {
    const q = query(
      collection(db, "doctors"),
      where("mbbsNo", "==", mbbsNo)
    );
  
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty; // true if mbbsNo exists
  };
  const checkIfNicExists = async (nic) => {
    const q = query(
      collection(db, "doctors"),
      where("nic", "==", nic)
    );
  
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty; // true if nic exists
  };

  const handleSubmit = async () => {

    if (!validateForm()) return;
    toast.loading("Submitting...");

    const password = generatePassword();
  
    const finalData = {
      ...previousFormData,
      ...formData,
      role: "doctor",
      password: password,
    };
  
    console.log("Submitting Doctor Data:", finalData);

    

    try {
      const docId = finalData.doctorId; 
      const email = finalData.email; 
      const mbbsNo= finalData.mbbsNo;
      const nic = finalData.nic;
      
      if (await checkIfEmailExists(email)) {
        toast.dismiss();
        toast.error(`Doctor with E-mail ${email} already exists! Choose another E-mail.`);
        console.warn(`Doctor with E-mail ${email} already exists.`);
        return;
      }
      if (await checkIfDocIdExists(docId)) {
        toast.dismiss();
        toast.error(`Doctor with ID ${docId} already exists! Choose another ID.`);
        console.warn(`Doctor with ID ${docId} already exists.`);
        return;
      }
      if (await checkIfMbbsExists(mbbsNo)) {
        toast.dismiss();
        toast.error(`Doctor with MBBS Number ${mbbsNo} already exists!`);
        console.warn(`Doctor with MBBS Number ${mbbsNo} already exists.`);
        return;
      }
      if (await checkIfNicExists(nic)) {
        toast.dismiss();
        toast.error(`Doctor with NIC ${nic} already exists!`);
        console.warn(`Doctor with NIC ${nic} already exists.`);
        return;
      }

      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);

      const docRef = doc(db, "doctors", user.uid);

      //Add new document if doesn't exist
      await setDoc(docRef, finalData);
      toast.dismiss();
      toast.success("Doctor registered successfully!");

      await navigate("/admin/DoAdmin1");
    } catch (error) {
      console.error("Error adding document:", error);
      toast.dismiss();
      toast.error("Something went wrong while creating account. Please try again.");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const missingFields = [];

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required.";
      missingFields.push("Contact Number");
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required.";
      missingFields.push("Date of Birth");
    }

    if (!formData.specification.trim()) {
      newErrors.specification = "Specification is required.";
      missingFields.push("Specification");
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

  return (
    <>
      <div className="flex w-full h-full">
        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Register Title */}
          <div className="mb-9">
            <h2 className="text-[30px] font-bold">Register</h2>
            <p className="text-[12px] text-gray-700">
              We're thrilled to have you here!
            </p>
          </div>

          {/* Doctor Registration Form */}
          <h3 className="text-[20px] font-bold">Doctor Registration</h3>

          <div className="w-full h-[400px] bg-white p-6 rounded-2xl shadow-lg mt-8">
            <div className="flex flex-col justify-center gap-5 p-2 w-full h-full">
              {/* First Name & Second Name in one row */}
              <div className="flex gap-5 mb-4">
                <div className="flex items-center w-1/2">
                  {/* <label className="w-32 text-sm">Contact No:</label> */}
                  <input
                    type="tel"
                    placeholder="077-#######"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center w-1/2">
                  {/* <label className="w-32 text-sm">Date of Birth:</label> */}
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Other Fields */}
              <div className="flex items-center mb-4">
                {/* <label className="w-32 text-sm">Specification</label> */}
                <textarea
                  type="text"
                  name="specification"
                  value={formData.specification}
                  onChange={handleChange}
                  placeholder="Type here..."
                  className="w-full p-2 h-[175px] border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          {/* Button Container (Left and Right-Aligned) */}
          <div className="flex justify-between w-full absolute right-0 bottom-6">
            <button
              className="w-[125px] h-[35px] bg-gray-600 text-white rounded-full text-md outline-none focus:outline-none cursor-pointer hover:bg-gray-700"
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              ref={nextButtonRef}
              className=" w-[125px] h-[35px] bg-[#1330BE] hover:bg-[#003366] transition duration-200 text-white rounded-full text-md focus:outline-none cursor-pointer mr-0"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoAdmin2;
