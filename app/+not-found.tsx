import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not found." }} />
      <View style={styles.container}>
        <Text style={styles.text}>Page Not Found</Text>
        <Link href="/index">
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
    backgroundColor: "#25292e",
  },

  text: {
    color: "#fff",
  },
  link: {
    color: "#1e90ff",
    marginTop: 12,
  },
});
