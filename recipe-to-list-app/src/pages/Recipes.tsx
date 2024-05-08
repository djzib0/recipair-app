// import React from 'react'
// components import
import TopNavbar from "../components/topNavbar/TopNavbar"
// icons import
import { RiAddCircleFill } from "react-icons/ri"

export default function Recipes() {

  const menuItemsArr = [
    {
      id: 1,
      icon: <RiAddCircleFill />,
      linkTo: 'recipes/addform'
    }
  ]

  return (
    <div>
      <TopNavbar title="recipes" menuItems={menuItemsArr}/>
    </div>
  )
}
