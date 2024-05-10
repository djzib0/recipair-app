// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcSL-2PoF2_4nR_M7vGGy3OyM7VXj6W8I",
  authDomain: "recipair-d6259.firebaseapp.com",
  databaseURL: "https://recipair-d6259-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipair-d6259",
  storageBucket: "recipair-d6259.appspot.com",
  messagingSenderId: "620102378428",
  appId: "1:620102378428:web:abb29359fc5f5b934681b9",
  measurementId: "G-95Q5WJH19L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemsInDB = ref(database, 'testItems')

