import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import SizesBtn from "./SizesBtn";

const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sizeBtn, setSizeBtn] = useState("Select");
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const quantityInputRef = useRef();

  const routeHandler = (event) => {
    event.preventDefault();
    navigate("/login", { replace: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      +quantityInputRef.current.value < 1 ||
      +quantityInputRef.current.value > 15
    ) {
      setQuantityIsValid(false);
      return;
    }
    dispatch(
      cartActions.add({
        id: props.id + sizeBtn,
        size: sizeBtn,
        name: props.name,
        price: props.price,
        quantity: +quantityInputRef.current.value,
        url: props.url,
      })
    );
  };
  return (
    <div key={props.id} className="card-div">
      <div className="grid grid-cols-2">
        <img alt={props.alt} src={props.url} className="w-full" />
        <div className="grid grid-cols-2 justify-items-center items-center text-white">
          <SizesBtn setSizeBtn={setSizeBtn} sizeType={props.sizeType} />
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold inline-block mt-2">{props.name}</h1>
        <div className="flex gap-x-4 my-4 font-bold text-sm">
          <p>Quantity:</p>
          <input
            ref={quantityInputRef}
            id={`quantity_${props.id}`}
            type="number"
            min="1"
            max="15"
            step="1"
            defaultValue="1"
            className="w-8"
          />
          <p>Size: {sizeBtn}</p>
        </div>
        <div className="flex justify-between items-center py-2 text-sm">
          <p className="font-bold">Price: ₹{props.price}</p>
          <button
            disabled={sizeBtn === "Select"}
            onClick={isLoggedIn ? submitHandler : routeHandler}
            className="card-btn"
          >
            Add to cart
          </button>
        </div>
      </div>
      {!quantityIsValid && (
        <p className="text-center text-xs">Allowed Quantity (1-15).</p>
      )}
    </div>
  );
};

export default Card;
