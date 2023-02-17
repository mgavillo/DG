import { useEffect, useState } from "react";
import "../App.css";
import { nbMsDay, timeFrame } from "../utils";
import { getDatabase, ref, onValue } from "firebase/database";

import {TimelineEvent, NewEvent, ShowEvent, TimeLineDay, TimeFrameHeader, Title} from "."
import { app } from "../Firebase";
import { EventGrid } from "./EventGrid";
const firebaseApp = app;


export function Timeline() {
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



  console.log(showEvent);
  return (
    <div className="flex flex-row flex-wrap items-center justify-around w-screen h-fit">
      <div className="select-none w-[70vw] h-fit relative">
        <TimeFrameHeader timeSelected={timeSelected} setTimeSelected={setTimeSelected} date={date} setDate={setDate}/>
        <hr />
        <Title timeSelected={timeSelected} date={date}/>

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
          <EventGrid timeSelected={timeSelected} fieldEvents={fieldEvents} date={date} setShowEvent={setShowEvent}/>
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
