import React, { useState, Suspense } from "react";
import Fallback from "../components/Resuable/Fallback";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

const Checkout = React.lazy(() => import("./order/Checkout"));
const Received = React.lazy(() => import("./order/Received"));

const Order = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const email = localStorage.getItem("email");
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="order-div">
      <h1 className="p-4 font-bold">Cart: {email}</h1>
      <p className="px-4 text-xs"></p>
      {cart.items.map((item) => (
        <div key={item.id} className="p-4 grid grid-cols-3 shadow-md">
          <div className="flex justify-start items-center">
            <img alt={item.alt} src={item.url} className="order-img" />
            <h1 className="inline-block ml-2">
              {item.name} - Size: {item.size}
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <p className="">₹{item.price}</p>
          </div>
          <div className="flex justify-end items-center">
            <p className="mr-8">x{item.quantity}</p>
            <button
              onClick={(event) => {
                event.preventDefault();
                dispatch(cartActions.remove(item.id));
              }}
              className="mr-8 order-btn"
            >
              −
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                dispatch(cartActions.add({ ...item, quantity: 1 }));
              }}
              className="order-btn"
            >
              +
            </button>
          </div>
        </div>
      ))}
      {showCheckout && cart.items.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <Checkout />
        </Suspense>
      )}
      <div className="flex justify-between items-center m-4">
        <p className="font-bold ">Total Price: ₹{cart.totalPrice}</p>
        <button
          className="bg-white p-4 text-[#3f6690] hover:scale-110 duration-300"
          onClick={() => {
            setShowCheckout((pv) => !pv);
          }}
        >
          {showCheckout && cart.items.length > 0 ? "Cancel" : "Order"}
        </button>
      </div>
      <Suspense fallback={<Fallback />}>
        <Received />
      </Suspense>
    </div>
  );
};

export default Order;
