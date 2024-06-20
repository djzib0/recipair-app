import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import ShopListRecipeItem from "../components/shopListRecipeItem/ShopListRecipeItem";
import ShopListItemModal from "../components/shopListItemModal/ShopListItemModal";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
import useModal from "../customHooks/useModal";
// react form hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { BiArrowBack } from "react-icons/bi"
// type imports
import { Recipe, ShopListItem} from "../types/types";
import { EventType } from "firebase/database";

// array with object for topnavbar
const topNavbarItems = [
  {
    id: 1,
    icon: <BiArrowBack />,
    linkTo: '/shoplist'
  }
]

const schema = z.object({
  shopListTitle: z.string().min(1)
});

type FormFields = z.infer<typeof schema>


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

    // destructuring useForm
    const {
      register,
      handleSubmit,
      resetField,
      setValue,
    } = useForm<FormFields>(
      {defaultValues: {
        shopListTitle: ""
      },
      resolver: zodResolver(schema)}
    )

  // state variables
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [shopList, setShopList] = useState<ShopListItem[]>();
  const [shopListTitle, setShopListTitle] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<ShopListItem[]>([]);
  const [isShopListEmpty, setIsShopListEmpty] = useState(true);
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

    // if selected recipes array has any element
    // set the state variable isShopListEmpty to true
    if (selectedRecipes.length > 0) {
      setIsShopListEmpty(false)
    } else {
      setIsShopListEmpty(true)
    }
  }, [fetchedData, selectedRecipes, refreshedPage])

  // functions
  const refreshPage = () => {
    setRefreshedPage(prevState => !prevState);
  }

  const addToList = (itemId: string, quantity: number) => {
    
    // create a copy of state variable array with selected recipes
    const newSelectedRecipesArr = selectedRecipes;
    // define a variable with value of object if it's found by id
    const elem = newSelectedRecipesArr.find(({recipeId}) => recipeId === itemId)

    // if elem exists in the array with selected recipes
    if (elem) {
      // change it's value
      elem.quantity = quantity
      setSelectedRecipes(newSelectedRecipesArr)
      refreshPage();
    } else if (elem === undefined) {
      setSelectedRecipes(prevState => [...prevState, {recipeId: itemId, quantity: quantity}]);
      refreshPage()
    }
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

  const saveShoplist = () => {
    console.log("saving new shoplist with title", shopListTitle)
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setShopListTitle(e.currentTarget.value)
  }

  // create an array of shopListRecipeItem
  const shopListrecipeItemsArr = recipesData && recipesData.map((item, index) => {
    const shopListItem: ShopListItem | undefined = shopList?.find(i => i.recipeId === item.id)
    const selectedRecipe: ShopListItem | undefined = selectedRecipes?.find(i => i.recipeId === item.id)
    return (
      // <div key={index} onClick={() => testFunc(true, shopListItem ? shopListItem : {recipeId: "", quantity: 0})}>
      <div key={index} onClick={() => (toggleAddToShopListModal(false), toggleAddToShopListModal(true, shopListItem ? shopListItem : {recipeId: "", quantity: 0}))}>
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
      {!isShopListEmpty && 
      <button
        onClick={saveShoplist}
      >Save</button>
      }
      <form>
        <label htmlFor="shopListTitle">
          Title:
        </label>
        <input {...register("shopListTitle", {onChange: handleTitleChange})}
          type="text"
          id="shopListTitle"
          />
      </form>
      {shopListrecipeItemsArr}
      {isAddToShopListModalOn && <ShopListItemModal
        itemId={editedShopListItem.recipeId ? editedShopListItem.recipeId : ""}
        addToList={addToList}
        removeFromList={removeFromList}
        closeModal={() => toggleAddToShopListModal(false)}
        selectedItem={selectedRecipes && selectedRecipes.find(recipe => recipe.recipeId === editedShopListItem.recipeId)}
        classTitle={isAddToShopListModalOn ? "sliding-shoplist-modal--bottom": "sliding-shoplist-modal--bottom--disabled"}
        selectedRecipeData={recipesData && selectedRecipes && recipesData.find(recipe => recipe.id === editedShopListItem.recipeId)}
        quantity={editedShopListItem.quantity}
      />
      }
    </div>
  )
}
