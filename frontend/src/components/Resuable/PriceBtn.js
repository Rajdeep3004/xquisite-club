import React, { Fragment } from "react";
import ua from "../../assets/icons/ua.svg";
import da from "../../assets/icons/da.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../../store/toggleSlice";

const PriceBtn = (props) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.toggle.price);
  return (
    <Fragment>
      <button
        onClick={() => {
          dispatch(toggleActions.setPrice());
        }}
        className="textLight"
      >
        {price ? (
          <img src={ua} alt="" className="w-6 h-6 inline" />
        ) : (
          <img src={da} alt="" className="w-6 h-6 inline" />
        )}
        Price
      </button>
    </Fragment>
  );
};

export default PriceBtn;
