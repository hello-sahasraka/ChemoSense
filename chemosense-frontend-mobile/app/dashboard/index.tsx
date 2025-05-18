import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const PatDashboard = () => {
  const navigation = useNavigation();
  const [heartRate, setHeartRate] = useState<number[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<number>(98);
  const [temperature, setTemperature] = useState<number>(36.5);
  const MAX_POINTS = 20;

  const handleProfilePress = () => {
    navigation.navigate("PatEditProfile" as never); // Use 'PatEditProfile' as the route name
  };

  const handleNotificationPress = () => {
    navigation.navigate("Notification" as never); // Use 'Notification' as the route name
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate heart rate between 60–100 bpm
      setHeartRate((prev) => {
        const nextValue = 60 + Math.floor(Math.random() * 40);
        const updated = [...prev, nextValue];
        return updated.length > MAX_POINTS
          ? updated.slice(-MAX_POINTS)
          : updated;
      });

      // Simulate blood oxygen between 90%–100%
      setBloodOxygen(90 + Math.floor(Math.random() * 10));

      // Simulate temperature between 36.0°C–37.5°C
      setTemperature(parseFloat((36 + Math.random() * 1.5).toFixed(1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function pickImage(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View className="flex-1 bg-[#f8f8f8] px-4 pt-4 pb-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        {/* Greeting section */}
        <View>
          <Text className="text-xl font-semibold text-gray-800">
            Hi, Christina
          </Text>
          <Text className="text-sm text-gray-500">Monday, 03 March</Text>
        </View>

        <TouchableOpacity onPress={handleProfilePress} className="relative">
          <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
            <Ionicons name="person" size={28} color="#6b7280" />
          </View>
          <View className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
            <Ionicons name="pencil" size={14} color="#2B59FF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Heart Rate Card */}
      <View className="bg-white rounded-2xl p-4 mb-3 shadow-md h-40">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold text-gray-700">
            Heart rate
          </Text>
          <Ionicons name="heart-outline" size={20} color="#2B59FF" />
        </View>
        <LineChart
          data={{
            labels: [],
            datasets: [{ data: heartRate.length ? heartRate : [70, 72, 75] }],
          }}
          width={screenWidth - 40}
          height={100}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "#f0f4ff",
            backgroundGradientTo: "#ffffff",
            color: () => "#2B59FF",
            strokeWidth: 2,
            propsForBackgroundLines: { stroke: "transparent" },
          }}
          style={{ borderRadius: 8 }}
        />
      </View>

      {/* Grid Section */}
      <View className="flex-row flex-wrap justify-between">
        {/* Blood Oxygen */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center h-36">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500">Blood oxygen</Text>
            <MaterialCommunityIcons name="water" size={18} color="#2B59FF" />
          </View>
          <View className="w-20 h-20 rounded-full border-[6px] border-blue-600 justify-center items-center">
            <Text className="text-xl font-bold text-blue-600">
              {bloodOxygen}%
            </Text>
          </View>
        </View>

        {/* Temperature */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md justify-center items-center h-36">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500">Temperature</Text>
            <Ionicons name="thermometer-outline" size={16} color="#2B59FF" />
          </View>
          <Text className="text-3xl font-bold text-orange-500">
            {temperature}°C
          </Text>
        </View>

        {/* Risk Level */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center justify-center h-36">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500">Risk level</Text>
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
          className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center justify-center h-36"
          onPress={handleNotificationPress}
        >
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500">Notifications</Text>
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
