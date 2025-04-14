import React from "react";
import Login from "./pages/Login";
import DoAdmin1 from "./pages/DoAdmin1";
import DoAdmin2 from "./pages/DoAdmin2";
import AdminDashboard from "./pages/AdminDashboard";
import PatientReg1 from "./pages/PatientReg1";
import PatientReg2 from "./pages/PatientReg2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminEdit from "./pages/Admin/AdminEdit";
import AdminEditDoctor from "./pages/Admin/AdminEditDoctor";
import AdminEditPatient from "./pages/Admin/AdminEditPatient";
import AdminEditSingleDoc from "./pages/Admin/AdminEditSingleDoc";
import AdminEditSinglePat from "./pages/Admin/AdminEditSinglePat";




function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>

            {/* Admin User Resgistration */}
            <Route index element={<DoAdmin1 />} />
            <Route path="DoAdmin1" element={<DoAdmin1 />} />
            <Route path="DoAdmin2" element={<DoAdmin2 />} />
            <Route path="patientreg1" element={<PatientReg1 />} />
            <Route path="patientreg2" element={<PatientReg2 />} />


            {/* Admin Edit */}
            <Route path="edit" element={<AdminEdit />}>
              <Route index element={<AdminEditDoctor />} />
              <Route path="doctorlist" element={<AdminEditDoctor />} />
              <Route path="patientlist" element={<AdminEditPatient />} />
              <Route path="doctorlist/:id" element={<AdminEditSingleDoc />} />
              <Route path="patientlist/:id" element={<AdminEditSinglePat />} />
            </Route>
          </Route>
          <Route path="*" element={<h1 className="text-[50px] flex justify-center items-center w-full h-screen ">Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
