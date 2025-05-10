import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // adjust this path later

// interface NotificationItem {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   timestamp: Timestamp;
// }

export default function Notification() {
    // const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    // useEffect(() => {
    //   const q = query(
    //     collection(db, 'notifications'),
    //     where('userId', '==', 'user_123'), // replace with auth UID
    //     orderBy('timestamp', 'desc')
    //   );

    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const data: NotificationItem[] = [];
    //     querySnapshot.forEach((doc) => {
    //       data.push({ id: doc.id, ...(doc.data() as Omit<NotificationItem, 'id'>) });
    //     });
    //     setNotifications(data);
    //   });

    //   return () => unsubscribe();
    // }, []);

    const mockNotifications = [
        {
            id: '1',
            title: 'Blood Pressure Warning',
            description:
                'Condition: Blood Pressure Spiked to 160/100\nTiming: 11:11 AM. Please Monitor Closely. Stay Hydrated.',
            icon: 'warning',
        },
        {
            id: '2',
            title: 'Heart Rate Alert',
            description:
                'Alert: Your Heart Rate Exceeded 130 BPM at 10:45 AM\nCondition: Above Normal Range. Breathe. If This Continues, Consult Your Doctor.',
            icon: 'heart',
        },
        {
            id: '3',
            title: 'Temperature Change Detected',
            description:
                'Notice: Your Body Temperature Rose to 101.4°F.\nYou May Be Developing a Fever. Contact Your Doctor Immediately.',
            icon: 'thermometer',
        },
    ];

    const getColorStyles = (icon: string) => {
        switch (icon) {
            case 'warning':
                return { bg: 'bg-yellow-50', border: 'border-yellow-400', color: 'orange' };
            case 'heart':
            case 'thermometer':
                return { bg: 'bg-red-100', border: 'border-red-500', color: 'red' };
            default:
                return { bg: 'bg-gray-100', border: 'border-gray-400', color: 'gray' };
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white pt-12 px-4">
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
            <Text className="text-2xl font-bold ml-2 mt-2 mb-8">Notifications</Text>

            <View className="bg-gray-300 px-4 justify-center h-10 w-full mb-8">
                <Text className="text-lg font-semibold text-gray-600">Today</Text>
            </View>

            <View className="flex-1">
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }} >
                    {mockNotifications.map((note) => {
                        const style = getColorStyles(note.icon);
                        return (
                            <View
                                key={note.id}
                                className={`flex-row p-4 rounded-lg ${style.bg} border-l-4 ${style.border} shadow-sm mb-4`}
                            >
                                <Ionicons
                                    name={note.icon as any}
                                    size={24}
                                    color={style.color}
                                    style={{ marginRight: 8, marginTop: 4 }}
                                />
                                <View className="flex-1">
                                    <Text className="text-base font-bold mb-1">{note.title}</Text>
                                    <Text className="text-sm text-gray-800">{note.description}</Text>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
