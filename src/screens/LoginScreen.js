import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = () => {
    // Implement login logic 
    console.log('Logging in with:', id, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcomeText2}>to CHEMOSENSE</Text>
        <Text style={styles.subText}>To keep connected & thus login with your personal info</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="NIC"
            value={id}
            onChangeText={setId}
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="password"
              secureTextEntry={!showPassword} 
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off-outline'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <Pressable
              onPress={() => setIsChecked(!isChecked)}
              style={[
                styles.checkbox,
                isChecked && { backgroundColor: '#007AFF', borderColor: '#007AFF' }
              ]}
            >
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        {/*  Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Wanna visit our website?</Text>
          <TouchableOpacity>
            <Text style={styles.helpLink}>Here you are</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'space-around', 
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 135,
    height: 110,
    marginTop: -60,
    marginBottom: -120,
  },
  header: {
    backgroundColor: '#1330BE', 

    padding: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: -40,
  },
  heart: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  waveform: {
    
    width: 50,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',

    marginTop: -120,
    textAlign: 'left',
    marginLeft: -240,

  },
  welcomeText2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1330BE',
    marginBottom: 8,
    textAlign: 'left',
    marginLeft: -150,

  },
  body: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -90,
    marginBottom: -90,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    width: '118%',
    height: '118%',

    borderRadius: 30,

  },
  subText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    marginLeft: -24,
    marginBottom: 40,
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#F8F8F8', 
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginTop: -30, 
  },
  forgotPasswordText: {
    color: '#1E90FF', 
    fontSize: 15,
    marginTop: -10,

  },
  loginButton: {
    backgroundColor: '#1330BE', 
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    marginBottom: 0,
    marginTop: 20,
  },
  helpLink: {
    color: '#1E90FF',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#191970',
    marginTop: 0
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  eyeIconContainer: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#F8F8F8',
  },
});