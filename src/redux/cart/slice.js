import { createSlice } from "@reduxjs/toolkit";

import { calcTotalPrice } from "../../utils/calcTotalPrice";

const initialState = {
  items: [],
  opened: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    openModal(state, action) {
      state.opened = action.payload;
    },
  },
});

export const { addItem, openModal } = cartSlice.actions;

export default cartSlice.reducer;
