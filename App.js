import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC-EI2hXA-zmslf9Mr66N8xoGY-hv9Dtjg',
  authDomain: 'anbylize.firebaseapp.com',
  projectId: 'anbylize',
  storageBucket: 'anbylize.firebasestorage.app',
  messagingSenderId: '813994495961',
  appId: '1:813994495961:android:73062c53abc561173c53c8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

GoogleSignin.configure({
  webClientId:
    '813994495961-9a5g72focg0k2onrv5l8nsjcpg3uq8rk.apps.googleusercontent.com',
});

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    });

    return unsubscribe;
  }, []);

  async function loginGoogle() {
    try {
      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        Alert.alert('Erro', 'Não foi possível obter o ID Token.');
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);

      await signInWithCredential(auth, credential);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro no login', error.message);
    }
  }

  async function sair() {
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text>Olá, {user.displayName}!</Text>

        <View style={styles.button}>
          <Button title="Sair" onPress={sair} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.button}>
        <Button title="Entrar com Google" onPress={loginGoogle} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    width: 220,
  },
});