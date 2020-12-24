import { createSlice } from "@reduxjs/toolkit";
import randomColor from "randomcolor";

interface InitialState {
  currencies: { label: string; value: string; symbol: string }[];
  baseCurrency: { label: string; value: string; symbol: string };
  addedCurrencies: {
    label: string;
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
      { label: "Australian dollar", value: "aud", symbol: "$" },
      { label: "Brazilian real", value: "brl", symbol: "R$" },
      { label: "Bulgarian lev", value: "bgn", symbol: "лв" },
      { label: "Canadian dollar", value: "cad", symbol: "$" },
      { label: "Chinese yuan renminbi", value: "cny", symbol: "¥" },
      { label: "Croatian kuna", value: "hrk", symbol: "kn" },
      { label: "Czech koruna", value: "czk", symbol: "Kč" },
      { label: "Danish krone", value: "dkk", symbol: "kr" },
      { label: "European euro", value: "eur", symbol: "€" },
      { label: "Hong Kong dollar", value: "hkd", symbol: "HK$" },
      { label: "Hungarian forint", value: "huf", symbol: "Ft" },
      { label: "Icelandic krona", value: "isk", symbol: "Íkr" },
      { label: "Indian rupee", value: "inr", symbol: "₹" },
      { label: "Indonesian rupiah", value: "idr", symbol: "Rp" },
      { label: "Israeli shekel", value: "ils", symbol: "₪" },
      { label: "Japanese yen", value: "jpy", symbol: "¥" },
      { label: "Malaysian ringgit", value: "myr", symbol: "RM" },
      { label: "Mexican peso", value: "mxn", symbol: "Mex$" },
      { label: "New Zealand dollar", value: "nzd", symbol: "$" },
      { label: "Philippine peso", value: "php", symbol: "₱" },
      { label: "Pound sterling", value: "gbp", symbol: "£" },
      { label: "Romanian leu", value: "ron", symbol: "lei" },
      { label: "Russian rouble", value: "rub", symbol: "Р" },
      { label: "Swedish krona", value: "sek", symbol: "kr" },
      { label: "Singapore dollar", value: "sgd", symbol: "S$" },
      { label: "South African rand", value: "zar", symbol: "R" },
      { label: "South Korean won", value: "krw", symbol: "₩" },
      { label: "Swiss france", value: "chf", symbol: "CHF" },
      { label: "Thai baht", value: "thb", symbol: "฿" },
      { label: "Turkish lira", value: "try", symbol: "₺" },
      { label: "US dollar", value: "usd", symbol: "$" },
    ],
    baseCurrency: { label: "US dollar", value: "usd", symbol: "$" },
    addedCurrencies: [
      {
        label: "Pound sterling",
        value: "gbp",
        symbol: "£",
        color: "rgb(249, 152, 163)",
      },
    ],
    sidebar: false,
  } as InitialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    addCurrencyToGraph: (state) => {
      if (state.addedCurrencies.length !== state.currencies.length) {
        const { label, value, symbol } = state.currencies.filter((currency) =>
          state.addedCurrencies.every(
            (addedCurrency) => currency.value !== addedCurrency.value
          )
        )[0];
        const color = randomColor({
          luminosity: "light",
          format: "rgb",
        });
        const newGraphCurrency = {
          label,
          value,
          symbol,
          color,
        };
        state.addedCurrencies.push(newGraphCurrency);
      }
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
        label: value.label,
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
