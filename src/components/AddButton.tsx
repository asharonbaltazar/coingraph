import { memo } from "react";
import { useSelector } from "react-redux";
import { addCurrencyToGraph } from "../slices/appSlice";
import { RootState, useAppDispatch } from "../store";
import BottomButton from "./BottomButton";
import { Add } from "./Icons";

const AddButton = () => {
  const dispatch = useAppDispatch();
  // Disable button upon selecting all currencies
  const { currencies, addedCurrencies } = useSelector(
    (state: RootState) => state
  );
  const disabled = currencies.length === addedCurrencies.length ? true : false;

  return (
    <BottomButton
      Icon={<Add />}
      disabled={disabled}
      onClickMethod={() => dispatch(addCurrencyToGraph())}
      buttonTitle={"Add a currency"}
    />
  );
};

export default memo(AddButton);
