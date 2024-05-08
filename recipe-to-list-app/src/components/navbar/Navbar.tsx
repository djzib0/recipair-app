import { NavLink } from "react-router-dom";
// components import
import NavbarElement from "./NavbarElement";
// styles import
import './Navbar.css';
// icons import
import { FaBook } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";



export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink 
        className={({isActive}) => isActive ? 'navbar-element__container--active' : 'navbar-element__container'}
        to="."
      >
        <NavbarElement 
          title={'recipes'} 
          icon={<FaBook />}/>
      </NavLink>

      <NavLink 
        className={({isActive}) => isActive ? 'navbar__link--active' : 'navbar-element__container'}
        to="/shoplist"
      >
        <NavbarElement 
          title={'shop list'}
          icon={<FaClipboardList />}
        />
      </NavLink>

      <NavLink 
        className={({isActive}) => isActive ? 'navbar-element__container--active' : 'navbar-element__container'}
        to="/settings"
      >
        <NavbarElement 
          title={'settings'} 
          icon={<FaGear />}
        />
      </NavLink>
    </nav>
  )
}
