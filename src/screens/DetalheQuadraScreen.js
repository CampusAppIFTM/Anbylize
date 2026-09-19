import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function DetalheQuadraScreen() {
  return (
    <View style={styles.container}>
      {/* Topo Escuro */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}><Text style={{ color: '#FFF' }}>←</Text></TouchableOpacity>
        <View style={styles.logoTopo}><Text style={{ fontSize: 24 }}>🏟️</Text></View>
        <Text style={styles.tituloQuadra}>Quadra Poliesportiva</Text>
        
        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.tag}><Text style={styles.tagText}>🔮 Picobol</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>🏀 Basquete</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>⚽ Futebol</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>🏐 Vôlei</Text></View>
        </View>
      </View>

      {/* Info Fixo Branco */}
      <View style={styles.infoFixo}>
        <Text style={styles.infoText}>📍 Bloco A - Térreo</Text>
        <Text style={styles.infoText}>👥 20 vagas/hora</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Seção Escolha a data */}
        <Text style={styles.secaoTitulo}>Escolha a data</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carrosselDatas}>
          <View style={[styles.cardData, styles.cardDataAtivo]}>
            <Text style={styles.textDataDiaAtivo}>TER</Text>
            <Text style={styles.textDataNumeroAtivo}>30</Text>
            <Text style={styles.textDataMesAtivo}>JUN</Text>
          </View>
          {['QUA\n1\nJUL', 'QUI\n2\nJUL', 'SEX\n3\nJUL', 'SAB\n4\nJUL'].map((item, idx) => {
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

        {/* Filtrar por Esporte */}
        <Text style={styles.secaoTitulo}>🎚️ Filtrar por esporte</Text>
        <View style={styles.filtrosRow}>
          <View style={[styles.filtroTag, styles.filtroTagAtivo]}><Text style={styles.filtroTagTextAtivo}>Todos</Text></View>
          <View style={styles.filtroTag}><Text style={styles.filtroTagText}>🔮 Picobol</Text></View>
          <View style={styles.filtroTag}><Text style={styles.filtroTagText}>🏀 Basquete</Text></View>
          <View style={styles.filtroTag}><Text style={styles.filtroTagText}>⚽ Futebol</Text></View>
          <View style={styles.filtroTag}><Text style={styles.filtroTagText}>🏐 Vôlei</Text></View>
        </View>

        {/* Listagem de Horários */}
        <Text style={styles.secaoTitulo}>Horários disponíveis — Terça, 30 de junho</Text>
        <TouchableOpacity style={styles.cardHorarioDisponivel}>
          <Text style={styles.textoHoraCard}>11:00</Text>
          <Text style={styles.textoEsporteCard}>Futebol</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F5' },
  header: { backgroundColor: '#112A1D', paddingTop: 50, alignItems: 'center', paddingBottom: 24, paddingHorizontal: 20 },
  backButton: { position: 'absolute', left: 20, top: 50, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  logoTopo: { width: 55, height: 55, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  tituloQuadra: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tag: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, margin: 3 },
  tagText: { fontSize: 11, color: '#E8EFEA' },
  infoFixo: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFFFFF', marginHorizontal: 20, borderRadius: 14, padding: 12, marginTop: -15, elevation: 3 },
  infoText: { fontSize: 14, color: '#555', fontWeight: '500' },
  scrollContent: { padding: 20 },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: '#112A1D', marginTop: 16, marginBottom: 12 },
  carrosselDatas: { flexDirection: 'row', marginBottom: 10 },
  cardData: { backgroundColor: '#FFFFFF', width: 62, height: 75, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10, borderWidth: 1, borderColor: '#EEE' },
  cardDataAtivo: { backgroundColor: '#112A1D', borderColor: '#112A1D' },
  textDataDia: { fontSize: 11, color: '#666', fontWeight: 'bold' },
  textDataNumero: { fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 1 },
  textDataMes: { fontSize: 10, color: '#999' },
  textDataDiaAtivo: { fontSize: 11, color: '#A3B899', fontWeight: 'bold' },
  textDataNumeroAtivo: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  textDataMesAtivo: { fontSize: 10, color: '#A3B899' },
  filtrosRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  filtroTag: { backgroundColor: '#EBEFECE', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 8 },
  filtroTagAtivo: { backgroundColor: '#112A1D' },
  filtroTagText: { fontSize: 13, color: '#555' },
  filtroTagTextAtivo: { fontSize: 13, color: '#FFF', fontWeight: 'bold' },
  cardHorarioDisponivel: { backgroundColor: '#FFFFFF', borderRadius: 12, width: 100, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEF2EE', elevation: 1 },
  textoHoraCard: { fontSize: 16, fontWeight: 'bold', color: '#112A1D' },
  textoEsporteCard: { fontSize: 12, color: '#666', marginTop: 2 }
});
