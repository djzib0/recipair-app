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
import { ShopList, ShopListIngredient } from '../types/types';

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
  const [shopListData, setShopListData] = useState<ShopList>();

  useEffect(() => {
    getShopListData(id)
  }, [])

  useEffect(() => {
    setShopListData(shopListFetchedData?.ingredients && shopListFetchedData)
  }, [shopListFetchedData])

  // functions
  const toggleIsPurchased = (shopListId: string | undefined, ingredientIndex: number, editedObj: ShopListIngredient) => {
    toggleShopListIngredientIsPurchased(shopListId, ingredientIndex, editedObj )
  }

  // create an array of the ingredients that are not purchased yet
  const notPurchasedShopListIngredientsArr = shopListData && shopListData?.ingredients.filter(item => item.isPurchased === false)
  .map((item, index) => {
      return (
        <div key={index}>
        <RecipeIngredientContainer
          index={shopListData.ingredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, shopListData.ingredients.indexOf(item), item)}
          isPurchased={item.isPurchased}
          recipeIds={item.recipeIds}
          ingredientType={item.ingredientType}
          />
      </div>
    )
  }); 

  const purchasedShopListIngredientsArr = shopListData?.ingredients.filter(item => item.isPurchased === true)
  .map((item, index) => {
    return (
      <div key={index}>
        <RecipeIngredientContainer
          index={shopListData.ingredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, shopListData.ingredients.indexOf(item), item)}
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
        {!shopListFetchedData?.ingredients && <p>No ingredients</p>}
        {notPurchasedShopListIngredientsArr}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 && <p>Purchased</p>}
        {purchasedShopListIngredientsArr}
      </div>
    </main>
  )
}
