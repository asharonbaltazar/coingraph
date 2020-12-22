import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../slices/appSlice";
import { RootState } from "../store";
import SidebarHeader from "./SidebarHeader";

const Nav = () => {
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);
  const dispatch = useDispatch();

  const Icon = () => {
    if (sidebar)
      return (
        <svg
          className="h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      );
    else
      return (
        <svg
          className="h-6"
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
      );
  };

  const open = sidebar ? "text-white" : "text-black md:text-white";

  return (
    <div className="h-7 px-3 flex absolute top-4 z-10 md:z-0">
      <button
        className={`focus:outline-none ${open}`}
        onClick={() => dispatch(toggleSidebar())}
      >
        <Icon />
      </button>
      {sidebar && <SidebarHeader />}
    </div>
  );
};

export default Nav;
