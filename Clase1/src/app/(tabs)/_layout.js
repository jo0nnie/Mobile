import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#553384ff" }}>
            <Tabs.Screen name="home" options={{ title: "home", }} />
            <Tabs.Screen name="settings" options={{ title: "settings" }} />
        </Tabs>
    );
}