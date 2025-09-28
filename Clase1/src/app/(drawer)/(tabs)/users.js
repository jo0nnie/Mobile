import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useUsers } from "../../../hooks/useUsers";

export default function UsersScreen() {
  const { users, loading, error } = useUsers();

  if (loading) return <ActivityIndicator size="large" color="color=#553384ff" />;
  if (error) return <Text style={{ color: "red" }}>{error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.username}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>Nombre: {item.name}</Text>
          <Text>Username: {item.username}</Text>
        </View>
      )}
    />
  );
}