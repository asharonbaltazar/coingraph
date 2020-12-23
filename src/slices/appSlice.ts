import { createSlice } from "@reduxjs/toolkit";
import uniqolor from "uniqolor";

interface InitialState {
  currencies: { name: string; value: string; symbol: string }[];
  baseCurrency: { name: string; value: string } | {};
  addedCurrencies: {
    name: string;
    value: string;
    symbol: string;
    color: string;
  }[];
  sidebar: boolean;
}

export const appSlice = createSlice({
  name: "appslice",
  initialState: {
    currencies: [
      { name: "Australian dollar", value: "aud", symbol: "$" },
      { name: "Brazilian real", value: "brl", symbol: "R$" },
      { name: "Bulgarian lev", value: "bgn", symbol: "лв" },
      { name: "Canadian dollar", value: "cad", symbol: "$" },
      { name: "Chinese yuan renminbi", value: "cny", symbol: "¥" },
      { name: "Croatian kuna", value: "hrk", symbol: "kn" },
      { name: "Czech koruna", value: "czk", symbol: "Kč" },
      { name: "Danish krone", value: "dkk", symbol: "kr" },
      { name: "European euro", value: "eur", symbol: "€" },
      { name: "Hong Kong dollar", value: "hkd", symbol: "HK$" },
      { name: "Hungarian forint", value: "huf", symbol: "Ft" },
      { name: "Icelandic krona", value: "isk", symbol: "Íkr" },
      { name: "Indian rupee", value: "inr", symbol: "₹" },
      { name: "Indonesian rupiah", value: "idr", symbol: "Rp" },
      { name: "Israeli shekel", value: "ils", symbol: "₪" },
      { name: "Japanese yen", value: "jpy", symbol: "¥" },
      { name: "Malaysian ringgit", value: "myr", symbol: "RM" },
      { name: "Mexican peso", value: "mxn", symbol: "Mex$" },
      { name: "New Zealand dollar", value: "nzd", symbol: "$" },
      { name: "Philippine peso", value: "php", symbol: "₱" },
      { name: "Pound sterling", value: "gbp", symbol: "£" },
      { name: "Romanian leu", value: "ron", symbol: "lei" },
      { name: "Russian rouble", value: "rub", symbol: "Р" },
      { name: "Swedish krona", value: "sek", symbol: "kr" },
      { name: "Singapore dollar", value: "sgd", symbol: "S$" },
      { name: "South African rand", value: "zar", symbol: "R" },
      { name: "South Korean won", value: "krw", symbol: "₩" },
      { name: "Swiss france", value: "chf", symbol: "CHF" },
      { name: "Thai baht", value: "thb", symbol: "฿" },
      { name: "Turkish lira", value: "try", symbol: "₺" },
      { name: "US dollar", value: "usd", symbol: "$" },
    ],
    baseCurrency: {},
    addedCurrencies: [],
    sidebar: false,
  } as InitialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    addCurrencyToGraph: (state) => {
      const { name, value, symbol } = state.currencies.filter((currency) =>
        state.addedCurrencies.every(
          (addedCurrency) => currency.value !== addedCurrency.value
        )
      )[0];
      const color = uniqolor.random({ saturation: 50, lightness: [70, 80] })
        .color;
      const newGraphCurrency = {
        name,
        value,
        symbol,
        color,
      };
      state.addedCurrencies.push(newGraphCurrency);
    },
    deleteValueFromAddedCurrency: (state, action) => {
      const filteredArray = state.addedCurrencies.filter(
        (element) => element.value !== action.payload
      );
      state.addedCurrencies = filteredArray;
    },
    changeBaseCurrencyValue: (state, action) => {
      const { value } = action.payload;
      state.baseCurrency = value;
    },
    changeAddedCurrencyValue: (state, action) => {
      const { value, selectValue } = action.payload;
      let foundIndex = state.addedCurrencies.findIndex(
        (element) => element.value === selectValue.value
      );
      const color = state.addedCurrencies[foundIndex].color;
      state.addedCurrencies.splice(foundIndex, 1, {
        name: value.label,
        value: value.value,
        symbol: value.symbol,
        color,
      });
    },
  },
});

export const {
  toggleSidebar,
  addCurrencyToGraph,
  deleteValueFromAddedCurrency,
  changeBaseCurrencyValue,
  changeAddedCurrencyValue,
} = appSlice.actions;
export default appSlice.reducer;
