type NavbarLabelProps = {
  title: string
}

export default function NavbarLabel({title}: NavbarLabelProps) {
  return (
    <div className='navbar__label'>
      {title}
    </div>
  )
}
