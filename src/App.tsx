import { useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import { getCurrencyRates } from "./slices/appSlice";
import { RootState, useAppDispatch } from "./store";
import CurrencyChart from "./components/CurrencyChart";
import Loader from "./components/Loader";

const App = () => {
  const dispatch = useAppDispatch();
  const { baseCurrency, sidebar, menuView, loading } = useSelector(
    (state: RootState) => state
  );
  const styles = {
    graphWidth: sidebar ? "w-full lg:w-11/12" : "w-graph lg:w-full",
    overflow: menuView ? "overflow-x-hidden" : "w-graph",
  };

  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [dispatch, baseCurrency]);

  return (
    <div className={`h-full lg:w-screen flex relative ${styles.overflow} `}>
      <Nav />
      {sidebar && <Sidebar />}
      <div className={`${styles.graphWidth} lg:py-4 pl-4 relative`}>
        <CurrencyChart />
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default App;
