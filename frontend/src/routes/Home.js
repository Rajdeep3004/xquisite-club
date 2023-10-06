import React, { Fragment } from "react";
import bgRight from "../assets/images/bgRight.png";
import bgLeft from "../assets/images/bgLeft.png";

const Home = () => {
  return (
    <Fragment>
      <div className="grid md:grid-cols-2 justify-items-center md:fixed z-20 bg-white">
        <img
          src={bgLeft}
          alt=""
          className="w-[90%] h-screen pb-0 md:pb-[70%] lg:pb-0"
        />
        <img
          src={bgRight}
          alt=""
          className="w-[90%] md:h-screen pb-0 md:pb-[70%] lg:pb-[20%] md:ml-[10%]"
        />
      </div>
    </Fragment>
  );
};

export default Home;
