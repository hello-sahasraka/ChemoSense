import React, { useEffect } from "react";
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
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDetails from "./pages/Doctor/PatientDetails";
import DocDetailsSinglePat from "./pages/Doctor/DocDetailsSinglePat";
import DocSettings from "./pages/Doctor/DocSettings";
import SubHeader from "./components/Doctor/SubHeader";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminSettingsDetails from "./pages/Admin/AdminSettingsDetails";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/Auth";
import ProtectedRoute from "./utils/ProtectedRoute";
import Notification from "./pages/Doctor/Notification";
import Appointments from "./pages/Doctor/Appointments";
import DashboardContent from "./pages/Admin/dashboardContent";
import DoctorDashboardContent from "./pages/Doctor/DoctorDashboardContent";
import { requestPermissionAndGetToken, messaging } from "./config/firebase";
import { onMessage } from "firebase/messaging";

function App() {
  useEffect(() => {
      requestPermissionAndGetToken();
      // handleForegroundMessage(); 
      onMessage(messaging, (payload) => {
          console.log("📬 Foreground message received:", payload);

          const notificationData = payload.notification || {};
          const dataPayload = payload.data || {};

          let notificationArray = JSON.parse(localStorage.getItem('notifications')) || [];
          notificationArray.push(dataPayload);
          localStorage.setItem('notifications', JSON.stringify(notificationArray));

          const title = notificationData.title  || "No Title";
          const body = notificationData.body  || "Empty";
          const image = notificationData.image || null;

          const name = dataPayload.name || "Anonymous";
          const patient_id = dataPayload.patient_id || "Unknown";
          const contactNumber = dataPayload.contactNumber || "No Contact";

          // Background Notification Data
          console.log("🔔 Notification Details:");
          console.log("• Title:", title);
          console.log("• Text:", body);
          if (image) console.log("• Image URL:", image);
          else console.log("• Image: None");

          // Foreground Notification Data
          console.log("📬 Foreground message received:");
          console.log("• Patient ID:", patient_id);
          console.log("• Name:", name);
          console.log("• Contact No:", contactNumber);

          // Show notification if permission is granted
          if (Notification.permission === 'granted') {
            new Notification(title, {
              body: `${body}\nFrom: ${name}`,
              icon: image || undefined
            });
        }
        });
    }, []);
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route
                index
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DashboardContent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DashboardContent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="DoAdmin1"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DoAdmin1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="DoAdmin2"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DoAdmin2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="patientreg1"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <PatientReg1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="patientreg2"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <PatientReg2 />
                  </ProtectedRoute>
                }
              />

              {/* Admin Edit */}
              <Route path="edit" element={<AdminEdit />}>
                <Route
                  index
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminEditDoctor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="doctorlist"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminEditDoctor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="patientlist"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminEditPatient />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="doctorlist/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminEditSingleDoc />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="patientlist/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminEditSinglePat />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Admin Settings */}
              <Route path="settings" element={<AdminSettings />}>
                <Route
                  index
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminSettingsDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="details"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminSettingsDetails />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>

            {/* Doctor Dashboard */}
            <Route path="/doctor" element={<DoctorDashboard />}>
              <Route
                index
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorDashboardContent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorDashboardContent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="details"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <PatientDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="details/:nic"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DocDetailsSinglePat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notification"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <Notification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="appointments"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute allowedRoles={["doctor"]}>
                    <DocSettings />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <h1 className="text-[50px] flex justify-center items-center w-full h-screen">
                  Error 404
                </h1>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
