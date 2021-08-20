import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBKTWSDPKCS8G-6lXIXPBkFUitOkglkuYQ',
  authDomain: 'music-b5399.firebaseapp.com',
  projectId: 'music-b5399',
  storageBucket: 'music-b5399.appspot.com',
  appId: '1:49174735382:web:1d2708121f40af10666337',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// any tasks related to storage
const storage = firebase.storage();

// creating a collection in firebase for storing data
const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
};
