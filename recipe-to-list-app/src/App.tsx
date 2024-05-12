// components imports
import NavbarLayout from './layouts/NavbarLayout';
import Recipes from './pages/Recipes';
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
          <Route path='/' element={<Recipes />}>
          </Route>
          <Route path='/recipes/add' element={<AddRecipeForm />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
