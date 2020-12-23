import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, addCurrencyToGraph } from "../slices/appSlice";
import { RootState } from "../store";

interface IProps {
  sidebar: boolean;
}

const AddButton = ({ sidebar }: IProps) => {
  const dispatch = useDispatch();
  const addCurrency = () => {
    !sidebar && dispatch(toggleSidebar());
    dispatch(addCurrencyToGraph());
  };

  // Conditional styling
  const conditionalStyling = sidebar ? "justify-between" : "justify-center";
  // Disable button upon selecting all currencies
  const { currencies, addedCurrencies } = useSelector(
    (state: RootState) => state.appSlice
  );
  const disabled = currencies.length === addedCurrencies.length ? true : false;

  return (
    <button
      className={`w-full flex items-center ${conditionalStyling} disabled:opacity-50 disabled:cursor-default bg-gray-800 px-2 py-4 rounded-xl focus:outline-none group ${
        disabled ? "" : "md:hover:bg-indigo-300"
      }`}
      onClick={() => addCurrency()}
      disabled={disabled}
    >
      <div
        className={`h-10 w-10 text-xs px-2 font-bold rounded-full flex items-center justify-center bg-indigo-300 ${
          disabled ? "" : "md:group-hover:bg-gray-800"
        }`}
      >
        <svg
          className={`w-6 h-6 text-gray-800 ${
            disabled ? "" : "md:group-hover:text-white"
          }`}
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
      {sidebar && (
        <div className="w-5/6 md:w-4/6">
          <h1
            className={`font-bold text-white text-right ${
              disabled ? "" : "md:group-hover:text-gray-800"
            }`}
          >
            Add a currency
          </h1>
        </div>
      )}
    </button>
  );
};

export default AddButton;
