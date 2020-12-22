import { useState } from "react";
import CurrencyCircle from "./CurrencyCircle";
import CurrencySelect from "./CurrencySelect";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import { toggleSidebar } from "../slices/appSlice";
import { RootState } from "../store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface IProps {
  value: { id?: string; label: string; value: string };
  data: { name: string; value: string; symbol: string }[];
  dispatchMethod: ActionCreatorWithPayload<any, string>;
}

const MenuItem = ({ value, data, dispatchMethod }: IProps) => {
  const dispatch = useDispatch();
  // Default state for the react-select componenent
  const [selectValue, setCurrencySelectValue] = useState<
    ValueType<{ label: string; value: string }, false>
  >(value);
  // Select render state
  const [selectDisplay, setSelectDisplay] = useState(false);
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);
  // Render select when the base tab is clicked on
  const renderSelect = () => {
    !sidebar && dispatch(toggleSidebar());
    setSelectDisplay(true);
  };

  const stateAndMethods = {
    selectValue,
    setCurrencySelectValue,
    setSelectDisplay,
    dispatchMethod,
  };

  return (
    <button
      className="w-full flex items-center justify-between p-4 md:hover:bg-gray-900 focus:outline-none"
      onClick={() => renderSelect()}
    >
      <CurrencyCircle currencyValue={selectValue?.value || ""} />

      {sidebar && (
        <div className="w-5/6 md:w-4/6">
          <>
            {selectDisplay ? (
              <CurrencySelect methods={stateAndMethods} data={data} />
            ) : (
              <div>
                <h1 className="font-bold text-white text-right">
                  {selectValue?.label}
                </h1>
              </div>
            )}
          </>
        </div>
      )}
    </button>
  );
};

export default MenuItem;
