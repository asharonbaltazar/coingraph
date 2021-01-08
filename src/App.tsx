import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import CurrencyChart from "./components/CurrencyChart";

const App = () => {
  const sidebar = useSelector((state: RootState) => state.appSlice.sidebar);
  const menuView = useSelector((state: RootState) => state.appSlice.menuView);

  const styles = {
    graphWidth: sidebar ? "w-full lg:w-11/12" : "w-graph lg:w-full",
    overflow: menuView ? "overflow-x-hidden" : "w-graph",
  };

  return (
    <div className={`h-full lg:w-screen flex relative ${styles.overflow} `}>
      <Nav />
      {sidebar && <Sidebar />}
      <div className={`${styles.graphWidth} lg:py-4 pl-4 relative`}>
        <CurrencyChart />
      </div>
    </div>
  );
};

export default App;
