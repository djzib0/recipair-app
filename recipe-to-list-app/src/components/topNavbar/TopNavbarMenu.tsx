// types import
import { MenuItem } from "../../types/types";
// ract router import
import { useNavigate } from "react-router-dom";

type TopNavbarProps<T> = {
  menuItems: T[]
}

export default function TopNavbarMenu(props: TopNavbarProps<MenuItem>) {

  const navigate = useNavigate();

  const iconsArr = props.menuItems.map((item) => {
    return (
      <button 
        key={item.id} 
        className='navbar__icon'
        onClick={() => navigate(-1)}>
          {item.icon}
      </button>
    )
  })

  return (
    <div className='top-navbar__menu'>
      {iconsArr}
    </div>
  )
}
