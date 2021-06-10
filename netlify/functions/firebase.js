const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyB1WrFAGHeEhLf-NENqJK2crWWyAZTcsMY",
  authDomain: "kiei451-final-8708b.firebaseapp.com",
  projectId: "kiei451-final-8708b",
  storageBucket: "kiei451-final-8708b.appspot.com",
  messagingSenderId: "556806065673",
  appId: "1:556806065673:web:8eabf0bdaa487d6ded72d8"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase