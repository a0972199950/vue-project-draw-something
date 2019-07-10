import * as firebase from "firebase";

// 初始化firebase，傳入設定檔
firebase.initializeApp({
  apiKey: "AIzaSyAfqXn5KTjV6ptQxetVmPMJQGQoRzHTgv4",
  authDomain: "vue-draw-something.firebaseapp.com",
  databaseURL: "https://vue-draw-something.firebaseio.com",
  projectId: "vue-draw-something",
  storageBucket: "",
  messagingSenderId: "353268492373",
  appId: "1:353268492373:web:d18149bd74cef3e3"
})


// 導出firebase的auth模組
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

// 導出firebase的database模組
export const database = firebase.database();
