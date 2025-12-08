import { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PeliculaCard from "../components/PeliculaCard";

export default function Favoritos() {
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

  const quitarFavorito = useCallback(async (item) => {
    const nuevosFavoritos = favoritos.filter((f) => f.id !== item.id);
    setFavoritos(nuevosFavoritos);
    await AsyncStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  }, [favoritos]);

  const renderItem = ({ item }) => (
    <PeliculaCard
      item={item}
      esFavorito={true}          
      onToggle={quitarFavorito}  
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Películas Favoritas</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.emptyMessage}>No tienes películas favoritas aún</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#312c2eff" },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#e23190ff" },
  lista: { paddingBottom: 20 },
  emptyMessage: { fontSize: 16, textAlign: "center", color: "#999", marginTop: 30 },
});
