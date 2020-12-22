interface IProps {
  currencyValue: string;
}

const CurrencyCircle = ({ currencyValue }: IProps) => {
  return (
    <div className="h-10 w-10 text-xs font-bold rounded-full p-4 flex items-center justify-center bg-white">
      {currencyValue.toUpperCase()}
    </div>
  );
};

export default CurrencyCircle;
