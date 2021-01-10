import { Dispatch, memo, SetStateAction } from "react";
import dayjs from "dayjs";
import { dateFormat } from "../utils/format";

interface IProps {
  date: {
    start: string;
    end: string;
  };
  setDate: Dispatch<
    SetStateAction<{
      start: string;
      end: string;
    }>
  >;
}

const PresetRange = ({ date: { start }, setDate }: IProps) => {
  // Buttons to map
  const buttons = [
    {
      title: "3 Day",
      date: dayjs().subtract(3, "day").format(dateFormat),
    },
    { title: "1 Week", date: dayjs().subtract(1, "week").format(dateFormat) },
    { title: "1 Month", date: dayjs().subtract(1, "month").format(dateFormat) },
    {
      title: "6 Months",
      date: dayjs().subtract(6, "month").format(dateFormat),
    },
    { title: "1 Year", date: dayjs().subtract(1, "year").format(dateFormat) },
    { title: "5 Years", date: dayjs().subtract(5, "year").format(dateFormat) },
  ];

  return (
    <div className="h-full flex flex-wrap content-center justify-center pb-6 pt-4">
      {buttons.map(({ title, date }, index) => {
        return (
          <button
            key={index}
            className={`rounded-lg text-white py-2 w-1/3 my-3 mx-2 border-2 ${
              dayjs(start).isSame(date)
                ? "bg-indigo-400 border-indigo-400 focus:ring ring-indigo-400 ring-offset-2 ring-offset-gray-600"
                : "border-gray-400"
            } hover:border-indigo-400 focus:outline-none focus:ring ring-gray-400 ring-offset-2 ring-offset-gray-600`}
            onClick={() =>
              setDate({
                start: dayjs(date).format(dateFormat),
                end: dayjs().format(dateFormat),
              })
            }
            type="button"
          >
            {title}
          </button>
        );
      })}
    </div>
  );
};

export default memo(PresetRange);
