import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAr52wc_ZeBteXe0BIJ2MuWVHL4vtupOuE",
  authDomain: "ess-mm.firebaseapp.com",
  databaseURL: "https://ess-mm.firebaseio.com",
  projectId: "ess-mm",
  storageBucket: "ess-mm.appspot.com",
  messagingSenderId: "270260847334",
  appId: "1:270260847334:web:16efdd60cba9cb2f157127",
};

class Firebase {
  auth: app.auth.Auth;
  db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  currentUser = () => this.db.doc("/current/cS9RkcTxkcZl0CgkizIL");
  currentEm = () => this.db.doc("/current/0cHjjrorjwWsfEHcfknx");

  ems = () => this.db.collection("/colors");

  user = (uid: any) => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");
}

export default Firebase;
