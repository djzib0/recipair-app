import { useEffect, useState } from 'react'
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeIngredientContainer from '../components/recipeIngredientContainer/RecipeIngredientContainer';
import IngredientFormModal from '../components/ingredientFormModal/IngredientFormModal';
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
    toggleShopListIngredientIsPurchased,
    addNotShopListIngredient,
  } = useDatabase();

  // utilize useModal custom hook
  const {
    // isShowIngredientRecipesModalOn,
    // toggleShowIngredientRecipes,
    isAddIngredientModalOn,
    toggleAddIngredientModal,
  } = useModal();

  // state variables
  const [isSortedByType, setIsSortedByType] = useState<boolean>(false);
  const [isSortedByName, setIsSortedByName] = useState<boolean>(false);
  const [unModifiedShopListIngredients, setUnModifiedShopListIngredients] = useState<ShopListIngredient[]>([]);
  const [shopListIngredients, setShopListIngredients] = useState<ShopListIngredient[]>([]);
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  useEffect(() => {
    getShopListData(id)
  }, [id])

  useEffect(() => {
    setUnModifiedShopListIngredients(shopListFetchedData?.ingredients || [])
  }, [shopListFetchedData])

  useEffect(() => {
    const sortedIngredients = [...(unModifiedShopListIngredients || [])]
    setShopListIngredients(sortedIngredients)
  }, [unModifiedShopListIngredients])

  useEffect(() => {
    const sortedIngredients = [...(shopListIngredients || [])]
    if (isSortedByType) {
      sortedIngredients.sort((a, b) => a.ingredientType.localeCompare(b.ingredientType))
    } else if (!isSortedByType) {
      sortedIngredients.sort((a, b) => b.ingredientType.localeCompare(a.ingredientType))
    }
    setShopListIngredients(sortedIngredients)
  }, [isSortedByType])

  useEffect(() => {
    const sortedIngredients = [...(shopListIngredients || [])]
    if (isSortedByName) {
      sortedIngredients.sort((a, b) => a.name.localeCompare(b.name))
    } else if (!isSortedByName) {
      sortedIngredients.sort((a, b) => b.name.localeCompare(a.name))
    }
    setShopListIngredients(sortedIngredients)
  }, [isSortedByName])

  // functions
  const toggleIsPurchased = (shopListId: string | undefined, ingredientIndex: number, editedObj: ShopListIngredient) => {
    toggleShopListIngredientIsPurchased(shopListId, ingredientIndex, editedObj )
  }

  // create an array of the ingredients that are not purchased yet
  const notPurchasedShopListIngredientsArr = shopListIngredients && unModifiedShopListIngredients && shopListIngredients.filter(item => item.isPurchased === false)
  .map((item, index) => {
      return (
        <div key={index}>
        <RecipeIngredientContainer
          index={unModifiedShopListIngredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, unModifiedShopListIngredients.indexOf(item), item)}
          isPurchased={item.isPurchased}
          recipeIds={item.recipeIds}
          ingredientType={item.ingredientType}
          />
      </div>
    )
  });

  const toggleSortByName = () => {
    setIsSortedByName(prevState => !prevState)
    console.log("toggling sort by name")
  }

  const toggleSortByType = () => {
    setIsSortedByType(prevState => !prevState)
  }

  const toggleAddNotShopListIngredient = () => {
    console.log("adding new item by opening new form...")
    toggleAddIngredientModal(true);
  }

  const purchasedShopListIngredientsArr = shopListIngredients && unModifiedShopListIngredients && shopListIngredients.filter(item => item.isPurchased === true)
  .map((item, index) => {
    return (
      <div key={index}>
        <RecipeIngredientContainer
          index={unModifiedShopListIngredients.indexOf(item)}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          toggleIsPurchased={() => toggleIsPurchased(id, unModifiedShopListIngredients.indexOf(item), item)}
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
        <button onClick={toggleAddNotShopListIngredient}>add new item</button>
        {!shopListFetchedData?.ingredients && <p>No ingredients</p>}
        {notPurchasedShopListIngredientsArr}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 && <p>Purchased</p>}
        {purchasedShopListIngredientsArr}
      </div>
      {isAddIngredientModalOn &&
      <IngredientFormModal
        classTitle={isAddIngredientModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        // addIngredient={addIngredient}
        addNotShopListIngredient={addNotShopListIngredient}
        closeModal={() => toggleAddIngredientModal(false)}
        isOn={isAddIngredientModalOn}
        editedShopListId={id}
       />
      }
    </main>
  )
}
