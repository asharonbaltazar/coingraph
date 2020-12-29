import { memo } from "react";
import { useSelector } from "react-redux";
import { toggleMenuWidth, toggleSidebarDisplay } from "../slices/appSlice";
import { RootState, useAppDispatch } from "../store";
import SidebarHeader from "./SidebarHeader";

const Nav = memo(() => {
  const { menuView, sidebar } = useSelector(
    (state: RootState) => state.appSlice
  );
  const dispatch = useAppDispatch();
  const leftMargin = menuView ? "left-6" : "left-9";
  const iconVisibility = {
    row: sidebar ? "block lg:hidden lg:group-hover:flex" : "flex",
    menuIcon: sidebar ? "hidden lg:block lg:group-hover:hidden" : "hidden",
  };

  const ToggleButtons = () => {
    if (menuView)
      return (
        <button
          className="h-10 w-10 flex items-center justify-center rounded-tl-full rounded-bl-full z-40 focus:outline-none"
          onClick={() => dispatch(toggleMenuWidth(false))}
        >
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      );
    else
      return (
        <button
          className="h-10 w-10 flex items-center justify-center rounded-tl-full rounded-bl-full focus:outline-none"
          onClick={() => dispatch(toggleMenuWidth(true))}
        >
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
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      );
  };

  return (
    <div className={`${leftMargin} flex items-center absolute top-4 z-30`}>
      <div className="h-10 w-10 lg:hover:w-auto text-xs rounded-full flex items-center justify-center bg-indigo-400 font-bold text-bg-gray-800 group">
        <div className={iconVisibility.menuIcon}>
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>

        <div className={iconVisibility.row}>
          {sidebar && <ToggleButtons />}
          <button
            className="h-10 w-10 hidden lg:flex items-center justify-center rounded-tr-full rounded-br-full focus:outline-none"
            onClick={() => dispatch(toggleSidebarDisplay())}
          >
            {sidebar ? (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuView && <SidebarHeader />}
    </div>
  );
});

export default Nav;
