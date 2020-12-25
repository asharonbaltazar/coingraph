import { memo } from "react";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CurrencyChart = memo(() => {
  const { addedCurrencies, currencyApiData, baseCurrency } = useSelector(
    (state: RootState) => state.appSlice
  );

  const data = addedCurrencies.map((element) => ({
    id: element.value.toUpperCase(),
    color: element.color,
    data: currencyApiData.map(({ date, value }) => ({
      x: dayjs(date).format("YYYY-MM-DD") ?? null,
      y: value[element.value.toUpperCase()].toFixed(3) ?? null,
    })),
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
      yFormat=" >-.2f"
      xFormat="time:%Y-%m-%d"
      enableArea={true}
      areaOpacity={0.2}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %d",
        tickValues: 30,
        tickRotation: -50,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${baseCurrency.symbol} ${baseCurrency.label}`,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableSlices={"x"}
      colors={colors}
      lineWidth={3}
      enablePoints={false}
      useMesh={true}
      animate={false}
    />
  );
});

export default CurrencyChart;
