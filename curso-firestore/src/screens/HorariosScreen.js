import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { buscarDados } from "../services/anbylizeService";
import {
  cronogramaSemanal,
  diasDaSemana,
  formatarDiaMes,
  formatarHora,
  HORA_ABERTURA,
  HORA_FECHAMENTO,
  linhaDoTempoDoDia,
  mesmoDia,
  nomeDoDia,
  normalizarReservas,
  somarDias,
} from "../utils/horarios";

const ABAS = [
  { id: "horarios", titulo: "Horários" },
  { id: "cronograma", titulo: "Cronograma" },
];

function plural(quantidade, singular, varios) {
  return `${quantidade} ${quantidade === 1 ? singular : varios}`;
}

function detalhesDaReserva(reserva) {
  const estudantes = reserva.estudantes.length > 0 ? plural(reserva.estudantes.length, "estudante", "estudantes") : null;
  return [reserva.descricao, reserva.responsavel, estudantes].filter(Boolean).join(" · ");
}

const Etiqueta = ({ texto, estiloFundo, estiloTexto }) => (
  <View style={[estilos.etiqueta, estiloFundo]}>
    <Text style={[estilos.textoEtiqueta, estiloTexto]}>{texto}</Text>
  </View>
);

const EtiquetasDaReserva = ({ reserva }) => (
  <View style={estilos.etiquetas}>
    {reserva.prioritaria ? (
      <Etiqueta texto="Prioritária" estiloFundo={estilos.fundoPrioritaria} estiloTexto={estilos.textoPrioritaria} />
    ) : null}
    {reserva.emConflito ? (
      <Etiqueta texto="Conflito" estiloFundo={estilos.fundoConflito} estiloTexto={estilos.textoConflito} />
    ) : null}
  </View>
);

const LinhaDoHorario = ({ item }) => {
  const periodo = `${formatarHora(item.inicio)} – ${formatarHora(item.fim)}`;

  if (item.tipo === "vago") {
    return (
      <View style={[estilos.linhaHorario, estilos.linhaVaga]}>
        <View style={estilos.topoLinha}>
          <Text style={estilos.periodo}>{periodo}</Text>
          <Etiqueta texto="Vago" estiloFundo={estilos.fundoVago} estiloTexto={estilos.textoVago} />
        </View>
      </View>
    );
  }

  return (
    <View style={[estilos.linhaHorario, item.prioritaria ? estilos.linhaPrioritaria : estilos.linhaReservada]}>
      <View style={estilos.topoLinha}>
        <Text style={estilos.periodo}>{periodo}</Text>
        <Etiqueta texto="Reservado" estiloFundo={estilos.fundoReservado} estiloTexto={estilos.textoReservado} />
      </View>
      <Text style={estilos.nomeModalidade}>{item.modalidade}</Text>
      <Text style={estilos.detalhes}>{detalhesDaReserva(item)}</Text>
      <EtiquetasDaReserva reserva={item} />
    </View>
  );
};

const CardModalidade = ({ grupo }) => (
  <View style={estilos.card}>
    <View style={estilos.cabecalhoCard}>
      <Text style={estilos.tituloCard}>{grupo.modalidade}</Text>
      <Text style={estilos.subtituloCard}>{plural(grupo.reservas.length, "reserva na semana", "reservas na semana")}</Text>
    </View>
    {grupo.reservas.map((reserva, indice) => (
      <View key={reserva.id} style={[estilos.itemCronograma, indice > 0 && estilos.itemComDivisor]}>
        <Text style={estilos.periodo}>
          {`${nomeDoDia(reserva.inicio)} ${formatarDiaMes(reserva.inicio)} · ${formatarHora(reserva.inicio)} – ${formatarHora(reserva.fim)}`}
        </Text>
        <Text style={estilos.detalhes}>{detalhesDaReserva(reserva)}</Text>
        <EtiquetasDaReserva reserva={reserva} />
      </View>
    ))}
  </View>
);

const AvisoIncompletas = ({ quantidade }) =>
  quantidade > 0 ? (
    <Text style={estilos.aviso}>
      {quantidade === 1
        ? "1 reserva sem data ou duração não aparece nesta tela."
        : `${quantidade} reservas sem data ou duração não aparecem nesta tela.`}
    </Text>
  ) : null;

const HorariosScreen = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [dia, setDia] = useState(() => new Date());
  const [aba, setAba] = useState("horarios");

  async function carregar() {
    setCarregando(true);
    setErro(null);
    try {
      setDados(normalizarReservas(await buscarDados()));
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.textoErro}>{erro}</Text>
        <Pressable style={estilos.botao} onPress={carregar}>
          <Text style={estilos.textoBotao}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  const hoje = new Date();
  const semana = diasDaSemana(dia);
  const linhaDoTempo = linhaDoTempoDoDia(dia, dados.reservas);
  const vagos = linhaDoTempo.filter(item => item.tipo === "vago").length;
  const reservados = linhaDoTempo.length - vagos;

  return (
    <View style={estilos.tela}>
      <View style={estilos.topo}>
        <View style={estilos.navegacaoSemana}>
          <Pressable
            style={estilos.botaoSemana}
            onPress={() => setDia(somarDias(dia, -7))}
            accessibilityRole="button"
            accessibilityLabel="Semana anterior"
          >
            <FontAwesome name="chevron-left" size={16} color="#1d4ed8" />
          </Pressable>
          <Text style={estilos.tituloSemana}>
            {`${formatarDiaMes(semana[0])} – ${formatarDiaMes(semana[6])}`}
          </Text>
          <Pressable
            style={estilos.botaoSemana}
            onPress={() => setDia(somarDias(dia, 7))}
            accessibilityRole="button"
            accessibilityLabel="Próxima semana"
          >
            <FontAwesome name="chevron-right" size={16} color="#1d4ed8" />
          </Pressable>
        </View>

        <View style={estilos.abas}>
          {ABAS.map(({ id, titulo }) => (
            <Pressable
              key={id}
              style={[estilos.aba, aba === id && estilos.abaAtiva]}
              onPress={() => setAba(id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: aba === id }}
            >
              <Text style={[estilos.textoAba, aba === id && estilos.textoAbaAtiva]}>{titulo}</Text>
            </Pressable>
          ))}
        </View>

        {aba === "horarios" ? (
          <View style={estilos.dias}>
            {semana.map(diaDaSemana => {
              const selecionado = mesmoDia(diaDaSemana, dia);
              const temReserva = dados.reservas.some(reserva => mesmoDia(reserva.inicio, diaDaSemana));

              return (
                <Pressable
                  key={diaDaSemana.toDateString()}
                  style={[
                    estilos.dia,
                    mesmoDia(diaDaSemana, hoje) && estilos.diaHoje,
                    selecionado && estilos.diaSelecionado,
                  ]}
                  onPress={() => setDia(diaDaSemana)}
                  accessibilityRole="button"
                  accessibilityLabel={`${nomeDoDia(diaDaSemana)}, ${formatarDiaMes(diaDaSemana)}${temReserva ? ", com reservas" : ""}`}
                  accessibilityState={{ selected: selecionado }}
                >
                  <Text style={[estilos.nomeDia, selecionado && estilos.textoDiaSelecionado]}>{nomeDoDia(diaDaSemana)}</Text>
                  <Text style={[estilos.numeroDia, selecionado && estilos.textoDiaSelecionado]}>
                    {String(diaDaSemana.getDate()).padStart(2, "0")}
                  </Text>
                  <View style={[estilos.marcador, temReserva && estilos.marcadorAtivo, temReserva && selecionado && estilos.marcadorSelecionado]} />
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      {aba === "horarios" ? (
        <FlatList
          key="horarios"
          data={linhaDoTempo}
          keyExtractor={item => item.id}
          contentContainerStyle={estilos.lista}
          ListHeaderComponent={
            linhaDoTempo.length > 0 ? (
              <Text style={estilos.resumo}>
                {`${plural(vagos, "vago", "vagos")} · ${plural(reservados, "reservado", "reservados")} · aberto das ${HORA_ABERTURA}h às ${HORA_FECHAMENTO}h`}
              </Text>
            ) : null
          }
          ListEmptyComponent={<Text style={estilos.vazio}>O horário de funcionamento deste dia já terminou.</Text>}
          ListFooterComponent={<AvisoIncompletas quantidade={dados.incompletas} />}
          renderItem={({ item }) => <LinhaDoHorario item={item} />}
        />
      ) : (
        <FlatList
          key="cronograma"
          data={cronogramaSemanal(dia, dados.reservas)}
          keyExtractor={grupo => grupo.modalidade}
          contentContainerStyle={estilos.lista}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma reserva nesta semana.</Text>}
          ListFooterComponent={<AvisoIncompletas quantidade={dados.incompletas} />}
          renderItem={({ item }) => <CardModalidade grupo={item} />}
        />
      )}
    </View>
  );
};
export default HorariosScreen;

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  topo: {
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.1)",
  },
  navegacaoSemana: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  botaoSemana: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  tituloSemana: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  abas: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
  },
  aba: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  abaAtiva: {
    backgroundColor: "#ffffff",
  },
  textoAba: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
  textoAbaAtiva: {
    color: "#1d4ed8",
  },
  dias: {
    flexDirection: "row",
    gap: 4,
  },
  dia: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
  },
  diaHoje: {
    borderColor: "#1d4ed8",
  },
  diaSelecionado: {
    backgroundColor: "#1d4ed8",
  },
  nomeDia: {
    color: "#64748b",
    fontSize: 12,
  },
  numeroDia: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  textoDiaSelecionado: {
    color: "#ffffff",
  },
  marcador: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  marcadorAtivo: {
    backgroundColor: "#1d4ed8",
  },
  marcadorSelecionado: {
    backgroundColor: "#ffffff",
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  resumo: {
    color: "#475569",
    fontSize: 13,
  },
  vazio: {
    paddingVertical: 32,
    color: "#64748b",
    textAlign: "center",
  },
  aviso: {
    paddingVertical: 8,
    color: "#64748b",
    fontSize: 13,
    textAlign: "center",
  },
  linhaHorario: {
    gap: 4,
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.12)",
  },
  linhaVaga: {
    borderLeftColor: "#15803d",
  },
  linhaReservada: {
    borderLeftColor: "#1d4ed8",
  },
  linhaPrioritaria: {
    borderLeftColor: "#b45309",
  },
  topoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  periodo: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "700",
  },
  nomeModalidade: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  detalhes: {
    color: "#475569",
    fontSize: 13,
  },
  etiquetas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  etiqueta: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  textoEtiqueta: {
    fontSize: 12,
    fontWeight: "600",
  },
  fundoVago: {
    backgroundColor: "#dcfce7",
  },
  textoVago: {
    color: "#166534",
  },
  fundoReservado: {
    backgroundColor: "#dbeafe",
  },
  textoReservado: {
    color: "#1d4ed8",
  },
  fundoPrioritaria: {
    backgroundColor: "#fef3c7",
  },
  textoPrioritaria: {
    color: "#92400e",
  },
  fundoConflito: {
    backgroundColor: "#fee2e2",
  },
  textoConflito: {
    color: "#b91c1c",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.18)",
  },
  cabecalhoCard: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#1d4ed8",
  },
  tituloCard: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  subtituloCard: {
    color: "#dbeafe",
    fontSize: 13,
  },
  itemCronograma: {
    gap: 4,
    padding: 16,
  },
  itemComDivisor: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#cbd5e1",
  },
  textoErro: {
    color: "#b91c1c",
    textAlign: "center",
  },
  botao: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1d4ed8",
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
