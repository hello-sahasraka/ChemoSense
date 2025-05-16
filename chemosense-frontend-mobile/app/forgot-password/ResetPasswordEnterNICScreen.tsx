import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;

// Placeholder for Close icon
const CloseIcon = () => (
  <StyledText className="text-black text-2xl font-bold">X</StyledText>
);

const ResetPasswordEnterNICScreen: React.FC = () => {
  const [nic, setNic] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleContinue = () => {
    if (!nic || !phoneNumber) {
      setError("NIC and Phone number are required.");
      return;
    }
    setError("");
    // Navigate to the next screen (Verify Code)
    router.push("/forgot-password/ResetPasswordVerifyCodeScreen");
    console.log("Continue with:", { nic, phoneNumber });
  };

  const handleClose = () => {
    // Navigate back to login or previous screen
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/PatLogIn"); // Fallback to login
    }
  };

  return (
    <StyledView className="flex-1 bg-gray-100 p-6 items-center justify-center">
      <StatusBar style="light" backgroundColor="#F3F4F6" />
      <StyledTouchableOpacity
        onPress={handleClose}
        className="absolute top-16 right-6 z-10"
      >
        <CloseIcon />
      </StyledTouchableOpacity>

      <StyledText
        style={{
          color: "#1330BE",
          marginTop: -100,
          marginBottom: 240,
          position: "fixed",
        }}
        className="text-3xl font-bold text-center mb-10 "
      >
        Reset your password
      </StyledText>

      {error ? (
        <StyledText className="text-red-500 text-center mb-4">
          {error}
        </StyledText>
      ) : null}

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-5 text-base w-full"
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
        placeholderTextColor="#9CA3AF"
      />

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-8 text-base w-full"
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#9CA3AF"
      />

      <StyledTouchableOpacity
        className=" p-4 rounded-lg items-center w-full mt-10"
        style={{ backgroundColor: "#1330BE", width: 220, height: 50 }}
        onPress={handleContinue}
      >
        <StyledText className="text-white text-lg font-bold">
          Continue
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordEnterNICScreen;
