import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePelis from "../../hooks/usePelis";
import PeliculaCard from "../components/PeliculaCard";

export default function Home() {
  const { pelis, loading, error } = usePelis();
  const [favoritos, setFavoritos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const cargarFavoritos = async () => {
        const data = await AsyncStorage.getItem("favoritos");
        if (data) setFavoritos(JSON.parse(data));
        else setFavoritos([]);
      };
      cargarFavoritos();
    }
  }, [isFocused]);

  const toggleFavorito = useCallback(async (peli) => {
    let nuevosFavoritos;
    if (favoritos.some((f) => f.id === peli.id)) {
      nuevosFavoritos = favoritos.filter((f) => f.id !== peli.id);
    } else {
      nuevosFavoritos = [...favoritos, peli];
    }
    setFavoritos(nuevosFavoritos);
    await AsyncStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  }, [favoritos]);

  const renderItem = ({ item }) => {
    const esFavorito = favoritos.some((f) => f.id === item.id);
    return (
      <PeliculaCard
        item={item}
        esFavorito={esFavorito}
        onToggle={toggleFavorito}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listado de Películas</Text>
      {loading && <Text style={styles.estado}>Cargando...</Text>}
      {error && <Text style={styles.estado}>Error al cargar información</Text>}
      <FlatList
        data={(pelis || []).slice(0, 21)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#312c2eff" },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#e23190ff" },
  lista: { paddingBottom: 20 },
  estado: { textAlign: "center", fontSize: 18, marginTop: 50, color: "#6a1b9a" },
});
