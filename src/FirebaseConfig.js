import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCvILQudzRPzPZ0TrZjW-RcUyGt3D8yFU",
  authDomain: "mindsoul-backend.firebaseapp.com",
  projectId: "mindsoul-backend",
  storageBucket: "mindsoul-backend.appspot.com",
  messagingSenderId: "772700176760",
  appId: "1:772700176760:web:821969e3ecfe1f703fc88d",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
