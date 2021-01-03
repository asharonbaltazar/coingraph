import { memo } from "react";
import { useSelector } from "react-redux";
import { addCurrencyToGraph } from "../slices/appSlice";
import { RootState, useAppDispatch } from "../store";

interface IProps {
  menuWidth: boolean;
}

const AddButton = memo(({ menuWidth }: IProps) => {
  const dispatch = useAppDispatch();
  const addCurrency = () => {
    dispatch(addCurrencyToGraph());
  };

  // Conditional styling
  const conditionalStyling = menuWidth ? "justify-between" : "justify-center";
  // Disable button upon selecting all currencies
  const { currencies, addedCurrencies } = useSelector(
    (state: RootState) => state
  );
  const disabled = currencies.length === addedCurrencies.length ? true : false;

  return (
    <div className="w-full pt-2 px-4">
      <button
        className={`w-full flex items-center ${conditionalStyling} disabled:opacity-50 disabled:cursor-default bg-indigo-400 px-2 py-4 rounded-xl focus:outline-none group focus:ring ring-indigo-400 ring-offset-2 ring-offset-gray-800 ${
          disabled ? "" : "md:hover:bg-opacity-80"
        }`}
        onClick={() => !disabled && addCurrency()}
        disabled={disabled}
      >
        <div className="h-10 w-10 text-xs px-2 font-bold rounded-full flex items-center justify-center bg-gray-800">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        {menuWidth && (
          <div className="w-5/6 md:w-4/6">
            <h1 className="font-bold text-white text-right">Add a currency</h1>
          </div>
        )}
      </button>
    </div>
  );
});

export default AddButton;
