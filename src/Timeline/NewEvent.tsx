import { getDatabase, ref, push, update } from "firebase/database";
import "./EventCard.css";
import { GrEdit, GrClose, GrPrevious } from "react-icons/gr";

import React, { useState, useRef, useEffect } from "react";

const types = [
  "💊 Fertilizer",
  "🪲 Pesticide",
  "💀 Herbicide",
  "💦 Irrigation",
  "🌱 Seeding",
  "✂️ Harvest",
];

const crops = ["Hemp", "Corn", "Wheat", "Cotton"];

interface NewEventProps {
  editEvent: any | null;
  setEditEvent: any;
  setCreateEvent: any;
}

export function NewEvent({
  editEvent,
  setEditEvent,
  setCreateEvent,
}: NewEventProps) {
  const cardRef = useRef<HTMLFormElement | null>(null);
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
  const [selectedCrop, setSelectedCrop] = useState(
    editEvent ? editEvent.type : crops[0]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setCreateEvent(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const db = getDatabase();
    push(ref(db, "fields/" + 0 + "/Events/"), {
      crop: selectedCrop,
      type: selectedType,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description,
    });
    setCreateEvent(null)

  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const db = getDatabase();
    update(ref(db, "fields/" + 0 + "/Events/" + editEvent.key), {
      type: selectedType,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description,
      crop: selectedCrop
    });
    setEditEvent(null);
    setCreateEvent(null)
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
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 w-screen h-screen bg-[#000000CC] flex flex-col justify-center items-center">
      <form
        ref={cardRef}
        onSubmit={editEvent ? handleEdit : handleSubmit}
        className="cardContainer bg-slate-50"
      >
        {editEvent && (
          <GrPrevious
            className="absolute top-0 left-0 m-4 hover:cursor-pointer"
            color={"#000"}
            onClick={() => setEditEvent(null)}
          />
        )}
        <select
          value={selectedCrop}
          onChange={(event) => setSelectedCrop(event.target.value)}
          className={"text-xl rounded-md p-3"}
        >
          {crops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
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
          <div
            className={`dateContainer ${changedEndDate ? "" : "opacity-40"}`}
          >
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
    </div>
  );
}
