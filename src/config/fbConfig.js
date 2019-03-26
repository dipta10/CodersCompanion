// Initialize Firebase

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyBqO0islMCaXlSEATP2IiBbiAafp7ijZLk",
  authDomain: "coders-companion-v1.firebaseapp.com",
  databaseURL: "https://coders-companion-v1.firebaseio.com",
  projectId: "coders-companion-v1",
  storageBucket: "",
  messagingSenderId: "950809573625"
};
firebase.initializeApp(config);

firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;
