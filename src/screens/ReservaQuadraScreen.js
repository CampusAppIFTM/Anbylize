import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function ReservaQuadraScreen() {
  return (
    <View style={styles.container}>
      {/* Topo Verde Escuro com Status */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Reserva de Quadra</Text>
            <Text style={styles.headerSub}>Reserve seu horário</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={{ fontSize: 18 }}>➡️</Text>
          </TouchableOpacity>
        </View>

        {/* Cards de Indicadores */}
        <View style={styles.indicadoresRow}>
          <View style={styles.cardIndicador}>
            <Text style={styles.iconIndicador}>🕒</Text>
            <View>
              <Text style={styles.numeroIndicador}>1</Text>
              <Text style={styles.textoIndicador}>horários hoje</Text>
            </View>
          </View>
          <View style={styles.cardIndicador}>
            <Text style={styles.iconIndicador}>📅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.numeroIndicador}>0</Text>
              <Text style={styles.textoIndicador}>minhas reservas</Text>
            </View>
            <Text style={styles.setaIndicador}>›</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Card da Quadra Poliesportiva */}
        <View style={styles.cardQuadra}>
          <View style={styles.quadraHeaderRow}>
            <View style={styles.logoQuadra}><Text style={{ fontSize: 24 }}>🏟️</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.tituloQuadra}>Quadra Poliesportiva</Text>
              
              {/* Tags de Esportes */}
              <View style={styles.tagsRow}>
                <View style={styles.tag}><Text style={styles.tagText}>🔮 Picobol</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>🏀 Basquete</Text></View>
                <View style={styles.tagsRowBreak} />
                <View style={styles.tag}><Text style={styles.tagText}>⚽ Futebol</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>🏐 Vôlei</Text></View>
              </View>
            </View>
          </View>

          <View style={styles.infoLocRow}>
            <Text style={styles.infoLocText}>📍 Bloco A - Térreo</Text>
            <Text style={styles.infoLocText}>👥 20 vagas/hora</Text>
          </View>

          <TouchableOpacity style={styles.botaoReservar}>
            <Text style={styles.textoBotaoReservar}>📅 Reservar horário</Text>
          </TouchableOpacity>
        </View>

        {/* Seção Horários de Hoje */}
        <Text style={styles.secaoTitulo}>Horários de hoje</Text>
        <View style={styles.cardHorarioHoje}>
          <View style={styles.statusBolinha} />
          <Text style={styles.textoHorarioHoje}>11:00 - 13:00  •  Futebol</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F5' },
  header: { backgroundColor: '#112A1D', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerSub: { fontSize: 14, color: '#A3B899', marginTop: 2 },
  logoutButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  indicadoresRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardIndicador: { flex: 0.48, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center' },
  iconIndicador: { fontSize: 22, marginRight: 10 },
  numeroIndicador: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  textoIndicador: { fontSize: 12, color: '#A3B899' },
  setaIndicador: { color: '#A3B899', fontSize: 18, marginLeft: 'auto' },
  content: { padding: 20 },
  cardQuadra: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 24, elevation: 2 },
  quadraHeaderRow: { flexDirection: 'row', alignItems: 'flex-start' },
  logoQuadra: { width: 50, height: 50, backgroundColor: '#112A1D', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tituloQuadra: { fontSize: 18, fontWeight: 'bold', color: '#112A1D' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  tagsRowBreak: { width: '100%', height: 6 },
  tag: { backgroundColor: '#E8EFEA', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginRight: 6 },
  tagText: { fontSize: 12, color: '#3A5F43', fontWeight: '500' },
  infoLocRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 12 },
  infoLocText: { fontSize: 13, color: '#666' },
  botaoReservar: { backgroundColor: '#112A1D', borderRadius: 12, height: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  textoBotaoReservar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  secaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#112A1D', marginBottom: 12 },
  cardHorarioHoje: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', width: '60%' },
  statusBolinha: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'green', marginRight: 10 },
  textoHorarioHoje: { fontSize: 14, color: '#333', fontWeight: '500' },
});
