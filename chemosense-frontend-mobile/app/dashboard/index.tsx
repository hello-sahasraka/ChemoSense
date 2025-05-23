import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  Chart,
  Line,
  VerticalAxis,
  HorizontalAxis,
} from "react-native-responsive-linechart";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Uncommented Firestore imports
import { db } from "../../firebase"; // Assuming firebase config is in project root

const screenWidth = Dimensions.get("window").width;

const PatDashboard = () => {
  const navigation = useNavigation();
  // Removed const { uid } = useLocalSearchParams();
  const [userName, setUserName] = useState("Patient"); // Default name
  const [currentDate, setCurrentDate] = useState("");
  const [heartRate, setHeartRate] = useState<number[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const MAX_POINTS = 20;

  const auth = getAuth();
  const firestoreDb = getFirestore(); // Initialize Firestore

  const handleProfilePress = () => {
    navigation.navigate("PatEditProfile" as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate("Notification" as never);
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Fetch user's full name from Firestore
      const fetchUserName = async () => {
        try {
          const userDocRef = doc(firestoreDb, "patients", user.uid); // Assuming 'patients' collection with UID as document ID
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.fullName || user.displayName || "Patient"); // Use fullName from Firestore, fallback to displayName or default
          } else {
            console.log("No patient profile found for UID:", user.uid);
            setUserName(user.displayName || "Patient"); // Fallback to displayName or default
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          setUserName(user.displayName || "Patient"); // Fallback on error
        }
      };
      fetchUserName();

      // TODO: Fetch health data from Firebase based on user.uid
      // Example (Firestore):
      /*
      const fetchHealthData = async () => {
        try {
          const userHealthDocRef = doc(firestoreDb, "health_data", user.uid); // Assuming health data is in a collection 'health_data' with document ID as UID
          const docSnap = await getDoc(userHealthDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Update state with fetched data
            setHeartRate(data.heartRate || []);
            setBloodOxygen(data.bloodOxygen || null);
            setTemperature(data.temperature || null);
          } else {
            console.log("No health data found for this user.");
          }
        } catch (error) {
          console.error("Error fetching health data:", error);
        }
      };
      fetchHealthData();
      */

      // Example (Realtime Database):
      /*
      const healthDataRef = ref(getDatabase(), 'health_data/' + user.uid); // Assuming health data is under 'health_data/UID'
      const unsubscribe = onValue(healthDataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update state with fetched data
          setHeartRate(data.heartRate || []);
          setBloodOxygen(data.bloodOxygen || null);
          setTemperature(data.temperature || null);
        } else {
          console.log("No health data found for this user.");
        }
      });
      return () => unsubscribe(); // Clean up listener
      */
    }

    // Get and format current date
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, [auth, firestoreDb]); // Depend on auth and firestoreDb

  // Removed the interval for simulated data

  return (
    <View className="flex-1 bg-[#f8f8f8] px-4 pt-4 pb-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-10 mt-6">
        <View className="flex-shrink w-3/4">
          {/* Added flex-shrink and width constraint */}
          <Text
            className="text-2xl font-semibold text-gray-800 ml-3"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {/* Added text truncation */}Hi, {userName}
          </Text>
          <Text className="text-xl text-gray-500 ml-3">{currentDate}</Text>
        </View>

        <TouchableOpacity
          onPress={handleProfilePress}
          className="relative w-1/4 items-end"
        >
          {/* Added width constraint and items-end */}
          <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
            <Ionicons name="person" size={28} color="#6b7280" />
          </View>
          <View className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
            <Ionicons name="pencil" size={14} color="#2B59FF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Heart Rate Card */}
      <View className="bg-white rounded-2xl p-4 mb-9 shadow-md">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold text-gray-700">
            Heart rate
          </Text>
          <Ionicons name="heart-outline" size={20} color="#2B59FF" />
        </View>

        {/* Ignore this error interface is running  */}
        <Chart
          style={{ width: screenWidth - 40, height: 120 }}
          data={
            heartRate.length
              ? heartRate.map((y, x) => ({ x, y }))
              : [
                  { x: 0, y: 70 },
                  { x: 1, y: 72 },
                  { x: 2, y: 75 },
                ]
          }
          xDomain={{ min: 0, max: MAX_POINTS - 1 }}
          yDomain={{ min: 50, max: 120 }}
          padding={{ left: 40, top: 10, bottom: 20, right: 10 }}
        >
          <VerticalAxis
            tickCount={5}
            theme={{ labels: { label: { color: "#999", fontSize: 10 } } }}
          />
          <HorizontalAxis
            tickCount={5}
            theme={{ labels: { label: { color: "#999", fontSize: 10 } } }}
          />
          <Line theme={{ stroke: { color: "#2B59FF", width: 2 } }} />
        </Chart>
      </View>

      {/* Grid Section */}
      <View className="flex-row flex-wrap justify-between">
        {/* Blood Oxygen */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center h-46">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500 font-semibold">
              Blood oxygen
            </Text>
            <MaterialCommunityIcons name="water" size={18} color="#2B59FF" />
          </View>
          <View className="w-20 h-20 rounded-full border-[6px] border-blue-600 justify-center items-center">
            <Text className="text-xl font-bold text-blue-600">
              {bloodOxygen !== null ? `${bloodOxygen}%` : "--"}
            </Text>
          </View>
        </View>

        {/* Temperature */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md h-36">
          <View className="flex-1 justify-between">
            <View className="flex-row items-center justify-between w-full mb-2">
              <Text className="text-sm font-bold text-gray-700 mb-2">
                Temperature
              </Text>
              <Ionicons name="thermometer-outline" size={16} color="#2B59FF" />
            </View>
            <View className="flex-1 justify-center items-center">
              <Text className="text-3xl font-bold text-orange-500">
                {temperature !== null ? `${temperature}°C` : "--"}
              </Text>
            </View>
          </View>
        </View>

        {/* Risk Level */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center justify-center h-36 mt-3">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500 font-semibold">
              Risk level
            </Text>
            <MaterialCommunityIcons
              name="speedometer"
              size={18}
              color="#2B59FF"
            />
          </View>
          <Feather name="arrow-down-circle" size={28} color="green" />
          <Text className="text-base font-bold text-green-600 mt-1">Low</Text>
        </View>

        {/* Notifications */}
        <TouchableOpacity
          className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center justify-center h-36 mt-3"
          onPress={handleNotificationPress}
        >
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500 font-semibold">
              Notifications
            </Text>
            <Ionicons name="notifications-outline" size={18} color="#2B59FF" />
          </View>
          <Ionicons name="close" size={36} color="#2B59FF" />
          <Text className="text-xs text-gray-500 mt-1">No notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatDashboard;
