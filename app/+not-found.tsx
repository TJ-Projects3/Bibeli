import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not found." }} />
      <View style={styles.container}>
        <Text style={styles.text}>Page Not Found</Text>
        <Link href="/(tabs)">
          <Text style={styles.link}>Go back to the home screen!</Text>
        </Link>
      </View>
    </>
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
  },

  link: {
    color: "#A0522D", // Sienna
    marginTop: 12,
    fontSize: 16,
    fontFamily: "LibreBaskerville_400Regular",
  },
});
