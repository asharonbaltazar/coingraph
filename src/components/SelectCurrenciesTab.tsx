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

  // Length of addedCurrencies
  const addedCurrenciesLength = addedCurrencies.length;

  return (
    <div className="mt-4 mb-4">
      <h3
        className={`pb-2 px-2 pt-4 text-white ${conditionalStyling} bg-gray-800 opacity-90 text-sm whitespace-nowrap sticky -top-1 z-20`}
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
                value={element}
                data={filteredCurrencies}
                dispatchMethod={changeAddedCurrencyValue}
              />
              <DeleteButton
                deleteDispatchMethod={() =>
                  deleteValueFromAddedCurrency(element.value)
                }
                arrayLength={addedCurrenciesLength}
              />
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default SelectCurrencies;
