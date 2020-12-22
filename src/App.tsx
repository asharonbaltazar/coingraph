import Content from "./components/Content";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <div className="h-full flex relative">
        <Nav />
        <Sidebar />
        <Content />
      </div>
    </>
  );
};

export default App;
