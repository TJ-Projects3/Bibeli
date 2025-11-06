import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import VoiceChat from "@/components/VoiceChat";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
export default function VoicePage() {

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.testButton} 
      >
        <Text style={styles.testButtonText}>🎤 Ask anything about the Bible!</Text>
      </TouchableOpacity>
      <VoiceChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFCF5",
    padding: 20,
  },
  testButton: {
    backgroundColor: "#A0522D",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  testButtonText: {
    color: "#FFFCF5",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    color: "#A0522D",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
});