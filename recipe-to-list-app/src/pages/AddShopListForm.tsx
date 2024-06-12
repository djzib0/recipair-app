import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import ShopListRecipeItem from "../components/shopListRecipeItem/ShopListRecipeItem";
import ShopListItemModal from "../components/shopListItemModal/ShopListItemModal";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
import useModal from "../customHooks/useModal";
// react hook and zod imports
import { SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// icons import
import { BiArrowBack } from "react-icons/bi"
// type imports
import { Recipe, ShopListItem, ShopList} from "../types/types";

  // array with object for topnavbar
  const topNavbarItems = [
    {
      id: 1,
      icon: <BiArrowBack />,
      linkTo: '/shoplist'
    }
  ]

export default function AddShopListForm() {

  // utilize useDatabase custom hook
  const {
    getRecipesData,
    fetchedData
  } = useDatabase();

  // utilize useModal custom hook
  const {
    isAddToShopListModalOn,
    toggleAddToShopListModal,
    editedShopListItem,
  } = useModal();

  // state variables
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [shopList, setShopList] = useState<ShopListItem[]>();
  const [selectedRecipes, setSelectedRecipes] = useState<ShopListItem[]>([]);
  const [refreshedPage, setRefreshedPage] = useState(false);

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    // create an array of recipes
    const recipes: Recipe[] = [];
    // create an array from object (firebase fetched data is an object)
    for (let [id, recipe] of Object.entries(fetchedData)) {
      let recipeObj = recipe;
      Object.assign(recipeObj, {id: id})
      recipes.push(recipeObj)
    }

    // set recipes as a state variable
    setRecipesData(recipes)

    // map items to shopListItem    
    const shopListItemsArr = recipes && recipes.map((item) => {
      // if the item id is present in selectedRecipes, 
      // set the quantity to saved value, if not set default value
      // to 0.
      for (let selectedRecipe of selectedRecipes) {
        if (selectedRecipe.recipeId === item.id) {
          return {
            recipeId: item.id,
            quantity: selectedRecipe.quantity
          }
        }
      }
      return {
        recipeId: item.id,
        quantity: 0
      }
    })

    // set mapped shopListItems as a state variable
    setShopList(shopListItemsArr)
  }, [fetchedData, selectedRecipes, refreshedPage])

  // functions
  const refreshPage = () => {
    setRefreshedPage(prevState => !prevState);
  }

  const addToList = (itemId: string, quantity: number) => {
    console.log("Adding to list ", itemId, ", ", quantity)
    // setShopList([{recipeId: itemId, quantity: quantity}])
    setSelectedRecipes(prevState => [...prevState, {recipeId: itemId, quantity: quantity}]);
    refreshPage()
  }

  const removeFromList = (itemId: string) => {
    let newSelectedRecipes: ShopListItem[] = selectedRecipes;
    for (let recipe of newSelectedRecipes) {
      if (recipe.recipeId === itemId) {
        newSelectedRecipes.splice(newSelectedRecipes.indexOf(recipe), 1);
      }
    }
    setSelectedRecipes(newSelectedRecipes);
    setRefreshedPage(prevState => !prevState);
  }

  // create an array of shopListRecipeItem
  const shopListrecipeItemsArr = recipesData && recipesData.map((item, index) => {
    const shopListItem: ShopListItem | undefined = shopList?.find(i => i.recipeId === item.id)
    const selectedRecipe: ShopListItem | undefined = selectedRecipes?.find(i => i.recipeId === item.id)
    return (
      <div key={index} onClick={() => toggleAddToShopListModal(true, shopListItem ? shopListItem : {recipeId: "", quantity: 0})}>
        <ShopListRecipeItem 
          recipeTitle={item.title}
          portion={shopListItem ? shopListItem.quantity : 0}
          isSelected={selectedRecipe ? true : false}
        />
      </div>
    )
  })

  return (
    <div>
      <TopNavbar 
        title="Add shop list"
        menuItems={topNavbarItems}
      />
      Here will be form for a new shop list
      {shopListrecipeItemsArr}
      {isAddToShopListModalOn && <ShopListItemModal
        itemId={editedShopListItem.recipeId ? editedShopListItem.recipeId : ""}
        addToList={addToList}
        removeFromList={removeFromList}
        closeModal={toggleAddToShopListModal}
        isSelected={selectedRecipes && selectedRecipes.find(recipe => recipe.recipeId === editedShopListItem.recipeId)}
      />
      }
    </div>
  )
}
