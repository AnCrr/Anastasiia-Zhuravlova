import { createSlice } from "@reduxjs/toolkit";

import { calcTotalPrice } from "../../utils/cart";
import { getCartFromLS } from "../../utils/cart";
import { handleProuctInCart } from "../../utils/cart";

const initialState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const operator = true;
      handleProuctInCart(state.items, action.payload, operator);
      state.totalPrice = calcTotalPrice(state.items);
    },
    decreaseCount(state, action) {
      const operator = false;
      handleProuctInCart(state.items, action.payload, operator);
      state.totalPrice = calcTotalPrice(state.items);
    },
    openModal(state, action) {
      state.isModalOpened = action.payload;
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addProduct, openModal, decreaseCount } = cartSlice.actions;

export default cartSlice.reducer;
