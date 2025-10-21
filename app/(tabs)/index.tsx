import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  return (
    <View style={styles.container}>
      {/* Decorative Accent Elements */}
      <View style={styles.decorativeContainer}>
        <View style={styles.cornerAccent} />
        <Text style={styles.text}>Bibeli</Text>
        <View style={[styles.cornerAccent, styles.cornerAccentRight]} />
      </View>

      {/* Tagline/Subtitle */}
      <Text style={styles.tagline}>Your Daily Companion in Faith</Text>

      {/* Feature Pills */}
      <View
        style={[
          styles.featureContainer,
          { flexDirection: isTablet ? "row" : "column" },
        ]}
      >
        <View style={styles.featurePill}>
          <Text style={styles.featureIcon}>📖</Text>
          <Text style={styles.featureText}>Read the Bible daily</Text>
        </View>
        <View style={styles.featurePill}>
          <Text style={styles.featureIcon}>🎧</Text>
          <Text style={styles.featureText}>AI Voice Conversation</Text>
        </View>
        <View style={styles.featurePill}>
          <Text style={styles.featureIcon}>✍️</Text>
          <Text style={styles.featureText}>Consistently study the Bible</Text>
        </View>
      </View>

      {/* Hero Statistics */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1M+</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Languages</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>365</Text>
          <Text style={styles.statLabel}>Days</Text>
        </View>
      </View> */}

      {/* Inspirational Verse */}
      <View style={styles.verseContainer}>
        <Text style={styles.verseText}>
          "For I know the plans I have for you, declares the Lord, plans to
          prosper you and not to harm you, to give you hope and a future."
        </Text>
        <Text style={styles.verseReference}>— Jeremiah 29:11</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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

  decorativeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },

  cornerAccent: {
    width: 20,
    height: 20,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: "rgba(160, 82, 45, 0.3)",
    marginHorizontal: 15,
    opacity: 0.6,
  },

  cornerAccentRight: {
    borderLeftWidth: 0,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 0,
  },

  text: {
    color: "#A0522D", // Sienna
    fontSize: 64,
    textAlign: "center",
    fontFamily: "LibreBaskerville_700Bold",
    marginBottom: 0,
    textShadowColor: "#A0522D",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 60,
  },

  tagline: {
    color: "#A0522D",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "LibreBaskerville_400Regular",
    opacity: 0.8,
    marginBottom: 30,
    paddingHorizontal: "10%",
    lineHeight: 22,
  },

  featureContainer: {
    marginBottom: 25,
    gap: 15,
    paddingHorizontal: "5%",
    alignItems: "center",
  },

  featurePill: {
    backgroundColor: "rgba(160, 82, 45, 0.1)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(160, 82, 45, 0.2)",
    minWidth: 150,
    justifyContent: "center",
  },

  featureIcon: {
    fontSize: 18,
  },

  featureText: {
    color: "#A0522D",
    fontSize: 14,
    fontFamily: "LibreBaskerville_400Regular",
    fontWeight: "500",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: "10%",
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    color: "#A0522D",
    fontSize: 20,
    fontFamily: "LibreBaskerville_700Bold",
    fontWeight: "bold",
  },

  statLabel: {
    color: "#A0522D",
    fontSize: 12,
    fontFamily: "LibreBaskerville_400Regular",
    opacity: 0.7,
    marginTop: 2,
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(160, 82, 45, 0.3)",
    marginHorizontal: 15,
  },

  verseContainer: {
    marginBottom: 30,
    paddingHorizontal: "15%",
    alignItems: "center",
  },

  verseText: {
    color: "#A0522D",
    fontSize: 14,
    fontFamily: "LibreBaskerville_400Regular",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 8,
  },

  verseReference: {
    color: "#A0522D",
    fontSize: 12,
    fontFamily: "LibreBaskerville_400Regular",
    opacity: 0.6,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
    gap: 15,
  },

  loginButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A0522D", // Sienna
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    // Subtle shadow
    shadowColor: "#A0522D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  loginButtonText: {
    color: "#A0522D", // Sienna
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "LibreBaskerville_700Bold",
  },

  signupButton: {
    flex: 1,
    backgroundColor: "#A0522D", // Sienna
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    // Glow effect for filled button
    shadowColor: "#A0522D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  signupButtonText: {
    color: "#FFFCF5", // Warm off-white
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "LibreBaskerville_700Bold",
  },

  link: {
    color: "#A0522D", // Sienna
    marginTop: 12,
    fontSize: 16,
  },
});
