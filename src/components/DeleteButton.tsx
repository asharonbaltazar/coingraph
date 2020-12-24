import { useDispatch } from "react-redux";

interface IProps {
  deleteDispatchMethod: () => { payload: any; type: string };
  arrayLength: number;
}

const DeleteButton = ({ deleteDispatchMethod, arrayLength }: IProps) => {
  const dispatch = useDispatch();
  return (
    <>
      {/* addedCurrency array has to be more than one to delete an item */}
      {arrayLength > 1 && (
        <button
          className="w-10 h-10 md:h-6 md:w-6 p-1 ml-2 md:ml-0 md:hidden md:group-hover:block md:absolute rounded-md md:rounded-full md:-top-2 md:-right-2 z-10 focus:outline-none md:border-2 md:border-white text-red-500 md:text-white bg-transparent md:bg-red-500"
          onClick={() => dispatch(deleteDispatchMethod())}
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default DeleteButton;
