import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";
import { useUsers } from "../../hooks/useUsers";

export default function UserDetail() {
  const { id } = useSearchParams();
  const { selectedUser, loading, error, fetchUserById } = useUsers();

  useEffect(() => {
    if (id) fetchUserById(id);
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!selectedUser) return <Text>No se encontró el usuario</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{selectedUser.name}</Text>

      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{selectedUser.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
});