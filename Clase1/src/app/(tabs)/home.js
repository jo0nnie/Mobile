import { FlatList, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import usePokemons from "../../hooks/usePokemons"; 

export default function Home() {
  const { pokemons } = usePokemons(20);
  console.log("Pokemons:", pokemons);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.texto}>Hola mundo no se como hacer que se vea la lista de pokemones profe, por eso no estan</Text>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.name}</Text>
          </View>
        )}
      />

      <Link href="/register" style={styles.link}>Register</Link>
      <Link href="/login" style={styles.link}>Login</Link>
      <Link href="/perfil" style={styles.link}>Perfil</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#d2b7d6ff",
  },
  texto: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f3f3e6da",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  nombre: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  link: {
    marginTop: 10,
    color: "#553384ff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
