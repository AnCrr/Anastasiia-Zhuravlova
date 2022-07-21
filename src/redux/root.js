import { combineReducers } from "@reduxjs/toolkit";

import filter from "./filter/slice";
import cart from "./cart/slice";
import products from "./products/slice";

export const rootReducer = combineReducers({ filter, cart, products });
