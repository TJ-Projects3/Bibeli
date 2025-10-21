import { StyleSheet, Text, View } from "react-native";

export default function VoiceChat() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ask me anything!</Text>
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
