import { getDatabase, ref, push, update } from "firebase/database";
import "./EventCard.css";
import { GrEdit, GrClose, GrPrevious } from "react-icons/gr";

import React, { useState } from "react";

const types = [
  "💊 Fertilizer",
  "🪲 Pesticide",
  "💀 Herbicide",
  "💦 Irrigation",
  "🌱 Seeding",
  "✂️ Harvest",
];

interface NewEventProps {
  editEvent: any | null;
  setEditEvent: any;
}

export function NewEvent({ editEvent, setEditEvent }: NewEventProps) {
  const [startDate, setStartDate] = useState(
    editEvent ? new Date(editEvent.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    editEvent ? new Date(editEvent.endDate) : new Date()
  );
  const [changedEndDate, setChangedEndDate] = useState(false);
  const [description, setDescription] = useState(
    editEvent ? editEvent.description : ""
  );
  const [selectedType, setSelectedType] = useState(
    editEvent ? editEvent.type : types[0]
  );

  console.log(editEvent);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const db = getDatabase();
    push(ref(db, "fields/" + 0 + "/Events/"), {
      type: selectedType,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description,
    });
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const db = getDatabase();
    update(ref(db, "fields/" + 0 + "/Events/" + editEvent.key), {
      type: selectedType,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description,
    });
    setEditEvent(null);
  };

  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    const roundedStart = new Date(startDate.setHours(0, 0, 0, 0));
    if (newDate.getTime() >= roundedStart.getTime()) {
      setEndDate(new Date(event.target.value));
      setChangedEndDate(true);
    }
    if (newDate.getTime() === roundedStart.getTime()) setChangedEndDate(false);
  };

  return (
    <form
      onSubmit={editEvent ? handleEdit : handleSubmit}
      className="cardContainer bg-slate-50"
    >
      {editEvent && 
        <GrPrevious
          className="absolute top-0 left-0 m-4 hover:cursor-pointer"
          color={"#000"}
          onClick={() => setEditEvent(null)}
        />
      }
      <select
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
        className={"text-xl rounded-md p-3"}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <textarea
        className="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />
      <div className="datesContainer">
        <div className="dateContainer">
          <p className="w-fit">Start date</p>
          <input
            className="mr-2 w-full"
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(event) => setStartDate(new Date(event.target.value))}
          />
        </div>
        <div className={`dateContainer ${changedEndDate ? "" : "opacity-40"}`}>
          <p className="w-fit">End date</p>
          <input
            className="w-full"
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(event) => changeEndDate(event)}
            // onFocus={() => setChangedEndDate(true)}
            min={startDate.toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <button type="submit" className="primary-button">
          Submit
        </button>
      </div>
    </form>
  );
}
