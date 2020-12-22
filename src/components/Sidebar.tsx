import BaseCurrencyTab from "./BaseCurrencyTab";
import SelectCurrenciesTab from "./SelectCurrenciesTab";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Sidebar = () => {
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);

  const open = sidebar
    ? "w-full absolute md:w-96 md:static"
    : "hidden md:block";

  return (
    <div className={`h-full flex md:w-24 ${open} bg-gray-800`}>
      <div className="h-full w-full pt-12">
        <BaseCurrencyTab sidebar={sidebar} />
        <SelectCurrenciesTab sidebar={sidebar} />
      </div>
    </div>
  );
};

export default Sidebar;
