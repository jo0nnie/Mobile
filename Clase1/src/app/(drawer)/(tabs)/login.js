import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      console.log('Usuario logueado:', response.user);
      router.replace(`/perfil?username=${username}`);
    } catch (err) {
      console.log('Error en login:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.titulo}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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
          <Button title="Iniciar sesión" color="#553384ff" onPress={handleLogin} />
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
