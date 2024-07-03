import { useEffect, useState } from 'react'
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeIngredientContainer from '../components/recipeIngredientContainer/RecipeIngredientContainer';
// react router imports
import { useParams } from "react-router-dom"
// icons import
import { BiArrowBack } from "react-icons/bi";
// custom hooks import
import useDatabase from '../customHooks/useDatabase';
import useModal from '../customHooks/useModal';
// types import
import { Ingredient, ShopList, ShopListIngredient } from '../types/types';
import { IngredientType } from '../enums/enums';

// array with object for topnavbar
const topNavbarItems = [
  {
    id: 1,
    icon: <BiArrowBack />,
    linkTo: '/shoplist'
  }
]

export default function ShopListDetails() {

  // utilize useParams
  const params = useParams();
  const {id} = params

  // utilize database
  const {
    shopListFetchedData,
    getShopListData,
    toggleShopListIngredientIsPurchased
  } = useDatabase();

  // utilize useModal custom hook
  const {
    // isShowIngredientRecipesModalOn,
    // toggleShowIngredientRecipes,
  } = useModal();

  // state variables
  const [isSortedByType, setIsSortedByType] = useState<boolean>(true);
  const [isSortedByName, setIsSortedByName] = useState<boolean>(true);
  const [shopListIngredients, setShopListIngredients] = useState<ShopListIngredient[] | undefined>([]);

  useEffect(() => {
    getShopListData(id)
  }, [])

  useEffect(() => {
    setShopListIngredients(shopListFetchedData?.ingredients)
    setIsSortedByName(prevState => !prevState)
    setIsSortedByType(prevState => !prevState);
  }, [shopListFetchedData])

  useEffect(() => {
    if (isSortedByType) {
      setShopListIngredients(prevState => prevState?.sort((a, b) => a.ingredientType.localeCompare(b.ingredientType)))
    } else if (!isSortedByType) {
      setShopListIngredients(prevState => prevState?.sort((a, b) => b.ingredientType.localeCompare(a.ingredientType)))
    }
  }, [isSortedByType])

  useEffect(() => {
    if (isSortedByName) {
      setShopListIngredients(prevState => prevState?.sort((a, b) => a.name.localeCompare(b.name)))
    } else if (!isSortedByName) {
      setShopListIngredients(prevState => prevState?.sort((a, b) => b.name.localeCompare(a.name)))
    }
  }, [isSortedByName])

  // functions
  const toggleIsPurchased = (shopListId: string | undefined, ingredientIndex: number, editedObj: ShopListIngredient) => {
    toggleShopListIngredientIsPurchased(shopListId, ingredientIndex, editedObj )
  }


  // create an array of the ingredients that are not purchased yet
  const notPurchasedShopListIngredientsArr = shopListIngredients && shopListIngredients.filter(item => item.isPurchased === false)
  .map((item, index) => {
      return (
        <div key={index}>
        <RecipeIngredientContainer
          index={shopListIngredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, shopListIngredients.indexOf(item), item)}
          isPurchased={item.isPurchased}
          recipeIds={item.recipeIds}
          ingredientType={item.ingredientType}
          />
      </div>
    )
  });

  const toggleSortByName = () => {
    setIsSortedByName(prevState => !prevState)
  }

  const toggleSortByType = () => {
    setIsSortedByType(prevState => !prevState)
  }

  const purchasedShopListIngredientsArr = shopListIngredients && shopListIngredients.filter(item => item.isPurchased === true)
  .map((item, index) => {
    return (
      <div key={index}>
        <RecipeIngredientContainer
          index={shopListIngredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, shopListIngredients.indexOf(item), item)}
          isPurchased={item.isPurchased}
          recipeIds={item.recipeIds}
          ingredientType={item.ingredientType}
        />
      </div>
    )
  }) 

  return (
    <main>
        <TopNavbar title='details' menuItems={topNavbarItems}/>
      <div className='content__container'>
        <button onClick={toggleSortByName}>sort by name</button>
        <button onClick={toggleSortByType}>sort by type</button>
        {!shopListFetchedData?.ingredients && <p>No ingredients</p>}
        {notPurchasedShopListIngredientsArr}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 && <p>Purchased</p>}
        {purchasedShopListIngredientsArr}
      </div>
    </main>
  )
}
