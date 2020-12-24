import { useState } from "react";
import CurrencyCircle from "./CurrencyCircle";
import CurrencySelect from "./CurrencySelect";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/appSlice";
import { RootState } from "../store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface IProps {
  value: { label: string; value: string; symbol: string; color?: string };
  data: { label: string; value: string; symbol: string }[];
  dispatchMethod: ActionCreatorWithPayload<any, string>;
}
const MenuItem = ({ value, data, dispatchMethod }: IProps) => {
  const dispatch = useDispatch();

  // Select render state
  const [selectDisplay, setSelectDisplay] = useState(false);
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);
  // Conditional styling
  const conditionalStyling = sidebar ? "justify-between" : "justify-center";
  // Render select when the base tab is clicked on
  const renderSelect = () => {
    !sidebar && dispatch(toggleSidebar());
    setSelectDisplay(true);
  };

  const stateAndMethods = {
    selectValue: value,
    setSelectDisplay,
    dispatchMethod,
  };

  return (
    <button
      className={`w-full flex items-center ${conditionalStyling} px-2 py-4 md:hover:bg-gray-700 focus:outline-none rounded-xl`}
      onClick={() => renderSelect()}
    >
      <CurrencyCircle
        currencyValue={value?.value || ""}
        color={value?.color || "#FFFF"}
      />

      {sidebar && (
        <div className="w-5/6 md:w-4/6">
          <>
            {selectDisplay ? (
              <CurrencySelect
                key={value?.value}
                methods={stateAndMethods}
                data={data}
              />
            ) : (
              <div>
                <h1 className="font-bold text-white text-right">
                  {value.label}
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
