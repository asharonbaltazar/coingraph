import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { changeBaseCurrencyValue } from "../slices/appSlice";

interface IProps {
  sidebar: boolean;
}

const BaseCurrencyTab = ({ sidebar }: IProps) => {
  const { currencies, baseCurrency } = useSelector(
    (state: RootState) => state.appSlice
  );

  // Conditional styling
  const conditionalStyling = sidebar ? "" : "text-center";

  return (
    <div className="mt-4">
      <h3
        className={`px-2 pb-2 pt-4 text-white ${conditionalStyling} opacity-75 text-sm whitespace-nowrap`}
      >
        {`Base ${sidebar ? "currency" : ""}`}
      </h3>
      {/* Base tab 👇 */}
      <MenuItem
        value={baseCurrency}
        data={currencies}
        dispatchMethod={changeBaseCurrencyValue}
      />
    </div>
  );
};

export default BaseCurrencyTab;
