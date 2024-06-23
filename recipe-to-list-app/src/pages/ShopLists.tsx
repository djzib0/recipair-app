import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
// react router imports
import { Link } from "react-router-dom";
// icons import
import { RiAddCircleFill } from "react-icons/ri"
import { ShopList } from "../types/types";

const topNavbarItems = [
  {
    id: 1,
    icon: <RiAddCircleFill />,
    linkTo: 'add'
  }
]

export default function ShopLists() {

  // utilize useDatabase custom hook
  const {
    fetchedData,
    getShopListsData,
  } = useDatabase();

  // state variables
  const [shopListsData, setShopListData] = useState([]);

  useEffect(() => {
    getShopListsData()
  }, [])

  useEffect(() => {
    setShopListData(fetchedData)
  }, [fetchedData])

  // create an array of shop lists
  const fetchedShopLists: ShopList[] = [];
  if (shopListsData) {
    for (let [id, shoplist] of Object.entries(shopListsData)) {
      let shopListObj = shoplist;
      Object.assign(shopListObj, {id: id})
      fetchedShopLists.push(shopListObj)
    }
  }
  
  // create an array of shop list titles
  const shopListsArr = fetchedShopLists && fetchedShopLists.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`./${item.id}`}>
          <p>{item.title}</p>
        </Link>
      </div>
    )
  })


  return (
    <div>
      <TopNavbar 
        title="shop lists"
        menuItems={topNavbarItems}
      />

      {shopListsArr}

      <div className="cta-btn__container">
        <Link
          to="add">
          <button 
            className="toggle-modal-menu__btn"

            >
            +
          </button>
        </Link>
      </div>
    </div>
  )
}
