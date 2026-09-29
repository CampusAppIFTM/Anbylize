import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';

// Recebemos a propriedade 'navigation' fornecida pelo React Navigation
export default function CadastroScreen({ navigation }) {
  // Estados para guardar o que o usuário digita nos campos
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!email.trim() || !whatsapp || !cpf || !senha || !confirmarSenha) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro nas senhas', 'As senhas digitadas não são iguais.');
      return;
    }

    setCarregando(true);
    try {
      console.log('Tentando cadastrar:', email.trim());
      // Aqui você adicionará a lógica do Firebase futuramente
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message || 'Houve um problema.');
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
        
        {/* Detalhe da Onda Verde Escuro no Topo */}
        <View style={styles.ondaTopo} />

        {/* Conteúdo do Formulário */}
        <View style={styles.content}>
          <Text style={styles.titulo}>Criar Conta</Text>

          {/* Campo Email Institucional */}
          <Text style={styles.label}>Email Institucional</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiIcon}>✉️</Text>
            <TextInput 
              style={styles.input} 
              placeholder="seu.email@escola.edu.br" 
              placeholderTextColor="#AAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          {/* Campo WhatsApp */}
          <Text style={styles.label}>WhatsApp</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiIcon}>📞</Text>
            <TextInput 
              style={styles.input} 
              placeholder="(00) 00000-0000" 
              placeholderTextColor="#AAA"
              value={whatsapp}
              onChangeText={setWhatsapp}
              keyboardType="phone-pad"
              returnKeyType="next"
            />
          </View>

          {/* Campo CPF */}
          <Text style={styles.label}>CPF</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiIcon}>💳</Text>
            <TextInput 
              style={styles.input} 
              placeholder="000.000.000-00" 
              placeholderTextColor="#AAA"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiIcon}>🔒</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#AAA"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              returnKeyType="next"
            />
          </View>

          {/* Campo Confirmar Senha */}
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.emojiIcon}>🔒</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#AAA"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              returnKeyType="done"
              onSubmitEditing={handleCadastro}
            />
          </View>

          {/* Botão Criar Conta */}
          <TouchableOpacity 
            style={styles.botaoCriar} 
            onPress={handleCadastro}
            disabled={carregando}
            activeOpacity={0.8}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoBotaoCriar}>Criar conta</Text>
            )}
          </TouchableOpacity>

          {/* Link para Voltar para o Login */}
          <View style={styles.footerRow}>
            <Text style={styles.textoFooter}>Já tem uma conta? </Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login')} // Redireciona de volta para a rota de Login
            >
              <Text style={styles.linkLogin}>Faça login</Text>
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
    paddingBottom: 40,
  },
  ondaTopo: {
    backgroundColor: '#112A1D',
    height: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#112A1D',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#112A1D',
    height: 48,
    marginBottom: 8,
  },
  emojiIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333333',
  },
  botaoCriar: {
    backgroundColor: '#112A1D',
    borderRadius: 25,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textoBotaoCriar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  textoFooter: {
    color: '#333333',
    fontSize: 14,
  },
  linkLogin: {
    color: '#112A1D',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
