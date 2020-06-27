import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

/*import admin from "firebase-admin" 
import functions from "firebase-functions";*/

const prodConfig = {
  apiKey: "AIzaSyDxYas2TrN-I5WQRaLr-4925OXy1cNa6Tg",
  authDomain: "hdgroupadmin.firebaseapp.com",
  databaseURL: "https://hdgroupadmin.firebaseio.com",
  projectId: "hdgroupadmin",
  storageBucket: "hdgroupadmin.appspot.com",
  messagingSenderId: "877693703643",
  appId: "1:877693703643:web:1ffbaa3cd9868fede083fe"
};

const devConfig = {
  apiKey: "AIzaSyDxYas2TrN-I5WQRaLr-4925OXy1cNa6Tg",
  authDomain: "hdgroupadmin.firebaseapp.com",
  databaseURL: "https://hdgroupadmin.firebaseio.com",
  projectId: "hdgroupadmin",
  storageBucket: "hdgroupadmin.appspot.com",
  messagingSenderId: "877693703643",
  appId: "1:877693703643:web:1ffbaa3cd9868fede083fe"
};
//production
//development
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const fs = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, fs, store, googleProvider, firebase };
