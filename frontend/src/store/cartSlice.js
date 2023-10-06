import { createSlice } from "@reduxjs/toolkit";

const defaultCart = {
  items:
    JSON.parse(localStorage.getItem(`items_${localStorage.getItem("uid")}`)) ||
    [],
  totalPrice:
    +localStorage.getItem(`price_${localStorage.getItem("uid")}`) || 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCart,
  reducers: {
    add(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const currentItem = state.items[itemIndex];

      let updatedItems;

      if (!currentItem) {
        updatedItems = state.items.concat(action.payload);
      } else {
        const updatedItem = {
          ...currentItem,
          quantity: currentItem.quantity + action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;
      }
      state.items = updatedItems;
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;
    },

    //////

    remove(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const currentItem = state.items[itemIndex];
      let updatedItems;

      if (currentItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;
      }

      state.items = updatedItems;
      state.totalPrice = state.totalPrice - currentItem.price;
    },

    //////

    clear(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
