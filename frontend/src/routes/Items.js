import React, { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Items = () => {
  const Links = [
    {
      link: "upperwear",
      name: "Upperwear",
    },
    {
      link: "bottomwear",
      name: "Bottomwear",
    },
    {
      link: "shoes",
      name: "Shoes",
    },
  ];
  return (
    <Fragment>
      <nav className="item-nav-div">
        {Links.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? "rounded-[34px] textLight underline underline-offset-8 text-base md:text-xl hover:scale-110 duration-500"
                : " rounded-[34px] textDark text-base md:text-xl hover:scale-110 duration-500"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Items;
