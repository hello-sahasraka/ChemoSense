import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeRouter, Routes, Route, useNavigate } from 'react-router-native';
import "../global.css";

// Screen Components
import Splashscreen from './Screens/Splashscreen';
import PatLogIn from './Screens/PatLogInScreen';
import PatDashboard from './Screens/PatDashboard';
import Notification from './Screens/Notification';
import PatEditProfile from './Screens/PatEditProfile';

// Placeholder components for Forgot Password flow
const ForgotPasswordEnterEmail = () => <View><Text>Enter Email for Password Reset</Text></View>;
const ForgotPasswordVerifyOTP = () => <View><Text>Verify OTP</Text></View>;
const ForgotPasswordResetPassword = () => <View><Text>Reset New Password</Text></View>;

// Component to handle initial navigation from Splashscreen
const SplashNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000); // 5 seconds
  
    return () => clearTimeout(timer);
  }, []);
  

  return <Splashscreen />;
};

const index = () => {
  return (
    <NativeRouter>
      <View style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<SplashNavigator />} />
          <Route path="/login" element={<PatLogIn />} />
          {/* Forgot Password Flow */}
          <Route path="/forgot-password/enter-email" element={<ForgotPasswordEnterEmail />} />
          <Route path="/forgot-password/verify-otp" element={<ForgotPasswordVerifyOTP />} />
          <Route path="/forgot-password/reset-password" element={<ForgotPasswordResetPassword />} />
          {/* Main App Flow after Login */}
          <Route path="/dashboard" element={<PatDashboard />} />
          <Route path="/dashboard/notifications" element={<Notification />} />
          <Route path="/dashboard/edit-profile" element={<PatEditProfile />} />
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default index;
