import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PeliculaCard({ item, esFavorito, onToggle }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image?.medium || "https://via.placeholder.com/210x295?text=No+Image" }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity style={styles.botonReset} onPress={() => onToggle(item)}>
        <Text style={styles.botonResetTexto}>
          {esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20, padding: 8, borderRadius: 12, alignItems: "center",  },
  poster: { width: "70%", aspectRatio: 2 / 3, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", textAlign: "center", color: "#fff" },
  botonReset: { backgroundColor: "#e23190ff", padding: 10, borderRadius: 8 },
  botonResetTexto: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
