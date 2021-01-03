import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-800 opacity-50 absolute z-10 top-0 right-0">
      <PropagateLoader size={10} color={"#818CF8"} />
    </div>
  );
};

export default Loader;
