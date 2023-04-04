import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import CreatePizza from './pages/CreatePizza';
import { CardContext } from "./CardContext";
import { useEffect, useState } from "react";


function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    setCart(JSON.parse(cart))
  }, []);


  useEffect(()=>{
   localStorage.setItem("cart", JSON.stringify(cart));

  },[cart]);

  return (
    <Router>
            <CardContext.Provider value={{ cart:cart , setCart:setCart }}> 
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/products" exact element={<Products />} />
                <Route path="/products/:_id" element={<SingleProduct />} />
                <Route path="/createpizza" element={<CreatePizza />} />
                <Route path="/cart" element={<Cart />} /> 
                
            </Routes>
            </CardContext.Provider>
    </Router>
  );
}

export default App;
