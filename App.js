import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

import { configurarGoogleSignin, observarUsuario } from "./src/services/autenticacao";
import CarregandoScreen from "./src/screens/CarregandoScreen";
import LoginScreen from './src/screens/LoginScreen'; // 🌟 CORRIGIDO: Agora com 'Screen' no final para achar seu arquivo!
import HomeScreen from "./src/screens/HomeScreen";

const App = () => {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    configurarGoogleSignin();

    const cancelarObservacao = observarUsuario((usuarioAtual) => {
      setUsuario(usuarioAtual);
      setVerificando(false);
    });

    return cancelarObservacao;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {verificando ? (
        <CarregandoScreen />
      ) : usuario ? (
        <HomeScreen usuario={usuario} />
      ) : (
        <LoginScreen />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
