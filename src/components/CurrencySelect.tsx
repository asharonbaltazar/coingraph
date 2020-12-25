import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Select, { ValueType } from "react-select";

interface IProps {
  methods: {
    selectValue: { label: string; value: string };
    setSelectDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchMethod: ActionCreatorWithPayload<any, string>;
  };
  data: { label: string; value: string; symbol: string }[];
}

const CurrencySelect = memo(
  ({
    methods: { selectValue, setSelectDisplay, dispatchMethod },
    data,
  }: IProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const selectRefInEffect = selectRef.current;
      // Focus on Select
      selectRefInEffect?.focus();
      // Open Select's menu
      selectRefInEffect?.select.openMenu("first");
      // Hide the select upon closing the menu
      return () => setSelectDisplay(false);
    }, [setSelectDisplay]);
    // Handling select change — setting CurrencyCircle value
    const selectChange = (
      value: ValueType<{ label: string; value: string }, false>
    ) => {
      dispatch(dispatchMethod({ value, selectValue }));
    };
    // useRef for select component
    const selectRef = useRef<Select>(null);

    return (
      <Select
        className="z-30"
        ref={selectRef}
        placeholder={"Select a currency..."}
        value={selectValue}
        onChange={(value) => selectChange(value)}
        options={data.map((element) => ({
          value: element.value,
          label: element.label,
          symbol: element.symbol,
        }))}
      />
    );
  }
);

export default CurrencySelect;
