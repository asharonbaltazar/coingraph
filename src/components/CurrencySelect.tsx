import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Select, { ValueType } from "react-select";

interface IProps {
  methods: {
    selectValue: ValueType<
      { id?: string; label: string; value: string },
      false
    >;
    setCurrencySelectValue: React.Dispatch<
      React.SetStateAction<ValueType<{ label: string; value: string }, false>>
    >;
    setSelectDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchMethod: ActionCreatorWithPayload<any, string>;
  };
  data: { name: string; value: string; symbol: string }[];
}

const CurrencySelect = ({
  methods: {
    selectValue,
    setCurrencySelectValue,
    setSelectDisplay,
    dispatchMethod,
  },
  data,
}: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const selectRefInEffect = selectRef.current;
    // Focus on Select
    selectRef.current?.focus();
    // Open Select's menu
    selectRefInEffect?.select.openMenu("first");
    // Hide the select upon closing the menu
    return () => setSelectDisplay(false);
  }, [setSelectDisplay]);
  // Handling select change — setting CurrencyCircle value
  const selectChange = (
    value: ValueType<{ label: string; value: string }, false>
  ) => {
    setCurrencySelectValue(value);
    dispatch(dispatchMethod({ value, selectValue }));
  };
  // useRef for select component
  const selectRef = useRef<Select>(null);

  return (
    <Select
      ref={selectRef}
      defaultValue={selectValue}
      onChange={(value) => selectChange(value)}
      options={data.map((element) => ({
        value: element.value,
        label: element.name,
      }))}
    />
  );
};

export default CurrencySelect;
