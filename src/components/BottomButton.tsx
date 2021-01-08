import { forwardRef, memo, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  disabled?: boolean;
  buttonTitle: string;
  Icon: ReactNode;
  onClickMethod: any;
  additionalStyling?: string;
}

const BottomButton = forwardRef(
  (
    {
      buttonTitle,
      Icon,
      onClickMethod,
      disabled = false,
      additionalStyling = "",
    }: IProps,
    ref: any
  ) => {
    const menuWidth = useSelector(
      (state: RootState) => state.appSlice.menuView
    );
    // Conditional styling based on menu width
    const conditionalStyling = menuWidth ? "justify-between" : "justify-center";
    return (
      <div className="w-full pt-2 px-4" ref={ref}>
        <button
          className={`w-full flex items-center ${additionalStyling} ${conditionalStyling} disabled:opacity-50 disabled:cursor-default bg-indigo-400 px-2 py-4 rounded-xl focus:outline-none group focus:ring ring-indigo-400 ring-offset-2 ring-offset-gray-800 ${
            disabled ? "" : "md:hover:bg-opacity-80"
          }`}
          onClick={() => !disabled && onClickMethod()}
          disabled={disabled}
        >
          <div className="h-10 w-10 text-xs px-2 font-bold rounded-full flex items-center justify-center bg-gray-800">
            {Icon}
          </div>
          {menuWidth && (
            <div className="w-5/6 md:w-4/6">
              <h1 className="font-bold text-white text-right">{buttonTitle}</h1>
            </div>
          )}
        </button>
      </div>
    );
  }
);

export default memo(BottomButton);
