import { useEffect, useState } from "react";
import { nbMsDay, timeFrame } from "../utils";
import { ShowEvent } from "./ShowEvent";

interface TimelineEventProps {
  e: any;
  timeSelected: number;
  date: any;
  setShowEvent: any;
}

export function TimelineEvent({
  e,
  timeSelected,
  date,
  setShowEvent,
}: TimelineEventProps) {
  const [showEventDetails, setShowEventDetails] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const [croped, setCroped] = useState({ left: false, right: false });
  const [out, setOut] = useState(false);
  const [col, setCol] = useState({ start: 0, end: 0 });
  const eventLength = new Date(e.endDate - e.startDate).getDate();
  const nCols = timeFrame.nCols[timeSelected];

  const getFirstDate = (date: any) => {
    const firstDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    // console.log(firstDate);
    console.log(firstDate, date);
    if (timeSelected === 0) {
      return new Date(firstDate.setDate(date.getDate() - date.getDay() + 1));
    } else if (timeSelected === 1 || timeSelected === 2) {
      return new Date(firstDate.setDate(0));
    } else if (timeSelected === 3 || timeSelected === 4) {
      return new Date(firstDate.setMonth(0));
    }
    return firstDate;
  };

  useEffect(() => {
    let eventLength;
    const newCrop = { left: false, right: false };
    setOut(false);
    if (timeSelected == 0 || timeSelected == 1 || timeSelected == 2)
      eventLength = new Date(e.endDate - e.startDate).getDate();
    else if (timeSelected == 3 || timeSelected == 4)
      eventLength =
        new Date(e.endDate).getMonth() - new Date(e.startDate).getMonth() + 1;

    const firstDate = getFirstDate(date);

    const newStart = new Date(new Date(e.startDate).setHours(0, 0, 0, 0));
    const newEnd = new Date(new Date(e.endDate).setHours(0, 0, 0, 0));

    console.log(newStart, newEnd, firstDate);
    console.log(eventLength);

    const timeLengthCol = nbMsDay;
    let start = Math.round(
      (newStart.getTime() - firstDate.getTime()) / nbMsDay
    );
    let end = Math.round(
      (newEnd.getTime() - firstDate.getTime() + nbMsDay) / nbMsDay
    );
    if (timeSelected === 3 || timeSelected === 4){
      console.log((new Date(date).getFullYear() - new Date(e.startDate).getFullYear()) * 12)
      start = new Date(e.startDate).getMonth() + 1 + (12 * (new Date(e.startDate).getFullYear() - new Date(date).getFullYear()))
      end = new Date(e.endDate).getMonth() + 2+ (12 * (new Date(e.endDate).getFullYear() - new Date(date).getFullYear()))
    }
    eventLength = end-start
    
    console.log(start, end);
    if ((start < 1 && end < 2) || (start > nCols && end > nCols)) {
      setOut(true);
      return;
    }
    if (start < 1) {
      start = 1;
      newCrop.left = true;
    }
    if (end > nCols + 1) {
      end = nCols + 1;
      newCrop.right = true;
    }
    setCroped(newCrop);
    setCol({ start: start, end: end });
  }, [timeSelected, date, e, nCols]);

  if (out) return <div></div>;

  return (
    <div
      className={`rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 border-amber-500 top-12 hover:cursor-pointer h-fit ${
        croped.left ? "rounded-l-none" : ""
      } ${croped.right ? "rounded-r-none" : ""}
    ${nCols > 31 ? "rounded-md" : ""}`}
      style={{
        gridColumn: `span ${eventLength}`,
        gridColumnStart: `${col.start}`,
        gridColumnEnd: `${col.end}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        setShowEventDetails(true);
      }}
    >
      {showEventDetails && (
        <ShowEvent e={e} setShowSelf={setShowEventDetails} />
      )}
      <div
        className={`${
          nCols > 31 ? "text-base" : "text-3xl"
        } h-fit flex items-center justify-center p-px`}
      >
        {e.type.split(" ")[0]}
      </div>
    </div>
  );
}
