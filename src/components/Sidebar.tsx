import { memo } from "react";
import BaseCurrencyTab from "./BaseCurrencyTab";
import SelectCurrenciesTab from "./SelectCurrenciesTab";
import AddButton from "./AddButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Sidebar = memo(() => {
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);

  const open = sidebar
    ? "w-full absolute lg:w-1/5 2xl:w-2/12 lg:static"
    : "hidden lg:w-28 lg:flex";

  return (
    <div
      className={`h-full pt-12 pb-2 flex flex-col flex-shrink-0 justify-between ${open} bg-gray-800 z-20`}
    >
      <div className="h-full overflow-x-hidden px-4">
        <BaseCurrencyTab sidebar={sidebar} />
        <SelectCurrenciesTab sidebar={sidebar} />
      </div>
      <AddButton sidebar={sidebar} />
    </div>
  );
});

export default Sidebar;
