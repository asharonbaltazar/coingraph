import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CurrencyChart = () => {
  const { addedCurrencies, currencyApiData, baseCurrency } = useSelector(
    (state: RootState) => state.appSlice
  );
  // Define min/max for graph
  let min = 0;
  let max = 0;

  // Assign id, color, and data {x: date, y: rate} for the graph
  const data = addedCurrencies.map(({ value, color, symbol }) => ({
    id: `${value.toUpperCase()} (${symbol}):`,
    color: color,
    data: currencyApiData.map(({ date, value: apiValue }) => {
      const rateInArray = apiValue[value.toUpperCase()];
      const rateRounded =
        Math.round((rateInArray + Number.EPSILON) * 100) / 100;
      // Calculate min/max of currencyApiData
      min = rateRounded;
      min = Math.min(rateRounded, min);
      max = Math.max(rateRounded, max);

      return {
        x: dayjs(date).format("YYYY-MM-DD") ?? null,
        y: rateRounded ?? null,
      };
    }),
  }));

  const colors = addedCurrencies.map(({ color }) => color);

  return (
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
        min: "auto",
        max: "auto",
        reverse: false,
      }}
      yFormat={(value) => `${value}`}
      xFormat="time:%Y-%m-%d"
      enableArea={true}
      areaOpacity={0.2}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %d",
        tickValues: 40,
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
      useMesh={true}
      animate={true}
    />
  );
};

export default CurrencyChart;
