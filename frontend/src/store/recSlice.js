import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recData: [],
  fetchData: true,
};

export const recSlice = createSlice({
  name: "receviedData",
  initialState: initialState,
  reducers: {
    fetchDataFun(state) {
      state.fetchData = !state.fetchData;
    },
    setData(state, actions) {
      state.recData = actions.payload;
    },
  },
});

export const recActions = recSlice.actions;
