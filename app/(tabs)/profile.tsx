import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Text style={styles.subtext}>Manage your account settings</Text>
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
    color: "#8B4513", // SaddleBrown
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtext: {
    color: "#A0522D", // Sienna
    fontSize: 16,
    textAlign: "center",
  },
});
