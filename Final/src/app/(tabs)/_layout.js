import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="ListadoPeliculas" options={{ title: 'Home' }} />
      <Tabs.Screen name="PeliculasFavoritas" options={{ title: 'Favorites' }} />
    </Tabs>
  );
}
