/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: App file displaying routes to home, product page, and cart page 
 * Version: 1.0
 * Change History: Initial
 */

import './App.css';
import Home from "./pages/home"
import Navbar  from './pages/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartProducts from './pages/CartProducts';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cartproducts" element={<CartProducts />} />
        </Routes>
      </div>
  );
}

export default App;
