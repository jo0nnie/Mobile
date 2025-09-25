import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { useUsers } from '../../hooks/useUsers';

export default function Perfil() {
  const { username, name } = useLocalSearchParams();
  const { users, loading, error } = useUsers();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.titulo}>Perfil</Text>
        <Text style={styles.label}>Username: {username}</Text>
        <Text style={styles.label}>Nombre: {name}</Text>

        <Text style={styles.subtitulo}>Usuarios registrados:</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#553384ff" />
        ) : error ? (
          <Text style={styles.error}>SIN TOKEN: {error}</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userText}>{item.username}</Text>
              </View>
            )}
          />
        )}

        <Link href="/home">
          <Text style={styles.link}>Volver a home</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1c4e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f3f3e6da',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#080202ff',
    shadowOpacity: 0,
    shadowRadius: 5,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  userItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  userText: {
    fontSize: 14,
    textAlign: 'left',
  },
  link: {
    color: '#553384ff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
