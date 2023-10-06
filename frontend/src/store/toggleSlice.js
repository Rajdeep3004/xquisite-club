import { createSlice } from "@reduxjs/toolkit";

const toggleState = { genderType: "men", price: true };

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleState,
  reducers: {
    setMen(state) {
      state.genderType = "men";
    },
    setWomen(state) {
      state.genderType = "women";
    },
    setPrice(state, action) {
      state.price = action.payload || !state.price;
    },
  },
});

export const toggleActions = toggleSlice.actions;
