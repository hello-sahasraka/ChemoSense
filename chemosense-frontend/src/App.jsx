import React from "react";
import Login from "./pages/Login";
import DoAdmin1 from "./pages/DoAdmin1";
import DoAdmin2 from "./pages/DoAdmin2";
import AdminDashboard from "./pages/AdminDashboard";
import PatientReg1 from "./pages/PatientReg1";
import PatientReg2 from "./pages/PatientReg2";
import { BrowserRouter, Route, Routes } from "react-router-dom";




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DoAdmin1 />} />
            <Route path="DoAdmin1" element={<DoAdmin1 />} />
            <Route path="DoAdmin2" element={<DoAdmin2 />} />
            <Route path="patientreg1" element={<PatientReg1 />} />
            <Route path="patientreg2" element={<PatientReg2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
