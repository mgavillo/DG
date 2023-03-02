import { useEffect, useState } from "react";
import "../App.css";
import { nbMsDay, timeFrame } from "../utils";
import { getDatabase, ref, onValue } from "firebase/database";

import {
  TimelineEvent,
  NewEvent,
  ShowEvent,
  TimeLineDay,
  TimeFrameHeader,
  Title,
} from ".";
import { app } from "../Firebase";
import { EventGrid } from "./EventGrid";
import { BsPlus } from "react-icons/bs";
const firebaseApp = app;

export function Timeline() {
  const [timeSelected, setTimeSelected] = useState(0);
  const [date, setDate] = useState(new Date());
  const [fieldEvents, setFieldEvents] = useState<any>();
  const [showEvent, setShowEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(false);
  useEffect(() => {
    setDate(new Date());
    const db = getDatabase();
    const eventsRef = ref(db, "fields/" + 0 + "/Events/");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const newData = Object.keys(data).map((key) => {
        return {
          crop: data[key].crop,
          type: data[key].type,
          description: data[key].description,
          startDate: data[key].startDate,
          endDate: data[key].endDate,
          key: key,
        };
      });
      setFieldEvents(newData);
    });
  }, []);

  const calcDiff = (i: number) => {
    if (timeSelected === 0) {
      return date.getDay() - 1 - i;
    } else if (timeSelected === 1 || timeSelected === 2) {
      return date.getDate() - 1 - i;
    } else if (timeSelected === 3 || timeSelected === 4) {
      return date.getMonth() - i;
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-between p-8 px-24 w-screen h-fit">
      <div className="select-none w-full h-fit relative">
        <TimeFrameHeader
          timeSelected={timeSelected}
          setTimeSelected={setTimeSelected}
          date={date}
          setDate={setDate}
        />
        <div className="w-full flex flex-row justify-end pr-3 mb-2">
          <div
            className="py-1 px-3 flex flex-row rounded-md border-2 border-neutral-800 hover:bg-neutral-800 hover:text-gray-50 hover:cursor-pointer"
            onClick={() => setCreateEvent(true)}
          >
            <BsPlus size={25} />
            <div>Create event</div>
          </div>
        </div>
        <div className="relative w-full p-2 h-[42rem]">
          <div className="flex flex-row text-xs bottom absolute h-[42rem]">
            {Array.from({ length: timeFrame.nCols[timeSelected] }, (_, i) => (
              <TimeLineDay
                dayDifference={calcDiff(i)}
                timeSelected={timeSelected}
                date={date}
              />
            ))}
          </div>
          <EventGrid
            timeSelected={timeSelected}
            fieldEvents={fieldEvents}
            date={date}
            setShowEvent={setShowEvent}
          />
        </div>
      </div>

      {createEvent && (
        <NewEvent
          editEvent={editEvent}
          setEditEvent={setEditEvent}
          setCreateEvent={setCreateEvent}
        />
      )}
    </div>
  );
}

export default Timeline;
