import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path='/signup' />
          <Route element={<Login />} path='/login' />
          <Route element={<Home />} path='/' />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App