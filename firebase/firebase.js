import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebaseConfig from "./config";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { app, db, auth };