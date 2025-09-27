import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    console.log(`Nombre: ${name}, Usuario: ${username}, Pass: ${password}`);
    try {
      await register({ username, password, name });
      router.replace(`/perfil?username=${username}&name=${name}`);
    } catch (err) {
      console.log('Error en registro:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.titulo}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#553384ff" />
        ) : (
          <Button title="Registrarse" color="#553384ff" onPress={handleRegister} />
        )}

        {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
