import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8MM3yg45Z1wtTunDqxQtP5kFL28jSiO8",
  authDomain: "whatsapp-clone-ubk.firebaseapp.com",
  projectId: "whatsapp-clone-ubk",
  storageBucket: "whatsapp-clone-ubk.appspot.com",
  messagingSenderId: "447747247125",
  appId: "1:447747247125:web:e422cf384e9724aad6921c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
