import React from 'react';
import { StatusBar } from 'react-native';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Notification() {
    return (

        <SafeAreaView className="flex-1 bg-white pt-12 px-4">
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
            <Text className="text-2xl font-bold ml-2 mt-2 mb-8">Notifications</Text>

            <View className="bg-gray-300 px-4 justify-center h-10 w-full mb-8">
                <Text className="text-lg font-semibold text-gray-600">Today</Text>
            </View>

            <View className="flex-1">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    className="space-y-4"
                >
                    <View className="flex-row p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400 shadow-sm">
                        <Ionicons name="warning" size={24} color="orange" style={{ marginRight: 8, marginTop: 4 }} />
                        <View className="flex-1">
                            <Text className="text-base font-bold mb-1">Blood Pressure Warning</Text>
                            <Text className="text-sm text-gray-800">
                                Condition: Blood Pressure Spiked to 160/100{'\n'}
                                Timing: 11:11 AM. Please Monitor Closely. Stay Hydrated.
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row p-4 rounded-lg bg-red-100 border-l-4 border-red-500 shadow-sm mb-6 mt-6">
                        <Ionicons name="heart" size={24} color="red" style={{ marginRight: 8, marginTop: 4 }} />
                        <View className="flex-1">
                            <Text className="text-base font-bold mb-1">Heart Rate Alert</Text>
                            <Text className="text-sm text-gray-800">
                                Alert: Your Heart Rate Exceeded 130 BPM at 10:45 AM{'\n'}
                                Condition: Above Normal Range. Breathe. If This Continues, Consult Your Doctor.
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row p-4 rounded-lg bg-red-100 border-l-4 border-red-500 shadow-sm">
                        <Ionicons name="thermometer" size={24} color="red" style={{ marginRight: 8, marginTop: 4 }} />
                        <View className="flex-1">
                            <Text className="text-base font-bold mb-1">Temperature Change Detected</Text>
                            <Text className="text-sm text-gray-800">
                                Notice: Your Body Temperature Rose to 101.4°F.{'\n'}
                                You May Be Developing a Fever. Contact Your Doctor Immediately.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
