import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B4513", // SaddleBrown
        tabBarInactiveTintColor: "#D2B48C", // Tan
        tabBarStyle: {
          backgroundColor: "#FFFCF5", // Warm off-white (Claude-like)
        },
        headerStyle: {
          backgroundColor: "#FFFCF5", // Match page background
        },
        headerTitleStyle: {
          color: "#5C3A21", // Deep brown for titles
        },
        headerTintColor: "#5C3A21",
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: "#FFFCF5", // Ensure screen background matches
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Bibeli",
          headerLeft: () => <></>,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          headerTitle: "Voice Chat",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="microphone" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="+not-found" options={{}} />
    </Tabs>
  );
}
