import { Text, View, StyleSheet } from "react-native";

export default function VoiceChat() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Ask me anything!</Text>
    </View>
  );
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e"
    },

    text: {
      color: "#fff"
    }
  })
