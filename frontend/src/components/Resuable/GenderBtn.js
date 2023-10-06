import React from "react";
import { toggleActions } from "../../store/toggleSlice";
import { useDispatch, useSelector } from "react-redux";

const GenderBtn = () => {
  const dispatch = useDispatch();
  const genderType = useSelector((state) => state.toggle.genderType);
  return (
    <div className="inline-block mb-2">
      <button
        onClick={() => {
          dispatch(toggleActions.setMen());
        }}
        className={`mx-2 border-2 border-[#3f6690] px-2 ${
          genderType === "men" ? "bgLight text-white" : "bg-white textLight"
        }`}
      >
        Men
      </button>
      <button
        onClick={() => {
          dispatch(toggleActions.setWomen());
        }}
        className={`mx-2 border-2 border-[#3f6690] px-2 ${
          genderType === "women" ? "bgLight text-white" : "bg-white textLight"
        }`}
      >
        Women
      </button>
    </div>
  );
};

export default GenderBtn;
