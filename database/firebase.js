import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyDjTxP93cjYZy8LxmHUZncpRF8oc9ADFMA",
    authDomain: "agro-market-160c8.firebaseapp.com",
    projectId: "agro-market-160c8",
    storageBucket: "agro-market-160c8.appspot.com",
    messagingSenderId: "139033965875",
    appId: "1:139033965875:web:4da0392347c48abfd07a46",
    measurementId: "G-BPRPEZ2CRX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};