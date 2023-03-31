import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params);

  const fetchProduct = async () => {
      const response = await fetch(`http://localhost:3001/getData/${params._id}`);
      const data = await response.json();
      setProduct(data);
      console.log(data)
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="container mx-auto mt-12">
      <button className="mb-12 font-bold" onClick={() => navigate("/")}>
        Go Back
      </button>
      <div className="flex">
        <img src={product.image} alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">₹ {product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
