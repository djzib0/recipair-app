// components import
import TopNavbarTitle from './TopNavbarTitle';
import TopNavbarMenu from './TopNavbarMenu';
// styles import
import './TopNavbar.css'
// types import
import { MenuItem } from '../../types/types';
import AppLogo from './AppLogo';

type TopNavbarProps<T> = {
    title: string;
    menuItems: T[]
}


export default function TopNavbar(props: TopNavbarProps<MenuItem> ) {

  return (
    <nav className="navbar--top">
      <div className='navbar--top--left'>
        <AppLogo />
        <TopNavbarTitle title={props.title}/>
      </div>
      <TopNavbarMenu menuItems={props.menuItems}/>
    </nav>
  )
}
