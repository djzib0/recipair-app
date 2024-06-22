// components imports
import NavbarLayout from './layouts/NavbarLayout';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import ShopLists from './pages/ShopLists';
import ShopListDetails from './pages/ShopListDetails';
import AddShopListForm from './pages/AddShopListForm';
import Settings from './pages/Settings';
// router imports
import { Routes, Route } from 'react-router-dom';
// styles imports
import './App.css';
import AddRecipeForm from './pages/AddRecipeForm';


function App() {
  
  return (
    <div className='app__container'>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path='/' element={<Recipes />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
          <Route path='/recipes/add' element={<AddRecipeForm />} />
          <Route path='/shoplist' element={<ShopLists />} />
          <Route path='/shoplist/:id' element={<ShopListDetails />} />
          <Route path="/shoplist/add" element={<AddShopListForm />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
