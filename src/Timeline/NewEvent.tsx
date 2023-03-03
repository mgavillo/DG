import { getDatabase, ref, push, update } from "firebase/database";
import "./EventCard.css";
import { GrEdit, GrClose, GrPrevious } from "react-icons/gr";

import React, { useState, useRef, useEffect } from "react";
import { crops, practices } from "../ontology";

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
  const [changedEndDate, setChangedEndDate] = useState(
    editEvent ? editEvent.startDate !== editEvent.endDate : false
  );
  const [description, setDescription] = useState(
    editEvent ? editEvent.description : ""
  );
  const [selectedType, setSelectedType] = useState(
    editEvent ? editEvent.type : practices[0].name
  );

  const [amount, setAmount] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState(
    editEvent ? editEvent.crop : crops[0]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setCreateEvent(false);
      setEditEvent(false);
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
    setCreateEvent(null);
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const db = getDatabase();
    update(ref(db, "fields/" + 0 + "/Events/" + editEvent.key), {
      type: selectedType,
      amount: amount,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: description,
      crop: selectedCrop,
    });
    setEditEvent(null);
    setCreateEvent(null);
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

  const closeEdit = () => {
    setEditEvent(null);
    setCreateEvent(null);
  };

  console.log(selectedType);
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 w-screen h-screen bg-[#000000CC] flex flex-col justify-center items-center">
      <form
        ref={cardRef}
        onSubmit={editEvent ? handleEdit : handleSubmit}
        className="cardContainer bg-slate-50"
      >
        <div className="w-full flex flex-row items-center justify-start">
          <GrPrevious
            className="hover:cursor-pointer mr-4"
            color={"#000"}
            onClick={closeEdit}
          />
          <div className="font-bold text-xl">
            {editEvent ? "Edit event" : "Create Event"}
          </div>
        </div>
        <select
          value={selectedCrop}
          onChange={(event) => setSelectedCrop(event.target.value)}
          className={
            "rounded-md p-2 border-transparent border-2 focus-within:border-amber500 focus:outline-none"
          }
        >
          {crops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
        <div className="flex flex-row justify-center items-center">
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className={
              "rounded-md p-2 border-transparent border-2 focus-within:border-neutral-300 focus:outline-none mr-2"
            }
          >
            {practices.map((practice) => (
              <option key={practice.name} value={practice.name}>
                {`${practice.symbol} ${practice.name}`}
              </option>
            ))}
          </select>
          <input
            className="w-32 p-2 rounded-md border-transparent border-2 focus-within:border-neutral-300 focus:outline-none"
            type="number"
            value={amount}
            onChange={(event) => setAmount(parseInt(event?.target.value))}>

            </input>
          <span className="-ml-14 text-right w-6">
            {
              practices.find((practice) => practice.name === selectedType)
                ?.units[0]
            }
          </span>
        </div>

        <textarea
          className="description rounded-md border-transparent border-2 focus-within:border-neutral-300 focus:outline-none"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <div className="datesContainer">
          <div className="dateContainer">
            <p className="w-fit">Start date</p>
            <input
              className="mr-2 p-2 w-full rounded-md border-transparent border-2 focus-within:border-neutral-300 focus:outline-none"
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
              className="w-full p-2 rounded-md border-transparent border-2 focus-within:border-neutral-300 focus:outline-none"
              type="date"
              value={endDate.toISOString().substr(0, 10)}
              onChange={(event) => changeEndDate(event)}
              min={startDate.toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button type="submit" className="primary-button text-xl">
            {editEvent ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
