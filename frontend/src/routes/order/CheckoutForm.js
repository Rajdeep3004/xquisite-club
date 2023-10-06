import React, { Fragment } from "react";

const CheckoutForm = (props) => {
  return (
    <Fragment>
      <form className="order-div my-2 flex flex-col items-center">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          minLength="2"
          type="text"
          value={props.input.name}
          className="checkoutForm-input"
          onChange={props.changeHandler}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="add"
          minLength="5"
          type="text"
          value={props.input.add}
          className="checkoutForm-input"
          onChange={props.changeHandler}
        />

        <label htmlFor="contact">Zip</label>
        <input
          id="zip"
          name="zip"
          type="number"
          value={props.input.zip}
          className="checkoutForm-input"
          onChange={props.changeHandler}
        />
        <label htmlFor="contact">Contact No.</label>
        <input
          id="contact"
          name="c_no"
          type="number"
          value={props.input.c_no}
          className="checkoutForm-input"
          onChange={props.changeHandler}
        />
        <label htmlFor="payment">Payment type:</label>
        <select
          id="payment"
          name="payment"
          className="checkoutForm-input"
          value={props.input.payment}
          onChange={props.changeHandler}
        >
          <option disabled className="text-xs md:text-base">
            Select
          </option>
          <option value="net banking" className="text-xs md:text-base">
            Net Banking
          </option>
          <option value="upi id" className="text-xs md:text-base">
            Upi Id
          </option>
          <option value="credit/debit card" className="text-xs md:text-base">
            Credit/Debit Card
          </option>
        </select>
        {props.msg.showMsg && (
          <p className="text-white font-bold">{props.msg.msg}</p>
        )}
      </form>
      <div className="flex justify-center mt-4">
        <button
          className="bg-white p-4 text-[#3f6690] hover:scale-110 duration-300"
          onClick={props.submitHandler}
        >
          Confirm
        </button>
      </div>
    </Fragment>
  );
};

export default CheckoutForm;
