import MenuItem from "./MenuItem";
import DeleteButton from "./DeleteButton";
import CurrencyCircle from "./CurrencyCircle";
import CurrencySelect from "./CurrencySelect";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  changeAddedCurrencyValue,
  deleteValueFromAddedCurrency,
} from "../slices/appSlice";

interface IProps {
  menuWidth: boolean;
}

const SelectCurrencies = ({ menuWidth }: IProps) => {
  const { addedCurrencies, currencies } = useSelector(
    (state: RootState) => state
  );
  // Conditional styling
  const conditionalStyling = menuWidth ? "" : "text-center";

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
        className={`pb-2 px-2 pt-4 text-white ${conditionalStyling} bg-gray-800 opacity-90 text-sm whitespace-nowrap`}
      >
        {`Selected ${menuWidth ? "currencies" : ""}`}
      </h3>
      <div className="flex flex-col justify-between">
        <>
          {addedCurrencies.map((element, index) => (
            <div
              className="relative group flex md:inline-block items-center"
              key={index}
            >
              <MenuItem labelValue={element.label ?? ""}>
                <CurrencyCircle
                  currencyValue={element.value ?? ""}
                  color={element.color}
                />
                <CurrencySelect
                  key={element.value}
                  methods={{
                    oldValue: element,
                    dispatchMethod: changeAddedCurrencyValue,
                  }}
                  data={filteredCurrencies}
                />
              </MenuItem>
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
