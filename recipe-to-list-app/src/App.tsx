// components imports
import NavbarLayout from './layouts/NavbarLayout';
import Recipes from './pages/Recipes';
// router imports
import { Routes, Route } from 'react-router-dom';
// styles imports
import './App.css';



function App() {
  
  return (
    <div>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path='/' element={<Recipes />}>
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App
