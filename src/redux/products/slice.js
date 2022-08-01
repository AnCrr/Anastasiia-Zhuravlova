import { createSlice } from "@reduxjs/toolkit";

import { reduceAttrs } from "../../utils/reduceAttrs";

const initialState = {
  products: [],
};

const modifyProductsData = (data) => {
  return data.map((product) => {
    return { ...product, attributes: reduceAttrs(product.attributes) };
  });
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = modifyProductsData(action.payload);
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
