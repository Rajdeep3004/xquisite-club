import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { authSlice } from "./authSlice";
import { recSlice } from "./recSlice";
import { toggleSlice } from "./toggleSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    received: recSlice.reducer,
    toggle: toggleSlice.reducer,
  },
});
