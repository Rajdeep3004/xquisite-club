import React, { Fragment } from "react";

const SearchBar = (props) => {
  return (
    <Fragment>
      <input
        type="search"
        placeholder="search by name"
        value={props.input}
        onChange={props.changeHandler}
        className="border-2 border-[#595D59] inline w-60"
      />
    </Fragment>
  );
};

export default SearchBar;
