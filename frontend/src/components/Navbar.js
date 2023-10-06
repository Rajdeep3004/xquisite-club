import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import logo from "../assets/icons/Logo.svg";
import HamburgerSVG from "./Resuable/HamburgerSVG";
import CloseSVg from "./Resuable/CloseSVG";

const Navbar = () => {
  const dispatch = useDispatch(false);
  const [open, setOpen] = useState();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const changeHandler = () => {
    setOpen((prev) => !prev);
  };

  const cartItems = cart.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  const signOutHandler = (event) => {
    event.preventDefault();
    setOpen(false);
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("home", { replace: true });
  };

  return (
    <nav className="flex justify-between items-center z-10 sticky top-0 bg-white">
      <NavLink to="home" className="mx-4">
        <img alt="logo" src={logo} className="w-24 h-24" />
      </NavLink>

      <button className="visible md:hidden z-30 mx-4" onClick={changeHandler}>
        {open ? <CloseSVg /> : <HamburgerSVG />}
        {!open && isLoggedIn && (
          <span className="text-xs absolute bottom-8 right-2 align-super bgLight text-white rounded-full p-1">
            {cartItems}
          </span>
        )}
      </button>

      <ul
        className={`nav-ul flex flex-col items-center md:inline md:text-end z-10 absolute top-0 w-screen h-fit md:static ${
          open ? "visible " : "hidden"
        }`}
      >
        <NavLink
          to="items"
          onClick={() => {
            setOpen(false);
          }}
          className={({ isActive }) =>
            isActive ? "nav-li-active" : "nav-li-inactive"
          }
        >
          Items
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="order"
            onClick={() => {
              setOpen(false);
            }}
            className={({ isActive }) =>
              isActive ? "nav-li-active" : "nav-li-inactive"
            }
          >
            Order
            <span className="text-base align-super bgLight text-white rounded-full p-1">
              {cartItems}
            </span>
          </NavLink>
        )}

        <NavLink
          onClick={
            isLoggedIn
              ? signOutHandler
              : () => {
                  setOpen(false);
                }
          }
          to={isLoggedIn ? null : "login"}
          className={({ isActive }) =>
            isActive ? "px-4 py-4 lg:py-0" : "px-4 py-4 lg:py-0"
          }
        >
          {isLoggedIn ? "Sign out" : "Login"}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
