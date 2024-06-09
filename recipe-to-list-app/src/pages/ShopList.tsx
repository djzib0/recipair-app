// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// custom hooks import
import useModal from "../customHooks/useModal";
import useDatabase from "../customHooks/useDatabase";
// react router imports
import { Link } from "react-router-dom";
// icons import
import { RiAddCircleFill } from "react-icons/ri"

const topNavbarItems = [
  {
    id: 1,
    icon: <RiAddCircleFill />,
    linkTo: 'add'
  }
]

export default function ShopList() {

  // utlilize useModal custom hook
  const {
    isModalMenuOn,
    toggleModalMenu,
  } = useModal();

  // utilize useDatabase custom hook
  const {

  } = useDatabase();

  

  return (
    <div>
      <TopNavbar 
        title="shop lists"
        menuItems={topNavbarItems}
      />

      <div className="cta-btn__container">
        <Link
          to="add">
          <button 
            className="toggle-modal-menu__btn"
            onClick={() => toggleModalMenu(isModalMenuOn === true ? false : true)}
            >
            +
          </button>
        </Link>
      </div>
    </div>
  )
}
