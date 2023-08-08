import { initializeApp, getApps } from "firebase/app";

// ☆各プロジェクトの設定を記述
const firebaseConfig = {
  apiKey: "AIzaSyBrG81IZPRIE5TuFrP2rDmLwsh6lyQKkG0",
  authDomain: "linear-quasar-243800.firebaseapp.com",
  projectId: "linear-quasar-243800",
  storageBucket: "linear-quasar-243800.appspot.com",
  messagingSenderId: "98806472295",
  appId: "1:98806472295:web:9457ee388743cb8440bec2",
  measurementId: "G-RCJVE665C7"
};

if (!getApps().length) {
  initializeApp(firebaseConfig)
}