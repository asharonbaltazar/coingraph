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
import { Confirm } from "./Icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

interface IProps {
  style: CSSProperties;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}

const DateRangePopout = forwardRef(
  ({ popup, setPopup, style }: IProps, ref: any) => {
    // For ease
    const dateFormat = "YYYY-MM-DD";
    // Date states
    const [firstDate, setFirstDate] = useState(
      dayjs().subtract(1, "month").format(dateFormat)
    );
    const [secondDate, setSecondDate] = useState(dayjs().format(dateFormat));

    const handleFirstSecondDateChange = (value: string) => {
      if (dayjs(value).isAfter(dayjs(secondDate).subtract(1, "day"))) {
        setFirstDate(dayjs(secondDate).subtract(1, "day").format(dateFormat));
      } else {
        setFirstDate(value);
      }
    };

    // Handle change and change previous input if necessary
    const handleSecondDateChange = (value: string) => {
      if (dayjs(firstDate).isAfter(dayjs(value))) {
        setFirstDate(dayjs(value).subtract(1, "day").format(dateFormat));
      }
      setSecondDate(value);
    };

    // Submit function
    const submitDateChange = (event: FormEvent<HTMLFormElement>) => {
      setPopup(false);
      event.preventDefault();
    };

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
          className="h-96 lg:w-auto px-4 py-4 flex flex-col justify-between bg-gray-700 border-4 border-indigo-400 shadow-2xl rounded-lg z-30"
          onSubmit={(event) => submitDateChange(event)}
          ref={ref}
          style={style}
        >
          <div className="h-full w-80 mb-4 flex flex-col justify-between">
            <div>
              <h1 className="text-xl text-center text-white">
                Choose a range of dates
              </h1>
              <div className="mt-6">
                <label className="text-base text-gray-300">Starting: </label>
                <input
                  className="h-10 w-full px-2 my-2 rounded-lg border-2 border-indigo-400 focus:outline-none focus:ring ring-indigo-400"
                  type="date"
                  min={dayjs("2000-01-01").format(dateFormat)}
                  max={dayjs(secondDate).subtract(1, "day").format(dateFormat)}
                  value={firstDate}
                  onChange={(event) =>
                    handleFirstSecondDateChange(event.target.value)
                  }
                />
                <div className="mt-6">
                  <label className="text-base text-gray-300">Ending: </label>
                  <input
                    className="h-10 w-full px-2 my-2 rounded-lg border-2 border-indigo-400 focus:outline-none focus:ring ring-indigo-400"
                    type="date"
                    min={dayjs("2000-01-01").format(dateFormat)}
                    max={dayjs(dayjs().toDate()).format(dateFormat)}
                    value={secondDate}
                    onChange={(event) =>
                      handleSecondDateChange(event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center py-2 rounded-full bg-indigo-400 text-white focus:outline-none focus:ring ring-indigo-400 ring-offset-2 ring-offset-gray-800"
              type="submit"
            >
              Confirm
              <Confirm />
            </button>
          </div>
        </form>
      </Modal>
    );
  }
);

export default memo(DateRangePopout);
