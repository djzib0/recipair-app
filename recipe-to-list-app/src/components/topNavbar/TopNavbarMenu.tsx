// types import
import { Link } from "react-router-dom";
import { MenuItem } from "../../types/types";

type TopNavbarProps<T> = {
  menuItems: T[]
}

export default function TopNavbarMenu(props: TopNavbarProps<MenuItem>) {

  const iconsArr = props.menuItems.map((item) => {
    return (
      <Link 
        key={item.id} 
        className='navbar__icon'
        to={item.linkTo}>
          {item.icon}
      </Link>
    )
  })

  return (
    <div className='top-navbar__menu'>
      {iconsArr}
    </div>
  )
}
