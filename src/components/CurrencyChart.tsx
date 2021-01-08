import { ResponsiveLine } from "@nivo/line";
import Loader from "./Loader";
import dayjs from "dayjs";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetCurrencyRatesQuery } from "../services/currency";
import { RootState } from "../store";

const CurrencyChart = () => {
  const { addedCurrencies, baseCurrency } = useSelector(
    (state: RootState) => state.appSlice
  );
  const {
    data: currencyApiData,
    refetch,
    isLoading,
    error,
  } = useGetCurrencyRatesQuery(baseCurrency.value.toUpperCase());
  // Define min/max for graph
  let min = 0;
  let max = 0;

  // Assign id, color, and data {x: date, y: rate} for the graph
  const data = addedCurrencies.map(({ value, symbol }) => ({
    id: `${value.toUpperCase()} (${symbol}):`,
    data:
      currencyApiData?.map(({ date, value: rateValue }) => {
        const rateInArray = rateValue[value.toUpperCase()];
        const rateRounded =
          Math.round((rateInArray + Number.EPSILON) * 100) / 100;

        // Calculate min/max of currencyApiData
        if (min === 0) min = rateRounded;
        min = Math.min(rateRounded, min);
        max = Math.max(rateRounded, max);

        return {
          x: dayjs(date).format("YYYY-MM-DD") ?? null,
          y: rateRounded ?? null,
        };
      }) ?? [],
  }));

  const colors = useMemo(() => addedCurrencies.map(({ color }) => color), [
    addedCurrencies,
  ]);

  return (
    <>
      {!error ? (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          curve={"natural"}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          yScale={{
            type: "linear",
            min: +(min / 1.5).toFixed(2),
            max: +(max * 1.2).toFixed(2),
            reverse: false,
          }}
          yFormat={(value) => `${value}`}
          xFormat="time:%Y-%m-%d"
          enableArea={true}
          areaBaselineValue={+(min / 1.5).toFixed(2)}
          areaOpacity={0.2}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%b %d",
            tickValues: +(data[0].data.length / 3).toFixed(0),
            tickRotation: -50,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: baseCurrency.label,
            legendOffset: -45,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableSlices={"x"}
          colors={colors}
          lineWidth={3}
          enablePoints={false}
          animate={true}
        />
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="mb-6 text-indigo-900 text-lg font-bold">
              {JSON.stringify("data" in error ? error.data : error)}
            </p>
            <button
              className="w-2/4 flex items-center justify-center py-2 rounded-full bg-indigo-400 text-white focus:outline-none focus:ring ring-indigo-400 ring-offset-2 ring-offset-white"
              onClick={() => refetch()}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default memo(CurrencyChart);
