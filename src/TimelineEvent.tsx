import { useEffect, useState } from "react";
import { nbMsDay, timeFrame } from "./utils";

interface TimelineEventProps {
  e: any;
  timeSelected: number;
  date: any;
  setShowEvent: any;
}

const getFirstDate = (date: any) => {
  const newDate = new Date(new Date(date).setHours(0, 0, 0, 0));

  return new Date(newDate.getTime() - newDate.getDay() * nbMsDay);
};

export default function TimelineEvent({
  e,
  timeSelected,
  date,
  setShowEvent,
}: TimelineEventProps) {
  const [hovered, setHovered] = useState(false);
  const [croped, setCroped] = useState({ left: false, right: false });
  const [out, setOut] = useState(false);
  //   let col = { start: 0, end: 0 };
  //   const [croped, setCroped] = useState({left: false, right: false});
  const [col, setCol] = useState({ start: 0, end: 0 });
  const eventLength = new Date(e.endDate - e.startDate).getDate();
  const nCols = timeFrame.nCols[timeSelected];

  useEffect(() => {
    const newCrop = { left: false, right: false };
    setOut(false);
    const firstDate = getFirstDate(date);

    const newStart = new Date(new Date(e.startDate).setHours(0, 0, 0, 0));
    const newEnd = new Date(new Date(e.endDate).setHours(0, 0, 0, 0));
    let start = Math.round(
      (newStart.getTime() - firstDate.getTime()) / nbMsDay
    );
    let end = Math.round(
      (newEnd.getTime() - firstDate.getTime() + nbMsDay) / nbMsDay
    );

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
      onClick={() => {
        console.log("wsh")
        return setShowEvent(e)}}

    >
      <div
        className={`${
          nCols > 31 ? "text-base" : "text-3xl"
        } h-fit flex items-center justify-center p-px`}
      >
        {e.type.split(" ")[0]}
      </div>
      {hovered && (
        <div className="absolute">{`${new Date(
          e.startDate
        ).toLocaleDateString()} ${new Date(e.endDate).toLocaleDateString()} ${
          col.start
        } ${col.end}`}</div>
      )}
    </div>
  );
}
