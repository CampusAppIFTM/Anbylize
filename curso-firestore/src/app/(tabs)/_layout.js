import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#1d4ed8" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Reservas",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="list-ul" color={color} />,
        }}
      />
      <Tabs.Screen
        name="horarios"
        options={{
          title: "Horários",
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
