import MenuItem from "./MenuItem";
import CurrencyCircle from "./CurrencyCircle";
import CurrencySelect from "./CurrencySelect";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { changeBaseCurrencyValue } from "../slices/appSlice";

interface IProps {
  menuWidth: boolean;
}

const BaseCurrencyTab = ({ menuWidth }: IProps) => {
  const { currencies, baseCurrency } = useSelector((state: RootState) => state);
  // Conditional styling
  const conditionalStyling = menuWidth ? "" : "text-center";

  return (
    <div className="mt-4">
      <h3
        className={`px-2 pb-2 pt-4 text-white ${conditionalStyling} opacity-75 text-sm whitespace-nowrap`}
      >
        {`Base ${menuWidth ? "currency" : ""}`}
      </h3>

      {/* Base tab 👇 */}
      <MenuItem labelValue={baseCurrency.label ?? ""}>
        <CurrencyCircle
          currencyValue={baseCurrency.value ?? ""}
          color={"#FFFF"}
        />
        <CurrencySelect
          key={baseCurrency?.value}
          methods={{
            oldValue: baseCurrency,
            dispatchMethod: changeBaseCurrencyValue,
          }}
          data={currencies}
        />
      </MenuItem>
    </div>
  );
};

export default BaseCurrencyTab;
