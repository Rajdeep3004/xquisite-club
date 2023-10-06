import React, { Fragment } from "react";
import Card from "../Resuable/Card";
import SearchBar from "./SearchBar";
import PriceBtn from "./PriceBtn";
import GenderBtn from "./GenderBtn";

const RenderList = (props) => {
  return (
    <Fragment>
      <div className="text-center text-sm md:text-base">
        <GenderBtn />
        <SearchBar input={props.input} changeHandler={props.changeHandler} />
        <PriceBtn
          toggleSortOrder={props.toggleSortOrder}
          sortOrder={props.sortOrder}
        />
      </div>
      {props.finalList.length > 0 ? (
        <form className="render-form-div">
          {props.finalList.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              alt={item.alt}
              url={item.url}
              name={item.name}
              price={item.price}
              sizeType={props.sizeType}
            />
          ))}
        </form>
      ) : (
        <p className="my-6 text-center">No item found with such name.</p>
      )}
    </Fragment>
  );
};

export default RenderList;
