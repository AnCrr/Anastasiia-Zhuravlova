import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies";

const activeCurrency = getCookie("activeCurrency");
const initialState = {
  activeCurrency,
  currencies: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCurrency(state, action) {
      state.activeCurrency = action.payload;
    },
    setCurrencies(state, action) {
      state.currencies = action.payload.currencies;
    },
  },
});

export const { setActiveCurrency, setCurrencies } = filterSlice.actions;

export default filterSlice.reducer;
