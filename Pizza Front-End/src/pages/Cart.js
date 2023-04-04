import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../CardContext";

const Cart = () => {
  let total = 0;
  const { cart , setCart } = useContext(CardContext);
  const [products, setProducts] = useState([]);
  const [fetching, toggledFetching]=useState(false);
  console.log(cart);
  useEffect(() => {
    if (!cart.items) {
      return;
    }
    if(fetching){
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
        toggledFetching(true)
        setProducts(data);
        console.log("products", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart]);

  const getQTY = (id) => {
    return cart.items[id];
  };
  const incrementQty = (id) => {
    console.log(id);
    const existingQty = cart.items[id];
    const _cart = { ...cart };
    if (!existingQty) {
      _cart.items[id] = 1;
    } else {
      _cart.items[id] = existingQty + 1;
    }
    _cart.totalItems = _cart.totalItems + 1;
    setCart(_cart);

  };
  const decrementQty = (id) => {
    const existingQty = cart.items[id];
    if (existingQty === 1) {
      return 
    }
    const _cart = { ...cart };
      _cart.items[id] = existingQty - 1;
    
    _cart.totalItems = _cart.totalItems - 1;
    setCart(_cart);

  };
  const sumPrice=(id , price)=>{
    const sum = price * getQTY(id);
    total += sum;
    return sum
  }
  const handleDelete=(id)=>{
    const _cart = {...cart};
    const qty = _cart.items[id];
    delete _cart.items[id]
    _cart.totalItems-=qty;
    setCart(_cart)
    setProducts(products.filter((product)=>product._id !== id))
  }
const handleOrder=()=>{
  window.alert("Your Order has been ordered")
  setCart({})
  setProducts([]);
}

  return (
    products.length? 
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Products</h1>
      <hr />
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
                  onClick={() =>{decrementQty(product._id)}}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">{getQTY(product._id)}</b>
                  <button
                    onClick={() =>{incrementQty(product._id)}}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹ {sumPrice(product._id, product.price)}</span>
                <button
                onClick={()=>{handleDelete(product._id)}}
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
        <span className="font-bold">Total: Rs {total}</span>
      </div>
      <div className="flex justify-end">
        <button onClick={handleOrder} className="bg-yellow-500 text-white rounded-full px-4 py-2 mt-4">
          Order Now
        </button>
      </div>
    </div>
    :
    <>
     <img className="mx-auto w-1/4 mt-12" src="/images/empty-cart.png" alt="" />
     <h1 className="font-bold text-center my-auto">Your Cart is Empty</h1>
     </>
  );
};

export default Cart;
