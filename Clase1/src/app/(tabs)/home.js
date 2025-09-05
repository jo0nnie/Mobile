import { Text, View, StatusBar, FlatList, StyleSheet } from 'react-native';
import usePokemons from "../../hooks/usePokemons";

export default function Home() {
  const { pokemons, loading, error } = usePokemons(20);

  if (loading) return <Text>Cargando pokemones...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Pokemones !!!</Text>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1c4e9',
    alignItems: 'left',
    justifyContent: 'left',
  },
  card: {
    backgroundColor: '#f3f3e6da',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#080202ff',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'flex-start', 
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'semibold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
