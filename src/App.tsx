import { useEffect } from "react";
import Content from "./components/Content";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRates } from "./slices/appSlice";
import { RootState } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const { baseCurrency, sidebar, menuView } = useSelector(
    (state: RootState) => state.appSlice
  );
  const scrolling = menuView
    ? "overflow-x-hidden"
    : "w-graph lg:overflow-x-hidden";

  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [dispatch, baseCurrency]);

  return (
    <div className={`h-full lg:w-screen flex relative ${scrolling}`}>
      <Nav />
      {sidebar && <Sidebar />}
      <Content />
    </div>
  );
};

export default App;
