import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bibeli</Text>
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
    fontSize: 28,
    fontWeight: "bold",
  },
  link: {
    color: "#A0522D", // Sienna
    marginTop: 12,
    fontSize: 16,
  },
});
