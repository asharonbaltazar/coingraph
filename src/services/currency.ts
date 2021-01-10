import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import dayjs from "dayjs";
import { dateFormat } from "../utils/format";

interface ApiResponse {
  base: string;
  end_at: string;
  rates: {
    [date: string]: { [rate: string]: number };
  };
  start_at: string;
}
const startDate = dayjs().subtract(5, "year").format(dateFormat);
const today = dayjs().format(dateFormat);

// Define a service using a base URL and expected endpoints
export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.exchangeratesapi.io/",
  }),
  endpoints: (builder) => ({
    getCurrencyRates: builder.query({
      query: (baseCurrency: string) => ({
        url: `history?start_at=${startDate}&end_at=${today}&base=${baseCurrency}`,
        headers: {
          "content-type": "text/plain",
        },
      }),
      transformResponse: (response: ApiResponse) => {
        // Conversion of API object response to array (which will retain just the API object key)
        // First, sort the objects by date (converted into a regular JS date),
        // Then, using the date, map the API object values onto the new array
        const formattedRateData = Object.keys(response.rates)
          .sort((a, b) => Number(dayjs(a).toDate()) - Number(dayjs(b).toDate()))
          .map((element) => ({
            date: element,
            value: response.rates[element],
          }));

        return formattedRateData;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrencyRatesQuery } = currencyApi;
