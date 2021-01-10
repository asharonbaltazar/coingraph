import {
  CSSProperties,
  Dispatch,
  FormEvent,
  forwardRef,
  memo,
  SetStateAction,
  useState,
} from "react";
import Modal from "react-modal";
import CustomRange from "./CustomRange";
import dayjs from "dayjs";
import PresetRange from "./PresetRange";
import { useAppDispatch } from "../store";
import { changeDate } from "../slices/appSlice";

interface IProps {
  style: CSSProperties;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}

const DateRangePopout = forwardRef(
  ({ popup, setPopup, style }: IProps, ref: any) => {
    // For ease
    const dateFormat = "YYYY-MM-DD";
    const readableFormat = "MMM DD YYYY";

    const dispatch = useAppDispatch();

    // Date state
    const [date, setDate] = useState({
      start: dayjs().subtract(1, "year").format(dateFormat),
      end: dayjs().format(dateFormat),
    });
    const [toggle, setToggle] = useState(true);

    // Submit function for the whole popout
    const submitDateChange = (event: FormEvent<HTMLFormElement>) => {
      dispatch(changeDate(date));
      setPopup(false);
      event.preventDefault();
    };

    // Modal stuff
    const root = document.getElementById("root")!;
    Modal.setAppElement(root);

    return (
      <Modal
        isOpen={popup}
        onRequestClose={() => setPopup(false)}
        style={{
          overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "",
          },
          content: {
            position: "initial",
            top: "initial",
            left: "initial",
            right: "initial",
            bottom: "initial",
            border: "initial",
            background: "#fff",
            overflow: "initial",
            WebkitOverflowScrolling: "touch",
            borderRadius: "initial",
            outline: "initial",
            padding: "initial",
          },
        }}
      >
        <form
          className="lg:h-auto w-80 py-4 flex flex-col justify-between items-center bg-gray-700 border-4 border-indigo-400 shadow-2xl rounded-lg z-30"
          onSubmit={(event) => submitDateChange(event)}
          ref={ref}
          style={style}
        >
          <h1 className="text-xl text-center text-white">
            Choose a range of dates
          </h1>
          <div className="w-full my-4">
            <div className="w-full flex justify-around text-white relative top-1">
              <button
                className={`w-full py-3 ${
                  toggle ? "rounded-t-lg bg-gray-600" : "text-gray-400"
                } focus:outline-none focus:ring-1 ring-gray-500`}
                type="button"
                onClick={() => setToggle(true)}
              >
                Presets
              </button>
              <button
                className={`w-full py-3 ${
                  toggle ? "text-gray-400" : "rounded-t-lg bg-gray-600"
                } focus:outline-none focus:ring-1 ring-gray-500`}
                type="button"
                onClick={() => setToggle(false)}
              >
                Custom
              </button>
            </div>

            <div className="bg-gray-600 h-56">
              {toggle ? (
                <PresetRange date={date} setDate={setDate} />
              ) : (
                <CustomRange date={date} setDate={setDate} />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <small className="text-white text-sm">{`From ${dayjs(
              date.start
            ).format(readableFormat)} till ${dayjs(date.end).format(
              readableFormat
            )}`}</small>
            <button
              className="w-3/4 self-center flex items-center justify-center py-2 mt-3 rounded-full bg-indigo-400 text-white focus:outline-none focus:ring ring-indigo-400 ring-offset-2 ring-offset-gray-800"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </Modal>
    );
  }
);

export default memo(DateRangePopout);
