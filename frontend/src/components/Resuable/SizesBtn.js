import React, { Fragment } from "react";

const SizesBtn = (props) => {
  let sizes;
  if (props.sizeType === "upper") {
    sizes = ["S", "M", "L", "XL"];
  } else if (props.sizeType === "bottom") {
    sizes = ["30", "32", "34", "36"];
  } else if (props.sizeType === "shoes") {
    sizes = ["UK4", "UK5", "UK6", "UK7"];
  }

  return (
    <Fragment>
      {sizes.map((item) => (
        <button
          key={item}
          className={`rounded-full bgLight hover:scale-110 duration-300 px-4 py-2 ${
            props.sizeType === "bottom" ? "px-[0.75rem]" : ""
          } ${
            props.sizeType === "shoes" ? "px-1" : ""
          } `}
          value={item}
          onClick={(e) => {
            e.preventDefault();
            props.setSizeBtn(e.target.value);
          }}
        >
          {item}
        </button>
      ))}
    </Fragment>
  );
};

export default SizesBtn;
