import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A0522D", // Sienna
        tabBarInactiveTintColor: "#D2B48C", // Tan
        tabBarStyle: {
          backgroundColor: "#FFFCF5", // Warm off-white (Claude-like)
        },
        headerShown: false, // Remove headers for cleaner look
        sceneStyle: {
          backgroundColor: "#FFFCF5", // Ensure screen background matches
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="microphone" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="+not-found" options={{}} />
    </Tabs>
  );
}
