type TopNavbarTitleProps = {
  title: string;
}

export default function TopNavbarTitle({title}: TopNavbarTitleProps) {

  

  return (
    <div className="top-navbar__title">
      
      {title}
    </div>
  )
}
