// components import
import NavbarIcon from "./NavbarIcon";
import NavbarLabel from "./NavbarLabel";

type NavbarElementProps = {
  title: string;
  icon: JSX.Element
}

export default function NavbarElement(props: NavbarElementProps) {

  const {icon, title} = props;

  return (
    <div className="navbar-element__container">
      <NavbarIcon>
        {icon}
      </NavbarIcon>
      <NavbarLabel title={title} />
    </div>
  )
}
