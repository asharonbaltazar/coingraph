import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { memo, useEffect, useRef } from "react";
import { useAppDispatch } from "../store";
import Select, { ValueType } from "react-select";

interface IProps {
  methods: {
    oldValue: { label: string; value: string; symbol: string };
    dispatchMethod: ActionCreatorWithPayload<any, string>;
  };
  data: { label: string; value: string; symbol: string }[];
}

const CurrencySelect = ({
  methods: { oldValue, dispatchMethod },
  data,
}: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const selectRefInEffect = selectRef.current;
    // Focus on Select
    selectRefInEffect?.focus();
    // Open Select's menu
    selectRefInEffect?.select.openMenu("first");
  }, []);
  // Handling select change — setting CurrencyCircle value
  const selectChange = (
    newValue: ValueType<{ label: string; value: string }, false>
  ) => {
    dispatch(dispatchMethod({ ...newValue, oldValue: oldValue.value }));
  };
  // useRef for select component
  const selectRef = useRef<Select>(null);

  return (
    <Select
      ref={selectRef}
      placeholder={"Select a currency..."}
      value={oldValue}
      onChange={(value) => selectChange(value)}
      options={data.map((element) => ({
        value: element.value,
        label: element.label,
        symbol: element.symbol,
      }))}
    />
  );
};
export default memo(CurrencySelect);
