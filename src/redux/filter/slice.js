import { createSlice } from "@reduxjs/toolkit";
import { getCategoryFromLS } from "../../utils/getCategoryFromLS";
import { getCookie } from "../../utils/getCookie";

const { category } = getCategoryFromLS();
const activeCurrency = getCookie("activeCurrency");
const initialState = {
  category,
  activeCurrency,
  currencies: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setActiveCurrency(state, action) {
      state.activeCurrency = action.payload;
    },
    setCurrencies(state, action) {
      state.currencies = action.payload.currencies;
    },
  },
});

export const { setCategory, setActiveCurrency, setCurrencies } =
  filterSlice.actions;

export default filterSlice.reducer;
