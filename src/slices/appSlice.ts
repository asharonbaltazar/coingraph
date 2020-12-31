import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import randomColor from "randomcolor";
import dayjs from "dayjs";
import { RootState } from "../store";

interface InitialState {
  currencies: { label: string; value: string; symbol: string }[];
  baseCurrency: { label: string; value: string; symbol: string };
  addedCurrencies: {
    label: string;
    value: string;
    symbol: string;
    color: string;
  }[];
  currencyApiData: {
    date: string;
    value: { [rateType: string]: number };
  }[];

  menuView: boolean;
  sidebar: boolean;
  loading: boolean;
}

interface ApiResponse {
  base: string;
  end_at: string;
  rates: {
    [date: string]: number;
  };
  start_at: string;
}

export const getCurrencyRates = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("app/getCurrencyRates", async (_, { getState, rejectWithValue }) => {
  // Two variables for readibality: baseCurrency and today's date
  const baseCurrency = getState().baseCurrency.value.toUpperCase();
  const today = dayjs().format("YYYY-MM-DD");

  const apiResponse = await axios.get<ApiResponse>(
    `https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=${today}&base=${baseCurrency}`
  );

  // Reject if API call goes awry
  if (typeof apiResponse.data === "string")
    return rejectWithValue("An error has occured. Please try again later");

  // Conversion of API object response to array (which will retain just the API object key)
  // First, sort the objects by date (converted into a regular JS date),
  // Then, using the date, map the API object values onto the new array
  const formattedRateData = Object.keys(apiResponse.data.rates)
    .sort((a, b) => Number(dayjs(a).toDate()) - Number(dayjs(b).toDate()))
    .map((element) => ({
      date: element,
      value: apiResponse.data.rates[element],
    }));

  return formattedRateData;
});

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
    currencyApiData: [],
    menuView: false,
    sidebar: true,
    loading: false,
  } as InitialState,
  reducers: {
    toggleMenuWidth: (state, action: PayloadAction<boolean | undefined>) => {
      action.payload
        ? (state.menuView = action.payload)
        : (state.menuView = !state.menuView);
    },
    toggleSidebarDisplay: (state) => {
      state.menuView = false;
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
      // Filter the deleted value in action.payload from the addedCurrencies array
      const filteredArray = state.addedCurrencies.filter(
        (element) => element.value !== action.payload
      );
      state.addedCurrencies = filteredArray;
    },
    changeBaseCurrencyValue: (state, action) => {
      const { value, symbol, label } = action.payload;
      // Base currency can only be one
      state.baseCurrency = { value, symbol, label };
    },
    changeAddedCurrencyValue: (state, action) => {
      // value is the old value (stored in state), selectValue is the new selected value
      const { label, value, symbol, oldValue } = action.payload;
      // Find value's index sin the addedCurrencies
      let foundIndex = state.addedCurrencies.findIndex(
        (element) => element.value === oldValue
      );
      // Retain the old value's color
      const color = state.addedCurrencies[foundIndex].color;
      // Replace old value with new selected value in array
      state.addedCurrencies.splice(foundIndex, 1, {
        label,
        value,
        symbol,
        color,
      });
    },
  },
  extraReducers(builders) {
    builders.addCase(getCurrencyRates.rejected, (state) => {
      state.loading = false;
    });
    builders.addCase(getCurrencyRates.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getCurrencyRates.fulfilled, (state, action) => {
      state.currencyApiData = action.payload;
      state.loading = false;
    });
  },
});

export const {
  toggleMenuWidth,
  toggleSidebarDisplay,
  addCurrencyToGraph,
  deleteValueFromAddedCurrency,
  changeBaseCurrencyValue,
  changeAddedCurrencyValue,
} = appSlice.actions;
export default appSlice.reducer;
