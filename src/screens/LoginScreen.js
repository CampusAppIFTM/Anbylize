import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

// Recebemos a propriedade 'navigation' fornecida pelo React Navigation
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      console.log('Tentando logar com:', email.trim());
      // Exemplo: await auth().signInWithEmailAndPassword(email.trim(), senha);
    } catch (error) {
      Alert.alert('Erro ao fazer login', error.message || 'Verifique suas credenciais.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardView} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Onda Verde Escuro Superior com o Logotipo */}
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🏟️</Text>
          </View>
        </View>

        {/* Conteúdo do Formulário */}
        <View style={styles.content}>
          <Text style={styles.titulo}>Login</Text>

          {/* Campo de Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiInput}>✉️</Text>
            <TextInput 
              style={styles.input} 
              placeholder="seu.email@estudante.iftm.edu.br" 
              placeholderTextColor="#AAA" 
              value={email} 
              onChangeText={setEmail} 
              keyboardType="email-address" 
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          {/* Campo de Senha */}
          <View style={styles.rowLabel}>
            <Text style={styles.label}>Senha</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkEsqueceu}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiInput}>🔒</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#AAA" 
              secureTextEntry 
              value={senha} 
              onChangeText={setSenha}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>

          {/* Botão Entrar com indicador de carregamento */}
          <TouchableOpacity 
            style={styles.botaoEntrar} 
            onPress={handleLogin} 
            disabled={carregando}
            activeOpacity={0.8}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoBotaoEntrar}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Botão Google */}
          <TouchableOpacity style={styles.botaoGoogle} activeOpacity={0.8}>
            <Text style={styles.textoBotaoGoogle}>🌐 Entrar com o Google</Text>
          </TouchableOpacity>

          {/* Link de Cadastro */}
          <View style={styles.footerRow}>
            <Text style={styles.textoFooter}>Não tem uma conta? </Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Cadastro')} // Redireciona para CadastroScreen
            >
              <Text style={styles.linkCadastro}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    backgroundColor: '#112A1D',
    height: 220,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 110,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoEmoji: {
    fontSize: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#112A1D',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  rowLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  linkEsqueceu: {
    color: '#888',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
    height: 48,
  },
  emojiInput: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  botaoEntrar: {
    backgroundColor: '#112A1D',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoBotaoEntrar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoGoogle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#112A1D',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  textoBotaoGoogle: {
    color: '#112A1D',
    fontSize: 16,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  textoFooter: {
    color: '#555',
    fontSize: 14,
  },
  linkCadastro: {
    color: '#112A1D',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
