import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bibeli</Text>
      <Link href={"./voice"}>
        <Text style={styles.link}>Open Voice</Text>
      </Link>
    </View>
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
