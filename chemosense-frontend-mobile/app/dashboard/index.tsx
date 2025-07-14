import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  Chart,
  Line,
  VerticalAxis,
  HorizontalAxis,
} from "react-native-responsive-linechart";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot, // Added onSnapshot import
  QuerySnapshot, // Moved import to top level
  QueryDocumentSnapshot, // Moved import to top level
  addDoc, // Added addDoc import
  serverTimestamp, // Added serverTimestamp import
} from "firebase/firestore";
import * as Haptics from "expo-haptics"; // Import Haptics
import { db } from "../../firebase";
import { Alert } from "react-native";

const screenWidth = Dimensions.get("window").width;

const PatDashboard = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Patient");
  const [currentDate, setCurrentDate] = useState("");
  const [heartRate, setHeartRate] = useState<number[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const MAX_POINTS = 10; // Changed from 20 to 10 as per user's clarification

  const auth = getAuth();
  const firestoreDb = getFirestore();

  const handleProfilePress = () => {
    navigation.navigate("PatEditProfile" as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate("Notification" as never);
  };

  useEffect(() => {
    const user = auth.currentUser;
    let unsubscribePredictions: (() => void) | undefined;

    if (user) {
      const fetchUserName = async () => {
        try {
          const userDocRef = doc(firestoreDb, "patients", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.fullName || user.displayName || "Patient");
          } else {
            console.log("No patient profile found for UID:", user.uid);
            setUserName(user.displayName || "Patient");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          setUserName(user.displayName || "Patient");
        }
      };
      fetchUserName();

      const predictionsCollectionRef = collection(
        firestoreDb,
        "patients",
        user.uid,
        "predictions"
      );
      const predictionsQuery = query(
        predictionsCollectionRef,
        orderBy("timestamp", "desc"),
        limit(MAX_POINTS)
      );

      unsubscribePredictions = onSnapshot(
        predictionsQuery,
        (querySnapshot: QuerySnapshot) => {
          const newHeartRates: number[] = [];
          let latestBloodOxygen: number | null = null;
          let latestTemperature: number | null = null;
          let latestRiskLevel: string | null = null;

          querySnapshot.docs.forEach(
            (doc: QueryDocumentSnapshot, index: number) => {
              const data = doc.data();
              if (data.heart_rate !== undefined) {
                newHeartRates.unshift(data.heart_rate); // Add to the beginning to keep chronological order for chart
              }

              // Only update latest values from the most recent prediction (first doc in desc order)
              if (index === 0) {
                latestBloodOxygen = data.oxygen_saturation || null;
                latestTemperature = data.body_temperature || null;
                latestRiskLevel = data.risk_level || null;
              }
            }
          );

          setHeartRate(newHeartRates);
          setBloodOxygen(latestBloodOxygen);
          setTemperature(latestTemperature);
          setRiskLevel(latestRiskLevel);

          console.log("Fetched heart_rates:", newHeartRates);
          console.log("Fetched latest risk_level:", latestRiskLevel);

          if (latestRiskLevel === "High Risk") {
            Alert.alert(
              "High Risk Alert",
              "Your predicted risk level is high. Please consult with a medical professional.",
              [{ text: "OK" }]
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Trigger haptic feedback

            // Add high risk notification to Firestore
            if (user) {
              const notificationsCollectionRef = collection(
                firestoreDb,
                "notifications"
              );
              addDoc(notificationsCollectionRef, {
                userId: user.uid,
                title: "High Risk Alert",
                description:
                  "Your predicted risk level is high. Please consult with a medical professional.",
                icon: "alert-triangle", // Icon for high risk
                timestamp: serverTimestamp(),
              }).catch((notificationError) => {
                console.error(
                  "Error adding high risk notification:",
                  notificationError
                );
              });
            }
          }
        },
        (error: Error) => {
          console.error("Error fetching real-time health data:", error);
        }
      );
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString(undefined, options));

    return () => {
      if (unsubscribePredictions) {
        unsubscribePredictions();
      }
    };
  }, [auth, firestoreDb]); // Removed sound from dependency array

  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-4 pb-6">
      <View className="flex-col">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8 mt-6">
          <View className="flex-1 mr-4">
            <Text
              className="text-2xl font-semibold text-gray-800"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Hi, {userName}
            </Text>
            <Text className="text-base text-gray-500 mt-1">{currentDate}</Text>
          </View>

          <TouchableOpacity onPress={handleProfilePress} className="relative">
            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center shadow-sm">
              <Ionicons name="person" size={28} color="#6b7280" />
            </View>
            <View className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
              <Ionicons name="pencil" size={12} color="#2B59FF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Heart Rate Card */}
        <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-700">
              Heart Rate
            </Text>
            <View className="bg-blue-50 rounded-full p-2">
              <Ionicons name="heart-outline" size={20} color="#2B59FF" />
            </View>
          </View>

          {/* @ts-ignore */}
          <Chart
            style={{ width: screenWidth - 60, height: 120 }}
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

        {/* Grid Section with proper spacing */}
        <View className="flex-row flex-wrap justify-between">
          {/* Blood Oxygen */}
          <View className="w-[47%] bg-white rounded-3xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-sm text-gray-500 font-semibold">
                Blood Oxygen
              </Text>
              <View className="bg-blue-50 rounded-full p-1.5">
                <MaterialCommunityIcons
                  name="water"
                  size={16}
                  color="#2B59FF"
                />
              </View>
            </View>
            <View className="items-center justify-center flex-1">
              <View className="w-20 h-20 rounded-full border-4 border-blue-500 justify-center items-center bg-blue-50">
                <Text className="text-lg font-bold text-blue-600">
                  {bloodOxygen !== null ? `${Math.floor(bloodOxygen)}%` : "--"}
                </Text>
              </View>
            </View>
          </View>

          {/* Temperature */}
          <View className="w-[47%] bg-white rounded-3xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-sm font-semibold text-gray-500">
                Temperature
              </Text>
              <View className="bg-orange-50 rounded-full p-1.5">
                <Ionicons
                  name="thermometer-outline"
                  size={16}
                  color="#FF7A00"
                />
              </View>
            </View>
            <View className="items-center justify-center flex-1">
              <Text className="text-2xl font-bold text-orange-500">
                {temperature !== null ? `${Math.floor(temperature)}°C` : "--"}
              </Text>
            </View>
          </View>

          {/* Risk Level */}
          <View className="w-[47%] bg-white rounded-3xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-sm text-gray-500 font-semibold">
                Risk Level
              </Text>
              <View className="bg-purple-50 rounded-full p-1.5">
                <MaterialCommunityIcons
                  name="speedometer"
                  size={16}
                  color="#8B5CF6"
                />
              </View>
            </View>
            <View className="items-center justify-center flex-1">
              {riskLevel === "Low Risk" && (
                <>
                  <View className="bg-green-50 rounded-full p-3 mb-2">
                    <Feather
                      name="arrow-down-circle"
                      size={24}
                      color="#16A34A"
                    />
                  </View>
                  <Text className="text-sm font-bold text-green-600">
                    Low Risk
                  </Text>
                </>
              )}
              {riskLevel === "High Risk" && (
                <>
                  <View className="bg-red-50 rounded-full p-3 mb-2">
                    <Feather name="alert-triangle" size={24} color="#DC2626" />
                  </View>
                  <Text className="text-sm font-bold text-red-600">
                    High Risk
                  </Text>
                </>
              )}
              {riskLevel === null && (
                <>
                  <View className="bg-gray-50 rounded-full p-3 mb-2">
                    <MaterialCommunityIcons
                      name="help"
                      size={24}
                      color="#6B7280"
                    />
                  </View>
                  <Text className="text-sm font-bold text-gray-500">
                    No Data
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Notifications */}
          <TouchableOpacity
            className="w-[47%] bg-white rounded-3xl p-4 mb-4 shadow-sm"
            onPress={handleNotificationPress}
          >
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-sm text-gray-500 font-semibold">
                Notifications
              </Text>
              <View className="bg-indigo-50 rounded-full p-1.5">
                <Ionicons
                  name="notifications-outline"
                  size={16}
                  color="#2B59FF"
                />
              </View>
            </View>
            <View className="items-center justify-center flex-1">
              <View className="bg-gray-50 rounded-full p-3 mb-2">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="#6B7280"
                />
              </View>
              <Text className="text-xs text-gray-500 text-center">
                All Clear
              </Text>
            </View>
          </TouchableOpacity>

          {/* Calendar */}
          <TouchableOpacity
            className="w-[47%] bg-white rounded-3xl p-4 mb-4 shadow-sm"
            onPress={() => navigation.navigate("Calendar" as never)}
          >
            <View className="flex-row items-center justify-between w-full mb-4">
              <Text className="text-sm text-gray-500 font-semibold">
                Calendar
              </Text>
              <View className="bg-green-50 rounded-full p-1.5">
                <Ionicons name="calendar-outline" size={16} color="#10B981" />
              </View>
            </View>
            <View className="items-center justify-center flex-1">
              <View className="bg-gray-50 rounded-full p-3 mb-2">
                <Ionicons name="calendar" size={24} color="#6B7280" />
              </View>
              <Text className="text-xs text-gray-500 text-center">
                View Schedule
              </Text>
            </View>
          </TouchableOpacity>

          {/* AI Chatbot */}
          <TouchableOpacity
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-5 mb-4 shadow-sm"
            onPress={() => navigation.navigate("Chatbot" as never)}
            style={{
              backgroundColor: "#FF7A00",
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-white mb-1">
                  AI Health Assistant
                </Text>
                <Text className="text-orange-100 text-sm">
                  Get instant answers to your health questions
                </Text>
              </View>
              <View className="bg-white bg-opacity-20 rounded-full p-3 ml-4">
                <MaterialCommunityIcons
                  name="robot-outline"
                  size={28}
                  color="white"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PatDashboard;
