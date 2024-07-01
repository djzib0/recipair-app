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
  const [shopListData, setShopListData] = useState<ShopList>();
  const [isSortedByType, setIsSortedByType] = useState<boolean>(false);
  const [shopListIngredients, setShopListIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    getShopListData(id)
  }, [])

  useEffect(() => {
    setShopListData(shopListFetchedData?.ingredients && shopListFetchedData)
    shopListData && setShopListIngredients(shopListData?.ingredients)
  }, [shopListFetchedData])

  // useEffect(() => {
  //   const ingredientTypes = Object.values(IngredientType)
  //   const sortedList = shopListIngredients.sort((a: any, b: any) => {
  //     console.log(console.log(a.ingredientType, "a"))
  //     console.log(console.log(b, "b"))
  //     return  b.ingredientType > a.ingredientType
  //   })
  //   console.log(sortedList, "sorted list")
  // }, [isSortedByType])

  // functions
  const toggleIsPurchased = (shopListId: string | undefined, ingredientIndex: number, editedObj: ShopListIngredient) => {
    toggleShopListIngredientIsPurchased(shopListId, ingredientIndex, editedObj )
  }

  // if (shopListData?.ingredients && isSortedByType) {
  //     setShopListData(shopListData?.ingredients.sort((a: any, b: any) => a.ingredientType - b.ingredientType))
  // }
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

  const sortByType = () => {
    setIsSortedByType(true)
  }

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
        <button onClick={sortByType}>sort by type</button>
        {!shopListFetchedData?.ingredients && <p>No ingredients</p>}
        {notPurchasedShopListIngredientsArr}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 && <p>Purchased</p>}
        {purchasedShopListIngredientsArr}
      </div>
    </main>
  )
}
