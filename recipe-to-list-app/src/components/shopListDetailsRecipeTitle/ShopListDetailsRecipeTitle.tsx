// react router imports
import { Link } from 'react-router-dom';

type ShopListDetailsRecipeTitleProps = {
  title: string | undefined;
  linkTo: string;
}

export default function ShopListDetailsRecipeTitle(props: ShopListDetailsRecipeTitleProps) {

  // destructurize props
  const {
    title,
    linkTo,
  } = props;

  return (
    <Link to={linkTo}>
      <p>{title}</p>
    </Link>
  )
}
