import { useDispatch } from "react-redux";
import { toggleSidebar, addCurrencyToGraph } from "../slices/appSlice";

interface IProps {
  sidebar: boolean;
}

const AddButton = ({ sidebar }: IProps) => {
  const dispatch = useDispatch();
  const addCurrency = () => {
    !sidebar && dispatch(toggleSidebar());
    dispatch(addCurrencyToGraph());
  };

  return (
    <button
      className="w-full flex items-center justify-between p-4 md:hover:bg-gray-900 focus:outline-none"
      onClick={() => addCurrency()}
    >
      <div className="h-10 w-10 text-xs font-bold rounded-full flex items-center justify-center bg-indigo-300">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      {sidebar && (
        <div className="w-5/6 md:w-4/6">
          <h1 className="font-bold text-white text-right">Add a currency</h1>
        </div>
      )}
    </button>
  );
};

export default AddButton;
