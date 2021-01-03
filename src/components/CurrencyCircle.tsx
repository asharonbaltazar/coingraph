import { memo } from "react";

interface IProps {
  currencyValue: string;
  color: string;
}

const CurrencyCircle = ({ currencyValue, color }: IProps) => {
  return (
    <div
      className="h-10 w-10 text-xs font-bold rounded-full p-4 flex items-center justify-center text-gray-800"
      style={{ backgroundColor: color }}
    >
      {currencyValue.toUpperCase()}
    </div>
  );
};

export default memo(CurrencyCircle);
