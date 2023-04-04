import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../CardContext";

const Cart = () => {
  const { cart } = useContext(CardContext);
  const [products, setProducts] = useState([]);
  console.log(cart);
  useEffect(() => {
    if (!cart.items) {
      return;
    }

    fetch("http://localhost:3001/getData/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: Object.keys(cart.items),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("products", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart]);

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">5</b>
                  <button
                  
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹ 500</span>
                <button
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <span className="font-bold">Total: Rs 1000</span>
      </div>
      <div className="flex justify-end">
        <button className="bg-yellow-500 text-white rounded-full px-4 py-2 mt-4">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
