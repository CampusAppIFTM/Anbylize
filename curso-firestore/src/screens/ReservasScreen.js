import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { buscarDados } from "../services/anbylizeService";

function formatarData(data) {
  const date = data?.toDate?.() ?? (typeof data?.seconds === "number" ? new Date(data.seconds * 1000) : null);
  return date?.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarDuracao(duracao) {
  if (!duracao) return null;
  return `${duracao} ${Number(duracao) === 1 ? "hora" : "horas"}`;
}

const Linha = ({ rotulo, valor, vazio }) => (
  <View style={estilos.linha}>
    <Text style={estilos.rotulo}>{rotulo}</Text>
    <Text style={[estilos.valor, !valor && estilos.valorVazio]}>{valor || vazio}</Text>
  </View>
);

const CardReserva = ({ reserva }) => {
  const estudantes = reserva.lista_estudantes ?? [];

  return (
    <View style={estilos.card}>
      <View style={estilos.cabecalho}>
        {reserva.modalidade ? <Text style={estilos.modalidade}>{reserva.modalidade}</Text> : null}
        <Text style={estilos.titulo}>{reserva.descricao?.trim() || "Sem descrição"}</Text>
      </View>

      <View style={estilos.corpo}>
        <Linha rotulo="Data" valor={formatarData(reserva.data)} vazio="Não informada" />
        <Linha rotulo="Duração" valor={formatarDuracao(reserva.duracao)} vazio="Não informada" />
        <Linha rotulo="Responsável" valor={reserva.responsavel} vazio="Não informado" />

        {estudantes.length > 0 ? (
          <View style={estilos.estudantes}>
            <Text style={estilos.rotulo}>Estudantes</Text>
            <View style={estilos.chips}>
              {estudantes.map((nome, indice) => (
                <View key={indice} style={estilos.chip}>
                  <Text style={estilos.textoChip}>{nome}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Linha rotulo="Estudantes" vazio="Nenhum informado" />
        )}
      </View>
    </View>
  );
};

const ReservasScreen = () => {
  const [reservas, setReservas] = useState(null); // sucesso
  const [carregando, setCarregando] = useState(true); // começa carregando
  const [erro, setErro] = useState(null); // erro

  async function carregar() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarDados();
      setReservas(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      // roda no sucesso E no erro
      setCarregando(false);
    }
  }
  useEffect(() => {
    carregar();
  }, []); // [] = uma única vez, quando a tela abre
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

  /*
  {
    id: 'hClQvoT0WL4eGFxoJ0Xw',
    lista_estudantes: [ 'Joyce', 'Luiza', 'Andressa' ],
    responsavel: 'professor',
    descricao: 'treino\n',
    duracao: 2,
    modalidade: 'futebol',
    data: Timestamp { seconds: 1793898600, nanoseconds: 0 }
  }
*/

  return (
    <FlatList
      data={reservas}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={estilos.lista}
      renderItem={({ item }) => <CardReserva reserva={item} />}
    />
  );
};
export default ReservasScreen;

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  lista: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.18)",
  },
  cabecalho: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#1d4ed8",
  },
  modalidade: {
    marginBottom: 4,
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  titulo: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  corpo: {
    padding: 16,
    gap: 12,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  rotulo: {
    color: "#64748b",
    fontSize: 14,
  },
  valor: {
    flexShrink: 1,
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  valorVazio: {
    color: "#64748b",
    fontWeight: "400",
  },
  estudantes: {
    gap: 8,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#dbeafe",
  },
  textoChip: {
    color: "#1d4ed8",
    fontSize: 13,
    fontWeight: "600",
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
