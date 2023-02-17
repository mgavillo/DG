import { timeFrame, nbMsDay } from "../utils";

interface TimeLineDayProps {
  dayDifference?: number;
  timeSelected: number;
  date: Date;
}

export function TimeLineDay({
  dayDifference = 0,
  timeSelected = 0,
  date,
}: TimeLineDayProps) {
  let current;
  if (timeFrame.colLength[timeSelected] === "day") {
    current = new Date(date.getTime() - dayDifference * nbMsDay);
  } else {
    current = new Date(
      date.getFullYear(),
      date.getMonth() - dayDifference,
      date.getDate()
    );
  }
  const isToday =
    current.toLocaleDateString() === new Date().toLocaleDateString();
  const length = timeFrame.nCols[timeSelected]

  return (
    <div
      className={`h-full ${isToday ? "bg-amber-100" : ""}`}
      style={{ width: `calc(70vw/${length})` }}
    >
      <div
        className={`flex-col w-full border-t-2 h-12 ${
          isToday ? "border-b-4 border-amber-400" : "border-b-2"
        }`}
      >
        {timeFrame.colLength[timeSelected] === "day" && (
          <>
            <div className="font-light text-neutral-400">
              {current.toLocaleDateString("en-US", {
                weekday:
                  timeFrame.length[timeSelected] === "2m" ? "narrow" : "short",
              })}
            </div>
            <div className="text-neutral-600">{current.getDate()}</div>
          </>
        )}
        {timeFrame.colLength[timeSelected] === "month" && (
          <>
            <div className="font-light text-neutral-400">
              {current.getMonth() + 1}
            </div>
            <div className="text-neutral-600">
              {current.toLocaleString("default", {
                month:
                  timeFrame.length[timeSelected] === "5y" ? "narrow" : "long",
              })}
            </div>
          </>
        )}
      </div>
      <div className="w-full border-r border-neutral-200" style={{height:"calc(100% - 3rem"}}></div>
    </div>
  );
}