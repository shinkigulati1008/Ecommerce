import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import ShopCategory from './pages/ShopCategory';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kids_banner from './components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>}></Route>
          <Route path="/women" element={<ShopCategory banner={women_banner} category="women"/>}></Route>
          <Route path="/men" element={<ShopCategory banner={men_banner} category="men"/>}></Route>
          <Route path="/kid" element={<ShopCategory banner={kids_banner} category="kid"/>}></Route>
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>}></Route>
          </Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/login" element={<LoginSignup/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>      
    </div>
  );
}

export default App;
