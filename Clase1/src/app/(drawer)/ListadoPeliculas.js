import { StatusBar } from "expo-status-bar";
import {FlatList,StyleSheet,Text,View,Image,TouchableOpacity,TextInput,} from "react-native";
import usePelis from "../../hooks/usePelis";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ListadoPeliculas() {
const [query, setQuery] = useState(""); 
  const { pelis, loading, error } = usePelis(query);
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/PerfilPelicula", params: { id: item.id } })}
    >

      <Image
        source={{
          uri: item.image?.medium || "https://via.placeholder.com/210x295?text=No+Image",
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.rating}>
        {item.rating?.average ? `${item.rating.average}/10` : "Sin calificación"}
      </Text>
    </TouchableOpacity >
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cartelera</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre"
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />

      {loading && <Text style={styles.estado}>Cargando...</Text>}
      {error && <Text style={styles.estado}>Error al cargar información</Text>}

      <FlatList
        data={pelis.slice(0, 21)}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f", 
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#cdd9e5", 
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#2c2c3c", 
    borderColor: "#4a90e2", 
    borderWidth: 1,
    fontSize: 16,
    color: "#e0e0e0",
  },
  lista: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    width: "30%",
    margin: "1.5%",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#2a2f45", 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
    color: "#a0c4ff", 
  },
  rating: {
    fontSize: 13,
    color: "#b0bec5", 
    marginTop: 4,
    textAlign: "center",
  },
  link: {
    fontSize: 12,
    color: "#4a90e2", 
    marginTop: 4,
    textDecorationLine: "underline",
  },
  estado: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    color: "#90caf9", 
  },
});
