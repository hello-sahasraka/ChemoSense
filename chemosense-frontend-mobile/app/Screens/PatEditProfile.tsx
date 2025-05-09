import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, Alert, View, Text } from 'react-native';

type Profile = {
    name: string;
    nic: string;
    phone: string;
    email: string;
    dob: string;
    username: string;
};

export default function PatEditProfile() {
    const [profile, setProfile] = useState<Profile>({
        name: 'Anushka Perera',
        nic: '951234567V',
        phone: '+94 771234567',
        email: '',
        dob: '',
        username: '',
    });

    const handleChange = (key: keyof Profile, value: string) => {
        setProfile({ ...profile, [key]: value });
    };

    const validateForm = () => {
        const { email, phone } = profile;

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

        return true;
    };

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
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    {/* NIC */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">NIC</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.nic}
                        onChangeText={(text) => handleChange('nic', text)}
                    />

                    {/* Phone */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Phone Number</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.phone}
                        onChangeText={(text) => handleChange('phone', text)}
                        keyboardType="phone-pad"
                    />

                    {/* Email */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">E-mail</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                    />

                    {/* DOB */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Date of Birth</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.dob}
                        onChangeText={(text) => handleChange('dob', text)}
                        placeholder="YYYY-MM-DD"
                    />

                    {/* Username */}
                    <Text className="text-sm font-bold text-gray-700 mb-2">Username</Text>
                    <TextInput
                        className="bg-gray-200 p-3 rounded-md mb-4"
                        value={profile.username}
                        onChangeText={(text) => handleChange('username', text)}
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
