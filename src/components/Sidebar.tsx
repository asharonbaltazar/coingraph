import { memo } from "react";
import BaseCurrencyTab from "./BaseCurrencyTab";
import SelectCurrenciesTab from "./SelectCurrenciesTab";
import AddButton from "./AddButton";
import CalendarButton from "./CalendarButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Sidebar = () => {
  const menuWidth = useSelector((state: RootState) => state.appSlice.menuView);

  const open = menuWidth
    ? "w-screen absolute lg:w-3/12 2xl:w-2/12 lg:relative"
    : "hidden lg:w-28 lg:flex";

  return (
    <div
      className={`h-full pt-12 pb-2 relative flex flex-col flex-shrink-0 justify-between ${open} lg:relative bg-gray-800`}
    >
      <div className="h-full overflow-x-hidden px-4">
        <BaseCurrencyTab />
        <SelectCurrenciesTab />
      </div>
      <div className="relative">
        <AddButton />
        <CalendarButton />
      </div>
    </div>
  );
};

export default memo(Sidebar);
