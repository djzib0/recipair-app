import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import ShopListRecipeItem from "../components/shopListRecipeItem/ShopListRecipeItem";
import ShopListItemModal from "../components/shopListItemModal/ShopListItemModal";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
import useModal from "../customHooks/useModal";
// react form hook and zod imports
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { BiArrowBack } from "react-icons/bi"
// type imports
import { Recipe, ShopList, ShopListIngredient, ShopListItem} from "../types/types";
// react router imports
import { useNavigate } from "react-router-dom";

// array with object for topnavbar
const topNavbarItems = [
  {
    id: 1,
    icon: <BiArrowBack />,
    linkTo: '/shoplist'
  }
]

const schema = z.object({
  shopListTitle: z.string().min(1),
  filterSearch: z.string()
});

type FormFields = z.infer<typeof schema>


export default function AddShopListForm() {

  // utilize react router
  const navigate = useNavigate();

  // utilize useDatabase custom hook
  const {
    getRecipesData,
    fetchedData,
    addShopList,
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
    } = useForm<FormFields>(
      {defaultValues: {
        shopListTitle: "",
        filterSearch: "",
      },
      resolver: zodResolver(schema)}
    )

  // state variables
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [shopList, setShopList] = useState<ShopListItem[]>();
  const [shopListTitle, setShopListTitle] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<ShopListItem[]>([]);
  const [filterSearch, setFilterSearch] = useState<string>("")
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
            portionQuantity: selectedRecipe.portionQuantity,
            isPurchased: selectedRecipe.isPurchased
          }
        }
      }
      return {
        recipeId: item.id,
        portionQuantity: 0,
        isPurchased: false
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
  }, [fetchedData, selectedRecipes, refreshedPage, filterSearch])

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
      elem.portionQuantity = quantity
      setSelectedRecipes(newSelectedRecipesArr)
      refreshPage();
    } else if (elem === undefined) {
      setSelectedRecipes(prevState => [...prevState, {recipeId: itemId, portionQuantity: quantity, isPurchased: false}]);
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
    let shopListIngredientsArr: ShopListIngredient[] = [];
    // 1. Iterate through selected items
    for (let selectedRecipe of selectedRecipes) {
      for (let recipe of recipesData) {
        // 2. Find selected recipe by recipeId
        if (selectedRecipe.recipeId === recipe.id) {
          if (recipe.ingredients) {
            // 3. Get all ingredient from the recipe
            for (let ingredient of recipe.ingredients) {
              // 4. Multiply it by the quantity
              let newShopListIngredient: ShopListIngredient = {
                ...ingredient,
                quantity: ingredient.quantity * selectedRecipe.portionQuantity,
                recipeId: selectedRecipe.recipeId,
                recipeIds: [selectedRecipe.recipeId],
                portionQuantity: selectedRecipe.portionQuantity,
                isPurchased: selectedRecipe.isPurchased
              }
              // 5. Add it to array which will hold ShopListIngredients
              shopListIngredientsArr.push(newShopListIngredient)
            }
          }
        }
      }
    }
    // 6. Aggregate ingredients if they occur in different
    //    recipes (this solution is from ChatGPT, my first idea was
    //    to use for loop)
    const summedIngredients = shopListIngredientsArr.reduce((acc: any, ingredient) => {
      
      // Create a unique key for each ingredient based on its name and unit
      const key: string = `${ingredient.name}-${ingredient.unit}`;
      // If the key doesn't exist in the accumulator object, add it
      if (!acc[key]) {
        acc[key] = { ...ingredient }; // Copy the ingredient object
      } else {
        // If the key exists, sum the quantities
        acc[key].quantity += ingredient.quantity;
        let newArr: (string | undefined)[] = acc[key].recipeIds
        newArr.push(ingredient.recipeId)
        acc[key].recipeIds = newArr
      }
      // Return the accumulator for the next iteration
      return acc;
    }, {});
    const result: ShopListIngredient[] = Object.values(summedIngredients);
    console.log(result)

    // setShopListIngredients(shopListIngredientsArr)
    let newShopList: ShopList = {
      title: shopListTitle,
      ingredients: result
    }
    addShopList(newShopList)
    navigate("/shoplist")
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setShopListTitle(e.currentTarget.value)
  }

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterSearch(e.currentTarget.value)
  }


  // filter data based on the input
  const filteredShopListrecipeItemsArr = recipesData && recipesData.filter((item) => {
    return item.title.toLowerCase().includes(filterSearch.toLowerCase())
  })

  // create an array of shopListRecipeItem
  const shopListrecipeItemsArr = filteredShopListrecipeItemsArr && filteredShopListrecipeItemsArr.map((item, index) => {
    const shopListItem: ShopListItem | undefined = shopList?.find(i => i.recipeId === item.id)
    const selectedRecipe: ShopListItem | undefined = selectedRecipes?.find(i => i.recipeId === item.id)
    return (
      // <div key={index} onClick={() => testFunc(true, shopListItem ? shopListItem : {recipeId: "", quantity: 0})}>
      <div key={index} onClick={() => (toggleAddToShopListModal(false), toggleAddToShopListModal(true, shopListItem ? shopListItem : {recipeId: "", portionQuantity: 0, isPurchased: false}))}>
        <ShopListRecipeItem 
          recipeTitle={item.title}
          portion={shopListItem ? shopListItem.portionQuantity : 0}
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
      <form>
        <label htmlFor="shopListTitle">
          Filter:
        </label>
        <input {...register("filterSearch", {onChange: handleFilterChange})}
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
        quantity={editedShopListItem.portionQuantity}
      />
      }
    </div>
  )
}
