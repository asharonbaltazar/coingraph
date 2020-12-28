import { useEffect } from "react";
import Content from "./components/Content";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRates } from "./slices/appSlice";
import { RootState } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(
    (state: RootState) => state.appSlice.baseCurrency
  );
  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [dispatch, baseCurrency]);
  return (
    <div className="h-full flex relative md:overflow-x-hidden">
      <Nav />
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
