import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Linking } from "react-native";
import { api } from "../../api/api";

export default function PerfilPelicula() {
  const { id } = useLocalSearchParams();
  const [peli, setPeli] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
console.log("ID recibido:", id);

  useEffect(() => {
    const fetchPeli = async () => {
      try {
        const response = await api.get(`/shows/${id}`);
        setPeli(response.data);

        const castRes = await api.get(`/shows/${id}/cast`);
        setCast(castRes.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchPeli();
  }, [id]);

  if (error) return <Text style={styles.error}>Error al cargar la película</Text>;
  if (!peli) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{peli.name}</Text>
      <Image
        source={{ uri: peli.image?.original || "https://via.placeholder.com/300x450?text=No+Image" }}
        style={styles.poster}
      />
      <Text style={styles.info}>
        <Text style={styles.label}>Estreno: </Text>
        {peli.premiered || "Desconocido"}
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Calificación: </Text>
        {peli.rating?.average || "Sin calificación"}/10
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Géneros: </Text>
        {peli.genres?.join(", ") || "Sin datos"}
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Lenguaje: </Text>
        {peli.language}
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Duración: </Text>
        {peli.runtime ? `${peli.runtime} min` : "No disponible"}
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Elenco: </Text>
        {cast.length === 0 ? "Sin información" : cast.slice(0, 5).map((actor) => actor.person.name).join(", ")}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#312c2eff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#e23190ff",
  },
  poster: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#ffffffff",
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#6a1b9a",
  },
  error: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
  label: {
    fontWeight: "bold",
    color: "#a1105dff",
  }
});
