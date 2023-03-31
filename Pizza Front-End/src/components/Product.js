import React from "react";
import { Link } from "react-router-dom";
const Product = (props) => {
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
        <button className="bg-yellow-500 py-1 rounded-full font-bold px-2 text-sm">
          Add to Cart
        </button>
      </div>
    </div>
    </Link>
  );
};

export default Product;
