import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  currency: "$",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { setCategory, setCurrency } = filterSlice.actions;

export default filterSlice.reducer;
