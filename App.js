import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
     webClientId:
  "813994495961-9a5g72focg0k2onrv5l8nsjcpg3uq8rk.apps.googleusercontent.com",
    });
  }, []);

  async function loginGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (!idToken) {
        Alert.alert("Erro", "Não foi possível obter o token do Google.");
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);

      const result = await signInWithCredential(auth, credential);

      setUser(result.user);
    } catch (error) {
      console.log(error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }

      if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Aguarde", "O login já está em andamento.");
        return;
      }

      Alert.alert(
        "Erro no login",
        "Não foi possível entrar com o Google."
      );
    }
  }

  async function logout() {
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Anbylize</Text>

      {user ? (
        <>
          <Text style={styles.welcome}>
            Olá, {user.displayName || "usuário"}!
          </Text>

          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.button}>
            <Button title="Sair" onPress={logout} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>
            Faça login para continuar
          </Text>

          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginGoogle}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  text: {
    fontSize: 18,
    marginBottom: 20,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    marginBottom: 25,
  },

  googleButton: {
    width: 230,
    height: 48,
  },

  button: {
    width: 200,
    marginTop: 20,
  },
});