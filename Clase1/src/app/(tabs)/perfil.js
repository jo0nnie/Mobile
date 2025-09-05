import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';

export default function Perfil() {
  const { username, name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.titulo}>Perfil</Text>
        <Text style={styles.label}>Username: {username}</Text>
        <Text style={styles.label}>Nombre: {name}</Text>
        <Link href="/home"><Text style={{ color: '#553384ff', marginBottom: 20 }}>Volver a home</Text></Link>
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
