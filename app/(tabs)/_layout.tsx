import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs>
    <Tabs.Screen name="(tabs)"
    options={{
      headerTitle: "Bibeli",
      headerLeft: () => <></>
    }} />
    <Tabs.Screen name="voice" options={{
      headerTitle: "Vocie Chat"
    }}/>
    <Tabs.Screen name="+not-found" options={{}} />
  </Tabs>
}
