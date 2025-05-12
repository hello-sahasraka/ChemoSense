import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity; 

const ResetPasswordVerifyCodeScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!verificationCode) {
      setError('Verification code is required.');
      return;
    }
    if (verificationCode.length !== 4) { 
        setError('Verification code must be 4 digits.');
        return;
    }
    setError('');
    // Navigate to the next screen (Set New Password)
    router.push('/forgot-password/ResetPasswordSetNewScreen');
    console.log('Verify with code:', verificationCode);
  };

  return (
    <StyledView className="flex-1 bg-gray-100 p-6 justify-center">
      <StyledText style={{ color: '#1330BE',marginTop:-100,marginBottom:240, position:'fixed'}} className="text-3xl font-bold text-center mb-10 ">
        Reset your password
      </StyledText>

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-4 text-base text-center"
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        maxLength={4} // Assuming a 4-digit code
        placeholderTextColor="#9CA3AF"
      />

      <StyledText className="text-center text-black-900 mb-0">
        We have sent a four digital code to your phone
      </StyledText>
      <StyledText className="text-center text-black-900 mb-8">
         phone
      </StyledText>

      {error ? (
        <StyledText className="text-red-500 text-center mb-4">{error}</StyledText>
      ) : null}

      <StyledTouchableOpacity
        className=" p-4 rounded-lg items-center  mt-10 "
        style={{ backgroundColor: '#1330BE', width: 220, height: 50 , marginLeft: 68 }}
        onPress={handleVerify}
      >
        <StyledText className="text-white text-lg font-bold">Verify</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordVerifyCodeScreen;
