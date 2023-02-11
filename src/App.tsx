import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GrPrevious, GrNext, GrAdd } from "react-icons/gr";
import TimeLineDay from "./TimelineDay";
import { nbMsDay, timeFrame } from "./utils";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "./Firebase";
import { NewEvent } from "./NewEvent";
import { TimelineEvent } from "./TimelineEvent";

const firebaseApp = app;
const database = getDatabase();

const getWeek = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const startOfYear = new Date(year, 0, 1);
  const startOfWeek = startOfYear.getDay();
  const elapsedDays =
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const weekOfYear = Math.ceil((elapsedDays + startOfWeek) / 7);
  return weekOfYear;
};

function App() {
  const [timeSelected, setTimeSelected] = useState(0);
  const [date, setDate] = useState(new Date());
  const [fieldEvents, setFieldEvents] = useState();
  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, "fields/" + 0 + "/Events/");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      setFieldEvents(data);
    });
  }, []);

  console.log("fieldEvents", fieldEvents);
  const calcFirstDay = (i: number) => {
    if (timeSelected == 0) {
      return date.getDay() - 1 - i;
    } else if (timeSelected == 1 || timeSelected == 2) {
      return date.getDate() - 1 - i;
    } else if (timeSelected == 3 || timeSelected == 4) {
      return date.getMonth() - i;
    }
  };

  const moveDate = (movingSense: number) => {
    let newDate = new Date();
    if (timeSelected == 0) {
      newDate = new Date(date.getTime() + 7 * nbMsDay * movingSense);
    } else if (timeSelected == 1 || timeSelected == 2) {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1 * movingSense,
        date.getDate()
      );
    } else if (timeSelected == 3 || timeSelected == 4) {
      newDate = new Date(
        date.getFullYear() + 1 * movingSense,
        date.getMonth(),
        date.getDate()
      );
    }
    setDate(newDate);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="App select-none w-[80rem]">
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

        {timeSelected == 0 && (
          <h1 className="m-7 text-2xl">
            Week {getWeek(date)} {date.getFullYear()}
          </h1>
        )}
        {timeSelected == 1 && (
          <h1 className="m-7 text-2xl">
            {`${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`}
          </h1>
        )}
        {timeSelected == 2 && (
          <h1 className="m-7 text-2xl">
            {`${date.toLocaleString("default", {
              month: "long",
            })} - ${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`}
          </h1>
        )}
        {timeSelected == 3 && (
          <h1 className="m-7 text-2xl">{`${date.getFullYear()}`}</h1>
        )}
        {timeSelected == 4 && (
          <h1 className="m-7 text-2xl">{`${date.getFullYear()} - ${
            date.getFullYear() + 4
          }`}</h1>
        )}
        <div className="flex flex-row w-full text-xs relative">
          <>
            {Array.from({ length: timeFrame.nCols[timeSelected] }, (_, i) => (
              <TimeLineDay
                dayDifference={calcFirstDay(i)}
                timeSelected={timeSelected}
                date={date}
              />
            ))}
            {fieldEvents && Object.keys(fieldEvents).map((key) => (
              <TimelineEvent key={key} data={fieldEvents[key]}/>
            ))}
          </>
        </div>
      </div>
      <NewEvent />
    </div>
  );
}

export default App;
