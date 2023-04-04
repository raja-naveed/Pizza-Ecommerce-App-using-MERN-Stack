import React, { useState , useContext } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../CardContext";

const Product = (props) => {
  const [isAdding , setIsAdding] = useState(false);
  const { cart , setCart} = useContext(CardContext);

  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = {...cart};
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    } 
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {

      setIsAdding(false);

    }, 1000);
  };
  return (
    // < to={`/product/${props.products._id}`}>
    <Link to={`/products/${props.products._id}`}>
    <div>
      <img src={props.products.image} alt="" />
      <div className="text-center">
        <h3 className="text-lg font-bold my-1">{props.products.name}</h3>
        <span className="bg-grey-200 rounded-full text-sm px-2">
          {props.products.size}
        </span>
      </div>
      <div className="flex items-center justify-between mt-1 px-4 pl-6">
        <span className="font-bold text-sm ">{`Rs. ${props.products.price}`}</span>
        <button
          onClick={(e)=>{addToCart(e, props.products)}}
         className={`${isAdding? `bg-green-500 `:`bg-yellow-500 `}py-1 rounded-full font-bold px-2 text-sm`}>
          Add{isAdding? `ed`:``}
        </button>
      </div>
    </div>
    </Link>
  );
};

export default Product;
