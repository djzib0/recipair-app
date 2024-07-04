import { useState} from "react";
// types import
import { Recipe, ShopList, ShopListIngredient } from "../types/types";
// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, get, update, remove} from 'firebase/database'


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
const shopListsInDB = ref(database, 'shoplists')

export default function useDatabase() {
    const [fetchedData, setFechtedData] = useState([]);
    const [recipeFetchedData, setRecipeFetchedData] = useState<Recipe>();
    const [shopListFetchedData, setShopListFetchedData] = useState<ShopList>();

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

    async function editRecipe(obj: Recipe, id: string | undefined) {
        const exactItem = `recipes/${id}`
        update(ref(database, exactItem), obj)
    }

    async function getShopListsData() {
        onValue(shopListsInDB, (snapshot) => {
            const data = snapshot.val();
            setFechtedData(data)
        })
    }

    async function getShopListData(id: string | undefined) {
        const snapshot = await get(ref(database, `shoplists/${id}`))
        const data = await snapshot.val();
        setShopListFetchedData(data);
    }

    async function addShopList(obj: ShopList) {
        push(shopListsInDB, obj)
    }

    async function toggleShopListIngredientIsPurchased(shopListIndex: string | undefined, ingredientIndex: number | undefined, newObj: ShopListIngredient) {
        let newIsPurchased: boolean;
        if (newObj.isPurchased) {
            newIsPurchased = false;
        } else {
            newIsPurchased = true;
        }
        const exactItem = `shoplists/${shopListIndex}/ingredients/${ingredientIndex}`
        update(ref(database, exactItem), {...newObj, isPurchased: newIsPurchased})
        getShopListData(shopListIndex)
    }

    const deleteShopList = async (shopListId: string | undefined) => {
        const exactItem = `shoplists/${shopListId}`
        remove(ref(database, exactItem))
    }

    const addNotShopListIngredient = async (shopListId: string | undefined, newObj: ShopListIngredient) => {
        const exactItem = `shoplists/${shopListId}/ingredients`
        const snapshot = await get(ref(database, `shoplists/${shopListId}`))
        let data = await snapshot.val();
        if (data) {
            const newIngredientsArr: ShopListIngredient[] = data.ingredients;
            newIngredientsArr.push({...newObj})
            update(ref(database, exactItem), {...newIngredientsArr})
        }
    }

    return {
        fetchedData,
        recipeFetchedData,
        shopListFetchedData,
        getRecipesData,
        addRecipe,
        getRecipeData,
        editRecipe,
        getShopListsData,
        addShopList,
        getShopListData,
        toggleShopListIngredientIsPurchased,
        deleteShopList,
        addNotShopListIngredient
    }
}

