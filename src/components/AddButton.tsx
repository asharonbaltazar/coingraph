import { memo } from "react";
import { useSelector } from "react-redux";
import { addCurrencyToGraph } from "../slices/appSlice";
import { RootState } from "../store";
import BottomButton from "./BottomButton";

const AddButton = () => {
  // Disable button upon selecting all currencies
  const { currencies, addedCurrencies } = useSelector(
    (state: RootState) => state
  );
  const disabled = currencies.length === addedCurrencies.length ? true : false;

  const Icon = () => (
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
  );

  return (
    <BottomButton
      Icon={<Icon />}
      disabled={disabled}
      onClickMethod={addCurrencyToGraph}
      buttonTitle={"Add a currency"}
    />
  );
};

export default memo(AddButton);
