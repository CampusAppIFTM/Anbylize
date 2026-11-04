import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function buscarDados() {
    const snapshot = await getDocs(consulta);
    const itens = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
    }));
    return itens;
}
