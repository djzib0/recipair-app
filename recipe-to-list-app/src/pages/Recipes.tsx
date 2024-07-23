import { useEffect, useState, lazy, Suspense } from "react";
// react router imports
import { Link } from "react-router-dom";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// import RecipeListItem from "../components/recipeListItem/RecipeListItem";
import YesNoModal from "../components/yesNoModal/YesNoModal";
// react form hook and zod imports
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { RiAddCircleFill } from "react-icons/ri";
// custom hooks imports
import useDatabase from '../customHooks/useDatabase';
import useModal from "../customHooks/useModal";
// types import
import { Recipe } from "../types/types";
// enums import
import { ModalType } from "../enums/enums";
// images import
import binIcon from '../../images/icons/bin.png';
import loadingAnim from '../../images/icons/loadingAnim.gif'
// styles import
import './Recipes.css'

const schema = z.object({
  filterSearch: z.string()
});

type FormFields = z.infer<typeof schema>

const RecipeListItem =  lazy(() => {
  return import("../components/recipeListItem/RecipeListItem")
})

export default function Recipes() {

  // destructuring useForm
  const {
    register,
  } = useForm<FormFields>(
    {defaultValues: {
      filterSearch: "",
    },
    resolver: zodResolver(schema)}
  )

  // utlizing useModal custom hook
  const {modalData, setModalData,
    toggleYesNoModal, isYesNoModalOn} = useModal();


  // utilize custom hook
  const {fetchedData, getRecipesData, deleteRecipe} = useDatabase();

  // state variables
  const [recipesData, setRecipesData] = useState([]);
  const [filterSearch, setFilterSearch] = useState<string>("");

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    setRecipesData(fetchedData)
  }, [fetchedData, filterSearch])

  const topNavbarItems = [
    {
      id: 1,
      icon: <RiAddCircleFill />,
      linkTo: 'recipes/add'
    }
  ]

  // functions
  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterSearch(e.currentTarget.value)
  }

  const handleDelete = (item: Recipe) => {
    console.log(item.id, "has been clicked")
    setModalData(prevState => {
      return {
        ...prevState,
        isActive: false,
        modalType: ModalType.Error,
        messageTitle: ``,
        messageText: `Do you want to delete "${item.title}" recipe?`,
        errorText: "",
        handleFunction: () => deleteRecipe(item.id),
        // refreshFunction: () => refreshPage(),
        closeFunction: () => toggleYesNoModal(false)
      }
    })
    toggleYesNoModal(true);
  }

  // create an array of recipes
  const recipes: Recipe[] = [];
  for (let [id, recipe] of Object.entries(fetchedData)) {
    let recipeObj = recipe;
    Object.assign(recipeObj, {id: id})
    recipes.push(recipeObj)
  }

  const filteredRecipesArr = recipesData && recipes.filter((item) => {
    return item.title.toLowerCase().includes(filterSearch.toLowerCase());
  })

  const recipesArr = filteredRecipesArr && filteredRecipesArr.map((item) => {
    return (
      <Suspense fallback={
        <img 
        src={loadingAnim} 
        alt="animated loading icon"
        className="btn-icon--large loading-icon--centered"
        />}
      >
      <div
        key={item.id}
        className="recipes-list__item"
      >
        <Link to={`/recipe/${item.id}`} key={item.id}>
          <RecipeListItem
            imgUrl={item.imgUrl}
            title={item.title}
            description={item.description}
            stepsNumber={item.steps?.length}
            />
        </Link>
        <div className='recipe-list-item__cta'>
            <button 
              onClick={() => handleDelete(item)}
              className='recipe-list-item__btn'
            >
              <img src={binIcon} />
            </button>
          </div>
      </div>    
      </Suspense>
    )
  })

  return (
    <div>
      <TopNavbar title="recipes" menuItems={topNavbarItems}/>
      <main className="content__container">
      <form>
        <label htmlFor="recipeTitle">
          Filter:
        </label>
        <input {...register("filterSearch", {onChange: handleFilterChange})}
          type="text"
          id="recipeTitle"
          />
      </form>
        <div className="recipes-arr__container">
          {recipesArr}
        </div>
      </main>
      {isYesNoModalOn && 
      <YesNoModal 
        classTitle={isYesNoModalOn ? 'sliding-yesno-modal--bottom': 'sliding-yesno-modal--bottom--disabled' }
        editedObj={modalData.obj}
        message={modalData.messageText}
        closeModal={modalData.closeFunction}
        handleFunction={modalData.handleFunction}
        refreshPage={modalData.refreshFunction}
      />}
    </div>
  )
}
