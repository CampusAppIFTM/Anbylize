// Horário de funcionamento do espaço esportivo, em horas cheias.
// Os horários vagos são calculados dentro desta janela.
export const HORA_ABERTURA = 7;
export const HORA_FECHAMENTO = 22;

const NOMES_DOS_DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const MS_POR_HORA = 60 * 60 * 1000;

// Treinamentos e atividades curriculares têm prioridade sobre as demais reservas.
// O \b evita falsos positivos como "Paula" e "extracurricular".
const ATIVIDADE_PRIORITARIA = /\b(trein|aula|curricular|disciplina)/i;

function paraDate(data) {
  return data?.toDate?.() ?? (typeof data?.seconds === "number" ? new Date(data.seconds * 1000) : null);
}

function horaDoDia(dia, hora) {
  const resultado = new Date(dia);
  resultado.setHours(hora, 0, 0, 0);
  return resultado;
}

export function somarDias(data, dias) {
  const resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

function indiceNaSemana(data) {
  return (data.getDay() + 6) % 7; // segunda = 0, domingo = 6
}

function inicioDaSemana(data) {
  return somarDias(horaDoDia(data, 0), -indiceNaSemana(data));
}

export function diasDaSemana(dia) {
  const segunda = inicioDaSemana(dia);
  return Array.from({ length: 7 }, (_, indice) => somarDias(segunda, indice));
}

export function mesmoDia(a, b) {
  return a.toDateString() === b.toDateString();
}

export function nomeDoDia(data) {
  return NOMES_DOS_DIAS[indiceNaSemana(data)];
}

export function formatarHora(data) {
  return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function formatarDiaMes(data) {
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

// Uma reserva fica em conflito quando sobrepõe outra de prioridade igual ou maior.
// Assim, um treinamento não perde o horário para uma atividade comum.
function temConflito(reserva, todas) {
  return todas.some(
    outra =>
      outra.id !== reserva.id &&
      outra.inicio < reserva.fim &&
      reserva.inicio < outra.fim &&
      (outra.prioritaria || !reserva.prioritaria),
  );
}

// Converte os documentos do Firestore. Sem data ou duração não há como posicionar
// a reserva na grade, então ela só entra na contagem de incompletas.
export function normalizarReservas(documentos) {
  const reservas = [];
  let incompletas = 0;

  for (const documento of documentos) {
    const inicio = paraDate(documento.data);
    const horas = Number(documento.duracao);

    if (!inicio || !(horas > 0)) {
      incompletas += 1;
      continue;
    }

    const descricao = documento.descricao?.trim() ?? "";
    reservas.push({
      id: documento.id,
      inicio,
      fim: new Date(inicio.getTime() + horas * MS_POR_HORA),
      modalidade: documento.modalidade?.trim().toLowerCase() || "sem modalidade",
      descricao,
      responsavel: documento.responsavel,
      estudantes: documento.lista_estudantes ?? [],
      prioritaria: ATIVIDADE_PRIORITARIA.test(descricao),
    });
  }

  return {
    reservas: reservas.map(reserva => ({ ...reserva, emConflito: temConflito(reserva, reservas) })),
    incompletas,
  };
}

// Monta a sequência do dia, intercalando reservas e intervalos vagos.
// Um intervalo que já passou não é listado como vago.
export function linhaDoTempoDoDia(dia, reservas, agora = new Date()) {
  const fechamento = horaDoDia(dia, HORA_FECHAMENTO);
  const doDia = reservas
    .filter(reserva => mesmoDia(reserva.inicio, dia))
    .sort((a, b) => a.inicio - b.inicio || b.prioritaria - a.prioritaria);

  const itens = [];
  let cursor = new Date(Math.max(horaDoDia(dia, HORA_ABERTURA), agora));

  const adicionarVago = fim => {
    if (cursor < fechamento && cursor < fim) {
      const fimDoVago = new Date(Math.min(fim, fechamento));
      itens.push({ tipo: "vago", id: `vago-${cursor.getTime()}`, inicio: cursor, fim: fimDoVago });
    }
  };

  for (const reserva of doDia) {
    adicionarVago(reserva.inicio);
    itens.push({ tipo: "reservado", ...reserva });
    cursor = new Date(Math.max(cursor, reserva.fim));
  }
  adicionarVago(fechamento);

  return itens;
}

// Agrupa as reservas da semana por modalidade, em ordem cronológica.
export function cronogramaSemanal(dia, reservas) {
  const segunda = inicioDaSemana(dia);
  const proximaSegunda = somarDias(segunda, 7);
  const grupos = new Map();

  reservas
    .filter(reserva => reserva.inicio >= segunda && reserva.inicio < proximaSegunda)
    .sort((a, b) => a.inicio - b.inicio)
    .forEach(reserva => {
      grupos.set(reserva.modalidade, [...(grupos.get(reserva.modalidade) ?? []), reserva]);
    });

  return [...grupos]
    .map(([modalidade, reservasDaModalidade]) => ({ modalidade, reservas: reservasDaModalidade }))
    .sort((a, b) => a.modalidade.localeCompare(b.modalidade, "pt-BR"));
}
