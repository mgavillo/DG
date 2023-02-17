import { GrPrevious, GrNext } from "react-icons/gr";
import { nbMsDay, timeFrame } from "../utils";

interface TimeFrameHeaderProps{
    timeSelected:number,
    setTimeSelected:any,
    date: any,
    setDate: any
}
export function TimeFrameHeader({timeSelected, setTimeSelected, date, setDate}:TimeFrameHeaderProps) {
    const moveDate = (movingSense: number) => {
        let newDate = new Date();
        if (timeSelected === 0) {
          newDate = new Date(date.getTime() + 7 * nbMsDay * movingSense);
        } else if (timeSelected === 1 || timeSelected === 2) {
          newDate = new Date(
            date.getFullYear(),
            date.getMonth() + 1 * movingSense,
            date.getDate()
          );
        } else if (timeSelected === 3 || timeSelected === 4) {
          newDate = new Date(
            date.getFullYear() + 1 * movingSense,
            date.getMonth(),
            date.getDate()
          );
        }
        setDate(newDate);
      };
    
    
    return (
    <div className="flex flex-row justify-between m-2">
      <div className="flex flex-row items-center [&>*]:hover:cursor-pointer [&>*]:m-1">
          <GrPrevious size={30} onClick={() => moveDate(-1)} />
        <p
          className="py-1 px-3 rounded-md border-2 border-neutral-800 hover:bg-neutral-800 hover:text-gray-50"
          onClick={() => setDate(new Date())}
        >
          Today
        </p>
        <GrNext size={30} onClick={() => moveDate(1)} />
      </div>
      <div className="flex flex-row items-center [&>p]:inline [&>p]:m-1">
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