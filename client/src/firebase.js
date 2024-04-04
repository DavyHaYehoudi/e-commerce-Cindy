import { initializeApp } from "firebase/app";
// import {getStorage} from "firebas"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD-Cid-NmzSu3ExpA5AJGfjDm7IMyKen2A",
  authDomain: "noralyapreprod.firebaseapp.com",
  projectId: "noralyapreprod",
  storageBucket: "noralyapreprod.appspot.com",
  messagingSenderId: "733876327234",
  appId: "1:733876327234:web:e7c625fcfcf14eb1bd6edb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)