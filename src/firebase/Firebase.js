import firebase from "firebase"

const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAcAJbwxS2swmD1Mk2uJXtirf0ASqcO6lo",
    authDomain: "messenger-facebook-clone-9b112.firebaseapp.com",
    databaseURL: "https://messenger-facebook-clone-9b112-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "messenger-facebook-clone-9b112",
    storageBucket: "messenger-facebook-clone-9b112.appspot.com",
    messagingSenderId: "860156602349",
    appId: "1:860156602349:web:f8214b67a908af6bbb29e4",
    measurementId: "G-K0HE4D58P9"
})

const db = FirebaseApp.firestore()

export default db