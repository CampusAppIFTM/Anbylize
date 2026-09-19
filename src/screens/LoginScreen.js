import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

export default function LoginScreen() {
  // Estados para controlar o que o usuário digita e o carregamento
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função que será chamada quando clicar no botão "Entrar"
  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      // Aqui o Firebase vai processar o login usando a estrutura que já está no seu app
      console.log('Tentando logar com:', email);
      // await entrarComEmailESenha(email, senha); // Caso seu grupo use login por email
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
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
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.rowLabel}>
          <Text style={styles.label}>Senha</Text>
          <TouchableOpacity>
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
          />
        </View>

        {/* Botão Entrar com indicador de carregamento do Firebase */}
        <TouchableOpacity 
          style={styles.botaoEntrar} 
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotaoEntrar}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Botão Google (Muito comum no IFTM usando Firebase) */}
        <TouchableOpacity style={styles.botaoGoogle}>
          <Text style={styles.textoBotaoGoogle}>🌐 Entrar com o Google</Text>
        </TouchableOpacity>

        {/* Link de Cadastro */}
        <View style={styles.footerRow}>
          <Text style={styles.textoFooter}>Não tem uma conta? </Text>
          <TouchableOpacity>
            <Text style={styles.linkCadastro}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  logoEmoji: {
    fontSize: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
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
    marginTop: 12,
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
  },
  emojiInput: {
    fontSize: 18,
    marginRight: 8,
    bottom: 2,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    paddingBottom: 4,
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
