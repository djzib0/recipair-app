// import React from 'react'
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// icons import
import { RiAddCircleFill } from "react-icons/ri";
// custom hooks imports
import useDatabase from '../customHooks/useDatabase'
import { useEffect, useState } from "react";

export default function Recipes() {

  // utilize custom hook
  const {fetchedData, getRecipesData} = useDatabase();

  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    setRecipesData(fetchedData)
  }, [fetchedData])

  console.log(recipesData, " recipes data in recipes component")

  const menuItemsArr = [
    {
      id: 1,
      icon: <RiAddCircleFill />,
      linkTo: 'recipes/add'
    }
  ]

  return (
    <div>
      <TopNavbar title="recipes" menuItems={menuItemsArr}/>
    </div>
  )
}
