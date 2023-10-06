import React from "react";
import Bg from "../../assets/images/Background.png";

const Background = () => {
  return (
    <img src={Bg} className="-z-10 w-full h-full absolute top-0" />
  );
};

export default Background;
