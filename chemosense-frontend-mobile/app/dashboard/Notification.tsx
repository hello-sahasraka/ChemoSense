import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons"; // Import Feather
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  writeBatch,
  getDocs,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth
import { db } from "../../firebase"; // Correct path to firebase.ts

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: Timestamp;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const auth = getAuth(); // Initialize auth

  const handleClearAllNotifications = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user logged in to clear notifications.");
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );
    try {
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("All notifications cleared.");
    } catch (error) {
      console.error("Error clearing notifications: ", error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user logged in for notifications.");
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid), // Use actual auth UID
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: NotificationItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...(doc.data() as Omit<NotificationItem, "id">),
          });
        });
        setNotifications(data);
      },
      (error) => {
        console.error("Error fetching real-time notifications:", error);
      }
    );

    return () => unsubscribe();
  }, [auth]); // Depend on auth to re-run if user changes

  // Removed mockNotifications as real data will be used
  const getColorStyles = (icon: string) => {
    switch (icon) {
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-400",
          color: "orange",
        };
      case "heart":
      case "thermometer":
      case "alert-triangle": // Added for high risk alerts
        return { bg: "bg-red-100", border: "border-red-500", color: "red" };
      default:
        return { bg: "bg-gray-100", border: "border-gray-400", color: "gray" };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-12 px-4">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View className="flex-row justify-between items-center mb-8 mt-2 ml-2">
        <Text className="text-2xl font-bold">Notifications</Text>
        <TouchableOpacity onPress={handleClearAllNotifications}>
          <Text className="text-blue-500 font-semibold">Clear All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-300 px-4 justify-center h-10 w-full mb-8">
        <Text className="text-lg font-semibold text-gray-600">Today</Text>
      </View>

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {notifications.map((note: NotificationItem) => {
            const style = getColorStyles(note.icon);
            return (
              <View
                key={note.id}
                className={`flex-row p-4 rounded-lg ${style.bg} border-l-4 ${style.border} shadow-sm mb-4`}
              >
                {note.icon === "alert-triangle" ? (
                  <Feather
                    name="alert-triangle"
                    size={24}
                    color={style.color}
                    style={{ marginRight: 8, marginTop: 4 }}
                  />
                ) : (
                  <Ionicons
                    name={note.icon as any}
                    size={24}
                    color={style.color}
                    style={{ marginRight: 8, marginTop: 4 }}
                  />
                )}
                <View className="flex-1">
                  <Text className="text-base font-bold mb-1">{note.title}</Text>
                  <Text className="text-sm text-gray-800">
                    {note.description}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {note.timestamp
                      ? note.timestamp.toDate().toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
            );
          })}
          {notifications.length === 0 && (
            <View className="flex-1 items-center justify-center mt-10">
              <Ionicons
                name="notifications-off-outline"
                size={60}
                color="#D1D5DB"
              />
              <Text className="text-lg text-gray-500 mt-4">
                No notifications yet.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
