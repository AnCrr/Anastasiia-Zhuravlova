import { createSlice } from "@reduxjs/toolkit";

import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";

const initialState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) => {
          return obj.id === action.payload.productInfo.id;
        } // how to compare correctly
      );
      if (findItem) {
        findItem.count++;
      } else {
        const attributes = action.payload.productInfo.attributes.reduce(
          (accum, attribute) => {
            const obj = {};
            obj.id = attribute.id;
            obj.name = attribute.name;
            obj.values = [];
            attribute.items.map((item) => obj.values.push(item.value));
            accum.push(obj);
            return accum;
          },
          []
        );
        state.items.push({
          ...action.payload.productInfo,
          count: 1,
          attributes,
          attrs: action.payload.productAttrs,
        });
      }
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    openModal(state, action) {
      state.opened = action.payload;
      state.totalPrice = calcTotalPrice(state.items).toFixed(2);
    },
  },
});

export const { addItem, openModal, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
