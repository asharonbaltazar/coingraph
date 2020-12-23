import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  changeAddedCurrencyValue,
  deleteValueFromAddedCurrency,
} from "../slices/appSlice";
import DeleteButton from "./DeleteButton";

interface IProps {
  sidebar: boolean;
}

const SelectCurrencies = ({ sidebar }: IProps) => {
  const { addedCurrencies, currencies } = useSelector(
    (state: RootState) => state.appSlice
  );
  // Conditional styling
  const conditionalStyling = sidebar ? "" : "text-center";

  // Filtered dropdown based on amount of element in addedCurrencies
  const filteredCurrencies = currencies.filter((currency) =>
    addedCurrencies.every(
      (addedCurrency) => currency.value !== addedCurrency.value
    )
  );

  return (
    <div className="mt-10">
      <h3
        className={`px-2 pb-2 pt-4 text-white ${conditionalStyling} opacity-90 text-sm whitespace-nowrap sticky top-0 z-10 bg-gray-800`}
      >
        {`Selected ${sidebar ? "currencies" : ""}`}
      </h3>
      <div className="flex flex-col justify-between">
        <>
          {addedCurrencies.map((element, index) => (
            <div
              className="relative group flex md:inline-block items-center"
              key={index}
            >
              <MenuItem
                value={{
                  label: element.name,
                  value: element.value,
                  symbol: element.symbol,
                  color: element.color,
                }}
                data={filteredCurrencies}
                dispatchMethod={changeAddedCurrencyValue}
              />
              <DeleteButton
                deleteDispatchMethod={() =>
                  deleteValueFromAddedCurrency(element.value)
                }
              />
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default SelectCurrencies;
