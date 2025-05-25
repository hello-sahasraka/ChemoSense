import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GEMINI_API_KEY = "AIzaSyABtnPj97B-2hDW26AW58oFoHp8gTAKCWQ";

// Define message type with strict sender values
type Message = {
  text: string;
  sender: "user" | "gemini";
};

const Chatbot = () => {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);



  useEffect(() => {
    const welcomeMessage: Message = {
      text: "👋 Hello! How can I help you today?",
      sender: "gemini",
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    // Add user message to the list
    const userMessage: Message = { text: msg, sender: 'user' };
    setMessages(prevMessages => [userMessage, ...prevMessages]);
    setMsg(""); // Clear the input

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: msg,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Full API Response:", data);

      const content = data.candidates?.[0]?.content;
      console.log("Content:", content);

      const reply = content?.parts?.[0]?.text || "No response";

      // Add Gemini response to the list
      const geminiMessage: Message = { text: reply, sender: 'gemini' };
      setMessages(prevMessages => [geminiMessage, ...prevMessages]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = { text: "Error occurred", sender: 'gemini' };
      setMessages(prevMessages => [errorMessage, ...prevMessages]);
    }
  };

  const messageSave = (text: string) => {
    setMsg(text);

    console.log(text);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`max-w-[85%] px-4 py-3 rounded-2xl mb-3
    ${item.sender === 'user'
          ? 'bg-blue-600 self-end shadow-lg border border-blue-500'
          : 'bg-blue-50 self-start shadow-md border border-blue-400'}`}
      style={{
        shadowRadius: 4,
        elevation: 4, // For Android
      }}
    >
      <Text
        className={`text-base ${item.sender === 'user' ? 'text-white' : 'text-blue-900'
          }`}
      >
        {item.text}
      </Text>
    </View>


  );

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900">
      <View className="flex-row items-center justify-center py-4 border-b border-gray-700 bg-gray-800">
        <MaterialCommunityIcons name="robot" size={24} color="white" className="mr-2" />
        <Text className="text-white text-xl font-semibold tracking-wide">
          Let's have a chat
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 12 }}
        inverted
        showsVerticalScrollIndicator={false}
      />

      <View className="flex-row items-center px-4 py-3 bg-gray-800 border-t border-gray-700 h-20">
        <TextInput
          className="flex-1 bg-white text-gray-900 rounded-3xl px-4 py-2 mr-2 shadow-sm focus:outline-none h-15"
          placeholder="Type your message..."
          placeholderTextColor="#666"
          value={msg}
          onChangeText={setMsg}
          returnKeyType="send"             // Show "Send" on keyboard Enter key
          onSubmitEditing={handleButtonClick} // Send on Enter key press
          blurOnSubmit={false}             // Keeps focus after sending (optional)
        />
        <TouchableOpacity onPress={handleButtonClick} activeOpacity={0.7}>
          <MaterialIcons name="send" size={28} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};



export default Chatbot;