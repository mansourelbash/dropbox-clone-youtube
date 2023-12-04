import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2Z3Vxxcoz1HLpR_C_563Wm_xNhBoiNgk",
  authDomain: "dropbox-clone-c187a.firebaseapp.com",
  projectId: "dropbox-clone-c187a",
  storageBucket: "dropbox-clone-c187a.appspot.com",
  messagingSenderId: "324756461624",
  appId: "1:324756461624:web:0342084b9b2caba9a32ecd",
  measurementId: "G-ZGJWTLER9L"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage};