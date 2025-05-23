import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  Chart,
  Line,
  VerticalAxis,
  HorizontalAxis,
} from "react-native-responsive-linechart";

const screenWidth = Dimensions.get("window").width;

const PatDashboard = () => {
  const navigation = useNavigation();
  const [heartRate, setHeartRate] = useState<number[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<number>(98);
  const [temperature, setTemperature] = useState<number>(36.5);
  const MAX_POINTS = 20;

  const handleProfilePress = () => {
    navigation.navigate("PatEditProfile" as never);
  };

  const handleNotificationPress = () => {
    navigation.navigate("Notification" as never);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate heart rate between 60–100 bpm
      setHeartRate((prev) => {
        const nextValue = 60 + Math.floor(Math.random() * 40);
        const updated = [...prev, nextValue];
        return updated.length > MAX_POINTS ? updated.slice(-MAX_POINTS) : updated;
      });

      // Simulate blood oxygen between 90%–100%
      setBloodOxygen(90 + Math.floor(Math.random() * 10));

      // Simulate temperature between 36.0°C–37.5°C
      setTemperature(parseFloat((36 + Math.random() * 1.5).toFixed(1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-[#f8f8f8] px-4 pt-4 pb-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-10 mt-6">
        <View>
          <Text className="text-2xl font-semibold text-gray-800 ml-3">Hi, Christina</Text>
          <Text className="text-xl text-gray-500 ml-3">Monday, 03 March</Text>
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
      <View className="bg-white rounded-2xl p-4 mb-9 shadow-md">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold text-gray-700">Heart rate</Text>
          <Ionicons name="heart-outline" size={20} color="#2B59FF" />
        </View>


        {/* Ignore this error interface is running  */}
{
  
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
  </Chart> as React.ReactElement
}

      </View>

      {/* Grid Section */}
      <View className="flex-row flex-wrap justify-between">
        {/* Blood Oxygen */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center h-46">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500 font-semibold">Blood oxygen</Text>
            <MaterialCommunityIcons name="water" size={18} color="#2B59FF" />
          </View>
          <View className="w-20 h-20 rounded-full border-[6px] border-blue-600 justify-center items-center">
            <Text className="text-xl font-bold text-blue-600">{bloodOxygen}%</Text>
          </View>
        </View>

        {/* Temperature */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md h-36">
  <View className="flex-1 justify-between">
    <View className="flex-row items-center justify-between w-full mb-2">
      <Text className="text-sm text-gray-500 font-semibold">Temperature</Text>
      <Ionicons name="thermometer-outline" size={16} color="#2B59FF" />
    </View>
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold text-orange-500">
        {temperature}°C
      </Text>
    </View>
  </View>
</View>


        {/* Risk Level */}
        <View className="w-[48%] bg-white rounded-2xl p-3 mb-3 shadow-md items-center justify-center h-36 mt-3">
          <View className="flex-row items-center justify-between w-full mb-2">
            <Text className="text-sm text-gray-500 font-semibold">Risk level</Text>
            <MaterialCommunityIcons name="speedometer" size={18} color="#2B59FF" />
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
            <Text className="text-sm text-gray-500 font-semibold">Notifications</Text>
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
