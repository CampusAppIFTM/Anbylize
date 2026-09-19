import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function CadastroScreen() {
  // Estados para guardar o que o usuário digita nos campos
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Detalhe da Onda Verde Escuro no Topo */}
      <View style={styles.ondaTopo} />

      {/* Conteúdo do Formulário */}
      <View style={styles.content}>
        <Text style={styles.titulo}>Criar Conta</Text>

        {/* Campo Email Institutional */}
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
          />
        </View>

        {/* Botão Criar Conta */}
        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotaoCriar}>Criar conta</Text>
        </TouchableOpacity>

        {/* Link para Voltar para o Login */}
        <View style={styles.footerRow}>
          <Text style={styles.textoFooter}>Já tem uma conta? </Text>
          <TouchableOpacity>
            <Text style={styles.linkLogin}>Faça login</Text>
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
    paddingBottom: 40,
  },
  ondaTopo: {
    backgroundColor: '#112A1D', // Verde escuro idêntico ao da imagem
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
    borderBottomColor: '#112A1D', // Linha verde escura abaixo do campo
    paddingBottom: 4,
    marginBottom: 8,
  },
  emojiIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#555555',
    bottom: 2,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333333',
  },
  botaoCriar: {
    backgroundColor: '#112A1D', // Fundo verde escuro do botão
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
