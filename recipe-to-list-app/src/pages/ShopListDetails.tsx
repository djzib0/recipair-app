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
import { ShopListIngredient } from '../types/types';


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
    fetchedData,
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
  const [activeSort, setActiveSort] = useState<string>();
  const [unModifiedShopListIngredients, setUnModifiedShopListIngredients] = useState<ShopListIngredient[]>([]);
  const [shopListIngredients, setShopListIngredients] = useState<ShopListIngredient[]>([]);
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  useEffect(() => {
    getShopListData(id);
  }, [isRefreshed, fetchedData])

  useEffect(() => {
    console.log(shopListFetchedData, "new shoplist Fetched Data")
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
    setActiveSort("name")
    setIsSortedByName(prevState => !prevState)
  }

  const toggleSortByType = () => {
    setActiveSort("type")
    setIsSortedByType(prevState => !prevState)
  }

  const toggleAddNotShopListIngredient = () => {
    toggleAddIngredientModal(true);
  }

  const refreshPage = () => {
    setIsRefreshed(prevState => prevState === false ? true : false)
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
        <div className='sort__container'>
          <p>SORT BY:</p>
          <button 
            onClick={toggleSortByName}
            className={activeSort === "name" ? `sort__btn-active` : `sort__btn`}
          >
            Name
          </button>
          <button 
            onClick={toggleSortByType}
            className={activeSort === "type" ? `sort__btn-active` : `sort__btn`}
          >
            Type
          </button>
        </div>
        {!shopListFetchedData?.ingredients && <p>No ingredients</p>}
        {notPurchasedShopListIngredientsArr && notPurchasedShopListIngredientsArr.length > 0 && <p>To buy</p>}
        {notPurchasedShopListIngredientsArr}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 
        && notPurchasedShopListIngredientsArr.length != 0&& <p>Purchased</p>}
        {purchasedShopListIngredientsArr && purchasedShopListIngredientsArr?.length > 0 
        && notPurchasedShopListIngredientsArr.length === 0 && <p>All items are purchased.</p>}

        {purchasedShopListIngredientsArr}
      </div>
      <div className="cta-btn__container">  
        <button 
          className="toggle-modal-menu__btn"
          onClick={toggleAddNotShopListIngredient}
        >
          +
        </button>      
      </div>
      {isAddIngredientModalOn &&
      <IngredientFormModal
        classTitle={isAddIngredientModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        addNotShopListIngredient={addNotShopListIngredient}
        closeModal={() => toggleAddIngredientModal(false)}
        isOn={isAddIngredientModalOn}
        editedShopListId={id}
        refreshPage={() => refreshPage}
       />
      }
    </main>
  )
}
