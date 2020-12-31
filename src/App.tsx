import { useEffect } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import { getCurrencyRates } from "./slices/appSlice";
import { RootState, useAppDispatch } from "./store";
import CurrencyChart from "./components/CurrencyChart";

const App = () => {
  const dispatch = useAppDispatch();
  const { baseCurrency, sidebar } = useSelector((state: RootState) => state);
  const graphWidth = sidebar ? "lg:w-11/12" : "lg:w-12/12";

  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [dispatch, baseCurrency]);

  return (
    <div className="h-full lg:w-screen flex relative overflow-x-hidden">
      <Nav />
      {sidebar && <Sidebar />}
      <div className={`w-graph ${graphWidth} lg:my-4`}>
        <CurrencyChart />
      </div>
    </div>
  );
};

export default App;
