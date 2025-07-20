import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { id } from "date-fns/locale";

const AuthContext = createContext(null);

async function getUserRole(uid) {
  // Check if user exists in patients
  const adminRef = doc(db, "admin", uid);
  const adminSnap = await getDoc(adminRef);

  if (adminSnap.exists()) {
    console.log("admin data:", adminSnap.data());
    return { role: "admin", data: adminSnap.data() };
  }

  // Check if user exists in doctors
  const doctorRef = doc(db, "doctors", uid);
  const doctorSnap = await getDoc(doctorRef);

  if (doctorSnap.exists()) {
    console.log("Doctor data:", doctorSnap.data());
    return { role: "doctor", data: doctorSnap.data() };
  }

  console.warn("User not found in either collection!");
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const token = await user.getIdToken();
      const userData = await getUserRole(uid);

      if (!userData) {
        toast.error(`User not found!`);
        return null;
      }
      // Optionally, store token in localStorage or cookie
      localStorage.setItem("token", token);

      const userPayload = {
        uid: user.uid,
        email: userData.data.email,
        role: userData.role,
        fullName: userData.data.fullName,
        id: userData.data.doctorId || userData.data.adminId,
      };
      localStorage.setItem("user", JSON.stringify(userPayload));
      setUser(userPayload);
      toast.success(`Login successful!`);
      return userData.role;
    } catch (error) {
      toast.error(`Invalid email or password`);
      return null;
    }
  };

  const logout = (navigate) => {
    const auth = getAuth();
    auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
