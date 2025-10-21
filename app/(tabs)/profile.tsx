import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const backgroundImage = require("../../assets/images/profile-background-2.png");
export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={backgroundImage} style={styles.backgroundImage} />
      </View>
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
    color: "#A0522D", // Sienna
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtext: {
    color: "#A0522D", // Sienna
    fontSize: 16,
    textAlign: "center",
  },
  backgroundImage: {
    width: 300,
    height: 420,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1
  }
});
