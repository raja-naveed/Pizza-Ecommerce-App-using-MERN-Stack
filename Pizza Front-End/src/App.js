import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import CreatePizza from './pages/CreatePizza';

function App() {
  return (
    <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/products" exact element={<Products />} />
                <Route path="/products/:_id" element={<SingleProduct />} />
                <Route path="/createpizza" element={<CreatePizza />} />
                <Route path="/cart" element={<Cart />} /> 
                
            </Routes>
    </Router>
  );
}

export default App;
