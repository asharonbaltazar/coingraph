import { useState } from "react";

const Tooltip = () => {
  const [close, setClose] = useState(true);

  return (
    <>
      {close && (
        <div className="m-4 lg:mx-16 md:flex md:justify-between shadow bg-gray-200 ring-2 ring-blue-400 ring-opacity-50 rounded-lg">
          <div className="p-4 flex items-center">
            <svg
              className="h-7 flex-none text-yellow-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="sm:w-full text-lg leading-relaxed">
              Use the menu to browse currencies and add them to the chart. The
              selected currencies will appear on the graph below.
            </p>
          </div>
          <div className="p-4 sm:flex sm:items-center">
            <button
              className="w-full p-3 sm:px-7 focus:outline-none bg-blue-200 rounded-2xl"
              onClick={() => setClose((prevState) => !prevState)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
