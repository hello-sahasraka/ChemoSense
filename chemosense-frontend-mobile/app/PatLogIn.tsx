import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Cannot install package, "Remember Me" functionality not implemented.

const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;
const StyledImage = Image;

const Logo = () => (
  <StyledImage
    source={require("../assets/images/HeartLogo 1.png")}
    className="w-24 h-24 self-center mb-6"
    resizeMode="contain"
  />
);

const EyeIcon = () => (
  <StyledText className="text-gray-500 text-lg">👁️</StyledText>
);

const PatLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Logged in as:", user.email);
      // TODO: Implement remember me logic here
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      <StatusBar style="light" backgroundColor="#1330BE" />
      {/* Top Blue Section */}
      <StyledView
        style={{ backgroundColor: "#1330BE" }}
        className="h-1/3 items-center justify-center rounded-b-3xl "
      >
        <Logo />
      </StyledView>

      {/* Form Section */}
      <StyledView className="flex-1 p-6 -mt-16 bg-white rounded-t-3xl">
        <StyledText className="text-3xl font-bold text-left mb-1 mt-4">
          Welcome!
        </StyledText>
        <StyledText
          className="text-2xl font-bold text-left mb-3"
          style={{ color: "#1330BE" }}
        >
          to CHEMOSENSE
        </StyledText>
        <StyledText className="text-left text-gray-600 mb-0">
          To keep connected with us login with your
        </StyledText>
        <StyledText className="text-left text-gray-600 mb-16">
          personal info
        </StyledText>

        {error ? (
          <StyledText className="text-red-500 text-center mb-3">
            {error}
          </StyledText>
        ) : null}

        <StyledView className="flex-row items-center bg-gray-200 p-4 rounded-lg mb-3">
          <StyledTextInput
            className="flex-1 text-base" // Removed text-gray-800
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF" // This is gray-400
            selectionColor="#007AFF" // Changed "blue" to a common blue hex code
          />
        </StyledView>

        <StyledView className="flex-row items-center bg-gray-200 p-4 rounded-lg mb-3">
          <StyledTextInput
            className="flex-1 text-base"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#9CA3AF"
          />
          <StyledTouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <EyeIcon />
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex-row justify-between items-center mb-6">
          <StyledTouchableOpacity
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <StyledView
              className={`w-5 h-5 border-2 rounded mr-2 ${
                rememberMe ? "bg-blue-600 border-blue-600" : "border-gray-400"
              }`}
            />
            <StyledText className="text-gray-700">Remember me?</StyledText>
          </StyledTouchableOpacity>
          {/* Updated href for Expo Router */}
          <Link href="/forgot-password/ResetPasswordEnterNICScreen" asChild>
            <StyledTouchableOpacity>
              <StyledText
                style={{ color: "#1330BE" }}
                className="text-blue-600 font-semibold"
              >
                Forget Password?
              </StyledText>
            </StyledTouchableOpacity>
          </Link>
        </StyledView>

        <StyledView className="space-y-4">
          <StyledTouchableOpacity
            className="bg-blue-600 p-4 rounded-lg items-center mt-11"
            style={{ backgroundColor: "#1330BE" }}
            onPress={handleLogin}
          >
            <StyledText className="text-white text-lg font-bold">
              Login
            </StyledText>
          </StyledTouchableOpacity>

          <StyledView className="items-center mt-12">
            <StyledText className="text-gray-600">
              Wanna visit our website?
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => console.log("Navigate to website")}
            >
              <StyledText
                style={{ color: "#1330BE" }}
                className="text-blue-600 font-semibold underline decoration-blue-800"
              >
                here you are
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default PatLogIn;
