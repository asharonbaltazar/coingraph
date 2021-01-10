import { Dispatch, SetStateAction } from "react";
import DateInput from "./DateInput";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { dateFormat } from "../utils/format";
dayjs.extend(isSameOrAfter);

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

const CustomRange = ({ date: { start, end }, setDate }: IProps) => {
  // onChange for first date input and forbid changing date higher than bottom input
  const handleFirstSecondDateChange = (value: string) => {
    if (!dayjs(value).isSameOrAfter(dayjs(end))) {
      setDate((prevState) => ({ ...prevState, start: value }));
    }
  };

  // Handle change and change previous input if necessary
  const handleSecondDateChange = (value: string) => {
    if (dayjs(start).isAfter(dayjs(value))) {
      setDate((prevState) => ({
        ...prevState,
        start: dayjs(value).subtract(1, "day").format(dateFormat),
      }));
    }
    setDate((prevState) => ({ ...prevState, end: value }));
  };

  return (
    <div className="flex flex-col justify-center px-4 pb-6 pt-4">
      <label className="text-base text-gray-300">Starting: </label>
      <DateInput
        min={dayjs().subtract(10, "year").format(dateFormat)}
        max={dayjs(end).subtract(1, "day").format(dateFormat)}
        value={start}
        onChange={handleFirstSecondDateChange}
      />
      <div className="mt-6">
        <label className="text-base text-gray-300">Ending: </label>
        <DateInput
          min={dayjs().subtract(10, "year").format(dateFormat)}
          max={dayjs().format(dateFormat)}
          value={end}
          onChange={handleSecondDateChange}
        />
      </div>
    </div>
  );
};

export default CustomRange;
