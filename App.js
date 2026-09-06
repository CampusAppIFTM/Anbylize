import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '952085405913-g2hn52sdagjmsgdemppf7230fiignirl.apps.googleusercontent.com',
});

export default function App() {

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      Alert.alert(
        'Login realizado!',
        `Bem-vindo(a), ${userInfo.data?.user?.name || 'usuário'}!`
      );

      console.log('Usuário:', userInfo);
    } catch (error) {
      console.log('Erro no login:', error);

      Alert.alert(
        'Erro',
        'Não foi possível realizar o login com o Google.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IFTM Campus App!</Text>

      <Text style={styles.subtitle}>
        Autenticação com Google
      </Text>

      <Button
        title="Entrar com Google"
        onPress={signIn}
      />

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 25,
  },
});