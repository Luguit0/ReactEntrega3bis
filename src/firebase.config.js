import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiIk_h_hF1VRMq8YRiDsRb2VlnjpoRUvU",
  authDomain: "blackstanley-1095c.firebaseapp.com",
  projectId: "blackstanley-1095c",
  storageBucket: "blackstanley-1095c.appspot.com",
  messagingSenderId: "504497961966",
  appId: "1:504497961966:web:a96e9b5e03a7ee5ce72cff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;