import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Chatbot = () => {
  return (
    <View style={styles.container}>
      <Text>AI Chatbot Screen</Text>
      {/* Add your chatbot UI components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chatbot;
