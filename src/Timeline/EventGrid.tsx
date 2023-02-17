import { TimelineEvent } from "./";
import { timeFrame, nbMsDay} from "../utils";


interface EventGridProps{
    timeSelected: number,
    fieldEvents: any[],
    date: Date,
    setShowEvent: any
}
export function EventGrid({timeSelected, fieldEvents, date, setShowEvent}:EventGridProps){
    return(
        <div
        className="absolute w-full h-[39rem] mt-12 pt-4 pb-4 overflow-scroll"
        style={{ overflow: "scroll" }}>
        <div
          className={`grid w-full  h-fit ${
            timeFrame.nCols[timeSelected] > 31 ? "gap-y-1" : "gap-y-2"
          }`}
          style={{
            gridTemplateColumns: `repeat(${timeFrame.nCols[timeSelected]}, 1fr)`,
            gridAutoFlow: "column",
          }}
        >
          {fieldEvents &&
            fieldEvents.map((object: any) => {
              const start = object.startDate;
              const end = object.endDate;

              if (
                start > date.getTime() - nbMsDay * 6 &&
                end < date.getTime() + nbMsDay * 6
              )
                return (
                  <TimelineEvent
                    key={object.key}
                    e={object}
                    timeSelected={timeSelected}
                    date={date}
                    setShowEvent={setShowEvent}
                  />
                );
              else return <></>;
            })}
        </div>
      </div>
    )
}