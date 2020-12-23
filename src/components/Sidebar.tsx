import BaseCurrencyTab from "./BaseCurrencyTab";
import SelectCurrenciesTab from "./SelectCurrenciesTab";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Sidebar = () => {
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);

  const open = sidebar
    ? "w-full absolute md:w-4/12 2xl:w-2/12 md:static"
    : "hidden md:flex";

  return (
    <div
      className={`h-full w-full pt-12 pb-2 flex flex-col justify-between md:w-32 ${open} bg-gray-800`}
    >
      <div className="h-full overflow-x-hidden px-4">
        <BaseCurrencyTab sidebar={sidebar} />
        <SelectCurrenciesTab sidebar={sidebar} />
      </div>
      <AddButton sidebar={sidebar} />
    </div>
  );
};

export default Sidebar;
