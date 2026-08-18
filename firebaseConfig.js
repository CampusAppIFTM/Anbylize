import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdRrsgHM8kXWRi8Qx8oKr7OHai6M68Wh0",
  authDomain: "anbylize.firebaseapp.com",
  projectId: "anbylize",
  storageBucket: "anbylize.firebasestorage.app",
  messagingSenderId: "813994495961",
  appId: "1:813994495961:web:24c96b8ffd4acad03c53c8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;