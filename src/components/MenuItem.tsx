import { memo, useState, ReactNode, Children, useEffect } from "react";
import { useSelector } from "react-redux";
import { toggleMenuWidth } from "../slices/appSlice";
import { RootState, useAppDispatch } from "../store";
interface IProps {
  labelValue: string;
  children: ReactNode;
}

const MenuItem = ({ labelValue, children }: IProps) => {
  const dispatch = useAppDispatch();
  const menuView = useSelector((state: RootState) => state.appSlice.menuView);
  // Select render state
  const [selectDisplay, setSelectDisplay] = useState(false);
  useEffect(() => {
    // Clean up and hide the select
    if (!menuView) return setSelectDisplay(false);
  }, [setSelectDisplay, menuView]);
  // Conditional styling
  const conditionalStyling = menuView ? "justify-between" : "justify-center";
  // Render select when the base tab is clicked on
  const renderSelect = () => {
    !menuView && dispatch(toggleMenuWidth());
    setSelectDisplay(true);
  };

  // Split the children into an array
  const reactChildren = Children.toArray(children);

  return (
    <button
      className={`w-full flex items-center ${conditionalStyling} my-1 px-2 py-4 rounded-xl lg:hover:bg-gray-700 focus:outline-none focus:ring ring-indigo-400`}
      onClick={() => renderSelect()}
    >
      {reactChildren[0]}
      {menuView && (
        <div className="w-5/6 md:w-4/6">
          <>
            {selectDisplay ? (
              reactChildren[1]
            ) : (
              <h1 className="font-bold text-white text-right truncate">
                {labelValue}
              </h1>
            )}
          </>
        </div>
      )}
    </button>
  );
};

export default memo(MenuItem);
