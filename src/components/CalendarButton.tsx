import { useState } from "react";
import BottomButton from "./BottomButton";
import DateRangePopout from "./DateRangePopout";
import { Calendar } from "./Icons";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CalendarButton = () => {
  const menuView = useSelector((state: RootState) => state.appSlice.menuView);
  const [popup, setPopup] = useState(false);

  // Popper stuff
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [menuView ? 0 : 20, -40],
        },
      },
    ],
    placement: "bottom",
    strategy: "absolute",
  });

  return (
    <>
      <DateRangePopout
        ref={setPopperElement}
        {...attributes.props}
        style={styles.popper}
        popup={popup}
        setPopup={setPopup}
      />

      <BottomButton
        buttonTitle={"Choose a range of dates"}
        Icon={<Calendar />}
        onClickMethod={() => setPopup((prevState) => (prevState = !prevState))}
        ref={setReferenceElement}
        additionalStyling={popup ? "bg-opacity-80" : ""}
      />
    </>
  );
};

export default CalendarButton;
