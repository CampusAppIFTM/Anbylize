import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Cole aqui o objeto que o console mostrou na etapa 1
const firebaseConfig = {
    apiKey: "AIzaSyBO1-HtNlB8AnxeyVhxVEc6t3jCox_nFcE",
    authDomain: "iftm-11787.firebaseapp.com",
    projectId: "iftm-11787",
    storageBucket: "iftm-11787.firebasestorage.app",
    messagingSenderId: "100583569508",
    appId: "1:100583569508:web:86a5595f7dd245bace4771",
    measurementId: "G-D25RVD3CJW"
};

const app = initializeApp(firebaseConfig);

// A "porta de entrada" do banco.
// Todo acesso ao Firestore passa por ela.
export const db = getFirestore(app);
