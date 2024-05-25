import { useState} from "react";
// types import
import { Recipe } from "../types/types";
// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, get} from 'firebase/database'


// Firebase config
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
const recipesInDB = ref(database, 'recipes')

export default function useDatabase() {
    const [fetchedData, setFechtedData] = useState([]);
    const [recipeFetchedData, setRecipeFetchedData] = useState<Recipe>();

    async function getRecipesData() {
        onValue(recipesInDB, (snapshot) => {
            const data = snapshot.val();
            setFechtedData(data)
        })
    }

    async function getRecipeData(id: string | undefined) {
        const snapshot = await get(ref(database, `recipes/${id}`))
        const data = await snapshot.val();
        setRecipeFetchedData(data)
    }

    async function addRecipe(obj: Recipe) {
        push(recipesInDB, obj)
    }

    return {
        fetchedData,
        recipeFetchedData,
        getRecipesData,
        addRecipe,
        getRecipeData
    }
}

