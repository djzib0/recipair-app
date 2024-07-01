import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import ShopListItem from "../components/shopListItem/ShopListItem";
import YesNoModal from "../components/yesNoModal/YesNoModal";
// enums import
import { ModalType } from "../enums/enums";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
import useModal from "../customHooks/useModal";
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
    deleteShopList,
  } = useDatabase();

  // utilize useModal custom hook
  const {
    modalData, setModalData, toggleYesNoModal, isYesNoModalOn
  } = useModal();

  // state variables
  const [shopListsData, setShopListData] = useState([]);
  const [refreshedPage, setRefreshedPage] = useState(false);

  useEffect(() => {
    getShopListsData()
  }, [refreshedPage])

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

  // functions
  const refreshPage = () => {
    setRefreshedPage(prevState => !prevState)
  }

  const setDeleteModal = (item: ShopList) => {
    setModalData(prevState => {
      return {
        ...prevState,
        isActive: false,
        modalType: ModalType.Error,
        messageTitle: ``,
        messageText: `Do you want to delete "${item.title}" shop list?`,
        errorText: "",
        handleFunction: () => deleteShopList(item.id),
        refreshFunction: () => refreshPage(),
        closeFunction: () => toggleYesNoModal(false)
      }
    })
    toggleYesNoModal(true);
  }
  
  // create an array of shop list titles
  const shopListsArr = fetchedShopLists && fetchedShopLists.map((item, index) => {
    return (
      <div key={index}>
        <ShopListItem
          linkTo={`./${item.id}`}
          title={item.title}
          ingredientsQuantity={item.ingredients ? item.ingredients.length : 0}
          shopListId={item.id}
          obj={item}
          openModal={() => setDeleteModal(item)}
        />
      </div>
    )
  })

  return (
    <div>
      <TopNavbar 
        title="shop lists"
        menuItems={topNavbarItems}
      />
      <div className="content__container">
        {shopListsArr}
      </div>

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
      {isYesNoModalOn && 
        <YesNoModal 
          classTitle={isYesNoModalOn ? 'sliding-yesno-modal--bottom': 'sliding-yesno-modal--bottom--disabled' }
          editedObj={modalData.obj}
          message={modalData.messageText}
          closeModal={modalData.closeFunction}
          handleFunction={modalData.handleFunction}
          refreshPage={modalData.refreshFunction}
        />
        }    
    </div>
  )
}
