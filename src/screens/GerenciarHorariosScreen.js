import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function GerenciarHorariosScreen() {
  return (
    <View style={styles.container}>
      {/* Topo Escuro */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}><Text style={{ color: '#FFF' }}>←</Text></TouchableOpacity>
        <Text style={styles.tituloHeader}>Gerenciar horários</Text>
        <Text style={styles.subHeader}>Defina os horários disponíveis para reserva</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Escolha da Data */}
        <Text style={styles.secaoTitulo}>Data</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
          <View style={[styles.cardData, styles.cardDataAtivo]}>
            <Text style={styles.textDataDiaAtivo}>TER</Text>
            <Text style={styles.textDataNumeroAtivo}>30</Text>
            <Text style={styles.textDataMesAtivo}>JUN</Text>
          </View>
          {['QUA\n1\nJUL', 'QUI\n2\nJUL', 'SEX\n3\nJUL'].map((item, idx) => {
            const [dia, num, mes] = item.split('\n');
            return (
              <View key={idx} style={styles.cardData}>
                <Text style={styles.textDataDia}>{dia}</Text>
                <Text style={styles.textDataNumero}>{num}</Text>
                <Text style={styles.textDataMes}>{mes}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Card Formulário Adicionar Horário */}
        <View style={styles.cardForm}>
          <Text style={styles.formTitulo}>Adicionar horário</Text>
          
          {/* Inputs de Horários simulados como botões seletores */}
          <View style={styles.rowInputs}>
            <View style={{ flex: 0.45 }}>
              <Text style={styles.labelInput}>Início</Text>
              <TouchableOpacity style={styles.seletorHora}>
                <Text style={styles.seletorTexto}>07:00</Text>
                <Text style={styles.setaSeltor}>⋁</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textoEntreInputs}>até</Text>
            <View style={{ flex: 0.45 }}>
              <Text style={styles.labelInput}>Fim</Text>
              <TouchableOpacity style={styles.seletorHora}>
                <Text style={styles.seletorTexto}>08:00</Text>
                <Text style={styles.setaSeltor}>⋁</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seleção de Esporte */}
          <Text style={styles.labelInput}>Esporte</Text>
          <View style={styles.esportesFormRow}>
            <View style={styles.tagEsporte}><Text style={styles.tagEsporteText}>🔮 Picobol</Text></View>
            <View style={styles.tagEsporte}><Text style={styles.tagEsporteText}>🏀 Basquete</Text></View>
            <View style={[styles.tagEsporte, styles.tagEsporteAtiva]}><Text style={styles.tagEsporteTextAtiva}>⚽ Futebol</Text></View>
            <View style={styles.tagEsporte}><Text style={styles.tagEsporteText}>🏐 Vôlei</Text></View>
          </View>

          {/* Botão Adicionar */}
          <TouchableOpacity style={styles.botaoAdicionar}>
            <Text style={styles.textoBotaoAdicionar}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista Horários Cadastrados */}
        <Text style={styles.secaoTitulo}>Horários cadastrados (1)</Text>
        <View style={styles.cardHorarioCadastrado}>
          <Text style={styles.iconRelogio}>🕒</Text>
          <Text style={styles.textoHoraCadastrada}>11:00 - 13:00</Text>
          <View style={styles.tagFutebolCadastrada}><Text style={styles.textoTagFutebol}>⚽ Futebol</Text></View>
          <TouchableOpacity style={styles.botaoDeletar}>
            <Text style={{ color: '#E11D48', fontWeight: 'bold' }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F5' },
  header: { backgroundColor: '#112A1D', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 24 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  tituloHeader: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  subHeader: { fontSize: 13, color: '#A3B899', marginTop: 4 },
  content: { padding: 20 },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: '#112A1D', marginBottom: 12, marginTop: 10 },
  cardData: { backgroundColor: '#FFFFFF', width: 62, height: 75, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10, borderWidth: 1, borderColor: '#EEE' },
  cardDataAtivo: { backgroundColor: '#112A1D', borderColor: '#112A1D' },
  textDataDia: { fontSize: 11, color: '#666', fontWeight: 'bold' },
  textDataNumero: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  textDataMes: { fontSize: 10, color: '#999' },
  textDataDiaAtivo: { fontSize: 11, color: '#A3B899', fontWeight: 'bold' },
  textDataNumeroAtivo: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  textDataMesAtivo: { fontSize: 10, color: '#A3B899' },
  cardForm: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 1 },
  formTitulo: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 14 },
  rowInputs: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  labelInput: { fontSize: 13, color: '#666', marginBottom: 6, fontWeight: '500' },
  seletorHora: { backgroundColor: '#F4F6F5', borderRadius: 10, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  seletorTexto: { fontSize: 14, color: '#333', fontWeight: '500' },
  setaSeltor: { fontSize: 10, color: '#666' },
  textoEntreInputs: { fontSize: 14, color: '#999', marginTop: 18 },
  esportesFormRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  tagEsporte: { backgroundColor: '#F4F6F5', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, marginRight: 6, marginBottom: 6 },
  tagEsporteAtiva: { backgroundColor: '#112A1D' },
  tagEsporteText: { fontSize: 12, color: '#666' },
  tagEsporteTextAtiva: { fontSize: 12, color: '#FFF', fontWeight: 'bold' },
  botaoAdicionar: { backgroundColor: '#3A5F43', borderRadius: 12, height: 44, alignItems: 'center', justifyContent: 'center' },
  textoBotaoAdicionar: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  cardHorarioCadastrado: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  iconRelogio: { fontSize: 16, marginRight: 8 },
  textoHoraCadastrada: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  tagFutebolCadastrada: { backgroundColor: '#E8EFEA', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 12 },
  textoTagFutebol: { fontSize: 12, color: '#3A5F43', fontWeight: '500' },
  botaoDeletar: { marginLeft: 'auto', padding: 6 }
});
