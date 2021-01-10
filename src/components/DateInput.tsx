interface IProps {
  min: string;
  max: string;
  value: string;
  onChange: (date: string) => void;
}

const DateInput = ({ min, max, value, onChange }: IProps) => {
  return (
    <input
      className="h-10 w-full px-2 my-2 rounded-lg border-2 border-indigo-400 focus:outline-none focus:ring ring-indigo-400"
      type="date"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default DateInput;
