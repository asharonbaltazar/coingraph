import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { changeSelectValue } from "../slices/appSlice";

interface IProps {
  sidebar: boolean;
}

const BaseCurrencyTab = ({ sidebar }: IProps) => {
  const currencies = useSelector(
    (state: RootState) => state.appSlice.currencies
  );

  return (
    <div>
      <h3 className="px-4 pb-2 pt-4 text-white opacity-75 text-sm whitespace-nowrap">
        {`Base ${sidebar ? "currency" : ""}`}
      </h3>
      {/* Base tab 👇 */}
      <MenuItem
        value={{ label: "US dollar", value: "usd" }}
        data={currencies}
        dispatchMethod={changeSelectValue}
      />
    </div>
  );
};

export default BaseCurrencyTab;
