import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, Alert, View, Text } from 'react-native';
/*
import { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // adjust path accordingly
*/

type Profile = {
    name: string;
    nic: string;
    phone: string;
    email: string;
    username: string,
    password: string,
    confirmPassword: string,
};

export default function PatEditProfile() {
    const [profile, setProfile] = useState<Profile>({
        name: 'Anushka Perera',
        nic: '951234567V',
        phone: '+94 771234567',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    //These  information  inside'' need to be remove and '' inside these need to be blank 

    const handleChange = (key: keyof Profile, value: string) => {
        setProfile({ ...profile, [key]: value });
    };


    /*useEffect(() => {
    const loadProfile = async () => {
        try {
            const userRef = doc(db, 'patients', profile.username);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setProfile(docSnap.data() as Profile);
            } else {
                console.log('No such profile found.');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    if (profile.username) {
        loadProfile();
    }
}, [profile.username]);
*/

    const validateForm = () => {
        const { email, phone, password, confirmPassword } = profile;

        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return false;
        }

        const phoneRegex = /^(?:\+94\s?\d{9}|0\d{9})$/;
        if (!phone || !phoneRegex.test(phone)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid Sri Lankan phone number.');
            return false;
        }

        if (!password || password.length < 6) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return false;
        }


        return true;
    };

    /*const handleSave = async () => {
        if (validateForm()) {
            try {
                const userRef = doc(db, 'patients', profile.username); // use username as document ID
                await setDoc(userRef, profile); // create or overwrite patient profile
                Alert.alert('Profile Saved', 'Your profile changes have been saved successfully!');
                console.log('Saved Profile:', profile); // good for debugging
            } catch (error) {
                console.error('Error saving profile:', error);
                Alert.alert('Error', 'Failed to save profile. Please try again.');
            }
        }
    };
    */

    const handleSave = () => {
        if (validateForm()) {
            console.log('Saved Profile:', profile);
            Alert.alert('Profile Saved', 'Your profile changes have been saved successfully!');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text className="text-3xl font-bold mb-5 text-blue-600">Edit Profile</Text>

                <View className="mb-5">
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                        style={{ width: 96, height: 96, borderRadius: 48 }}
                        resizeMode="cover"
                        onError={(e) => console.warn('Image error:', e.nativeEvent.error)}
                    />
                </View>

                <View className="w-11/12 bg-white rounded-lg p-5 shadow-md">
                    {/* Name */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Name</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.name}
                        editable={false}
                    />

                    {/* NIC */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">NIC</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.nic}
                        editable={false}
                    />

                    {/* Phone */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Phone Number</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.phone}
                        editable={false}
                        keyboardType="phone-pad"
                    />

                    {/* Email */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">E-mail</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.email}
                        editable={false}
                        keyboardType="email-address"
                    />

                    {/* Username */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Username</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.username}
                        onChangeText={(text) => handleChange('username', text)}
                    />

                    {/* Passwor */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Password</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry
                    />

                    {/*verify password*/}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Confirm Password</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        secureTextEntry
                    />

                    {/* Save Button */}
                    <TouchableOpacity
                        className="bg-blue-600 p-3 rounded-md items-center mt-5"
                        onPress={handleSave}
                    >
                        <Text className="text-white font-semibold">Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
