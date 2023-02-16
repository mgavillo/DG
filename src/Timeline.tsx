import { useEffect, useState } from "react";
import "./App.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import TimeLineDay from "./TimelineDay";
import { nbMsDay, timeFrame } from "./utils";
import { getDatabase, ref, onValue } from "firebase/database";
import NewEvent from "./NewEvent";
import ShowEvent from "./ShowEvent";
import TimelineEvent from "./TimelineEvent";
import { app } from "./Firebase";
const firebaseApp = app;

const getWeek = (date: Date) => {
  const year = date.getFullYear();

  const startOfYear = new Date(year, 0, 1);
  const startOfWeek = startOfYear.getDay();
  const elapsedDays =
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const weekOfYear = Math.ceil((elapsedDays + startOfWeek) / 7);
  return weekOfYear;
};

function Timeline() {
  const [timeSelected, setTimeSelected] = useState(0);
  const [date, setDate] = useState(new Date());
  const [fieldEvents, setFieldEvents] = useState<any>();
  const [showEvent, setShowEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, "fields/" + 0 + "/Events/");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const newData = Object.keys(data).map((key) => {
        return {
          type: data[key].type,
          description: data[key].description,
          startDate: data[key].startDate,
          endDate: data[key].endDate,
          key: key,
        };
      });
      console.log(newData);
      setFieldEvents(newData);
    });
  }, []);

  useEffect(() => {}, []);

  const calcFirstDay = (i: number) => {
    if (timeSelected === 0) {
      return date.getDay() - 1 - i;
    } else if (timeSelected === 1 || timeSelected === 2) {
      return date.getDate() - 1 - i;
    } else if (timeSelected === 3 || timeSelected === 4) {
      return date.getMonth() - i;
    }
  };

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

  console.log(showEvent);
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-screen h-fit">
      <div className="select-none w-4/6 h-fit min-w-[32rem]">
        <div className="flex flex-row justify-between m-2">
          <div className="flex flex-row items-center [&>*]:hover:cursor-pointer [&>*]:m-1">
            <p
              className="py-1 px-3 rounded-md border-2 border-neutral-800 hover:bg-neutral-800 hover:text-gray-50"
              onClick={() => setDate(new Date())}
            >
              Today
            </p>
            <GrPrevious size={30} onClick={() => moveDate(-1)} />
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
        <hr />

        {timeSelected === 0 && (
          <h1 className="m-7 text-2xl">
            Week {getWeek(date)} {date.getFullYear()}
          </h1>
        )}
        {timeSelected === 1 && (
          <h1 className="m-7 text-2xl">
            {`${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`}
          </h1>
        )}
        {timeSelected === 2 && (
          <h1 className="m-7 text-2xl">
            {`${date.toLocaleString("default", {
              month: "long",
            })} - ${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`}
          </h1>
        )}
        {timeSelected === 3 && (
          <h1 className="m-7 text-2xl">{`${date.getFullYear()}`}</h1>
        )}
        {timeSelected === 4 && (
          <h1 className="m-7 text-2xl">{`${date.getFullYear()} - ${
            date.getFullYear() + 4
          }`}</h1>
        )}
        <div className="relative w-full p-2 h-[42rem]">
          <div className="flex flex-row text-xs bottom absolute h-[42rem]">
            {Array.from({ length: timeFrame.nCols[timeSelected] }, (_, i) => (
              <TimeLineDay
                dayDifference={calcFirstDay(i)}
                timeSelected={timeSelected}
                date={date}
              />
            ))}
          </div>
          <div
            className="absolute w-full h-[39rem] mt-12 pt-4 pb-4 overflow-scroll"
            style={{ overflow: "scroll" }}
          >
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
        </div>
      </div>
      {showEvent ? (
        <ShowEvent
          e={showEvent}
          setShowEvent={setShowEvent}
          setEditEvent={setEditEvent}
        />
      ) : (
        <NewEvent editEvent={editEvent} setEditEvent={setEditEvent} />
      )}
    </div>
  );
}

export default Timeline;
