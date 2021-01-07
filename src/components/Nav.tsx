import { Dots, Lines, Controls, HideEye, ShowEye } from "./Icons";
import { memo } from "react";
import { useSelector } from "react-redux";
import { toggleMenuWidth, toggleSidebarDisplay } from "../slices/appSlice";
import { RootState, useAppDispatch } from "../store";

const Nav = memo(() => {
  const { menuView, sidebar } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const leftMargin = menuView
    ? "lg:w-48 flex items-center pl-5 items-center lg:justify-start"
    : "lg:w-24 pl-4 justify-center";
  const styles = {
    row: sidebar
      ? "block lg:hidden lg:group-hover:flex absolute rounded-full bg-indigo-400 lg:left-4"
      : "flex",
    menuIcon: sidebar ? "hidden lg:block lg:group-hover:hidden" : "hidden",
    borderRadius: sidebar ? "rounded-tr-full rounded-br-full" : "rounded-full",
  };

  const ToggleButtons = () => {
    if (menuView)
      return (
        <button
          className="h-10 w-10 flex items-center justify-center rounded-tl-full rounded-bl-full z-40 focus:outline-none focus:ring focus:border-indigo-300"
          onClick={() => dispatch(toggleMenuWidth(false))}
        >
          <Dots />
        </button>
      );
    else
      return (
        <button
          className="h-10 w-10 flex items-center justify-center rounded-tl-full rounded-bl-full focus:outline-none focus:ring focus:border-indigo-300"
          onClick={() => dispatch(toggleMenuWidth(true))}
        >
          <Lines />
        </button>
      );
  };

  return (
    <div className={`${leftMargin} flex py-4 absolute z-30`}>
      <div className="h-10 w-10 py-4 lg:hover:w-auto text-xs rounded-full flex items-center justify-center bg-indigo-400 font-bold text-bg-gray-800 group">
        <div className={styles.menuIcon}>
          <Controls />
        </div>

        <div className={styles.row}>
          {sidebar && <ToggleButtons />}
          <button
            className={`h-10 w-10 hidden lg:flex items-center justify-center ${styles.borderRadius} focus:outline-none focus:ring focus:border-indigo-300`}
            onClick={() => dispatch(toggleSidebarDisplay())}
          >
            {sidebar ? <HideEye /> : <ShowEye />}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Nav;
