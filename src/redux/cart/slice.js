import { createSlice } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/cart";
import {
  removeProduct as removeProductInRedux,
  addProduct as addProductInRedux,
  calcTotalPrice,
} from "../../utils/cart";

const getInitialState = () => ({ ...getCartFromLS(), isModalOpened: false });

const initialState = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      addProductInRedux(state.items, action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeProduct(state, action) {
      removeProductInRedux(state.items, action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    openModal(state, action) {
      state.isModalOpened = action.payload;
    },
  },
});

export const { addProduct, openModal, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
