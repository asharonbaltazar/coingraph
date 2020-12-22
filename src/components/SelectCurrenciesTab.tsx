import AddButton from "./AddButton";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { changeSelectValue } from "../slices/appSlice";

interface IProps {
  sidebar: boolean;
}

const SelectCurrencies = ({ sidebar }: IProps) => {
  const { addedCurrencies, currencies } = useSelector(
    (state: RootState) => state.appSlice
  );

  return (
    <div>
      <h3 className="px-4 pb-2 pt-4 text-white opacity-75 text-sm whitespace-nowrap">
        {`Selected ${sidebar ? "currencies" : ""}`}
      </h3>
      <div className="flex flex-col justify-between">
        <div>
          {addedCurrencies.map((element) => (
            <MenuItem
              key={element.id}
              value={{
                label: element.name,
                value: element.value,
              }}
              data={currencies.filter((currency) =>
                addedCurrencies.every(
                  (addedCurrency) => currency.value !== addedCurrency.value
                )
              )}
              dispatchMethod={changeSelectValue}
            />
          ))}
        </div>
        <AddButton sidebar={sidebar} />
      </div>
    </div>
  );
};

export default SelectCurrencies;
