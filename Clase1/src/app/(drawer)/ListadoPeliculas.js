import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, } from "react-native";
import usePelis from "../../hooks/usePelis";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ListadoPeliculas() {
  const [query, setQuery] = useState("");
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [mostrarGeneros, setMostrarGeneros] = useState(false);

  const { pelis, loading, error } = usePelis(query);
  const router = useRouter();

  const pelisFiltradas = generoSeleccionado
    ? pelis.filter((p) => p.genres?.includes(generoSeleccionado))
    : pelis;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/PerfilPelicula", params: { id: item.id } })
      }
    >
      <Image
        source={{
          uri:
            item.image?.medium ||
            "https://via.placeholder.com/210x295?text=No+Image",
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.rating}>
        {item.rating?.average ? `${item.rating.average}/10` : "Sin calificación"}
      </Text>
    </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setMostrarGeneros(!mostrarGeneros)}
      >
        <Text style={styles.dropdownText}>
          {generoSeleccionado || "Filtrar por género"}
        </Text>
      </TouchableOpacity>

      {mostrarGeneros && (
        <View style={styles.dropdownList}>
          {["Drama", "Comedy", "Action", "Romance", "Thriller", "Science-Fiction"].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.dropdownItem}
              onPress={() => {
                setGeneroSeleccionado(g);
                setMostrarGeneros(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {generoSeleccionado && (
        <TouchableOpacity
          style={styles.botonReset}
          onPress={() => setGeneroSeleccionado(null)}
        >
          <Text style={styles.botonResetTexto}>Ver todo</Text>
        </TouchableOpacity>
      )}

      {loading && <Text style={styles.estado}>Cargando...</Text>}
      {error && <Text style={styles.estado}>Error al cargar información</Text>}

      <FlatList
        data={pelisFiltradas.slice(0, 21)}
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
    padding: 20,
    backgroundColor: "#312c2eff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#e23190ff",
  },
  input: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#2c2c3c",
    borderColor: "#a1105dff",
    borderWidth: 1,
    fontSize: 16,
    color: "#fff",
  },
  dropdownToggle: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#2c2c3c",
    borderColor: "#a1105dff",
    borderWidth: 1,
    marginBottom: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: "#2c2c3c",
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 14,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    width: "30%",
    margin: "1.5%",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#151826ff",
    shadowColor: "#a1105dff",
    elevation: 3,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },
  rating: {
    fontSize: 13,
    color: "#b0bec5",
    marginTop: 4,
    textAlign: "center",
  },
  estado: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    color: "#6a1b9a",
  },
  botonReset: {
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#a1105dff",
  },
  botonResetTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

});
