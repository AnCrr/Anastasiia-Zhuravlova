import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filter from "./filter/slice";
import cart from "./cart/slice";
import products from "./products/slice";

export const store = configureStore({
  reducer: { filter, cart, products },
});

export const useAppDispatch = () => useDispatch();
