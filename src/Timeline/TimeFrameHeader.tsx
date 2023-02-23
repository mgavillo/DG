import { GrPrevious, GrNext } from "react-icons/gr";
import { nbMsDay, timeFrame } from "../utils";
import { Title } from "./Title";

interface TimeFrameHeaderProps {
  timeSelected: number;
  setTimeSelected: any;
  date: any;
  setDate: any;
}
export function TimeFrameHeader({
  timeSelected,
  setTimeSelected,
  date,
  setDate,
}: TimeFrameHeaderProps) {

  const moveDate = (movingSense: number) => {
    let newDate = new Date(date);
    if (timeSelected === 0) {
      newDate = new Date(date.getTime() + 7 * nbMsDay * movingSense);
    } else if (timeSelected === 1 || timeSelected === 2) {
      newDate = new Date(newDate.setMonth(newDate.getMonth() + (1 * movingSense)))
    } else if (timeSelected === 3 || timeSelected === 4) {
      newDate = new Date(newDate.setFullYear(newDate.getFullYear() + (1 * movingSense)))
    }
    setDate(newDate);
  };

  console.log("DATE", date)
  return (
    <div className="flex flex-row justify-between m-2">
      <div className="flex flex-row items-center [&>*]:hover:cursor-pointer [&>*]:m-1 w-1/5">
        <div className="hover:bg-gray-100 rounded-md p-2">
          <GrPrevious size={26} onClick={() => moveDate(-1)} />
        </div>
        <p
          className="py-1 px-3 rounded-md border-2 border-neutral-800 hover:bg-neutral-800 hover:text-gray-50"
          onClick={() => setDate(new Date())}
        >
          Today
        </p>
        <div className="hover:bg-gray-100 rounded-md p-2">
          <GrNext size={26} onClick={() => moveDate(1)} />
        </div>
      </div>
      <Title timeSelected={timeSelected} date={date} />

      <div className="flex flex-row items-center [&>p]:inline [&>p]:m-1 w-1/5 justify-end">
        {timeFrame.length.map((element, i) => {
          return (
            <p
              className={`py-1 px-3 rounded-md hover:cursor-pointer hover:border-neutral-800 border ${
                timeSelected === i ? "bg-neutral-800 text-gray-50" : ""
              }`}
              onClick={() => setTimeSelected(i)}
            >
              {element}
            </p>
          );
        })}
      </div>
    </div>
  );
}
