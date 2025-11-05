import { StyleSheet, Text, View } from "react-native";
import VoiceChat from "@/components/VoiceChat";

export default function VoicePage() {
  return (
    <View style={styles.container}>
      <VoiceChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFCF5", // Warm off-white (Claude-like)
    padding: 20,
  },

  text: {
    color: "#A0522D", // Sienna
    fontSize: 24,
    fontWeight: "bold",
  },
});
