import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function buscarDados(consulta = collection(db, "dados")) {
  const snapshot = await getDocs(consulta);
  const itens = snapshot.docs.map(documento => ({
    id: documento.id,
    ...documento.data(),
  }));
  console.log(JSON.stringify(itens));
  return itens;
}
