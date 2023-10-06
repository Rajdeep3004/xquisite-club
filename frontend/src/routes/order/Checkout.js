import React, { useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { recActions } from "../../store/recSlice";

const Checkout = () => {
  const url = process.env.REACT_APP_BACK_CONNECT || "http://localhost:5000";
  const initialInput = {
    name: "",
    add: "",
    zip: "",
    c_no: "",
    payment: "Select",
  };

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [input, setInput] = useState(initialInput);
  const [msg, setMsg] = useState({ msg: "", showMsg: false });

  const changeHandler = (e) => {
    setMsg({ ...msg, msg: "", showMsg: false });
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      input.name.trim().length > 1 &&
      input.add.trim().length > 4 &&
      input.zip.length > 5 &&
      input.c_no.length > 9 &&
      input.c_no.length < 14 &&
      input.payment !== "Select"
    ) {
      setMsg({ ...msg, msg: "Packing......", showMsg: true });
      const uid = localStorage.getItem("uid");
      axios
        .post(`${url}/api/data/postData`, {
          uid: uid,
          formData: {
            name: input.name,
            add: input.add,
            zip: input.zip,
            c_no: input.c_no,
            payment: input.payment,
          },
          cartItems: cart.items,
          cartTotal: cart.totalPrice,
        })
        .then((res) => {
          setMsg({ ...msg, msg: res.data.message, showMsg: true });

          setTimeout(() => {
            setInput(initialInput);
            dispatch(cartActions.clear());
            dispatch(recActions.fetchDataFun());
          }, 2000);
        })
        .catch((error) => alert(`Sending order --- ${error}`));
    } else {
      setMsg({ ...msg, msg: "Invalid field(s).", showMsg: true });
    }
  };

  return (
    <CheckoutForm
      input={input}
      msg={msg}
      changeHandler={changeHandler}
      submitHandler={submitHandler}
    />
  );
};

export default Checkout;
