import React from "react";
import Product from "./Product";
import axios from "axios";
import { useState, useEffect } from "react";
const ReUsableProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const response = axios.get("http://localhost:3001/getData");
    response.then((res) => {
      setProducts(res.data);
    });
  }, [products]);
  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-3">Products</h1>
      <div className="grid grid-cols-5 gap-x-24 gap-y-9 my-1">
        {products.map((product) => (
          <Product key={product._id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default ReUsableProducts;
